"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEMOS_PUBLISHED_EVENT,
  type Demo,
  type DemosPublishedDetail,
  getPublicDemos,
  getPublicDemosFromLocalStorage,
  toCardProps,
} from "./demos";
import { getDemosFromSupabase } from "./supabase";

const DEMOS_BROADCAST_CHANNEL = "bdf-demos-sync";
const SUPABASE_CONFIRM_DELAY_MS = 450;
const SUPABASE_RETRY_MS = 500;
const SUPABASE_MAX_RETRIES = 4;
const VISIBILITY_POLL_MS = 45_000;

type CardProps = ReturnType<typeof toCardProps>;

function toCards(demos: Demo[], limit?: number): CardProps[] {
  const sliced = limit != null ? demos.slice(0, limit) : demos;
  return sliced.map(toCardProps);
}

/**
 * Shared hook for public pages (/, /work).
 * - Instant update from admin payload / localStorage on publish events
 * - Delayed Supabase re-fetch to avoid replication race after writes
 * - Cross-tab sync via BroadcastChannel + storage events
 * - Visibility + light polling when tab is active
 * - Full fallback to hardcoded DEFAULT_DEMOS when Supabase unavailable
 */
export function useLivePublicDemos(limit?: number): CardProps[] {
  const [demos, setDemos] = useState<CardProps[]>(() =>
    toCards(getPublicDemos(), limit)
  );

  const abortRef = useRef<AbortController | null>(null);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastAppliedTsRef = useRef(0);

  const applyDemos = useCallback(
    (next: Demo[], ts = Date.now()) => {
      if (ts < lastAppliedTsRef.current) return;
      lastAppliedTsRef.current = ts;
      setDemos(toCards(next, limit));
    },
    [limit]
  );

  const applyFallback = useCallback(() => {
    applyDemos(getPublicDemos(), Date.now());
  }, [applyDemos]);

  const demoFingerprint = useCallback((items: Demo[]) => {
    return items
      .map((d) => `${d.id}:${d.sortOrder}:${d.visible ? 1 : 0}:${d.title}:${d.href}`)
      .sort()
      .join("|");
  }, []);

  const confirmFromSupabase = useCallback(
    async (delayMs = 0, expected?: Demo[]) => {
      if (confirmTimerRef.current) {
        clearTimeout(confirmTimerRef.current);
        confirmTimerRef.current = null;
      }

      const run = async (attempt = 0) => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
          const fromSupa = await getDemosFromSupabase();
          if (controller.signal.aborted) return;

          if (fromSupa && fromSupa.length > 0) {
            if (
              expected &&
              expected.length > 0 &&
              demoFingerprint(fromSupa) !== demoFingerprint(expected) &&
              attempt < SUPABASE_MAX_RETRIES
            ) {
              confirmTimerRef.current = setTimeout(() => {
                confirmTimerRef.current = null;
                void run(attempt + 1);
              }, SUPABASE_RETRY_MS * (attempt + 1));
              return;
            }

            applyDemos(fromSupa, Date.now());
            return;
          }
        } catch {
          // swallow — always graceful
        }

        if (controller.signal.aborted) return;

        const fromLocal = getPublicDemosFromLocalStorage();
        if (fromLocal && fromLocal.length > 0) {
          applyDemos(fromLocal, Date.now());
          return;
        }

        applyFallback();
      };

      if (delayMs > 0) {
        confirmTimerRef.current = setTimeout(() => {
          confirmTimerRef.current = null;
          void run();
        }, delayMs);
      } else {
        await run();
      }
    },
    [applyDemos, applyFallback, demoFingerprint]
  );

  const handlePublishedDetail = useCallback(
    (detail: DemosPublishedDetail | undefined, delayMs: number) => {
      let expected: Demo[] | undefined;

      if (detail?.demos && detail.demos.length > 0) {
        applyDemos(detail.demos, detail.ts);
        expected = detail.demos;
      } else if (detail?.source === "storage") {
        const fromLocal = getPublicDemosFromLocalStorage();
        if (fromLocal && fromLocal.length > 0) {
          applyDemos(fromLocal, detail.ts);
          expected = fromLocal;
        }
      }

      void confirmFromSupabase(delayMs, expected);
    },
    [applyDemos, confirmFromSupabase]
  );

  useEffect(() => {
    void confirmFromSupabase(0);

    const onCustomPublished = (event: Event) => {
      const detail = (event as CustomEvent<DemosPublishedDetail>).detail;
      handlePublishedDetail(detail, SUPABASE_CONFIRM_DELAY_MS);
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key != null && event.key !== "bdf_demos_v1") return;
      handlePublishedDetail(
        {
          demos: getPublicDemosFromLocalStorage() ?? [],
          ts: Date.now(),
          source: "storage",
        },
        SUPABASE_CONFIRM_DELAY_MS
      );
    };

    let broadcastChannel: BroadcastChannel | null = null;
    const onBroadcast = (event: MessageEvent<DemosPublishedDetail>) => {
      if (!event.data) return;
      handlePublishedDetail(
        { ...event.data, source: "broadcast" },
        SUPABASE_CONFIRM_DELAY_MS
      );
    };

    try {
      if (typeof BroadcastChannel !== "undefined") {
        broadcastChannel = new BroadcastChannel(DEMOS_BROADCAST_CHANNEL);
        broadcastChannel.onmessage = onBroadcast;
      }
    } catch {
      // BroadcastChannel unavailable — storage + custom events still work
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        void confirmFromSupabase(0);
      }
    };

    const pollId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void confirmFromSupabase(0);
      }
    }, VISIBILITY_POLL_MS);

    window.addEventListener(DEMOS_PUBLISHED_EVENT, onCustomPublished);
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onVisibility);

    return () => {
      abortRef.current?.abort();
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      window.clearInterval(pollId);
      window.removeEventListener(DEMOS_PUBLISHED_EVENT, onCustomPublished);
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
      broadcastChannel?.close();
    };
  }, [confirmFromSupabase, handlePublishedDetail]);

  return demos;
}
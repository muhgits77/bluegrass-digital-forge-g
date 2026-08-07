"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DEMOS_PUBLISHED_EVENT,
  FEATURED_HOMEPAGE_LIMIT,
  getFeaturedPublicDemos,
  getPublicDemos,
  loadLiveFeaturedPublicDemos,
  loadLivePublicDemosCatalog,
  selectFeaturedDemos,
  toCardProps,
  type DemosPublishedDetail,
} from "./demos";

type CardProps = ReturnType<typeof toCardProps>;

export type UseLivePublicDemosOptions = {
  /** Max cards to return (homepage featured uses FEATURED_HOMEPAGE_LIMIT). Omit for full /work gallery. */
  limit?: number;
  /**
   * When true, only the homepage Featured Work set is returned
   * (live ordered slugs from Supabase forge_settings when available).
   */
  featuredOnly?: boolean;
};

/**
 * Public homepage + /work catalog.
 *
 * First paint uses DEFAULT_DEMOS (fast, SEO-safe).
 * Then hydrates from Supabase merged over defaults so /admin edits to href,
 * title, description, image, and featured order go live without a redeploy.
 *
 * Listens for bdf:demos-published so same-browser admin saves refresh the grid.
 */
export function useLivePublicDemos(
  limitOrOptions?: number | UseLivePublicDemosOptions
): CardProps[] {
  const options: UseLivePublicDemosOptions =
    typeof limitOrOptions === "number"
      ? { limit: limitOrOptions, featuredOnly: false }
      : limitOrOptions ?? {};

  const { limit, featuredOnly = false } = options;
  const featuredLimit = limit ?? FEATURED_HOMEPAGE_LIMIT;

  const staticCards = useMemo(() => {
    if (featuredOnly) {
      return getFeaturedPublicDemos(featuredLimit).map(toCardProps);
    }
    const all = getPublicDemos();
    const list = limit != null ? all.slice(0, limit) : all;
    return list.map(toCardProps);
  }, [limit, featuredOnly, featuredLimit]);

  const [liveCards, setLiveCards] = useState<CardProps[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        if (featuredOnly) {
          const { demos } = await loadLiveFeaturedPublicDemos(featuredLimit);
          if (!cancelled) setLiveCards(demos.map(toCardProps));
        } else {
          const { demos } = await loadLivePublicDemosCatalog();
          const list = limit != null ? demos.slice(0, limit) : demos;
          if (!cancelled) setLiveCards(list.map(toCardProps));
        }
      } catch (err) {
        console.warn("[useLivePublicDemos] live hydrate failed — using defaults", err);
      }
    }

    void hydrate();

    const onPublished = (e: Event) => {
      const detail = (e as CustomEvent<DemosPublishedDetail>).detail;
      if (!detail) return;

      if (featuredOnly) {
        // Prefer live re-fetch so forge_settings order is respected after save
        void loadLiveFeaturedPublicDemos(featuredLimit).then(({ demos }) => {
          if (!cancelled) setLiveCards(demos.map(toCardProps));
        });
      } else if (detail.demos?.length) {
        const list = limit != null ? detail.demos.slice(0, limit) : detail.demos;
        setLiveCards(list.map(toCardProps));
      } else {
        void hydrate();
      }
    };

    window.addEventListener(DEMOS_PUBLISHED_EVENT, onPublished);
    return () => {
      cancelled = true;
      window.removeEventListener(DEMOS_PUBLISHED_EVENT, onPublished);
    };
  }, [featuredOnly, featuredLimit, limit]);

  return liveCards ?? staticCards;
}

/** Helper for tests / admin preview: resolve featured cards from a demo list + slug order. */
export function resolveFeaturedCards(
  demos: Parameters<typeof selectFeaturedDemos>[0],
  orderedSlugs: string[],
  limit = FEATURED_HOMEPAGE_LIMIT
): CardProps[] {
  return selectFeaturedDemos(demos, limit, orderedSlugs).map(toCardProps);
}

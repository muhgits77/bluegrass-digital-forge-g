"use client";

import { useMemo } from "react";
import {
  FEATURED_HOMEPAGE_LIMIT,
  getFeaturedPublicDemos,
  getPublicDemos,
  toCardProps,
} from "./demos";

type CardProps = ReturnType<typeof toCardProps>;

export type UseLivePublicDemosOptions = {
  /** Max cards to return (homepage featured uses FEATURED_HOMEPAGE_LIMIT). Omit for full /work gallery. */
  limit?: number;
  /**
   * When true, only the curated homepage featured set is returned
   * (HOMEPAGE_FEATURED_SLUGS / featured flags in DEFAULT_DEMOS).
   */
  featuredOnly?: boolean;
};

/**
 * Public homepage + /work catalog.
 *
 * Source of truth is hardcoded DEFAULT_DEMOS in lib/demos.ts (getPublicDemos).
 * Stale Supabase / localStorage admin data must NOT override the curated
 * Placement Map — that was wiping Blue Door, Fence, TruckDash, and wrong
 * featured cards (e.g. Bluegrass Market) on the live site.
 *
 * To permanently change public demos: edit DEFAULT_DEMOS (or Admin export → paste).
 */
export function useLivePublicDemos(
  limitOrOptions?: number | UseLivePublicDemosOptions
): CardProps[] {
  const options: UseLivePublicDemosOptions =
    typeof limitOrOptions === "number"
      ? { limit: limitOrOptions, featuredOnly: false }
      : limitOrOptions ?? {};

  const { limit, featuredOnly = false } = options;

  return useMemo(() => {
    if (featuredOnly) {
      return getFeaturedPublicDemos(limit ?? FEATURED_HOMEPAGE_LIMIT).map(
        toCardProps
      );
    }
    const all = getPublicDemos();
    const list = limit != null ? all.slice(0, limit) : all;
    return list.map(toCardProps);
  }, [limit, featuredOnly]);
}

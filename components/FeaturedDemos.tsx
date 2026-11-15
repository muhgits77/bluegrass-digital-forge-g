"use client";

import DemoCard from "@/components/DemoCard";
import { FEATURED_HOMEPAGE_LIMIT } from "@/lib/demos";
import { useLivePublicDemos } from "@/lib/useLivePublicDemos";

/**
 * Client island for homepage Featured Work cards only.
 * - Live order from Supabase forge_settings (admin drag-and-drop).
 * - Instant first paint from DEFAULT_FEATURED_SLUGS, then hydrates.
 * - Keeps the homepage shell as a Server Component so the hero (LCP)
 *   can render without waiting on demo-sync client JS.
 * - Dark Kentucky-warm card design lives in DemoCard + globals.css.
 */
export default function FeaturedDemos({
  limit = FEATURED_HOMEPAGE_LIMIT,
}: {
  limit?: number;
}) {
  const demos = useLivePublicDemos({ limit, featuredOnly: true });

  if (demos.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card px-5 py-10 text-center text-[14.5px] text-[var(--text-muted)]">
        Featured work is being updated. Check back shortly — or{" "}
        <a href="/work" className="text-[var(--copper-bright)] hover:underline">
          browse all Lake Cumberland website demos
        </a>
        .
      </div>
    );
  }

  return (
    // 1-col mobile / 2-col tablet+ — full descriptions, no line-clamp
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
      {demos.map((d) => (
        <DemoCard key={d.slug || d.href} {...d} />
      ))}
    </div>
  );
}

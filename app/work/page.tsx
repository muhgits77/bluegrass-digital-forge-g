"use client";

import DemoCard from "@/components/DemoCard";
import Link from "next/link";
import { useMemo } from "react";
import { WORK_TIER1_SLUGS, WORK_TIER2_SLUGS } from "@/lib/demos";
import { useLivePublicDemos } from "@/lib/useLivePublicDemos";

/**
 * Work page — live demos only. Framer Motion removed (CSS card hover in DemoCard).
 * Client component solely for useLivePublicDemos sync with admin/Supabase.
 * Grid is curated: Tier 1 primary → Tier 2 supporting → More examples.
 * All demos stay live; only order and section visibility change.
 */
export default function WorkPage() {
  const allDemos = useLivePublicDemos();

  const { tier1, tier2, more } = useMemo(() => {
    const tier1Set = new Set<string>(WORK_TIER1_SLUGS);
    const tier2Set = new Set<string>(WORK_TIER2_SLUGS);
    const t1: typeof allDemos = [];
    const t2: typeof allDemos = [];
    const rest: typeof allDemos = [];

    // Preserve sortOrder from data layer within each group
    for (const d of allDemos) {
      const slug = (d.slug || "").toLowerCase();
      if (tier1Set.has(slug)) t1.push(d);
      else if (tier2Set.has(slug)) t2.push(d);
      else rest.push(d);
    }

    // Ensure tier arrays follow the curated slug order, not accidental shuffle
    const orderBy = (list: typeof allDemos, order: readonly string[]) => {
      const rank = new Map(order.map((s, i) => [s, i]));
      return [...list].sort(
        (a, b) =>
          (rank.get((a.slug || "").toLowerCase()) ?? 99) -
          (rank.get((b.slug || "").toLowerCase()) ?? 99)
      );
    };

    return {
      tier1: orderBy(t1, WORK_TIER1_SLUGS),
      tier2: orderBy(t2, WORK_TIER2_SLUGS),
      more: rest,
    };
  }, [allDemos]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="max-w-2xl mb-8">
        <div className="label tracking-[1.5px]">
          MY WORK — LAKE CUMBERLAND BUSINESS WEBSITES
        </div>
        <h1 className="section-title tracking-tight">
          Lake Cumberland Business Websites &amp; Wayne County Web Design Demos —
          Monticello KY Website Designer
        </h1>
        <p className="mt-3 text-[15px] text-[var(--text-muted)] leading-relaxed">
          Portfolio examples of Lake Cumberland business websites — food trucks,
          restaurants, guides, fence &amp; outdoor trades, and shops — built in
          Monticello.{" "}
          <strong className="text-[var(--text)] font-medium">
            Flat one-time pricing
          </strong>
          .{" "}
          <strong className="text-[var(--text)] font-medium">
            Full ownership of the code
          </strong>
          . Several include a write-up on this site; others open the live preview
          directly.
        </p>
        <p className="mt-2 text-[14px] text-[var(--text-dim)]">
          Specialty pages:{" "}
          <Link
            href="/fishing-guide-websites"
            className="text-[var(--gold-light)] underline hover:text-white"
          >
            fishing guides
          </Link>
          ,{" "}
          <Link
            href="/food-truck-websites"
            className="text-[var(--gold-light)] underline hover:text-white"
          >
            food trucks
          </Link>
          ,{" "}
          <Link
            href="/restaurant-websites"
            className="text-[var(--gold-light)] underline hover:text-white"
          >
            restaurants
          </Link>
          {" · "}
          <Link
            href="/truckdash"
            className="text-[var(--gold-light)] underline hover:text-white"
          >
            TruckDash
          </Link>
          .
        </p>
      </div>

      <div className="mb-6 text-sm">
        <Link
          href="/services"
          className="text-[var(--gold-light)] hover:underline"
        >
          Monticello KY website designer pricing &amp; packages →
        </Link>
      </div>

      {tier1.length > 0 ? (
        <section aria-labelledby="work-tier1-heading" className="mb-12">
          <div className="mb-5">
            <div className="label tracking-[1.5px]">PRIMARY EXAMPLES</div>
            <h2
              id="work-tier1-heading"
              className="text-xl font-semibold tracking-tight mt-1"
            >
              Strongest demos for Lake Cumberland businesses
            </h2>
            <p className="mt-1.5 text-[14px] text-[var(--text-dim)] max-w-2xl">
              Food trucks grouped first, then BBQ &amp; steakhouse, fishing guide,
              fence &amp; outdoor, gym, and land services — flat pricing, you own
              the code.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tier1.map((d) => (
              <DemoCard key={d.slug || d.href} {...d} />
            ))}
          </div>
        </section>
      ) : null}

      {tier2.length > 0 ? (
        <section aria-labelledby="work-tier2-heading" className="mb-12">
          <div className="mb-5">
            <div className="label tracking-[1.5px]">SUPPORTING EXAMPLES</div>
            <h2
              id="work-tier2-heading"
              className="text-xl font-semibold tracking-tight mt-1"
            >
              More shops and specialty layouts
            </h2>
            <p className="mt-1.5 text-[14px] text-[var(--text-dim)] max-w-2xl">
              Market &amp; mercantile, artisan studio, massage, Mexican supper
              house, donut shop, and bait &amp; tackle — same neighborly build,
              Monticello-based.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tier2.map((d) => (
              <DemoCard key={d.slug || d.href} {...d} />
            ))}
          </div>
        </section>
      ) : null}

      {more.length > 0 ? (
        <section aria-labelledby="work-more-heading" className="mb-4">
          <div className="mb-5">
            <div className="label tracking-[1.5px]">MORE EXAMPLES</div>
            <h2
              id="work-more-heading"
              className="text-xl font-semibold tracking-tight mt-1 text-[var(--text-muted)]"
            >
              Additional live demos
            </h2>
            <p className="mt-1.5 text-[14px] text-[var(--text-dim)] max-w-2xl">
              Still live and openable — lower in the grid so the strongest local
              examples stay easy to find.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-95">
            {more.map((d) => (
              <DemoCard key={d.slug || d.href} {...d} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-12 text-center border-t border-[var(--border)] pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Ready for a site like these?
        </h2>
        <p className="text-[14.5px] text-[var(--text-muted)] mt-2 max-w-lg mx-auto">
          <Link
            href="/fishing-guide-websites"
            className="underline hover:text-white"
          >
            Fishing guide
          </Link>
          ,{" "}
          <Link
            href="/food-truck-websites"
            className="underline hover:text-white"
          >
            food truck
          </Link>
          ,{" "}
          <Link
            href="/restaurant-websites"
            className="underline hover:text-white"
          >
            restaurant
          </Link>
          , fence, gym, or shop — handcrafted by a neighbor in Monticello. Flat
          pricing. You own everything.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary">
            Get a Quote →
          </Link>
          <Link href="/services" className="btn btn-secondary">
            See pricing
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact the local builder
          </Link>
        </div>
      </div>
    </div>
  );
}

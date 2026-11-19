"use client";

import DemoCard from "@/components/DemoCard";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CopperButton, GhostButton, PageHero } from "@/components/site/ui";
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

  const ordered = useMemo(() => [...tier1, ...tier2, ...more], [tier1, tier2, more]);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(ordered.map((d) => d.category).filter(Boolean)))],
    [ordered]
  );
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? ordered : ordered.filter((d) => d.category === cat);

  return (
    <>
      <PageHero eyebrow="My work" title="Live demos for real Kentucky businesses">
        Mostly Kentucky, and a few for saltwater towns too — I build for anywhere. Click any card to open the live site: food trucks, restaurants, guides, fence &amp; outdoor trades, and shops, built in Monticello.
      </PageHero>
      <div className="mx-auto max-w-7xl px-5 pb-20">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter demos by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={c === cat}
              className={`rounded-full border px-4 py-2 text-sm ${c === cat ? "bg-copper border-transparent text-primary-foreground" : "border-border text-muted-foreground hover:border-primary"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <h2 className="sr-only">Portfolio demos</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <DemoCard key={d.slug || d.href} {...d} />
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          Specialty pages: <Link href="/fishing-guide-websites" className="text-primary">fishing guides</Link>,{" "}
          <Link href="/food-truck-websites" className="text-primary">food trucks</Link>,{" "}
          <Link href="/restaurant-websites" className="text-primary">restaurants</Link>,{" "}
          <Link href="/marina-websites" className="text-primary">marinas</Link>,{" "}
          <Link href="/contractor-websites" className="text-primary">contractors</Link>.{" "}
          <Link href="/services" className="text-primary">Pricing &amp; packages →</Link>
        </p>
      </div>
      <section className="mx-auto max-w-4xl px-5 pb-20 text-center">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Ready for a site like these?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Handcrafted by a neighbor in Monticello. Flat pricing. You own everything.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CopperButton href="/quote">Get a free quote →</CopperButton>
          <GhostButton href="/services">See pricing</GhostButton>
        </div>
      </section>
    </>
  );
}

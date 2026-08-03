"use client";

import DemoCard from "@/components/DemoCard";
import Link from "next/link";
import { useLivePublicDemos } from "@/lib/useLivePublicDemos";

/**
 * Work page — live demos only. Framer Motion removed (CSS card hover in DemoCard).
 * Client component solely for useLivePublicDemos sync with admin/Supabase.
 */
export default function WorkPage() {
  const allDemos = useLivePublicDemos();

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
          restaurants, guides, and shops — built in Monticello. Several include
          a full write-up on this site; others open the live preview directly.
        </p>
        <p className="mt-2 text-[14px] text-[var(--text-dim)]">
          Specialty pages:{" "}
          <Link
            href="/marina-websites"
            className="text-[var(--gold-light)] underline hover:text-white"
          >
            marinas
          </Link>
          ,{" "}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {allDemos.map((d) => (
          <DemoCard key={d.slug || d.href} {...d} />
        ))}
      </div>

      <div className="mt-12 text-center border-t border-[var(--border)] pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Ready for a site like these?
        </h2>
        <p className="text-[14.5px] text-[var(--text-muted)] mt-2 max-w-lg mx-auto">
          <Link href="/marina-websites" className="underline hover:text-white">Marina</Link>
          ,{" "}
          <Link href="/fishing-guide-websites" className="underline hover:text-white">fishing guide</Link>
          ,{" "}
          <Link href="/food-truck-websites" className="underline hover:text-white">food truck</Link>
          ,{" "}
          <Link href="/restaurant-websites" className="underline hover:text-white">restaurant</Link>
          , or shop — handcrafted by a neighbor in
          Monticello. Flat pricing. You own everything.
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

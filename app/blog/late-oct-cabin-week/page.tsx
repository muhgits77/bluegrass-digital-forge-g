import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Late-October Cabin Week on Lake Cumberland | Bluegrass Digital Forge",
  description:
    "Somerset Moonlight Festival Oct 17 and Monticello Fall Fest Oct 23–24. Show fall hours on Google and say plainly where you are — that’s what we build.",
  keywords: [
    "Lake Cumberland cabin week",
    "Moonlight Festival Somerset",
    "Fall Fest Monticello",
    "Lake Cumberland business website",
    "food truck Google hours",
  ],
  alternates: { canonical: canonicalUrl("/blog/late-oct-cabin-week") },
  openGraph: {
    title: "Late-October Cabin Week on Lake Cumberland",
    description:
      "Busy shore calendar, quieter coves — make sure Google and your site match your fall hours and location.",
    url: canonicalUrl("/blog/late-oct-cabin-week"),
  },
};

export default function LateOctCabinWeekPost() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <p className="text-[13px] text-[var(--text-muted)]">
        <Link href="/blog" className="hover:text-[var(--cream)] underline-offset-2 hover:underline">
          Blog
        </Link>
        <span className="mx-2">/</span>
        Late-October cabin week
      </p>
      <div className="label tracking-[1.6px] mt-4">FORGE NIGHT · 2026-10-06</div>
      <h1 className="section-title tracking-tight mt-1">
        Late-October cabin week on Lake Cumberland
      </h1>

      <div className="prose prose-invert mt-6 max-w-none text-[#c8cfd3] text-[15.5px] leading-relaxed">
        <p>
          Late-October cabin week on Lake Cumberland means quieter coves, cooler
          mornings, and a busy calendar on shore. Somerset&apos;s Moonlight
          Festival is October 17, and Fall Fest takes over Monticello October
          23–24. If you run a cabin, a marina shop, or a food truck anywhere
          between Fall Creek and Lee&apos;s Ford, these are the weekends people
          search for &quot;things to do near Lake Cumberland.&quot; Make sure
          your Google profile shows your fall hours, and that your site says
          plainly where you are. That&apos;s what we build.
        </p>

        <p className="mt-4 text-[14px] text-[var(--text-muted)]">
          Cites:{" "}
          <a
            href="https://www.kentuckyliving.com/event/seesomerset-moonlight-festival-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--gold-light)]"
          >
            Kentucky Living — SeeSomerset Moonlight Festival 2026
          </a>
          {" · "}
          <a
            href="https://www.kentuckyliving.com/event/lake-cumberland-fall-fest"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--gold-light)]"
          >
            Kentucky Living — Lake Cumberland Fall Fest
          </a>
          . Organizers double-check before go-live.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-[var(--border-copper)] bg-[var(--bg-elev)] p-6">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--copper)]">
          Soft CTA
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#c8cfd3]">
          Update fall hours on Google, put a clear location on your site, and if
          you want a neighbor to build that page — start with a free quote.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary px-5 py-2.5 text-[14px]">
            Get a free quote →
          </Link>
          <Link
            href="/food-truck-websites"
            className="btn btn-secondary px-5 py-2.5 text-[14px]"
          >
            Food truck websites
          </Link>
        </div>
      </div>
    </div>
  );
}

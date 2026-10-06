import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Blog | Lake Cumberland Business Notes | Bluegrass Digital Forge",
  description:
    "Forge Night notes for Lake Cumberland cabins, marinas, shops, and food trucks — hours, location, and the weekends people actually search for.",
  alternates: { canonical: canonicalUrl("/blog") },
  openGraph: {
    title: "Blog | Bluegrass Digital Forge",
    description:
      "Practical notes for Lake Cumberland businesses — cabin week calendars, Google hours, and clear location on your site.",
    url: canonicalUrl("/blog"),
  },
};

const posts = [
  {
    href: "/blog/late-oct-cabin-week",
    title: "Late-October cabin week on Lake Cumberland",
    date: "2026-10-06",
    blurb:
      "Moonlight Festival Oct 17 in Somerset, Fall Fest Oct 23–24 in Monticello — show your fall hours and where you are.",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="label tracking-[1.6px]">FORGE NIGHT · NOTES</div>
      <h1 className="section-title tracking-tight mt-1">
        Blog — Lake Cumberland business notes
      </h1>
      <p className="mt-4 text-[15.5px] leading-relaxed text-[#c8cfd3]">
        Short, practical posts for cabin weeks, marina shops, and food trucks
        between Fall Creek and Lee&apos;s Ford. Propose-only until go-live —
        organizers double-check before publish.
      </p>

      <ul className="mt-10 space-y-4">
        {posts.map((p) => (
          <li
            key={p.href}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5"
          >
            <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {p.date}
            </p>
            <Link
              href={p.href}
              className="mt-1 block text-xl font-semibold text-[var(--cream)] hover:text-[var(--gold-light)]"
            >
              {p.title}
            </Link>
            <p className="mt-2 text-[14.5px] leading-relaxed text-[#c8cfd3]">
              {p.blurb}
            </p>
            <Link
              href={p.href}
              className="mt-3 inline-block text-[14px] text-[var(--copper)] hover:underline"
            >
              Read post →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

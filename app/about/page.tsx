import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About the Monticello KY Website Designer | Bluegrass Digital Forge",
  description:
    "Meet Brian, the Monticello KY website designer building authentic Lake Cumberland business websites. Local, honest flat pricing, and you own the code — full ownership from day one.",
  keywords: [
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "Web Design Charleston SC",
    "Lowcountry Web Design",
  ],
  alternates: { canonical: canonicalUrl("/about") },
  openGraph: {
    title: "About the Monticello KY Website Designer | Bluegrass Digital Forge",
    description:
      "Meet Brian, the Monticello KY website designer building authentic Lake Cumberland business websites. Local, honest flat pricing, and you own the code — full ownership from day one.",
    url: canonicalUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="label tracking-[1.6px]">ABOUT — MONTICELLO KY WEBSITE DESIGNER</div>
      <h1 className="section-title tracking-tight mt-1">Monticello KY Website Designer — Flat Pricing &amp; Full Ownership for Lake Cumberland Businesses</h1>

      <div className="prose prose-invert mt-5 max-w-none text-[#c8cfd3] text-[15.5px] leading-relaxed">
        <p>
          I live and work right here on Lake Cumberland — not a 1-800 number or a
          chat window halfway across the country. When you hire Bluegrass Digital
          Forge, you get honest{" "}
          <strong className="text-white font-semibold">flat pricing</strong>,{" "}
          <strong className="text-white font-semibold">full ownership</strong> of
          your site — <strong className="text-white font-semibold">you own the code</strong>{" "}
          — and a real neighbor who knows the difference between a Wayne County
          food truck at the marina and a Somerset storefront. I pick up the phone.
          I answer texts on weekends before a busy Saturday.
        </p>
        <p className="mt-3">
          No lock-in, no proprietary platform holding your business hostage — just
          local craftsmanship and a flat rate you can plan around. Your website is
          yours forever.
        </p>
        <p className="mt-3">
          Serving Lake Cumberland towns from Monticello outward — and{" "}
          <Link href="/south-carolina" className="underline hover:text-[var(--gold-light)]">
            Charleston SC web design
          </Link>
          ,{" "}
          <Link href="/south-carolina" className="underline hover:text-[var(--gold-light)]">
            Lowcountry food truck websites
          </Link>
          , and{" "}
          <Link href="/south-carolina" className="underline hover:text-[var(--gold-light)]">
            South Carolina Lowcountry websites
          </Link>{" "}
          with the same neighborly approach.{" "}
          <Link href="/service-areas" className="underline hover:text-[var(--gold-light)]">
            Full service areas →
          </Link>
        </p>
        <p className="mt-3 text-[14.5px] text-[var(--text-muted)]">
          Food truck owners: real-time location updates from your phone.{" "}
          <Link href="/food-truck-websites" className="underline hover:text-[var(--gold-light)]">
            Kentucky food truck websites →
          </Link>{" "}
          and{" "}
          <Link href="/work" className="underline hover:text-[var(--gold-light)]">
            Lake Cumberland website demos
          </Link>
          .
        </p>
      </div>

      <div className="mt-9 grid md:grid-cols-2 gap-4">
        {[
          ["Flat pricing, full ownership", "One clear flat rate for the build. You own the code from day one — no monthly hostage fees, no black-box platform. Host it with me or take it anywhere."],
          ["I know your customers", "Folks at the marina, families heading to the lake on Friday, contractors grabbing lunch in town. I build sites that speak directly to them — not generic templates."],
          ["Same-day replies", "Text or call me. Stop me at the diner. No ticket queues, no overseas managers, no waiting days for a reply."],
          ["Built for real local search", "I tune every site for the searches that matter here: 'BBQ near Lake Cumberland', 'food truck Monticello', 'barber Somerset KY'. Real local SEO that actually shows up."],
        ].map(([title, body], i) => (
          <div key={i} className="area-card">
            <div className="font-semibold tracking-tight text-lg mb-2">{title}</div>
            <p className="text-[14.5px] text-[var(--text-muted)] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] p-8 text-center shadow-[var(--shadow-card)]">
        <p className="text-[var(--text-muted)]">
          Curious what a local, honest build looks like? See the{" "}
          <Link href="/work" className="underline hover:text-[var(--gold-light)]">
            live demos
          </Link>{" "}
          or{" "}
          <Link href="/food-truck-websites" className="underline hover:text-[var(--gold-light)]">
            food truck examples
          </Link>
          . Same approach for{" "}
          <Link href="/south-carolina" className="underline hover:text-[var(--gold-light)]">
            South Carolina Lowcountry websites
          </Link>
          .
        </p>
        <div className="flex flex-wrap gap-3 mt-5 justify-center">
          <Link href="/work" className="btn btn-secondary">Browse the live demos</Link>
          <Link href="/services" className="btn btn-secondary">See pricing</Link>
          <Link href="/quote" className="btn btn-primary">Start a conversation</Link>
        </div>
      </div>

      <p className="text-center text-[12.5px] mt-9 text-[var(--text-muted)]">Forged in Monticello, Kentucky. Independently owned. No agency middlemen. Full ownership — you own the code.</p>
    </div>
  );
}

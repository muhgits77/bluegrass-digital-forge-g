import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Brian – Monticello KY Web Designer",
  description: "Meet Brian, the Monticello KY web designer building websites for Lake Cumberland businesses. Local, flat pricing, and you own your site.",
  keywords: ["Monticello KY website designer", "Lake Cumberland business websites", "Wayne County web design", "Somerset KY web design"],
  alternates: { canonical: canonicalUrl("/about") },
  openGraph: {
    title: "About Brian – Monticello KY Web Designer",
    description: "Meet Brian, the Monticello KY web designer building websites for Lake Cumberland businesses. Local, flat pricing, and you own your site.",
    url: canonicalUrl("/about"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <div className="label tracking-[1.6px]">ABOUT — MONTICELLO KY WEBSITE DESIGNER</div>
      <h1 className="section-title tracking-tight mt-1">A neighbor on the lake, not an agency.</h1>

      <div className="prose prose-invert mt-5 max-w-none text-[#c8cfd3] text-[15.5px] leading-relaxed">
        <p>
          I live and work right here on Lake Cumberland. When you hire Bluegrass Digital Forge you get flat pricing, full ownership of the site — you own the code — and a neighbor who knows the difference between a Wayne County food truck at the marina and a Somerset storefront.
        </p>
        <p className="mt-3">
          No lock-in. No platform holding your site. Just a flat rate you can plan on. The site is yours when it’s done.
        </p>
        <p className="mt-3">
          Serving Lake Cumberland towns from Monticello outward: Somerset, Russell Springs, Jamestown, Burnside, Albany and Whitley City, across Wayne, Pulaski, Russell and McCreary counties.{" "}
          <Link href="/service-areas" className="underline hover:text-[var(--gold-light)]">Full service areas →</Link>
        </p>
        <p className="mt-3 text-[14.5px] text-[var(--text-muted)]">
          Specialty work for{" "}
          <Link href="/marina-websites" className="underline hover:text-[var(--gold-light)]">marinas</Link>,{" "}
          <Link href="/fishing-guide-websites" className="underline hover:text-[var(--gold-light)]">fishing guides</Link>, and{" "}
          <Link href="/food-truck-websites" className="underline hover:text-[var(--gold-light)]">food trucks</Link>{" "}
          — plus{" "}
          <Link href="/work" className="underline hover:text-[var(--gold-light)]">Lake Cumberland website demos</Link>.
        </p>
      </div>

      <div className="mt-9 grid md:grid-cols-2 gap-4">
        {[
          ["Flat pricing, full ownership", "One flat rate for the build. You own the code from day one. No monthly fees to keep it. Host it with me or take it anywhere."],
          ["No agency middlemen", "You talk to the person who builds the site. No account managers, no ticket queues, no overseas handoffs."],
          ["Real local replies", "Text or call me. Stop me at the diner. Weekend answers before a busy Saturday."],
          ["I know your customers", "Folks at the marina, families heading to the lake on Friday, contractors grabbing lunch in town. Sites that talk to them, not generic templates."],
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
          <Link href="/work" className="underline hover:text-[var(--gold-light)]">live demos</Link>,{" "}
          <Link href="/marina-websites" className="underline hover:text-[var(--gold-light)]">marina</Link>,{" "}
          <Link href="/fishing-guide-websites" className="underline hover:text-[var(--gold-light)]">guide</Link>, or{" "}
          <Link href="/food-truck-websites" className="underline hover:text-[var(--gold-light)]">food truck</Link>{" "}
          pages. Not local? Ready-made templates start at $129 at{" "}
          <a href="https://bluegrasstemplates.com/" className="underline hover:text-[var(--gold-light)]">bluegrasstemplates.com</a>.
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

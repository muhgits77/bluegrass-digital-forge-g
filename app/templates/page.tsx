import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { canonicalUrl, TEMPLATE_STORE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "DIY Website Templates from $99 | Bluegrass Digital Forge — Monticello KY",
  description:
    "Prefer to build it yourself? Ready-to-remix website templates hand-built in Kentucky. Launch a professional site in an afternoon — starting at $99, one-time purchase, free updates for bug fixes and refinements.",
  keywords: [
    "website templates Kentucky",
    "DIY website templates",
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "ready to remix website templates",
    "affordable website templates $99",
  ],
  alternates: { canonical: canonicalUrl("/templates") },
  openGraph: {
    title:
      "DIY Website Templates from $99 | Bluegrass Digital Forge — Monticello KY",
    description:
      "Ready-to-remix website templates hand-built in Kentucky. Starting at $99, one-time purchase, free updates included.",
    url: canonicalUrl("/templates"),
  },
};

const highlights = [
  {
    title: "Starting at $99",
    desc: "One-time purchase — no monthly lock-in for the template itself.",
  },
  {
    title: "Hand-built in Kentucky",
    desc: "Ready-to-remix sites forged with the same care as our custom Lake Cumberland builds.",
  },
  {
    title: "Free updates",
    desc: "Bug fixes and refinements included so your template stays solid over time.",
  },
  {
    title: "Launch in an afternoon",
    desc: "Professional look without a full custom project — when DIY is the right fit.",
  },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="label tracking-[1.6px]">
          DIY TEMPLATES · BLUEGRASS DIGITAL FORGE
        </div>
        <h1 className="section-title tracking-tight mt-2">
          Ready-to-Remix Templates
        </h1>
        <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed max-w-prose">
          Prefer to build it yourself? Explore ready-to-remix website templates
          hand-built in Kentucky. Launch a professional site in an afternoon —
          starting at{" "}
          <strong className="text-[var(--cream)] font-medium">$99</strong>.
        </p>
        <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
          A lower-cost, do-it-yourself path alongside our{" "}
          <Link
            href="/services"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            custom website services
          </Link>
          . Same local craft — self-serve when that fits better. One-time
          purchase, with free updates for bug fixes and refinements.
        </p>
      </div>

      <div className="mt-10 relative overflow-hidden rounded-[1.5rem] border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative min-h-[220px] md:min-h-[320px]">
            <Image
              src="/assets/demo-bluegrass-templates.jpg"
              alt="Bluegrass Digital Forge DIY website template store — ready-to-remix sites from $99"
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-card)] hidden md:block opacity-80" />
          </div>
          <div className="p-7 md:p-9 flex flex-col justify-center">
            <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--copper-bright)] font-semibold mb-2">
              Template Store
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Browse the full collection
            </h2>
            <p className="mt-2.5 text-[15px] text-[var(--text-muted)] leading-relaxed">
              Food trucks, restaurants, shops, and more — templates you can
              remix and launch without a full custom build.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={TEMPLATE_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-8 py-3.5"
              >
                Browse Templates →
              </a>
              <Link href="/quote" className="btn btn-secondary px-7 py-3.5">
                Prefer custom? Get a quote
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-[var(--text-dim)]">
              Opens{" "}
              <a
                href={TEMPLATE_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--copper-bright)]"
              >
                bluegrasstemplates.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]"
          >
            <h3 className="font-semibold tracking-tight text-lg">{item.title}</h3>
            <p className="mt-1.5 text-[14.5px] text-[var(--text-muted)] leading-snug">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center max-w-xl mx-auto">
        <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
          Want something fully custom for your Lake Cumberland or Lowcountry
          business?{" "}
          <Link
            href="/services"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            See custom pricing
          </Link>{" "}
          or{" "}
          <Link
            href="/quote"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            get a free quote
          </Link>
          .
        </p>
        <a
          href={TEMPLATE_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-6 px-9 py-3.5"
        >
          See DIY Templates →
        </a>
      </div>
    </div>
  );
}

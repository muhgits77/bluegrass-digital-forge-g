import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Check, CopperButton, Eyebrow, GhostButton, StoreButton, TownsBand } from "@/components/site/ui";
import { TEMPLATE_STORE_URL } from "@/lib/constants";
import FloatingQuote from "@/components/site/FloatingQuote";

/**
 * Homepage — layout mirrored from the Lovable polish (bluegrass-forge-studio).
 * Hero image stays eager/high priority for LCP; featured demos are a deferred
 * client island that syncs with the admin catalog.
 */
const FeaturedDemos = dynamic(() => import("@/components/FeaturedDemos"), {
  loading: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading featured demos">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-[420px] animate-pulse rounded-2xl border border-border bg-card" />
      ))}
    </div>
  ),
});

const stats: [string, string][] = [
  ["16+", "Live Kentucky demos"],
  ["2–4 wks", "Typical launch"],
  ["Local", "Monticello builder"],
  ["Yours", "Full ownership"],
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Image
          src="/hero-lake-cumberland-golden.jpg"
          alt="Golden hour over Lake Cumberland near Monticello, Kentucky"
          fill
          loading="eager"
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 36%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.3fr_1fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-xs uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Wayne County, Kentucky
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
              Lake Cumberland Business Websites Built in <span className="text-copper">Monticello, KY</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Lake Cumberland web design for restaurants, food trucks, marinas, and shops around the lake, built by a neighbor in Monticello.{" "}
              No monthly lock-in for the build, and the code is yours from day one.
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              I&apos;m one builder in Monticello, not an agency. I make websites for businesses in Wayne County, Somerset, Jamestown, Burnside, and the ramp towns in between.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CopperButton href="/quote">Get a free quote →</CopperButton>
              <GhostButton href="/work">Browse live demos</GhostButton>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Check>Flat pricing, no surprises</Check>
              <Check>You own the code</Check>
              <Check>Live in 2–4 weeks</Check>
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Prefer to build it yourself?{" "}
              <a href={TEMPLATE_STORE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
                Website templates from $129, calculators from $99 ↗
              </a>
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card/70 p-8 backdrop-blur">
            <Eyebrow>Custom site pricing</Eyebrow>
            <p className="mt-4 font-display text-6xl font-bold">
              $1,200 <span className="font-sans text-base font-normal text-muted-foreground">one-time · Starter Sites</span>
            </p>
            <p className="mt-4 text-muted-foreground">
              Business Suites $2,500–$4,500. Same deal on both: one flat rate for the build.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <Check>Mobile-first, fast, accessible</Check>
              <Check>Local SEO for real lake searches</Check>
              <Check>Handcrafted for your business</Check>
            </ul>
            <Link href="/services" className="mt-6 inline-block font-semibold text-primary">
              See full pricing →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-14 md:grid-cols-4">
        {stats.map(([a, b]) => (
          <div key={b} className="text-center">
            <p className="text-copper font-display text-4xl font-bold">{a}</p>
            <p className="mt-1 text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </section>

      <section id="featured-work" className="mx-auto max-w-7xl px-5 pb-20" aria-labelledby="featured-work-heading">
        <Eyebrow>Featured work</Eyebrow>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 id="featured-work-heading" className="font-display text-4xl font-bold">Example sites for lake businesses</h2>
          <Link href="/work" className="font-semibold text-primary">See all demos →</Link>
        </div>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Portfolio examples for restaurants, food trucks, guides, and outdoor trades around Monticello and Lake Cumberland. Specialty pages:{" "}
          <Link href="/fishing-guide-websites" className="text-primary">fishing guide websites</Link>,{" "}
          <Link href="/food-truck-websites" className="text-primary">food truck websites</Link>, and{" "}
          <Link href="/restaurant-websites" className="text-primary">restaurant websites</Link>.
        </p>
        <div className="mt-10">
          <FeaturedDemos limit={6} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-10 md:grid-cols-2">
          <div>
            <Eyebrow>DIY templates</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold">Prefer to build it yourself?</h2>
            <p className="mt-4 text-muted-foreground">
              Ready-to-remix website templates, hand-built in Kentucky. Launch a professional site in an afternoon. Website templates from{" "}
              <strong className="text-foreground">$129</strong>, calculators from <strong className="text-foreground">$99</strong>. One-time purchase. Free updates for bug fixes and refinements.
            </p>
          </div>
          <div className="text-center md:text-right">
            <StoreButton>Browse templates ↗</StoreButton>
            <p className="mt-3 text-sm">
              <Link href="/templates" className="text-primary">How templates work →</Link>
            </p>
          </div>
        </div>
      </section>

      <TownsBand />

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <Eyebrow>Let&apos;s build</Eyebrow>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Ready to talk about your website?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          I build for businesses in Lake Cumberland towns from Albany to Whitley City, across Wayne, Pulaski, Russell and McCreary counties.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Specialty sites: <Link href="/marina-websites" className="text-primary">marinas</Link>,{" "}
          <Link href="/fishing-guide-websites" className="text-primary">fishing guides</Link>,{" "}
          <Link href="/food-truck-websites" className="text-primary">food trucks</Link>,{" "}
          <Link href="/restaurant-websites" className="text-primary">restaurants</Link>,{" "}
          <Link href="/contractor-websites" className="text-primary">contractors</Link>.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CopperButton href="/quote">Get a free quote →</CopperButton>
          <GhostButton href="/services">See pricing</GhostButton>
        </div>
      </section>
      <FloatingQuote />
    </>
  );
}

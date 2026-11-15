import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopperButton, Eyebrow, GhostButton } from "@/components/site/ui";
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

const values: [string, string][] = [
  ["Flat pricing, full ownership", "One flat rate for the build. You own the code from day one. No monthly fees to keep it. Host it with me or take it anywhere."],
  ["No agency middlemen", "You talk to the person who builds the site. No account managers, no ticket queues, no overseas handoffs."],
  ["Real local replies", "Text or call me. Stop me at the diner. Weekend answers before a busy Saturday."],
  ["I know your customers", "Folks at the marina, families heading to the lake on Friday, contractors grabbing lunch in town. Sites that talk to them, not generic templates."],
];

const counties: [string, string][] = [
  ["Wayne County", "Monticello, Conley Bottom, Beaver Creek"],
  ["Pulaski County", "Somerset, Burnside, Nancy, Lee's Ford"],
  ["Russell County", "Jamestown, Russell Springs, State Dock, Creelsboro"],
  ["McCreary County", "Whitley City, Pine Knot, Stearns"],
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2">
        <div>
          <Eyebrow>About — Monticello KY website designer</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">A Monticello KY website builder — a neighbor on the lake, not an agency.</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            I live and work right here on Lake Cumberland, doing Lake Cumberland web design for local businesses. When you hire Bluegrass Digital Forge you get <strong className="text-foreground">flat pricing</strong>,{" "}
            <strong className="text-foreground">full ownership</strong> of the site — <strong className="text-foreground">you own the code</strong> — and a neighbor who knows the difference between a Wayne County food truck at the marina and a Somerset storefront.
          </p>
          <p className="mt-4 text-muted-foreground">No lock-in. No platform holding your site. Just a flat rate you can plan on. The site is yours when it’s done.</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Specialty work for <Link href="/marina-websites" className="text-primary">marinas</Link>,{" "}
            <Link href="/fishing-guide-websites" className="text-primary">fishing guides</Link>, and{" "}
            <Link href="/food-truck-websites" className="text-primary">food trucks</Link> — plus{" "}
            <Link href="/work" className="text-primary">Lake Cumberland website demos</Link>.
          </p>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border">
          <Image
            src="/hero-lake-cumberland-golden.jpg"
            alt="Golden hour over Lake Cumberland near Monticello, Kentucky"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 md:grid-cols-2">
        {values.map(([t, b]) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-7">
            <h2 className="font-display text-xl font-bold">{t}</h2>
            <p className="mt-2 text-muted-foreground">{b}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-border bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <Eyebrow>Service area</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Wayne County web design — plus Pulaski, Russell &amp; McCreary counties</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Serving Lake Cumberland towns from Monticello outward: Russell Springs, Jamestown, Burnside, Albany and Whitley City — plus Somerset KY small business websites to the north. Outside the area? Custom work is available anywhere by email.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {counties.map(([c, t]) => (
              <div key={c} className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-display text-lg font-bold">{c}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t}</p>
              </div>
            ))}
          </div>
          <Link href="/service-areas" className="mt-6 inline-block font-semibold text-primary">Full service areas →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-4xl font-bold">Curious what an honest, local build looks like?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CopperButton href="/quote">Start a conversation →</CopperButton>
          <GhostButton href="/work">Browse the live demos</GhostButton>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Not local? Ready-made website templates start at $129 at{" "}
          <a href="https://bluegrasstemplates.com/" target="_blank" rel="noopener noreferrer" className="text-primary">bluegrasstemplates.com</a>.
        </p>
        <p className="mt-8 text-sm text-muted-foreground">Forged in Monticello, Kentucky. Independently owned. No agency middlemen.</p>
      </section>
    </>
  );
}

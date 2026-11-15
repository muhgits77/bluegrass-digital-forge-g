import Link from "next/link";
import type { ReactNode } from "react";

/** Shared building blocks mirrored from the Lovable polish (bluegrass-forge-studio). */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-primary ${className}`}>{children}</p>;
}

export function CopperButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`bg-copper inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 ${className}`}>
      {children}
    </Link>
  );
}

export function GhostButton({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-7 py-3.5 font-display font-semibold text-foreground transition hover:border-primary ${className}`}>
      {children}
    </Link>
  );
}

export function StoreButton({ href = "https://bluegrasstemplates.com/", children, className = "" }: { href?: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`bg-copper inline-flex max-w-full items-center gap-2 rounded-full px-7 py-3.5 font-display font-semibold text-primary-foreground shadow-lg transition hover:brightness-110 ${className}`}>
      {children}
    </a>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-10 pt-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
      {children && <div className="mt-5 max-w-3xl text-lg text-muted-foreground">{children}</div>}
    </section>
  );
}

export function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-primary" aria-hidden>✓</span>
      <span>{children}</span>
    </li>
  );
}

const towns: { label: string; href: string }[] = [
  { label: "Monticello", href: "/service-areas" },
  { label: "Jamestown", href: "/service-areas#jamestown" },
  { label: "Burnside", href: "/service-areas#burnside" },
  { label: "Somerset", href: "/web-design-somerset-ky" },
  { label: "Russell Springs", href: "/web-design-russell-springs-ky" },
  { label: "Nancy", href: "/service-areas#nancy" },
  { label: "Albany", href: "/service-areas#albany" },
  { label: "Creelsboro", href: "/service-areas" },
  { label: "+ McCreary County", href: "/service-areas#whitley-city" },
];

export function TownsBand() {
  return (
    <section className="border-y border-border bg-card/50 py-16">
      <div className="mx-auto max-w-5xl px-5 text-center">
        <Eyebrow>Lake Cumberland service areas</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Built for the towns around the lake.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Marinas, guides, restaurants, and shops from Monticello to Jamestown, Burnside, Russell Springs, Nancy, Albany, and every major ramp town — handcrafted by a neighbor who lives here.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {towns.map((t) => (
            <Link key={t.label} href={t.href} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">
              {t.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-primary">
          <Link href="/marina-websites">Marina sites →</Link>
          <Link href="/fishing-guide-websites">Guide sites →</Link>
          <Link href="/food-truck-websites">Food truck sites →</Link>
          <Link href="/restaurant-websites">Restaurant sites →</Link>
          <Link href="/contractor-websites">Contractor sites →</Link>
          <Link href="/quote">Get a free quote →</Link>
        </div>
      </div>
    </section>
  );
}

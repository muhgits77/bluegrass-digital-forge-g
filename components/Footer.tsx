import Link from "next/link";
import { CONTACT_EMAIL, TEMPLATE_STORE_URL } from "@/lib/constants";

const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "My Work" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/templates", label: "Templates" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/quote", label: "Get a quote" },
];

const specialties = [
  { href: "/marina-websites", label: "Marina websites" },
  { href: "/fishing-guide-websites", label: "Fishing guide websites" },
  { href: "/food-truck-websites", label: "Food truck websites" },
  { href: "/restaurant-websites", label: "Restaurant websites" },
  { href: "/contractor-websites", label: "Contractor websites" },
];

const towns = [
  { label: "Monticello", href: "/service-areas#monticello" },
  { label: "Jamestown", href: "/service-areas#jamestown" },
  { label: "Burnside", href: "/service-areas#burnside" },
  { label: "Somerset", href: "/web-design-somerset-ky" },
  { label: "Russell Springs", href: "/web-design-russell-springs-ky" },
  { label: "Albany", href: "/service-areas#albany" },
  { label: "Nancy", href: "/service-areas#nancy" },
  { label: "Creelsboro", href: "/service-areas" },
  { label: "Whitley City", href: "/service-areas#whitley-city" },
];

/** Footer mirrored from the Lovable polish: three columns, then credit, copyright and legal links. */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">Bluegrass Digital Forge</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Handcrafted websites for Lake Cumberland businesses, built in Monticello, KY.
          </p>
          <a
            href={TEMPLATE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-copper mt-5 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Browse templates ↗
          </a>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-col gap-2 text-sm text-muted-foreground">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm text-muted-foreground">
          <p>Wayne, Pulaski, Russell, McCreary &amp; Clinton counties</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block break-all text-primary">
            {CONTACT_EMAIL}
          </a>
          <a href={TEMPLATE_STORE_URL} target="_blank" rel="noopener noreferrer" className="mt-2 block hover:text-foreground">
            Website templates and calculators ↗
          </a>
          <div className="mt-4 flex flex-col gap-1">
            {specialties.map((s) => (
              <Link key={s.href} href={s.href} className="hover:text-foreground">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <nav aria-label="Towns I serve" className="mx-auto max-w-7xl px-5 pb-8">
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <span className="mr-1 font-semibold uppercase tracking-[0.18em] text-primary">Towns I serve</span>
          {towns.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className="rounded-full border border-border px-3 py-1 hover:border-primary/50 hover:text-foreground"
            >
              {t.label}, KY
            </Link>
          ))}
        </div>
      </nav>
      <div className="space-y-3 px-5 pb-8 text-center text-xs text-muted-foreground">
        <p>Forged by Brian · Monticello, Kentucky</p>
        <p>© {new Date().getFullYear()} Bluegrass Digital Forge</p>
        <div className="flex justify-center gap-5">
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

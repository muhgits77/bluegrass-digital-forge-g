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

/** Footer mirrored from the Lovable polish: three columns, then credit, copyright and legal links. */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">Bluegrass Digital Forge</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Handcrafted websites for Lake Cumberland businesses. Built in Monticello, KY. Flat pricing — you own the code.
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
          <p>Wayne, Pulaski, Russell &amp; McCreary counties</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block break-all text-primary">
            {CONTACT_EMAIL}
          </a>
          <a href={TEMPLATE_STORE_URL} target="_blank" rel="noopener noreferrer" className="mt-2 block hover:text-foreground">
            Website templates from $129, calculators from $99 ↗
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

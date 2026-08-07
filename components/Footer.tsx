import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/constants";

const serviceTowns: { label: string; href: string }[] = [
  { label: "Monticello", href: "/service-areas" },
  { label: "Jamestown", href: "/service-areas#jamestown" },
  { label: "Burnside", href: "/service-areas#burnside" },
  { label: "Somerset", href: "/service-areas" },
  { label: "Russell Springs", href: "/service-areas#russell-springs" },
  { label: "Albany", href: "/service-areas#albany" },
  { label: "Nancy", href: "/service-areas#nancy" },
  { label: "Creelsboro", href: "/service-areas" },
];

export default function Footer() {
  return (
    <footer className="site-footer text-[14.5px]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.jpg"
                alt="Bluegrass Digital Forge logo — Monticello KY website designer"
                width={88}
                height={22}
                quality={70}
                loading="lazy"
                decoding="async"
                sizes="88px"
                className="h-[22px] w-auto object-contain"
              />
              <span className="font-semibold tracking-tight text-[15.5px] text-[var(--text)]">
                Bluegrass Digital Forge
              </span>
            </div>
            <p className="text-[var(--text-muted)] max-w-sm leading-relaxed">
              Handcrafted websites for Lake Cumberland and the South Carolina
              Lowcountry. Flat pricing, fast launches, full ownership — forged in
              Monticello, Kentucky.
            </p>
            <p className="mt-5 text-[12.5px] text-[var(--copper-bright)] tracking-wide font-semibold">
              Forged by Brian · Monticello, Kentucky
            </p>
          </div>

          {/* Navigate */}
          <div className="md:col-span-2">
            <div className="label mb-4">Navigate</div>
            <ul className="space-y-2 text-[var(--text-muted)]">
              {[
                ["/", "Home"],
                ["/work", "My Work"],
                ["/services", "Services & Pricing"],
                ["/templates", "DIY Templates"],
                ["/marina-websites", "Marina Websites"],
                ["/fishing-guide-websites", "Fishing Guide Sites"],
                ["/food-truck-websites", "Food Truck Sites"],
                ["/restaurant-websites", "Restaurant Sites"],
                ["/truckdash", "TruckDash"],
                ["/quote", "Get a Quote"],
                ["/business-cards", "Business Cards"],
                ["/about", "About"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service area — concise */}
          <div className="md:col-span-3">
            <div className="label mb-4">Service Area</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[var(--text-muted)] text-[13.5px]">
              {serviceTowns.map((town) => (
                <li key={town.label}>
                  <Link href={town.href} className="footer-link">
                    {town.label}, KY
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12.5px] text-[var(--text-dim)]">
              + Lake Cumberland ramps &amp; Wayne County
            </p>
            <p className="mt-2 text-[12.5px] text-[var(--copper-bright)] font-medium">
              Also: Charleston SC &amp; Lowcountry
            </p>
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              <Link href="/service-areas" className="footer-link underline">
                Full service areas
              </Link>
              {" · "}
              <Link href="/south-carolina" className="footer-link underline">
                South Carolina
              </Link>
            </p>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <div className="label mb-4">Get in Touch</div>
            <div className="space-y-4 text-[var(--text-muted)]">
              <div>
                <div className="text-[10.5px] uppercase tracking-[1.5px] mb-1 text-[var(--text-dim)]">
                  Email
                </div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="footer-link break-all text-[14px] text-[var(--cream)] font-medium"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <div className="text-[10.5px] uppercase tracking-[1.5px] mb-1 text-[var(--text-dim)]">
                  Based In
                </div>
                <div className="text-[14px]">
                  Monticello, Kentucky 42633
                  <br />
                  Lake Cumberland Region
                </div>
              </div>
            </div>

            <div className="mt-5 border border-[var(--border-strong)] rounded-2xl p-3.5 bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
              <div className="flex gap-3.5 items-start">
                <div className="w-[64px] h-[64px] bg-white rounded-xl p-[5px] flex-shrink-0 ring-1 ring-white/80">
                  <svg
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    className="text-[#020403]"
                    fill="currentColor"
                    aria-hidden
                  >
                    <rect width="54" height="54" fill="white" />
                    <rect x="6" y="6" width="14" height="14" rx="2" />
                    <rect x="9" y="9" width="8" height="8" fill="white" />
                    <rect x="11" y="11" width="4" height="4" />
                    <rect x="34" y="6" width="14" height="14" rx="2" />
                    <rect x="37" y="9" width="8" height="8" fill="white" />
                    <rect x="39" y="11" width="4" height="4" />
                    <rect x="6" y="34" width="14" height="14" rx="2" />
                    <rect x="9" y="37" width="8" height="8" fill="white" />
                    <rect x="11" y="39" width="4" height="4" />
                    <rect x="23" y="7" width="3" height="3" />
                    <rect x="27" y="7" width="3" height="3" />
                    <rect x="23" y="11" width="3" height="3" />
                    <rect x="6" y="23" width="3" height="3" />
                    <rect x="10" y="23" width="3" height="3" />
                    <rect x="14" y="23" width="3" height="3" />
                    <rect x="23" y="23" width="3" height="3" />
                    <rect x="27" y="23" width="3" height="3" />
                    <rect x="31" y="23" width="3" height="3" />
                    <rect x="35" y="23" width="3" height="3" />
                    <rect x="39" y="23" width="3" height="3" />
                    <rect x="43" y="23" width="3" height="3" />
                    <rect x="23" y="31" width="3" height="3" />
                    <rect x="27" y="31" width="3" height="3" />
                    <rect x="31" y="31" width="3" height="3" />
                    <rect x="23" y="35" width="3" height="3" />
                    <rect x="27" y="35" width="3" height="3" />
                    <rect x="31" y="35" width="3" height="3" />
                    <rect x="23" y="43" width="3" height="3" />
                    <rect x="27" y="43" width="3" height="3" />
                    <rect x="31" y="43" width="3" height="3" />
                    <rect x="35" y="43" width="3" height="3" />
                    <rect x="43" y="35" width="3" height="3" />
                    <rect x="43" y="39" width="3" height="3" />
                    <rect x="39" y="39" width="3" height="3" />
                  </svg>
                </div>
                <div className="text-[12.5px] leading-tight pt-0.5">
                  <div className="font-semibold text-white tracking-tight">
                    Scan for my card
                  </div>
                  <div className="text-[var(--text-muted)] mt-0.5">
                    Save contact. Text or call anytime.
                  </div>
                  <div className="mt-1.5 text-[11px] text-[var(--copper)]">
                    Brian · Bluegrass Digital Forge
                    <br />
                    Monticello, KY • 606 area
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12.5px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} Bluegrass Digital Forge · Forged in
            Monticello, Kentucky
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            Independently owned · No agency middlemen ·{" "}
            <span className="text-[var(--teal)] font-medium">You own everything</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

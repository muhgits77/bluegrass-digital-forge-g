import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/constants";

const serviceTowns = [
  "Monticello",
  "Jamestown",
  "Burnside",
  "Somerset",
  "Russell Springs",
  "Albany",
  "Nancy",
  "Creelsboro",
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] text-[14.5px]">
      <div className="mx-auto max-w-7xl px-5 py-12 md:py-14">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3.5">
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
            <p className="mt-4 text-[12.5px] text-[var(--gold)] tracking-wide font-medium">
              Forged by Brian · Monticello, Kentucky
            </p>
          </div>

          {/* Site Navigation */}
          <div className="md:col-span-2">
            <div className="label mb-3.5">Navigate</div>
            <ul className="space-y-[7px] text-[var(--text-muted)]">
              <li>
                <Link href="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="footer-link">
                  My Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="footer-link">
                  Services &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/truckdash" className="footer-link">
                  TruckDash Plans
                </Link>
              </li>
              <li>
                <Link href="/quote" className="footer-link">
                  Get a Quote
                </Link>
              </li>
              <li>
                <Link href="/business-cards" className="footer-link">
                  Business Cards
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Area — concise list */}
          <div className="md:col-span-3">
            <div className="label mb-3.5">Service Area</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[var(--text-muted)] text-[13.5px]">
              {serviceTowns.map((town) => (
                <li key={town}>{town}, KY</li>
              ))}
            </ul>
            <p className="mt-3 text-[12.5px] text-[var(--text-dim)] leading-relaxed">
              + Lake Cumberland ramps &amp; Wayne County
            </p>
            <p className="mt-2 text-[12.5px] text-[var(--warm)]/90 font-medium">
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
            <div className="label mb-3.5">Get in Touch</div>
            <div className="space-y-3.5 text-[var(--text-muted)]">
              <div>
                <div className="text-[10.5px] uppercase tracking-[1.5px] mb-0.5 text-[var(--text-dim)]">
                  Email
                </div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="footer-link break-all text-[14.2px]"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <div className="text-[10.5px] uppercase tracking-[1.5px] mb-0.5 text-[var(--text-dim)]">
                  Based In
                </div>
                <div className="text-[14.2px]">
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
                    className="text-[#050708]"
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
                  <div className="mt-1.5 text-[11px] text-[var(--warm)]">
                    Brian · Bluegrass Digital Forge
                    <br />
                    Monticello, KY • 606 area
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-11 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12.5px] text-[var(--text-muted)]">
          <div>
            © {new Date().getFullYear()} Bluegrass Digital Forge · Forged in
            Monticello, Kentucky
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            Independently owned · No agency middlemen ·{" "}
            <span className="text-[var(--accent-teal)]">You own everything</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a2225] bg-[#050708] text-[14.5px]">
      <div className="mx-auto max-w-7xl px-5 py-11">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3.5">
              <Image 
                src="/logo.jpg" 
                alt="Bluegrass Digital Forge logo — Monticello KY website designer" 
                width={88} 
                height={22} 
                className="h-[22px] w-auto object-contain" 
              />
              <span className="font-semibold tracking-tight text-[15.5px]">Bluegrass Digital Forge</span>
            </div>
            <p className="text-[#8a9599] max-w-sm leading-relaxed">
              Monticello KY website designer. Flat pricing, fast launches, you own everything. Authentic websites for Lake Cumberland businesses: food trucks, restaurants, marinas &amp; shops.
            </p>
            <p className="mt-4 text-[12.5px] text-[#9aa6ad] tracking-wide">Forged by Brian · Monticello, Kentucky</p>
          </div>

          {/* Site Navigation */}
          <div className="md:col-span-2">
            <div className="label mb-3.5">Navigate</div>
            <ul className="space-y-[7px] text-[#8a9599]">
              <li><Link href="/" className="hover:text-[#3ddbd9] transition-colors">Home</Link></li>
              <li><Link href="/work" className="hover:text-[#3ddbd9] transition-colors">My Work</Link></li>
              <li><Link href="/services" className="hover:text-[#3ddbd9] transition-colors">Services &amp; Pricing</Link></li>
              <li><Link href="/quote" className="hover:text-[#3ddbd9] transition-colors">Get a Quote</Link></li>
              <li><Link href="/business-cards" className="hover:text-[#3ddbd9] transition-colors">Business Cards</Link></li>
              <li><Link href="/about" className="hover:text-[#3ddbd9] transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#3ddbd9] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Service Area — all Lake Cumberland boat ramp towns */}
          <div className="md:col-span-3">
            <div className="label mb-3.5">Service Area</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-[3px] text-[#8a9599] text-[13.5px]">
              <li>Monticello, KY</li>
              <li>Albany, KY</li>
              <li>Jamestown, KY</li>
              <li>Burnside, KY</li>
              <li>Somerset, KY</li>
              <li>Russell Springs, KY</li>
              <li>Nancy, KY</li>
              <li>Ferguson, KY</li>
              <li>Creelsboro, KY</li>
              <li className="pt-0.5 sm:col-span-2 text-[12.5px] text-[#7f8c90]">+ Lake Cumberland ramps, marinas &amp; Wayne County</li>
            </ul>
            <p className="mt-3 text-xs text-[#8a9599]">Websites for marinas, guides &amp; businesses near every ramp — <Link href="/service-areas" className="underline hover:text-[#3ddbd9]">full service areas</Link>.</p>
          </div>

          {/* Contact + Professional QR for business cards */}
          <div className="md:col-span-2">
            <div className="label mb-3.5">Get in Touch</div>
            <div className="space-y-3.5 text-[#8a9599]">
              <div>
                <div className="text-[10.5px] uppercase tracking-[1.5px] mb-0.5 text-[#7f8c90]">Email</div>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#3ddbd9] transition-colors break-all text-[14.2px]">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <div className="text-[10.5px] uppercase tracking-[1.5px] mb-0.5 text-[#7f8c90]">Based In</div>
                <div className="text-[14.2px]">Monticello, Kentucky 42633<br />Lake Cumberland Region</div>
              </div>
            </div>

            {/* Professional QR area — ready for business cards / print */}
            <div className="mt-5 border border-[#243530] rounded-2xl p-3.5 bg-[#0a0c0f]">
              <div className="flex gap-3.5 items-start">
                <div className="w-[64px] h-[64px] bg-white rounded-xl p-[5px] flex-shrink-0 ring-1 ring-white/80">
                  {/* Clean, scannable QR placeholder — encodes contact concept (email + area) */}
                  <svg width="54" height="54" viewBox="0 0 54 54" className="text-[#050708]" fill="currentColor">
                    <rect width="54" height="54" fill="white"/>
                    {/* Top left finder */}
                    <rect x="6" y="6" width="14" height="14" rx="2"/>
                    <rect x="9" y="9" width="8" height="8" fill="white"/>
                    <rect x="11" y="11" width="4" height="4"/>
                    {/* Top right finder */}
                    <rect x="34" y="6" width="14" height="14" rx="2"/>
                    <rect x="37" y="9" width="8" height="8" fill="white"/>
                    <rect x="39" y="11" width="4" height="4"/>
                    {/* Bottom left finder */}
                    <rect x="6" y="34" width="14" height="14" rx="2"/>
                    <rect x="9" y="37" width="8" height="8" fill="white"/>
                    <rect x="11" y="39" width="4" height="4"/>
                    {/* Data modules — simple but realistic pattern */}
                    <rect x="23" y="7" width="3" height="3"/><rect x="27" y="7" width="3" height="3"/><rect x="23" y="11" width="3" height="3"/>
                    <rect x="6" y="23" width="3" height="3"/><rect x="10" y="23" width="3" height="3"/><rect x="14" y="23" width="3" height="3"/>
                    <rect x="23" y="23" width="3" height="3"/><rect x="27" y="23" width="3" height="3"/><rect x="31" y="23" width="3" height="3"/>
                    <rect x="35" y="23" width="3" height="3"/><rect x="39" y="23" width="3" height="3"/><rect x="43" y="23" width="3" height="3"/>
                    <rect x="23" y="31" width="3" height="3"/><rect x="27" y="31" width="3" height="3"/><rect x="31" y="31" width="3" height="3"/>
                    <rect x="23" y="35" width="3" height="3"/><rect x="27" y="35" width="3" height="3"/><rect x="31" y="35" width="3" height="3"/>
                    <rect x="23" y="43" width="3" height="3"/><rect x="27" y="43" width="3" height="3"/><rect x="31" y="43" width="3" height="3"/><rect x="35" y="43" width="3" height="3"/>
                    <rect x="43" y="35" width="3" height="3"/><rect x="43" y="39" width="3" height="3"/><rect x="39" y="39" width="3" height="3"/>
                  </svg>
                </div>
                <div className="text-[12.5px] leading-tight pt-0.5">
                  <div className="font-semibold text-white tracking-tight">Scan for my card</div>
                  <div className="text-[#9aa6ad] mt-0.5">Save contact. Text or call anytime.</div>
                  <div className="mt-1.5 text-[11px] text-[#c17a5a]">Brian · Bluegrass Digital Forge<br />Monticello, KY • 606 area</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-11 pt-6 border-t border-[#1a2225] flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12.5px] text-[#9aa6ad]">
          <div>© {new Date().getFullYear()} Bluegrass Digital Forge · Forged in Monticello, Kentucky</div>
          <div className="flex items-center gap-2">Independently owned · No agency middlemen · <span className="text-[#3ddbd9]">You own everything</span></div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a2225] bg-[#050708] text-sm">
      <div className="mx-auto max-w-7xl px-5 py-11">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3.5">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#14b8a6] text-[#050708]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <span className="font-semibold tracking-tight text-[15px]">Bluegrass Digital Forge</span>
            </div>
            <p className="text-[#8a9599] max-w-sm leading-relaxed">
              Websites that win more customers for Lake Cumberland businesses. Flat pricing, fast launches, full ownership. Handcrafted locally in Monticello for food trucks, restaurants, shops &amp; neighbors around the lake.
            </p>
            <p className="mt-4 text-xs text-[#8a9599] tracking-wide">Forged by Brian · Monticello, Kentucky</p>
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

          {/* Service Area */}
          <div className="md:col-span-3">
            <div className="label mb-3.5">Service Area</div>
            <ul className="space-y-[4px] text-[#8a9599]">
              <li>Monticello, KY</li>
              <li>Albany, KY</li>
              <li>Somerset, KY</li>
              <li>Jamestown, KY</li>
              <li>Burnside, KY</li>
              <li>Wayne County &amp; Lake Cumberland</li>
            </ul>
            <p className="mt-3.5 text-xs text-[#8a9599]">Kentucky businesses welcome — <Link href="/contact" className="underline hover:text-[#3ddbd9]">reach out</Link>.</p>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <div className="label mb-3.5">Get in Touch</div>
            <div className="space-y-4 text-[#8a9599]">
              <div>
                <div className="text-[10px] uppercase tracking-[1.5px] mb-1 text-[#6f7c82]">Email</div>
                <a href="mailto:BluegrassDigitalForge@protonmail.com" className="hover:text-[#3ddbd9] transition-colors break-all text-sm">
                  BluegrassDigitalForge@protonmail.com
                </a>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[1.5px] mb-1 text-[#6f7c82]">Based In</div>
                <div className="text-sm">Monticello, Kentucky 42633<br />Lake Cumberland Region</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[1.5px] mb-1 text-[#6f7c82]">Hours</div>
                <div className="text-sm">Mon–Fri 9a–6p ET<br />Weekend replies welcome</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-11 pt-6 border-t border-[#1a2225] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-[#8a9599]">
          <div>© {new Date().getFullYear()} Bluegrass Digital Forge · Forged in Monticello, Kentucky</div>
          <div className="flex items-center gap-2">Independently owned · No agency middlemen · <span className="text-[#3ddbd9]">You own everything</span></div>
        </div>
      </div>
    </footer>
  );
}

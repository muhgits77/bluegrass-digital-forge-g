import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import BrandingCard from "@/components/BrandingCard";
import ServiceAreas from "@/components/ServiceAreas";
import ReferralDiscountNote from "@/components/ReferralDiscountNote";

export const metadata: Metadata = {
  title: "Monticello KY & Charleston SC Website Designer Pricing | Lake Cumberland & Lowcountry Business Websites",
  description: "Flat pricing from the Monticello KY website designer, now serving Charleston SC, Summerville & South Carolina Lowcountry. Starter Sites $1,200 and Business Suites for Lake Cumberland & Lowcountry businesses. Charleston food truck websites, restaurant sites included. You own the code.",
  keywords: ["Monticello KY website designer", "Lake Cumberland business websites", "food truck website Kentucky", "Wayne County web design", "Monticello KY web design pricing", "Web Design Charleston SC", "Charleston Food Truck Website", "Summerville Small Business Website", "Lowcountry Web Design"],
};

const starterFeatures = [
  "Up to 4 pages (Home, Menu/Services, About, Contact)",
  "Mobile-first design",
  "Tap-to-call / directions / contact form",
  "Domain & hosting setup",
  "Google Business Profile basics",
  "30 days of post-launch tweaks included",
];

const businessFeatures = [
  "Up to 10 pages fully custom",
  "Online menu/schedule/gallery",
  "Booking/lead forms",
  "Google Business + local SEO",
  "Review collection + analytics",
  "Photo touch-ups & branding",
  "Branded email/social graphics",
  "60 days post-launch tweaks",
];

const brandingAddons = [
  { title: "Business Card Design Only", price: "$150", desc: "Custom digital business card files, print-ready. You own the files." },
  { title: "Cards + 250 Printed", price: "$250", desc: "Design plus 250 premium printed cards delivered to your door." },
  { title: "Cards + 500 Printed", price: "$300", desc: "Design plus 500 premium printed cards — best value for local businesses." },
  { title: "Branding Starter", price: "$450", desc: "Logo refinement, color palette, business cards, email signature." },
  { title: "Full Branding Kit", price: "$750", desc: "Logo design, complete brand kit, printed cards, social templates, email signature." },
];

const careBullets = [
  "Fast, secure hosting + SSL",
  "Uptime monitoring & monthly backups",
  "Small content updates anytime (text, photos, menus)",
  "Plugin & security updates",
  "Priority email response",
  "Cancel anytime — no contract",
];

const faqs = [
  { q: "How long does a site take?", a: "Most Starter Sites launch in about 2 weeks. Business Suites usually 3–5 weeks once we've got photos and content." },
  { q: "Do I have to use your hosting?", a: "Nope. The $79/mo care plan is optional. You can host wherever you want — direct hosting usually runs $10–20/month from the provider." },
  { q: "Can I update the site myself?", a: "Absolutely. I'll show you how to update content, photos, and menus on a quick screen-share. Or let me handle it on the care plan." },
  { q: "What if I just need a one-page site?", a: "If a single page is genuinely all you need, a Starter Site starting at $1,200 covers it with room to spare." },
  { q: "Do you work outside Monticello?", a: "Most clients are around Wayne County and Lake Cumberland, but I'm happy to work with any small business in Kentucky." },
  { q: "What if I just need a logo or business cards?", a: "Branding add-ons can be bought on their own — no website required. Visit the business cards page." },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">SERVICES &amp; PRICING — MONTICELLO KY WEBSITE DESIGNER</div>
        <h1 className="section-title tracking-tight mt-2">Monticello KY Website Designer — Flat Pricing for Lake Cumberland Business Websites</h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">Transparent one-time pricing from the local Monticello KY website designer. Starter Sites from $1,200 and Business Suites for Lake Cumberland &amp; Wayne County businesses. Food truck website Kentucky, restaurant websites, marina sites included. You own the code forever.</p>
        <p className="text-[14.5px] text-[#9aa6ad] mt-1">Handcrafted in Monticello for Wayne County and Lake Cumberland region — serving businesses near the ramps at Conley Bottom, State Dock, Burnside, Lee’s Ford, Creelsboro and beyond. Also serving Charleston SC, Summerville, North Charleston and Lowcountry businesses with the same premium web design.</p>
      </div>

      {/* Two Big Website Cards — updated layout & copy per specs. Premium dark with warm amber accents. */}
      <div className="mt-9 grid lg:grid-cols-2 gap-5">
        {/* Starter Sites */}
        <div className="pricing-card rounded-3xl p-8 md:p-9 flex flex-col border border-[#1a2225]">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Starter Sites</h3>
            <p className="text-[#8a9599] mt-1">Food trucks, barbers &amp; small shops</p>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums">$1,200</span>
            <span className="text-[14px] text-[#9aa6ad]">starting at • one-time</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-[#f4a261]">FLAT SCOPE-BASED PRICING</div>

          <ul className="mt-7 space-y-3 text-[15px]">
            {starterFeatures.map((f, i) => (
              <li key={i} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0 text-[#c17a5a]" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Link href="/quote" className="btn btn-secondary w-full">Start a Starter Site →</Link>
            <p className="text-center text-[12.5px] text-[#9aa6ad] mt-3">
              See it live: <a href="https://smoky-wheels.lovable.app" target="_blank" className="underline hover:text-[#f4a261]">Smoky Wheels demo</a>
            </p>
          </div>
        </div>

        {/* Business Suites — highlighted as MOST POPULAR with warm amber glow/border */}
        <div className="pricing-card popular rounded-3xl p-8 md:p-9 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-3xl font-semibold tracking-tight">Business Suites</h3>
            <span className="badge">MOST POPULAR</span>
          </div>
          <p className="text-[#8a9599]">Restaurants, shops &amp; co-ops</p>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums">$2,500</span>
            <span className="text-[14px] text-[#9aa6ad]">starting at • one-time</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-[#f4a261]">FLAT SCOPE-BASED PRICING</div>
          <p className="mt-1.5 text-[12.5px] text-[#9aa6ad]">Most local businesses complete their suite between $2,500–$4,500 depending on custom needs.</p>

          <ul className="mt-7 space-y-3 text-[15px]">
            {businessFeatures.map((f, i) => (
              <li key={i} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0 text-[#c17a5a]" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Link href="/quote" className="btn btn-primary w-full">Start a Business Suite →</Link>
            <p className="text-center text-[12.5px] text-[#9aa6ad] mt-3">
              See it live: <a href="https://hickory-forge-steakhouse.lovable.app" target="_blank" className="underline hover:text-[#f4a261]">Hickory Forge demo</a>
            </p>
          </div>
        </div>
      </div>

      <ReferralDiscountNote
        align="center"
        className="mt-6 mx-auto max-w-2xl rounded-xl border border-[#1f282b]/80 bg-[#0a0c0f]/60 px-4 py-2.5"
      />

      <p className="text-[14.5px] text-center mt-5 text-[#9aa6ad]">Not sure which one? <Link href="/quote" className="underline hover:text-white">Tell me about your business</Link> — I&apos;ll recommend the right fit for your Lake Cumberland spot. Need a <Link href="/food-truck-websites" className="underline hover:text-white">food truck website Kentucky</Link>? We also serve Charleston SC and the Lowcountry — <Link href="/south-carolina" className="underline hover:text-[#f4a261]">see Charleston web design services</Link>.</p>

      {/* Additive food truck emphasis block on services page */}
      <div className="mt-10 rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-7">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">FOR FOOD TRUCK OWNERS</div>
        <h3 className="font-semibold text-xl tracking-tight">Lead with your location: easy on-the-fly updates for daily spots, festivals, and events.</h3>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">The biggest perk is a simple mobile dashboard that lets you change “Where We Are Today” in seconds — right from your phone while you’re parked or between services. Starter Sites and Business Suites for food trucks put real-time location and hours front and center so customers always know where to find you. Add festival calendar, online ordering, beautiful food photography, and instant menu updates. Perfect for Lake Cumberland BBQ and taco trucks — and Charleston SC / Lowcountry trucks at the Battery, waterfront markets, Firefly, or the Lowcountry Food Truck Festival.</p>
        <p className="mt-3"><Link href="/food-truck-websites" className="underline hover:text-[#3ddbd9] text-sm">See dedicated food truck website details and Lowcountry examples →</Link></p>
      </div>

      {/* TruckDash Web App — tiered product pricing (separate from website packages) */}
      <div className="mt-10 rounded-3xl border border-[#f4a261]/30 bg-[#0a0c0f] p-7 md:p-9">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">WEB APP — TRUCKDASH</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">TruckDash for Kentucky food truckers</h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3] max-w-2xl">
          Dashboard, schedule manager, flyer studio, and one-tap publish. Honest pricing, no hidden fees, lifetime updates for your purchase. Referral discount does not apply to Web Apps.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4 max-w-xl">
          <div className="rounded-2xl border border-[#1f282b] bg-[#050708]/80 p-4">
            <div className="text-sm text-[#8a9599]">Starter</div>
            <div className="text-2xl font-semibold tabular-nums tracking-tight">$1,497</div>
            <p className="text-[13px] text-[#9aa6ad] mt-1">Core dashboard, basic flyer studio, offline mode</p>
          </div>
          <div className="rounded-2xl border border-[#c17a5a]/50 bg-[#050708]/80 p-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#8a9599]">Pro</span>
              <span className="badge text-[9px] py-px">MOST POPULAR</span>
            </div>
            <div className="text-2xl font-semibold tabular-nums tracking-tight">$2,497</div>
            <p className="text-[13px] text-[#d4a373] mt-1">Launch: first 10 trucks get Pro for $1,997</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/truckdash" className="btn btn-primary">
            Choose Your TruckDash Plan →
          </Link>
          <Link href="/quote?plan=pro" className="btn btn-secondary">
            Buy Pro →
          </Link>
        </div>
      </div>

      {/* Regional Pricing — additive, honest, clean language. Kentucky as base + SC Lowcountry 25-35% higher. Two-column format. */}
      <div className="mt-10">
        <div className="max-w-3xl mb-6">
          <div className="label tracking-[1.5px]">REGIONAL PRICING</div>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">Honest rates by service area.</h2>
          <p className="mt-2 text-[15px] text-[#9aa6ad]">Kentucky prices are our base. South Carolina Lowcountry rates reflect local market conditions for premium coastal work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Kentucky Base */}
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="text-[#c17a5a] text-xs uppercase tracking-[1.5px] mb-1">KENTUCKY — BASE RATES</div>
            <div className="font-semibold tracking-tight">Lake Cumberland / Monticello area</div>
            <div className="mt-4 space-y-3 text-[15px]">
              <div className="flex justify-between items-baseline">
                <span>Starter Sites</span>
                <span className="font-semibold tabular-nums text-xl">$1,200</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>Business Suites</span>
                <span className="font-semibold tabular-nums text-xl">$2,500</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-[#8a9599]">Flat one-time pricing for our core Kentucky service area.</p>
          </div>

          {/* SC Lowcountry */}
          <div className="rounded-2xl border border-[#243530] bg-[#0a0c0f] p-6">
            <div className="text-[#f4a261] text-xs uppercase tracking-[1.5px] mb-1">SOUTH CAROLINA LOWCOUNTRY</div>
            <div className="font-semibold tracking-tight">Premium coastal service area (adjusted for local market rates)</div>
            <div className="mt-4 space-y-3 text-[15px]">
              <div className="flex justify-between items-baseline">
                <span>Starter Sites</span>
                <span className="font-semibold tabular-nums text-xl">$1,550</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span>Business Suites</span>
                <span className="font-semibold tabular-nums text-xl">$3,250</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-[#8a9599]">~25–30% higher to match premium coastal market rates.</p>
          </div>
        </div>
        <p className="mt-4 text-[13px] text-[#9aa6ad]">All projects include the same high-quality handcrafted work and full code ownership. Final quote depends on scope.</p>
      </div>

      {/* SERVICE AREAS — full list of boat ramp towns + marinas for local SEO and conversion */}
      <ServiceAreas />

      {/* Branding Add-ons */}
      <div className="branding-addons">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-y-3 gap-x-8 mb-8 md:mb-10">
          <div className="max-w-xl">
            <div className="label tracking-[1.5px]">BRANDING ADD-ONS</div>
            <h2 className="text-3xl tracking-tight font-semibold mt-2">Look the part, everywhere.</h2>
          </div>
          <p className="text-[#9aa6ad] max-w-md text-[14.5px] leading-relaxed lg:text-right lg:pb-0.5">Business cards, logo work, and full branding kits. Add to any website, or buy on their own.</p>
        </div>

        <div className="branding-addons-grid">
          {brandingAddons.map((b, idx) => (
            <BrandingCard key={idx} title={b.title} price={b.price} description={b.desc} />
          ))}
        </div>

        <div className="mt-5">
          <Link href="/business-cards" className="btn btn-secondary text-sm">Get a Business Card Quote →</Link>
        </div>
        <p className="text-[12.5px] text-[#9aa6ad] mt-2">Deposit required to begin design work. You own everything once paid in full.</p>
      </div>

      {/* Optional Care Plan — $79/mo full benefits */}
      <div className="mt-16 care-card rounded-3xl p-8 md:p-10 border border-[#1a2225]">
        <div className="max-w-2xl">
          <div className="label tracking-[1.5px]">OPTIONAL CARE PLAN</div>
          <h2 className="text-3xl tracking-tight font-semibold mt-1">I&apos;ll keep it running. You run your business.</h2>
          <p className="mt-2 text-[#8a9599]">Optional hosting + maintenance so you never have to think about it. Cancel anytime, no contract.</p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-x-8 gap-y-4">
          <div>
            <span className="text-[42px] font-semibold tracking-[-2px] tabular-nums">$79</span>
            <span className="text-xl text-[#8a9599]">/month</span>
            <div className="text-xs text-[#3ddbd9] tracking-widest mt-0.5">TOTALLY OPTIONAL — HOST IT WHEREVER YOU WANT.</div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-[14.5px] text-[#c8cfd3] flex-1">
            {careBullets.map((b, i) => (
              <li key={i} className="flex gap-2.5"><Check size={16} className="check mt-1" /> {b}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h3 className="font-semibold text-xl tracking-tight mb-6">FAQ</h3>
        <div className="divide-y divide-[#1a2225] max-w-3xl">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {faq.q}
                <span className="text-[#3ddbd9] group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-2 text-[#8a9599] pr-8 text-[15px]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h3 className="text-xl font-semibold tracking-tight">Not sure which one fits?</h3>
        <p className="text-[#8a9599] mt-1">Tell me about your Monticello or Lake Cumberland business — honest recommendation, even if Starter is all you need.</p>
        <div className="mt-5 flex gap-3 justify-center flex-wrap">
          <Link href="/quote" className="btn btn-primary">Get a Free Recommendation →</Link>
          <Link href="/work" className="btn btn-secondary">See real demos first</Link>
        </div>
      </div>
    </div>
  );
}

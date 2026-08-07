import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import BrandingCard from "@/components/BrandingCard";
import ServiceAreas from "@/components/ServiceAreas";
import ReferralDiscountNote from "@/components/ReferralDiscountNote";
import DemoLiveLink from "@/components/DemoLiveLink";
import { canonicalUrl } from "@/lib/constants";
import { loadLivePublicDemosCatalog } from "@/lib/demos";

export const metadata: Metadata = {
  title:
    "Monticello KY Website Designer Pricing | Lake Cumberland Business Websites",
  description:
    "Transparent flat pricing from the Monticello KY website designer. Starter Sites from $1,200 and Business Suites from $2,500 for Lake Cumberland & Wayne County businesses. You own the code — full ownership forever.",
  keywords: [
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "food truck website Kentucky",
    "Wayne County web design",
    "Monticello KY web design pricing",
    "Web Design Charleston SC",
    "Charleston Food Truck Website",
    "Summerville Small Business Website",
    "Lowcountry Web Design",
  ],
  alternates: { canonical: canonicalUrl("/services") },
  openGraph: {
    title:
      "Monticello KY Website Designer Pricing | Lake Cumberland Business Websites",
    description:
      "Transparent flat pricing from the Monticello KY website designer. Starter Sites from $1,200 and Business Suites from $2,500. You own the code — full ownership forever.",
    url: canonicalUrl("/services"),
  },
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
  { q: "Do you work outside Monticello?", a: "Most clients are around Wayne County and Lake Cumberland — Jamestown, Burnside, Nancy, Russell Springs, Albany, Somerset, and the ramp towns in between. Happy to work with any small business in Kentucky, plus Charleston SC and the Lowcountry." },
  { q: "Do I own the website when it’s done?", a: "Yes. Full ownership of the site and code after payment. Flat one-time pricing for the build — no monthly retainer required to keep what you paid for. Optional care plan if you want ongoing help; host it yourself if you don’t." },
  { q: "What if I just need a logo or business cards?", a: "Branding add-ons can be bought on their own — no website required. Visit the business cards page." },
];

export default async function Services() {
  // Live admin catalog — every “live demo” CTA uses forge_demos.href (not hard-coded URLs)
  const { demos } = await loadLivePublicDemosCatalog();
  const bySlug = new Map(demos.map((d) => [d.slug.toLowerCase(), d]));
  const fiesta = bySlug.get("fiesta-taqueria");
  const hickory = bySlug.get("hickory-forge-steakhouse");

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">SERVICES &amp; PRICING — MONTICELLO KY WEBSITE DESIGNER</div>
        <h1 className="section-title tracking-tight mt-2">Monticello KY Website Designer — Flat Pricing &amp; Full Ownership for Lake Cumberland Business Websites</h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">Transparent <strong className="text-[#c8cfd3] font-medium">flat rate</strong> pricing — one-time, no surprises. <strong className="text-[#c8cfd3] font-medium">Kentucky base rates:</strong> Starter Sites $1,200 · Business Suites from $2,500 for food trucks, restaurants, marinas, and shops from Monticello to Jamestown, Burnside, Russell Springs, Nancy, and Albany. <strong className="text-[#c8cfd3] font-medium">South Carolina Lowcountry:</strong> Starter Sites $1,550 · Business Suites $3,250. When we&apos;re done, <strong className="text-[#c8cfd3] font-medium">you own the code</strong> with full ownership forever.</p>
        <p className="text-[14.5px] text-[#9aa6ad] mt-1">Handcrafted in Monticello for Lake Cumberland. Also serving{" "}
          <Link href="/south-carolina" className="underline hover:text-[#f4a261]">Charleston SC web design</Link>,{" "}
          <Link href="/south-carolina" className="underline hover:text-[#f4a261]">Lowcountry food truck websites</Link>, and{" "}
          <Link href="/south-carolina" className="underline hover:text-[#f4a261]">South Carolina Lowcountry websites</Link>.</p>
      </div>

      {/* Two Big Website Cards — updated layout & copy per specs. Premium dark with warm amber accents. */}
      <p className="mt-8 max-w-2xl text-[15px] text-[#9aa6ad]">
        Every package uses clear <strong className="text-[#c8cfd3] font-medium">flat pricing</strong> — a one-time flat rate based on scope. When the project is paid,{" "}
        <strong className="text-[#c8cfd3] font-medium">you own the code</strong> and get full ownership of the site. No subscriptions required to keep your build.
      </p>
      <div className="mt-5 grid lg:grid-cols-2 gap-5">
        {/* Starter Sites — Kentucky base rates */}
        <div className="pricing-card rounded-3xl p-8 md:p-9 flex flex-col">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Starter Sites</h3>
            <p className="text-[var(--text-muted)] mt-1">Food trucks, barbers &amp; small shops</p>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums text-[var(--cream)]">$1,200</span>
            <span className="text-[14px] text-[var(--text-muted)]">starting at • one-time</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-[var(--copper-bright)]">KENTUCKY BASE RATES · FLAT PRICING</div>

          <ul className="mt-7 space-y-3 text-[15px]">
            {starterFeatures.map((f, i) => (
              <li key={i} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0 text-[var(--copper)]" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Link href="/quote" className="btn btn-secondary w-full">Start a Starter Site →</Link>
            <p className="text-center text-[12.5px] text-[var(--text-muted)] mt-3">
              See it live:{" "}
              <DemoLiveLink
                demo={fiesta}
                className="underline hover:text-[var(--copper-bright)]"
              >
                {fiesta?.title || "Food truck"} demo
              </DemoLiveLink>
            </p>
          </div>
        </div>

        {/* Business Suites — MOST POPULAR · Kentucky base rates */}
        <div className="pricing-card popular rounded-3xl p-8 md:p-9 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-3xl font-semibold tracking-tight">Business Suites</h3>
            <span className="badge">MOST POPULAR</span>
          </div>
          <p className="text-[var(--text-muted)]">Restaurants, shops &amp; co-ops</p>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums text-[var(--cream)]">$2,500</span>
            <span className="text-[14px] text-[var(--text-muted)]">starting at • one-time</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-[var(--copper-bright)]">KENTUCKY BASE RATES · FLAT PRICING</div>
          <p className="mt-1.5 text-[12.5px] text-[var(--text-muted)]">Most local Kentucky businesses complete their suite between $2,500–$4,500 depending on custom needs.</p>

          <ul className="mt-7 space-y-3 text-[15px]">
            {businessFeatures.map((f, i) => (
              <li key={i} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0 text-[var(--copper)]" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Link href="/quote" className="btn btn-primary w-full">Start a Business Suite →</Link>
            <p className="text-center text-[12.5px] text-[var(--text-muted)] mt-3">
              See the example:{" "}
              <Link href="/work/hickory-forge-steakhouse" className="underline hover:text-[var(--copper-bright)]">
                Hickory Forge write-up
              </Link>
              {" · "}
              <DemoLiveLink
                demo={hickory}
                className="underline hover:text-[var(--copper-bright)]"
              >
                live demo
              </DemoLiveLink>
            </p>
          </div>
        </div>
      </div>

      <ReferralDiscountNote
        align="center"
        className="mt-6 mx-auto max-w-2xl rounded-xl border border-[#1f282b]/80 bg-[#0a0c0f]/60 px-4 py-2.5"
      />

      <p className="text-[14.5px] text-center mt-5 text-[#9aa6ad]">Not sure which one? <Link href="/quote" className="underline hover:text-white">Tell me about your business</Link> — I&apos;ll recommend the right fit for your Lake Cumberland spot. Need a <Link href="/food-truck-websites" className="underline hover:text-white">food truck website Kentucky</Link>? We also build <Link href="/south-carolina" className="underline hover:text-[#f4a261]">Lowcountry food truck websites</Link> and <Link href="/south-carolina" className="underline hover:text-[#f4a261]">Charleston SC web design</Link> for restaurants and small businesses.</p>

      {/* Vertical specialty teasers */}
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">MARINAS</div>
          <h3 className="font-semibold text-lg tracking-tight">Docks that book slips &amp; rentals online.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">
            Burnside, Lee&apos;s Ford, State Dock, Conley Bottom &amp; more. Flat pricing. You own the code.{" "}
            <Link href="/marina-websites" className="text-[var(--gold-light)] underline hover:text-white">
              Marina websites →
            </Link>
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">FISHING GUIDES</div>
          <h3 className="font-semibold text-lg tracking-tight">Striper &amp; bass sites that get bookings.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">
            Trip pages, captain bios, trophy galleries — built for Lake Cumberland captains.{" "}
            <Link href="/fishing-guide-websites" className="text-[var(--gold-light)] underline hover:text-white">
              Guide websites →
            </Link>
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">FOOD TRUCKS</div>
          <h3 className="font-semibold text-lg tracking-tight">“Where We Are Today” from your phone.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">
            Real-time location, menus &amp; festivals — Kentucky &amp; Lowcountry trucks.{" "}
            <Link href="/food-truck-websites" className="text-[var(--gold-light)] underline hover:text-white">
              Food truck websites →
            </Link>
          </p>
        </div>
      </div>

      {/* TruckDash — low-pressure mention (separate from website packages) */}
      <div className="mt-10 rounded-3xl border border-[#1f282b] bg-[#0a0c0f] p-7 md:p-9">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">WEB APP — TRUCKDASH</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Need more than a website?</h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3] max-w-2xl">
          Ask about TruckDash — our food-truck command center for schedules, live location sharing, and flyer tools. Custom quote; referral discount does not apply to Web Apps.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Ask about TruckDash →
          </Link>
          <Link href="/truckdash" className="btn btn-secondary">
            Learn more
          </Link>
        </div>
      </div>

      {/* Regional Pricing — additive, honest, clean language. Kentucky as base + SC Lowcountry 25-35% higher. Two-column format. */}
      <div className="mt-10">
        <div className="max-w-3xl mb-6">
          <div className="label tracking-[1.5px]">REGIONAL PRICING</div>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">Honest flat pricing by service area — full ownership either way.</h2>
          <p className="mt-2 text-[15px] text-[#9aa6ad]">Kentucky prices are our base for Lake Cumberland towns like Monticello, Albany, and Russell Springs.{" "}
            <Link href="/south-carolina" className="underline hover:text-[#f4a261]">South Carolina Lowcountry websites</Link>{" "}
            reflect local market conditions for premium coastal work — same craft, same full ownership.</p>
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

      {/* Compact service-area teaser — full grid on /service-areas */}
      <ServiceAreas variant="compact" />

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
        <p className="text-[#8a9599] mt-1">Tell me about your Monticello, Jamestown, Burnside, or Lake Cumberland business — honest recommendation, even if Starter is all you need. Flat rate, full ownership.</p>
        <div className="mt-5 flex gap-3 justify-center flex-wrap">
          <Link href="/quote" className="btn btn-primary">Get a Free Recommendation →</Link>
          <Link href="/work" className="btn btn-secondary">See real demos first</Link>
        </div>
      </div>
    </div>
  );
}

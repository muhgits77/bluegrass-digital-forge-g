import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import BrandingCard from "@/components/BrandingCard";
import ServiceAreas from "@/components/ServiceAreas";
import ReferralDiscountNote from "@/components/ReferralDiscountNote";
import DemoLiveLink from "@/components/DemoLiveLink";
import TemplateStoreSection from "@/components/TemplateStoreSection";
import { canonicalUrl } from "@/lib/constants";
import { loadLivePublicDemosCatalog } from "@/lib/demos";

export const metadata: Metadata = {
  title: "Web Design Pricing – Monticello KY & Lake Cumberland",
  description: "Flat-price websites for Wayne, Pulaski, Russell & McCreary County businesses. Starter Sites from $1,200, Business Suites $2,500–$4,500. No monthly lock-in.",
  keywords: ["Monticello KY website designer", "Lake Cumberland business websites", "food truck website Kentucky", "Wayne County web design", "Monticello KY web design pricing", "Somerset KY web design", "Russell Springs KY web design", "McCreary County web design"],
  alternates: { canonical: canonicalUrl("/services") },
  openGraph: {
    title: "Web Design Pricing – Monticello KY & Lake Cumberland",
    description: "Flat-price websites for Wayne, Pulaski, Russell & McCreary County businesses. Starter Sites from $1,200, Business Suites $2,500–$4,500. No monthly lock-in.",
    url: canonicalUrl("/services"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
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
  { q: "Do you work outside Monticello?", a: "Most clients are around Wayne County and Lake Cumberland — Jamestown, Burnside, Nancy, Russell Springs, Albany, Somerset, and the ramp towns in between. Whitley City and McCreary County too. Outside the area? Custom work is available anywhere by email, or grab a ready-made template from bluegrasstemplates.com." },
  { q: "Do I own the website when it’s done?", a: "Yes. Full ownership of the site and code after payment. Flat one-time pricing for the build — no monthly retainer required to keep what you paid for. Optional care plan if you want ongoing help; host it yourself if you don’t." },
  { q: "What if I just need a logo or business cards?", a: "Branding add-ons can be bought on their own — no website required. Visit the business cards page." },
];

export default async function Services() {
  const { demos } = await loadLivePublicDemosCatalog();
  const bySlug = new Map(demos.map((d) => [d.slug.toLowerCase(), d]));
  const fiesta = bySlug.get("fiesta-taqueria");
  const hickory = bySlug.get("hickory-forge-steakhouse");

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">SERVICES & PRICING — MONTICELLO KY WEBSITE DESIGNER</div>
        <h1 className="section-title tracking-tight mt-2">Website Services & Flat Pricing</h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">Flat-rate pricing. One-time. No surprises. When we're done, you own the code.</p>
        <p className="text-[14.5px] text-[#9aa6ad] mt-1">Kentucky base rates: Starter Sites $1,200 · Business Suites $2,500–$4,500. Handcrafted in Monticello for the Lake Cumberland area: Wayne, Pulaski, Russell & McCreary counties.</p>
      </div>

      <p className="mt-8 max-w-2xl text-[15px] text-[#9aa6ad]">
        Every package uses clear <strong className="text-[#c8cfd3] font-medium">flat pricing</strong> — a one-time flat rate based on scope. When the project is paid,{" "}
        <strong className="text-[#c8cfd3] font-medium">you own the code</strong> and get full ownership of the site. No subscriptions required to keep your build.
      </p>
      <div className="mt-5 grid lg:grid-cols-2 gap-5">
        <div className="pricing-card rounded-3xl p-8 md:p-9 flex flex-col">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Starter Sites</h3>
            <p className="text-[var(--text-muted)] mt-1">Food trucks, barbers & small shops</p>
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
              <DemoLiveLink demo={fiesta} className="underline hover:text-[var(--copper-bright)]">{fiesta?.title || "Food truck"} demo</DemoLiveLink>
            </p>
          </div>
        </div>
        <div className="pricing-card popular rounded-3xl p-8 md:p-9 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-3xl font-semibold tracking-tight">Business Suites</h3>
            <span className="badge">MOST POPULAR</span>
          </div>
          <p className="text-[var(--text-muted)]">Restaurants, shops & co-ops</p>
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
              <Link href="/work/hickory-forge-steakhouse" className="underline hover:text-[var(--copper-bright)]">Hickory Forge write-up</Link>
              {" · "}
              <DemoLiveLink demo={hickory} className="underline hover:text-[var(--copper-bright)]">live demo</DemoLiveLink>
            </p>
          </div>
        </div>
      </div>

      <ReferralDiscountNote align="center" className="mt-6 mx-auto max-w-2xl rounded-xl border border-[#1f282b]/80 bg-[#0a0c0f]/60 px-4 py-2.5" />

      <p className="text-[14.5px] text-center mt-5 text-[#9aa6ad]">Not sure which one? <Link href="/quote" className="underline hover:text-white">Tell me about your business</Link> — I'll recommend the right fit for your Lake Cumberland spot. Need a <Link href="/food-truck-websites" className="underline hover:text-white">food truck website Kentucky</Link>? Running a trade? See <Link href="/contractor-websites" className="underline hover:text-white">contractor websites</Link>.</p>

      <TemplateStoreSection variant="compact" />

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">MARINAS</div>
          <h3 className="font-semibold text-lg tracking-tight">Docks that book slips & rentals online.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">Burnside, Lee's Ford, State Dock, Conley Bottom & more. Flat pricing. You own the code.{" "}<Link href="/marina-websites" className="text-[var(--gold-light)] underline hover:text-white">Marina websites →</Link></p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">FISHING GUIDES</div>
          <h3 className="font-semibold text-lg tracking-tight">Striper & bass sites that get bookings.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">Trip pages, captain bios, trophy galleries — built for Lake Cumberland captains.{" "}<Link href="/fishing-guide-websites" className="text-[var(--gold-light)] underline hover:text-white">Guide websites →</Link></p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">FOOD TRUCKS</div>
          <h3 className="font-semibold text-lg tracking-tight">“Where We Are Today” from your phone.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">Real-time location, menus & festivals for Lake Cumberland trucks.{" "}<Link href="/food-truck-websites" className="text-[var(--gold-light)] underline hover:text-white">Food truck websites →</Link></p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">LAKE HOUSES</div>
          <h3 className="font-semibold text-lg tracking-tight">Rental sites for Lake Cumberland lake houses.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">Calendars, galleries, house rules, and direct booking for Monticello, Jamestown, Somerset, and Burnside.{" "}<Link href="/lake-house-rental-websites" className="text-[var(--gold-light)] underline hover:text-white">Lake house websites →</Link></p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">BAIT & BOATS</div>
          <h3 className="font-semibold text-lg tracking-tight">Bait shops and rental docks.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">Live bait, hours, fleet cards, fishing reports, and directions to the dock.{" "}<Link href="/bait-and-tackle-websites" className="text-[var(--gold-light)] underline hover:text-white">Bait and boat websites →</Link></p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">CONTRACTORS</div>
          <h3 className="font-semibold text-lg tracking-tight">Plumbers, roofers, HVAC and trades.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">Tap-to-call, service lists and quote forms for Lake Cumberland area contractors.{" "}<Link href="/contractor-websites" className="text-[var(--gold-light)] underline hover:text-white">Contractor websites →</Link></p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]">
          <div className="text-[var(--gold-light)] text-xs tracking-[1.5px] mb-1">QUOTE CALCULATORS</div>
          <h3 className="font-semibold text-lg tracking-tight">Add an estimate calculator to your site.</h3>
          <p className="mt-2 text-[14.5px] text-[var(--text-muted)]">Need a quote calculator for your site? Website templates from $129, calculators from $99.{" "}<a href="https://bluegrasstemplates.com/calculator-templates" className="text-[var(--gold-light)] underline hover:text-white">Calculator templates →</a></p>
        </div>
      </div>

      <div className="mt-10">
        <div className="max-w-3xl mb-6">
          <div className="label tracking-[1.5px]">PRICING</div>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">Honest flat pricing — full ownership either way.</h2>
          <p className="mt-2 text-[15px] text-[#9aa6ad]">One set of prices for Lake Cumberland area businesses in Monticello, Somerset, Russell Springs, Jamestown, Burnside, Albany and Whitley City.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="text-[#c17a5a] text-xs uppercase tracking-[1.5px] mb-1">KENTUCKY — LAKE CUMBERLAND</div>
            <div className="font-semibold tracking-tight">Wayne, Pulaski, Russell & McCreary counties</div>
            <div className="mt-4 space-y-3 text-[15px]">
              <div className="flex justify-between items-baseline"><span>Starter Sites</span><span className="font-semibold tabular-nums text-xl">$1,200</span></div>
              <div className="flex justify-between items-baseline"><span>Business Suites</span><span className="font-semibold tabular-nums text-xl">$2,500–$4,500</span></div>
            </div>
            <p className="mt-4 text-xs text-[#8a9599]">Flat one-time pricing. Final quote depends on scope.</p>
          </div>
          <div className="rounded-2xl border border-[#243530] bg-[#0a0c0f] p-6">
            <div className="text-[#f4a261] text-xs uppercase tracking-[1.5px] mb-1">NOT LOCAL?</div>
            <div className="font-semibold tracking-tight">Ready-made templates</div>
            <p className="mt-4 text-[15px] text-[#9aa6ad]">Get a ready-made website template for $129, or a quote calculator from $99, at the template store. Custom work is also available anywhere by email.</p>
            <a href="https://bluegrasstemplates.com/" className="mt-4 inline-block text-[15px] text-[#f4a261] underline hover:text-white">Browse bluegrasstemplates.com →</a>
          </div>
        </div>
        <p className="mt-4 text-[13px] text-[#9aa6ad]">All projects include the same high-quality handcrafted work and full code ownership.</p>
      </div>

      <ServiceAreas variant="compact" />

      <div className="mt-12">
        <div className="label tracking-[1.5px]">BRANDING ADD-ONS</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">Look the part, everywhere.</h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">Business cards, logo work, and full branding kits. Add to any website, or buy on their own.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brandingAddons.map((b) => <BrandingCard key={b.title} {...b} />)}
        </div>
        <p className="mt-4 text-[13px] text-[#9aa6ad]">Deposit required to begin design work. You own everything once paid in full.</p>
      </div>

      <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-10">
        <div className="label tracking-[1.5px]">OPTIONAL CARE PLAN</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">I'll keep it running. You run your business.</h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">Optional hosting + maintenance so you never have to think about it. Cancel anytime, no contract.</p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-semibold">$79</span>
          <span className="text-[var(--text-muted)]">/month</span>
        </div>
        <ul className="mt-6 space-y-2.5 text-[15px]">
          {careBullets.map((b) => (
            <li key={b} className="flex gap-2.5"><Check size={16} className="text-[var(--copper)] mt-0.5 shrink-0" />{b}</li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
              <summary className="font-semibold cursor-pointer">{f.q}</summary>
              <p className="mt-2 text-[15px] text-[var(--text-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold">Not sure which one fits?</h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">Tell me about your Monticello, Jamestown, Burnside, or Lake Cumberland business — honest recommendation, even if Starter is all you need. Flat rate, full ownership.</p>
        <Link href="/quote" className="btn btn-primary mt-5 inline-flex">Get a free quote →</Link>
      </div>
    </div>
  );
}

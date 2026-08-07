import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import ReferralDiscountNote from "@/components/ReferralDiscountNote";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Charleston SC Web Design | Lowcountry Web Design for Food Trucks & Restaurants | Bluegrass Digital Forge",
  description: "Charleston SC and Lowcountry web design for food trucks, restaurants, and small businesses in Charleston, Summerville, North Charleston & the South Carolina Lowcountry. Flat pricing. You own the code.",
  keywords: [
    "Web Design Charleston SC",
    "Charleston SC web design",
    "Lowcountry web design",
    "Charleston Food Truck Website",
    "Summerville Small Business Website",
    "North Charleston Restaurant Website",
    "Lowcountry Web Design",
    "Charleston SC website designer",
    "Summerville web design",
    "Walterboro website",
    "Ladson small business site",
  ],
  alternates: { canonical: canonicalUrl("/south-carolina") },
  openGraph: {
    title: "Charleston SC Web Design | Lowcountry Web Design for Food Trucks, Restaurants & Small Businesses",
    description: "Handcrafted Charleston SC and Lowcountry web design for food trucks, restaurants, and small businesses in Summerville, North Charleston, and the South Carolina Lowcountry. Flat pricing. Full ownership.",
    url: canonicalUrl("/south-carolina"),
  },
};

const scAreas = [
  {
    town: "Charleston, SC",
    detail: "Downtown, King Street, Waterfront & historic district",
    desc: "Ideal for restaurants, boutique hotels, food trucks, and tour operators who need fast sites that capture Lowcountry charm and convert visitors searching for local experiences.",
  },
  {
    town: "Summerville, SC",
    detail: "Historic downtown & growing small business corridor",
    desc: "Perfect for Summerville small business websites — retail shops, cafes, professional services, and family businesses that want a clean, trustworthy online presence that ranks locally.",
  },
  {
    town: "North Charleston, SC",
    detail: "Industrial corridor, restaurants & neighborhoods",
    desc: "North Charleston Restaurant Websites and service businesses benefit from clear menus, online ordering flows, and strong local SEO that reaches both residents and airport traffic.",
  },
  {
    town: "Walterboro, SC",
    detail: "Lowcountry gateway & small town heart",
    desc: "Walterboro businesses — from restaurants to outfitters and shops — get simple, fast-loading sites that highlight genuine hospitality and bring in weekend travelers from I-95.",
  },
  {
    town: "Ladson, SC",
    detail: "Growing community between Summerville & North Charleston",
    desc: "Local service providers, restaurants, and neighborhood businesses in Ladson get mobile-first sites tuned for nearby searches and easy contact from families in the area.",
  },
];

const scBenefits = [
  "Authentic local voice — no generic copy or plastic stock photos. We research the real Lowcountry feel.",
  "Mobile-first and fast — critical when customers search on the go near the market, the battery, or the beaches.",
  "Conversion focused — clear menus, booking links, directions, and contact that turn searches into customers.",
  "Flat pricing, full ownership — South Carolina Lowcountry: Starter Sites $1,550 · Business Suites $3,250 (Kentucky base: $1,200 / from $2,500). You own the code and site. No subscriptions.",
  "Local SEO built-in — optimized for 'Web Design Charleston SC', 'Charleston food truck', 'Summerville restaurant' and city-specific terms.",
  "Same proven process we use for Kentucky marinas, guides, and food trucks — now available for the Lowcountry.",
];

export default function SouthCarolinaPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* Hero image — additive photorealistic Charleston Lowcountry golden hour (follows Critical Image Rule: authentic, researched local details, warm premium natural lighting) */}
      <div className="relative -mx-5 mb-10 overflow-hidden border-b border-[#1a2225]">
        <img
          src="/sc-charleston-harbor-hero.jpg"
          alt="Golden hour over Charleston SC harbor with historic waterfront, Ravenel Bridge, and authentic Lowcountry marsh grass in foreground — photorealistic warm natural light photography for Charleston web design"
          className="w-full h-[340px] md:h-[460px] object-cover"
          style={{ objectPosition: "center 38%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/25 via-[#050708]/10 to-[#050708]/70" />
      </div>

      {/* Header */}
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">CHARLESTON SC &amp; LOWCOUNTRY WEB DESIGN</div>
        <h1 className="section-title tracking-tight mt-2">
          Charleston SC &amp; Lowcountry Web Design for Food Trucks, Restaurants &amp; Small Businesses
        </h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">
          Looking for Charleston SC web design or Lowcountry web design that actually fits how you run a truck, a restaurant, or a shop? We build handcrafted sites for food trucks, restaurants, and small businesses in Charleston, Summerville, North Charleston, Walterboro, Ladson, and across the South Carolina Lowcountry — the same premium, neighborly approach we use for Lake Cumberland. Flat pricing. <strong className="text-[#c8cfd3] font-medium">You own the code</strong> with full ownership.
        </p>
        <p className="mt-2 text-[14.5px] text-[#c17a5a]">
          Built for <strong>Charleston SC food trucks</strong> rolling the harbor and markets, <strong>restaurants from King Street to North Charleston</strong>, and <strong>small businesses in Summerville and the Lowcountry</strong> who want a site that ranks locally and feels like home.
        </p>
      </div>

      {/* Quick links / internal nav */}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/quote" className="btn btn-primary px-6 py-2.5 text-sm">Get a Lowcountry quote →</Link>
        <Link href="/services" className="btn btn-secondary px-6 py-2.5 text-sm">See pricing &amp; packages</Link>
        <Link href="/work" className="btn btn-secondary px-6 py-2.5 text-sm">See Kentucky demos (same quality)</Link>
        <Link href="/contact" className="text-[#f4a261] hover:underline px-2 py-2.5">Talk to Brian directly</Link>
      </div>

      {/* SC Service Areas Grid — modeled after existing ServiceAreas styling */}
      <div className="mt-12">
        <div className="max-w-3xl mb-6">
          <div className="label tracking-[2px]">LOWCOUNTRY SERVICE AREAS</div>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">Charleston SC web design for food trucks, restaurants &amp; Lowcountry small businesses.</h2>
          <p className="mt-2 text-[15px] text-[#9aa6ad]">
            If you run a food truck near the harbor or a weekend market, a restaurant in Charleston or North Charleston, or a small business in Summerville, Walterboro, or Ladson — we build sites that speak to your customers. Warm, honest, and effective Lowcountry web design made for how people actually search and book here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scAreas.map((area, index) => (
            <div
              key={index}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5 flex flex-col"
            >
              <div>
                <div className="font-semibold tracking-tight text-[17px] text-white">
                  {area.town}
                </div>
                <div className="text-[#c17a5a] text-[13px] mt-0.5 font-medium tracking-tight">
                  {area.detail}
                </div>
              </div>
              <p className="mt-3 text-[14.5px] text-[#9aa6ad] leading-relaxed flex-1">
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Authentic Lowcountry photography — additive only, placed after city sections for visual support. All images photorealistic, location-accurate, warm premium style matching Kentucky site assets. */}
      <div className="mt-10">
        <div className="label tracking-[1.5px] mb-4">SCENES FROM THE LOWCOUNTRY</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <figure className="overflow-hidden rounded-2xl border border-[#1f282b] bg-[#0a0c0f]">
            <div className="relative h-44 w-full">
              <Image
                src="/sc-edisto-river.jpg"
                alt="Peaceful Edisto River Lowcountry scenic view at golden hour with calm water, marsh grass and live oaks — authentic South Carolina river photography"
                fill
                loading="lazy"
                decoding="async"
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <figcaption className="p-3 text-[13px] text-[#9aa6ad]">Edisto River — peaceful marsh at golden hour</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-[#1f282b] bg-[#0a0c0f]">
            <div className="relative h-44 w-full">
              <Image
                src="/sc-lake-moultrie.jpg"
                alt="Lake Moultrie South Carolina landscape with cypress trees in water and boating at golden hour sunset, authentic Lowcountry lake photography for local businesses"
                fill
                loading="lazy"
                decoding="async"
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <figcaption className="p-3 text-[13px] text-[#9aa6ad]">Lake Moultrie — cypress waters, fishing vibe</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-[#1f282b] bg-[#0a0c0f]">
            <div className="relative h-44 w-full">
              <Image
                src="/sc-palmetto-marsh.jpg"
                alt="South Carolina Lowcountry coastal marsh with palmetto trees at golden hour sunset, warm natural light reflections in tidal creek — authentic palmetto marsh photography"
                fill
                loading="lazy"
                decoding="async"
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <figcaption className="p-3 text-[13px] text-[#9aa6ad]">Coastal marsh &amp; palmettos — golden hour</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-[#1f282b] bg-[#0a0c0f]">
            <div className="relative h-44 w-full">
              <Image
                src="/sc-beaufort-waterfront.jpg"
                alt="Beaufort SC historic district waterfront with antebellum homes, moss-draped oaks and boats at golden hour, authentic Lowcountry historic photography"
                fill
                loading="lazy"
                decoding="async"
                quality={70}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <figcaption className="p-3 text-[13px] text-[#9aa6ad]">Beaufort waterfront — historic Southern charm</figcaption>
          </figure>
        </div>
        <p className="mt-3 text-center text-xs text-[#8a9599]">Real places. Real light. The same authenticity we bring to every website we craft.</p>
      </div>

      {/* Why Lowcountry businesses choose us */}
      <div className="mt-14">
        <div className="max-w-3xl mb-6">
          <div className="label tracking-[1.5px]">THE BLUEGRASS DIFFERENCE IN THE LOWCOUNTRY</div>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">Premium quality with genuine local soul.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {scBenefits.map((benefit, i) => (
            <div key={i} className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6 flex gap-4">
              <Check size={20} className="check mt-1 shrink-0 text-[#c17a5a]" />
              <p className="text-[15px] text-[#c8cfd3] leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Small-town charm visual — additive, using Walterboro/Summerville image in benefits area flow */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#1f282b]">
        <img
          src="/sc-summerville-walterboro.jpg"
          alt="Historic small-town Southern charm in Walterboro or Summerville SC at golden hour: moss-draped live oaks, white church steeple, and quaint streets — authentic Lowcountry photography for small business websites"
          className="w-full h-64 md:h-72 object-cover"
          style={{ objectPosition: "center 45%" }}
        />
        <div className="bg-[#0a0c0f] px-5 py-3 text-[13px] text-[#9aa6ad] border-t border-[#1f282b]">Walterboro &amp; Summerville — genuine small-town Lowcountry character</div>
      </div>

      {/* Specific keyword-rich offerings */}
      <div className="mt-14 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8">
        <h3 className="text-xl font-semibold tracking-tight">Built for the searches that matter here</h3>
        <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-[15px] text-[#c8cfd3]">
          <div>
            <span className="font-medium text-white">Charleston Food Truck Website</span><br />
            Schedule, menu with photos, location map, catering inquiry. Updates you can make yourself or we handle.
          </div>
          <div>
            <span className="font-medium text-white">North Charleston Restaurant Website</span><br />
            Digital menus, hours, directions from I-26, online reservations or takeout links. Looks great on mobile at the table.
          </div>
          <div>
            <span className="font-medium text-white">Summerville Small Business Website</span><br />
            Clean, trustworthy sites for boutiques, salons, contractors, and professional offices that want to rank in the historic town.
          </div>
          <div>
            <span className="font-medium text-white">Lowcountry Web Design</span><br />
            Authentic photography direction, warm typography, clear calls-to-action. Sites that feel like the marsh at golden hour — not corporate templates.
          </div>
        </div>
      </div>

      {/* Additive deep food truck section for Lowcountry — real-time location emphasis */}
      <div className="mt-8 rounded-3xl border border-[#1f282b] bg-[#0a0c0f] p-7">
        <div className="text-[#f4a261] text-xs uppercase tracking-[1.5px] mb-1">FOOD TRUCKS IN THE LOWCOUNTRY</div>
        <h3 className="text-xl font-semibold tracking-tight">Lead with the biggest perk: easy, on-the-fly “Where We Are Today” updates from a simple mobile dashboard.</h3>
        <p className="mt-3 text-[15px] text-[#c8cfd3]">Whether you’re serving near the harbor, at a North Charleston market, rolling through a Summerville weekend event, or booked for the Lowcountry Food Truck Festival and distillery pop-ups — your customers need to know your spot and hours without guessing. Change “Where We Are Today” in seconds right from your phone: “Serving at Waterfront Park until 2” or “King Street pop-up this evening.” Our Charleston Food Truck Websites put a simple phone-friendly dashboard in your hands so you can post today’s location, update the menu, or lock festival dates while you’re prepping or between services.</p>
        <ul className="mt-4 text-[14.5px] text-[#c8cfd3] space-y-1.5">
          <li>• Update “at the waterfront” or “Ladson event today” from your truck in seconds</li>
          <li>• Show pre-order options for big groups and office catering common in the Charleston area</li>
          <li>• Beautiful photos of your actual Lowcountry plates — shrimp, brisket, tacos, whatever you’re known for</li>
          <li>• Festival calendar that helps event organizers and hungry locals find you fast</li>
          <li>• Quick menu updates and online ordering so the line moves faster at every stop</li>
        </ul>
        <p className="mt-4 text-sm"><Link href="/food-truck-websites" className="underline hover:text-[#f4a261]">See full food truck website details including Lake Cumberland + Charleston examples →</Link></p>
      </div>

      {/* Pricing teaser — reuses familiar language */}
      <div className="mt-12 text-center">
        <p className="text-[#9aa6ad] max-w-lg mx-auto">
          South Carolina Lowcountry rates: Starter Sites{" "}
          <span className="font-semibold text-white">$1,550</span>
          {" · "}
          Business Suites{" "}
          <span className="font-semibold text-white">$3,250</span>
          . Kentucky base rates: $1,200 / from $2,500. Same craft, full ownership. 2–4 week typical launch.
        </p>

        {/* Regional Pricing — additive, honest, clean language on SC page. Kentucky as base + SC Lowcountry 25-35% higher. Two-column format. */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
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
          <ReferralDiscountNote
            align="center"
            className="mt-4 mx-auto max-w-xl rounded-xl border border-[#1f282b]/80 bg-[#0a0c0f]/60 px-4 py-2.5"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3 justify-center">
          <Link href="/services" className="btn btn-secondary">See full pricing details →</Link>
          <Link href="/quote" className="btn btn-primary">Start your Charleston or Summerville site →</Link>
        </div>
      </div>

      {/* Trust + final CTA */}
      <div className="mt-14 rounded-2xl border border-[#1a2225] bg-[#050708] p-8 md:p-10 text-center">
        <h2 className="text-[26px] tracking-[-0.8px] font-semibold">Ready for a website that feels like home in the Lowcountry?</h2>
        <p className="mt-3 text-[15.5px] text-[#9aa6ad] max-w-[52ch] mx-auto">
          Tell me about your Charleston restaurant, Summerville shop, North Charleston food truck, or Walterboro business. I’ll send a clear, flat-price proposal built for your customers and your city.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary px-8">Get your free quote in 2 minutes →</Link>
          <Link href="/contact" className="btn btn-secondary px-7">Contact me directly</Link>
          <Link href="/" className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3.5 text-[15px] font-semibold">Back to Kentucky home</Link>
        </div>
        <p className="mt-5 text-xs text-[#8a9599]">Forged in Monticello, Kentucky • Proudly serving the South Carolina Lowcountry</p>
      </div>

      {/* Backlinks for crawlability */}
      <div className="mt-10 text-center text-sm text-[#8a9599]">
        Also explore: <Link href="/service-areas" className="underline hover:text-white">Full service areas</Link> · <Link href="/work" className="underline hover:text-white">Live demos</Link> · <Link href="/food-truck-websites" className="underline hover:text-white">Food truck websites</Link>
      </div>
    </div>
  );
}

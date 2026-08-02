import type { Metadata } from "next";
import Link from "next/link";
import ServiceAreas from "@/components/ServiceAreas";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Lake Cumberland Service Areas | Jamestown, Burnside, Nancy, Albany | Monticello KY Website Designer",
  description:
    "Websites for Lake Cumberland boat ramp towns — Jamestown, Burnside, Russell Springs, Nancy, Albany, Monticello & more. Marinas, fishing guides, food trucks, restaurants. Flat pricing. Full ownership. Handcrafted in Monticello, KY.",
  keywords: [
    "Lake Cumberland boat ramp towns",
    "Monticello KY website designer",
    "Jamestown KY web design",
    "Burnside marina website",
    "Nancy KY Lee’s Ford website",
    "Russell Springs web design",
    "Albany KY website designer",
    "Creelsboro fishing guide site",
    "Lake Cumberland business websites",
    "Web Design Charleston SC",
    "Lowcountry Web Design",
  ],
  alternates: { canonical: canonicalUrl("/service-areas") },
  openGraph: {
    title:
      "Lake Cumberland Service Areas | Websites for Every Major Ramp Town | Monticello KY",
    description:
      "Handcrafted websites for Jamestown, Burnside, Nancy, Russell Springs, Albany, Monticello and every major Lake Cumberland boat ramp town. Flat pricing. You own the code.",
    url: canonicalUrl("/service-areas"),
  },
};

const townDeepDives = [
  {
    id: "jamestown",
    town: "Jamestown, KY",
    county: "Russell County",
    anchors: "State Dock · Lake Cumberland Marina · Recreation Area",
    summary:
      "Jamestown is one of the lake’s busiest visitor hubs — houseboats, guides, lodging, and dockside dining. People search for rentals, striper trips, and “what’s open near State Dock” before they ever leave the cabin.",
    points: [
      "Houseboat rental and marina sites need clear rates, amenity lists, fuel/pump-out info, and a phone that works on mobile.",
      "Fishing guides launching from State Dock convert with species pages (striper, bass, multi-species), trophy photos, and simple booking forms.",
      "Restaurants and shops win when hours, menus, and “call ahead for large groups” are one tap away for peak-season weekends.",
      "Local SEO targets real searches: boat rental Jamestown KY, fishing guide Lake Cumberland, dinner near State Dock.",
    ],
    specialties: [
      { href: "/marina-websites", label: "Marina websites" },
      { href: "/fishing-guide-websites", label: "Fishing guide websites" },
      { href: "/food-truck-websites", label: "Food truck websites" },
    ],
  },
  {
    id: "burnside",
    town: "Burnside, KY",
    county: "Pulaski County",
    anchors: "Burnside Marina · US 27 gateway",
    summary:
      "Burnside is the Pulaski gateway to the water — weekend families, lodging, marina traffic, and restaurants that fill when the lake is busy. A clear site helps you show up when boaters search from the road or the parking lot.",
    points: [
      "Marina and resort pages should lead with slips, amenities, fuel hours, and directions off US 27 — not buried in PDF menus.",
      "Restaurants and lodging near Burnside Marina benefit from mobile menus, reservation or inquiry forms, and honest local photos.",
      "Contractors and service businesses in Burnside still need a fast trust site — service list, service area, and tap-to-call.",
      "Peak summer weekends are when slow or confusing sites lose the booking to whoever loads first on a phone.",
    ],
    specialties: [
      { href: "/marina-websites", label: "Marina websites" },
      { href: "/food-truck-websites", label: "Food truck websites" },
      { href: "/services", label: "Restaurant & shop packages" },
    ],
  },
  {
    id: "nancy",
    town: "Nancy, KY",
    county: "Pulaski County",
    anchors: "Lee’s Ford Marina Resort",
    summary:
      "Nancy is defined by Lee’s Ford — a full-service marina resort destination. Visitors plan lodging, dining, and dock time together. Your website should make that planning easy, not send them hunting across three Facebook pages.",
    points: [
      "Marina resort sites shine with booking or inquiry flows, amenity galleries, restaurant menus, and event calendars.",
      "Guides and rentals serving Lee’s Ford should name the marina and Nancy clearly so out-of-town guests know where to meet.",
      "Shops and services in the Nancy area rank for resort-adjacent searches when local place names and photos feel authentic.",
      "Flat one-time pricing and full ownership matter to independent operators who already pay peak-season staff and fuel.",
    ],
    specialties: [
      { href: "/marina-websites", label: "Marina websites" },
      { href: "/fishing-guide-websites", label: "Fishing guide websites" },
      { href: "/services", label: "Business Suite pricing" },
    ],
  },
  {
    id: "russell-springs",
    town: "Russell Springs, KY",
    county: "Russell County",
    anchors: "US 127 & KY 80 corridor · local ramps near Jamestown",
    summary:
      "Russell Springs sits on the highway approaches to the lake — cabin traffic, locals who know the quieter ramps, and businesses that serve both town and water. You don’t need a 20-page site; you need a fast, honest one.",
    points: [
      "Fishing guides and small marina operators benefit from pages that rank for Russell Springs and nearby launch searches.",
      "Retail, auto, and service businesses draw lake weekenders who stop in town — clear hours and contact win.",
      "Food trucks and pop-ups can post “Where We Are Today” for Main Street, festivals, and corridor stops.",
      "Same Monticello neighbor process: flat pricing, you own the code, optional care only if you want it.",
    ],
    specialties: [
      { href: "/fishing-guide-websites", label: "Fishing guide websites" },
      { href: "/food-truck-websites", label: "Food truck websites" },
      { href: "/marina-websites", label: "Marina websites" },
    ],
  },
  {
    id: "albany",
    town: "Albany, KY",
    county: "Clinton County",
    anchors: "Southern shore access · Grider Hill area",
    summary:
      "Albany and Clinton County feed the southern side of Lake Cumberland. Weekenders coming from the south need businesses that look open, local, and easy to reach — not a placeholder site from 2014.",
    points: [
      "Dock services, rentals, and outfitters near Grider Hill and southern access points need directions, hours, and mobile contact first.",
      "Guides and cabins serving Albany traffic convert with real photos and clear trip or stay details.",
      "Main Street shops, eateries, and services in Albany get the same flat-price, full-ownership treatment as lake-front operators.",
      "Local SEO pairs Albany / Clinton County language with Lake Cumberland intent so the right searches find you.",
    ],
    specialties: [
      { href: "/marina-websites", label: "Marina websites" },
      { href: "/fishing-guide-websites", label: "Fishing guide websites" },
      { href: "/food-truck-websites", label: "Food truck websites" },
    ],
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bluegrass Digital Forge — Lake Cumberland Service Areas",
  description:
    "Monticello KY website designer serving Lake Cumberland boat ramp towns including Jamestown, Burnside, Nancy, Russell Springs, Albany, Monticello, and surrounding communities. Flat pricing. Full ownership.",
  url: canonicalUrl("/service-areas"),
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Monticello",
    addressRegion: "KY",
    postalCode: "42633",
    addressCountry: "US",
  },
  areaServed: townDeepDives.map((t) => ({
    "@type": "City",
    name: t.town.replace(", KY", ""),
  })),
  priceRange: "$1,200 - $2,500",
};

export default function ServiceAreasPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">SERVICE AREAS — LAKE CUMBERLAND</div>
        <h1 className="section-title tracking-tight mt-2">
          Websites for Lake Cumberland boat ramp towns — Jamestown, Burnside,
          Nancy, Albany &amp; more
        </h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">
          Handcrafted by a neighbor in Monticello for the marinas, fishing
          guides, restaurants, rentals, food trucks, and shops that make every
          ramp from Conley Bottom to Creelsboro special. Mobile-first. Fast.
          Authentic Kentucky voice.{" "}
          <strong className="text-[#c8cfd3] font-medium">Flat one-time pricing</strong>
          .{" "}
          <strong className="text-[#c8cfd3] font-medium">
            Full ownership of the site and code
          </strong>
          . No monthly website retainer required.
        </p>
      </div>

      {/* Specialty jump links */}
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/marina-websites" className="btn btn-secondary px-5 py-2.5 text-sm">
          Marina websites
        </Link>
        <Link href="/fishing-guide-websites" className="btn btn-secondary px-5 py-2.5 text-sm">
          Fishing guide websites
        </Link>
        <Link href="/food-truck-websites" className="btn btn-secondary px-5 py-2.5 text-sm">
          Food truck websites
        </Link>
        <Link href="/quote" className="btn btn-primary px-5 py-2.5 text-sm">
          Get a free quote →
        </Link>
      </div>

      {/* Jump nav for deep towns */}
      <div className="mt-8 flex flex-wrap gap-2 text-[13px]">
        <span className="text-[#8a9599] self-center mr-1">Deep local notes:</span>
        {townDeepDives.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="area-chip hover:border-[var(--copper)]/50 transition-colors"
          >
            {t.town.replace(", KY", "")}
          </a>
        ))}
      </div>

      {/* The rich areas grid */}
      <div className="mt-10">
        <ServiceAreas />
      </div>

      {/* Town deep dives — substantial, not thin pages */}
      <div className="mt-16">
        <div className="max-w-3xl mb-8">
          <div className="label tracking-[2px]">TOWN-BY-TOWN LOCAL KNOWLEDGE</div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">
            What matters in Jamestown, Burnside, Nancy, Russell Springs &amp;
            Albany
          </h2>
          <p className="mt-3 text-[15px] text-[#9aa6ad]">
            Same lake, different traffic patterns. These notes are written for
            business owners in each town — not cookie-cutter “we serve your city”
            filler. Every site still gets{" "}
            <strong className="text-[#c8cfd3] font-medium">flat pricing</strong>,{" "}
            <strong className="text-[#c8cfd3] font-medium">full ownership</strong>
            , and a Monticello neighbor on the other end of the email.
          </p>
        </div>

        <div className="space-y-8">
          {townDeepDives.map((t) => (
            <section
              key={t.id}
              id={t.id}
              className="scroll-mt-28 rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                    {t.town}
                  </h3>
                  <div className="text-[#c17a5a] text-[13px] mt-0.5 font-medium">
                    {t.county} · {t.anchors}
                  </div>
                </div>
                <Link
                  href="/quote"
                  className="text-sm text-[#f4a261] underline hover:text-white shrink-0"
                >
                  Quote for {t.town.replace(", KY", "")} →
                </Link>
              </div>
              <p className="mt-4 text-[15px] text-[#c8cfd3] leading-relaxed">
                {t.summary}
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] text-[#9aa6ad]">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-[#f4a261] shrink-0">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
                {t.specialties.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-[#3ddbd9] underline hover:text-white"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Additive: South Carolina Lowcountry */}
      <div className="mt-12 rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-8">
        <div className="label tracking-[1.5px] text-[#c17a5a]">
          NOW SERVING THE SOUTH CAROLINA LOWCOUNTRY
        </div>
        <h3 className="text-2xl tracking-tight font-semibold mt-2">
          Charleston SC Web Design &amp; Lowcountry Business Websites
        </h3>
        <p className="mt-3 text-[15px] text-[#9aa6ad]">
          Same flat-price, handcrafted approach now available for Charleston,
          Summerville, Walterboro, Ladson, North Charleston and surrounding
          Lowcountry towns. Perfect for restaurants, food trucks, small retail,
          and professional services that want an authentic, fast-loading site.
        </p>
        <div className="mt-4 text-sm">
          <Link
            href="/south-carolina"
            className="text-[#f4a261] hover:underline font-medium"
          >
            Visit dedicated South Carolina page for details and local examples →
          </Link>
        </div>
      </div>

      {/* Why local matters */}
      <div className="mt-10 grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
          <h3 className="font-semibold text-lg tracking-tight">
            Why towns near the ramps need better sites
          </h3>
          <p className="mt-3 text-[15px] text-[#9aa6ad] leading-relaxed">
            Boaters and families search on their phones at the ramp, in the
            parking lot, or while planning Friday night on the water. They look
            for “houseboat rental Jamestown”, “fishing guide Lake Cumberland”,
            “best steak near Burnside Marina”, or “bait shop Monticello KY”. A
            fast, clear, local-feeling site wins the click and the booking.
          </p>
        </div>
        <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
          <h3 className="font-semibold text-lg tracking-tight">
            What we build for lake businesses
          </h3>
          <ul className="mt-3 space-y-2 text-[15px] text-[#c8cfd3]">
            <li>• Mobile menus and real-time availability that load instantly on spotty signal</li>
            <li>• Simple booking or contact flows that turn visitors into reservations</li>
            <li>• Honest photos and copy that feel like the lake — not generic stock</li>
            <li>• Local SEO tuned to actual searches around each ramp and town</li>
            <li>• You own the site and code. No subscriptions required to keep your build.</li>
          </ul>
        </div>
      </div>

      {/* Differentiator strip */}
      <div className="mt-10 rounded-2xl border border-[#f4a261]/30 bg-[#0a0c0f] p-6 md:p-8">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-2">
          EVERY TOWN · SAME PROMISE
        </div>
        <h3 className="text-xl font-semibold tracking-tight">
          Flat pricing. Full ownership. Handcrafted in Monticello. No monthly
          website retainer.
        </h3>
        <p className="mt-2 text-[15px] text-[#c8cfd3] max-w-2xl">
          Whether you&apos;re at Lee&apos;s Ford, State Dock, Burnside Marina,
          Grider Hill, or Main Street Albany — you pay a clear one-time rate for
          the build, own the code when we&apos;re done, and never need an agency
          subscription just to keep your pages online.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/services" className="btn btn-secondary text-sm">
            See pricing
          </Link>
          <Link href="/quote" className="btn btn-primary text-sm">
            Get a free quote →
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h2 className="text-2xl tracking-tight font-semibold">
          Ready to show up for the boaters at your ramp?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me which town or marina you&apos;re in — Monticello, Jamestown,
          Creelsboro, Burnside, Nancy, Russell Springs, Albany, anywhere on the
          lake — and I&apos;ll send a flat-price proposal built for your
          customers.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary px-8">
            Get a free quote in 2 minutes →
          </Link>
          <Link href="/work" className="btn btn-secondary px-7">
            See Lake Cumberland demos
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3.5 text-[15px] font-semibold"
          >
            Contact me directly
          </Link>
        </div>
        <p className="mt-4 text-xs text-[#8a9599]">
          Serving every ramp town on Lake Cumberland from the heart of
          Monticello, KY — and Charleston SC, Summerville &amp; the full
          Lowcountry.
        </p>
      </div>
    </div>
  );
}

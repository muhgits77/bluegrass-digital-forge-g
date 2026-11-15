import type { Metadata } from "next";
import Link from "next/link";
import { CopperButton, GhostButton, PageHero } from "@/components/site/ui";
import { canonicalUrl, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Web Design Service Areas – Lake Cumberland, KY",
  description:
    "Web design for Monticello, Somerset, Russell Springs, Jamestown, Burnside, Albany, Nancy and Whitley City: Wayne, Pulaski, Russell & McCreary counties.",
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
    "Somerset KY web design",
    "Russell Springs KY web design",
    "McCreary County web design",
  ],
  alternates: { canonical: canonicalUrl("/service-areas") },
  openGraph: {
    title:
      "Web Design Service Areas – Lake Cumberland, KY",
    description:
      "Web design for Monticello, Somerset, Russell Springs, Jamestown, Burnside, Albany, Nancy and Whitley City: Wayne, Pulaski, Russell & McCreary counties.",
    url: canonicalUrl("/service-areas"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

const townDeepDives = [
  {
    id: "jamestown",
    town: "Jamestown, KY",
    county: "Russell County",
    anchors: "State Dock · Lake Cumberland Marina · Recreation Area",
    summary:
      "Jamestown is one of the lake’s busiest visitor hubs — houseboats, guides, lodging, and dockside dining. People search for rentals, striper trips, and “what’s open near State Dock” before they ever leave the lake house.",
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
      { href: "/lake-house-rental-websites", label: "Lake house rental websites" },
      { href: "/bait-and-tackle-websites", label: "Bait and boat rental websites" },
      { href: "/restaurant-websites", label: "Restaurant websites" },
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
      { href: "/restaurant-websites", label: "Restaurant websites" },
      { href: "/contractor-websites", label: "Contractor websites" },
      { href: "/lake-house-rental-websites", label: "Lake house rental websites" },
      { href: "/bait-and-tackle-websites", label: "Bait and boat rental websites" },
      { href: "/fishing-guide-websites", label: "Fishing guide websites" },
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
      { href: "/lake-house-rental-websites", label: "Lake house rental websites" },
      { href: "/restaurant-websites", label: "Restaurant websites" },
    ],
  },
  {
    id: "russell-springs",
    town: "Russell Springs, KY",
    county: "Russell County",
    anchors: "US 127 & KY 80 corridor · local ramps near Jamestown",
    summary:
      "Russell Springs sits on the highway approaches to the lake — lake house traffic, locals who know the quieter ramps, and businesses that serve both town and water. You don’t need a 20-page site; you need a fast, honest one.",
    points: [
      "Fishing guides and small marina operators benefit from pages that rank for Russell Springs and nearby launch searches.",
      "Retail, auto, and service businesses draw lake weekenders who stop in town — clear hours and contact win.",
      "Food trucks and pop-ups can post “Where We Are Today” for Main Street, festivals, and corridor stops.",
      "Same Monticello neighbor process: flat pricing, you own the code, optional care only if you want it.",
    ],
    specialties: [
      { href: "/web-design-russell-springs-ky", label: "Russell Springs web design" },
      { href: "/fishing-guide-websites", label: "Fishing guide websites" },
      { href: "/food-truck-websites", label: "Food truck websites" },
      { href: "/marina-websites", label: "Marina websites" },
      { href: "/lake-house-rental-websites", label: "Lake house rental websites" },
      { href: "/bait-and-tackle-websites", label: "Bait and boat rental websites" },
      { href: "/contractor-websites", label: "Contractor websites" },
      { href: "/restaurant-websites", label: "Restaurant websites" },
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
      "Guides and lake houses serving Albany traffic convert with real photos and clear trip or stay details.",
      "Main Street shops, eateries, and services in Albany get the same flat-price, full-ownership treatment as lake-front operators.",
      "Local SEO pairs Albany / Clinton County language with Lake Cumberland intent so the right searches find you.",
    ],
    specialties: [
      { href: "/marina-websites", label: "Marina websites" },
      { href: "/fishing-guide-websites", label: "Fishing guide websites" },
      { href: "/food-truck-websites", label: "Food truck websites" },
      { href: "/lake-house-rental-websites", label: "Lake house rental websites" },
      { href: "/restaurant-websites", label: "Restaurant websites" },
      { href: "/contractor-websites", label: "Contractor websites" },
    ],
  },
  {
    id: "somerset",
    town: "Somerset, KY",
    county: "Pulaski County",
    anchors: "Pulaski County seat · Burnside, Lee’s Ford & Waitsboro nearby",
    summary:
      "Somerset is the largest town on the north side of the lake and the Pulaski County seat. Restaurants, contractors, shops and services here compete with a bigger town’s worth of businesses, so a fast, clear site matters.",
    points: [
      "Contractors and home services across Pulaski County need a service list, service area and a quote form that works on a phone.",
      "Restaurants and food trucks win with menus, hours and today’s location that load quickly.",
      "Lake traffic from Burnside and Nancy passes through, so lake-related businesses benefit from naming both the town and the lake.",
    ],
    specialties: [
      { href: "/web-design-somerset-ky", label: "Somerset web design" },
      { href: "/contractor-websites", label: "Contractor websites" },
      { href: "/restaurant-websites", label: "Restaurant websites" },
      { href: "/food-truck-websites", label: "Food truck websites" },
    ],
  },
  {
    id: "whitley-city",
    town: "Whitley City, KY",
    county: "McCreary County",
    anchors: "Pine Knot · Stearns · Big South Fork & Daniel Boone National Forest",
    summary:
      "Whitley City is the McCreary County seat, south of the lake along US 27, with Pine Knot and Stearns close by. Outdoor visitors heading to the Big South Fork and the national forest search on their phones for lodging, food and outfitters.",
    points: [
      "Cabins, campgrounds and outfitters need clear directions, rates and a simple booking or inquiry form.",
      "Local restaurants, shops and contractors need the basics done right: hours, service area and tap-to-call contact.",
      "Same Monticello process: flat pricing, you own the code, optional care only if you want it.",
    ],
    specialties: [
      { href: "/contractor-websites", label: "Contractor websites" },
      { href: "/lake-house-rental-websites", label: "Cabin & rental websites" },
      { href: "/restaurant-websites", label: "Restaurant websites" },
    ],
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bluegrass Digital Forge — Lake Cumberland Service Areas",
  description:
    "Monticello KY website designer serving Lake Cumberland boat ramp towns including Jamestown, Burnside, Nancy, Russell Springs, Albany, Monticello, Somerset and Whitley City across Wayne, Pulaski, Russell and McCreary counties. Flat pricing. Full ownership.",
  sameAs: ["https://share.google/JKjYBoMEpHxleaFfL"],
  url: canonicalUrl("/service-areas"),
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Monticello",
    addressRegion: "KY",
    postalCode: "42633",
    addressCountry: "US",
  },
  areaServed: [
    ...townDeepDives.map((t) => ({
      "@type": "City",
      name: t.town.replace(", KY", ""),
    })),
    { "@type": "City", name: "Monticello" },
    ...["Wayne County", "Pulaski County", "Russell County", "McCreary County"].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  ],
  geo: { "@type": "GeoCoordinates", latitude: 36.8298, longitude: -84.8491 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$1,200 - $4,500",
};

export default function ServiceAreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c") }}
      />

      <PageHero eyebrow="Service areas — Lake Cumberland" title="Lake Cumberland Web Design for Every Boat Ramp Town">
        Wayne County web design, Somerset KY small business websites, and everything between — from your Monticello KY website builder. Web design for Monticello, Somerset, Russell Springs, Jamestown, Burnside, Whitley City and more — handcrafted by a neighbor in Monticello for the marinas, guides, restaurants, rentals, food trucks, and shops from Conley Bottom to Creelsboro.{" "}
        <strong className="text-foreground">Flat pricing. Full ownership.</strong> No monthly website retainer.
      </PageHero>

      <nav aria-label="Jump to a town" className="mx-auto flex max-w-6xl flex-wrap gap-2 px-5 pb-10">
        <a href="#monticello" className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">Monticello</a>
        {townDeepDives.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">
            {t.town.replace(", KY", "")}
          </a>
        ))}
      </nav>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-2">
        <article id="monticello" className="scroll-mt-28 rounded-2xl border border-border bg-card p-7">
          <h2 className="font-display text-2xl font-bold">Monticello, KY</h2>
          <p className="mt-1 text-sm text-primary">Wayne County · Home base · Conley Bottom &amp; Beaver Creek nearby</p>
          <p className="mt-4 text-muted-foreground">
            Home base for Bluegrass Digital Forge. Restaurants, shops, guides and trades around Wayne County get a neighbor who can meet in person and knows what lake visitors search for.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <span className="text-muted-foreground">Popular here:</span>
            <Link href="/restaurant-websites" className="text-primary">Restaurant websites</Link>
            <Link href="/food-truck-websites" className="text-primary">Food truck websites</Link>
            <Link href="/contractor-websites" className="text-primary">Contractor websites</Link>
            <Link href="/marina-websites" className="text-primary">Marina websites</Link>
            <Link href="/fishing-guide-websites" className="text-primary">Fishing guide websites</Link>
          </div>
          <Link href="/quote" className="mt-4 inline-block text-sm font-semibold text-primary">Get a quote for Monticello →</Link>
        </article>
        {townDeepDives.map((t) => (
          <article key={t.id} id={t.id} className="scroll-mt-28 rounded-2xl border border-border bg-card p-7">
            <h2 className="font-display text-2xl font-bold">{t.town}</h2>
            <p className="mt-1 text-sm text-primary">{t.county} · {t.anchors}</p>
            <p className="mt-4 text-muted-foreground">{t.summary}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {t.points.map((pt) => (
                <li key={pt} className="flex gap-2">
                  <span className="shrink-0 text-primary">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <span className="text-muted-foreground">Popular here:</span>
              {t.specialties.map((sp) => (
                <Link key={sp.href} href={sp.href} className="text-primary">{sp.label}</Link>
              ))}
            </div>
            <Link href="/quote" className="mt-4 inline-block text-sm font-semibold text-primary">
              Get a quote for {t.town.replace(", KY", "")} →
            </Link>
          </article>
        ))}
      </section>

      <section className="border-y border-border bg-card/50 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="font-display text-xl font-bold">Why towns near the ramps need better sites</h2>
            <p className="mt-3 text-muted-foreground">
              Boaters and families search on their phones at the ramp, in the parking lot, or while planning Friday night on the water. They look for “houseboat rental Jamestown”, “fishing guide Lake Cumberland”, “best steak near Burnside Marina”, or “bait shop Monticello KY”. A fast, clear, local-feeling site wins the click and the booking.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <h2 className="font-display text-xl font-bold">What I build for lake businesses</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>• Mobile menus and real-time availability that load instantly on spotty signal</li>
              <li>• Simple booking or contact flows that turn visitors into reservations</li>
              <li>• Honest photos and copy that feel like the lake — not generic stock</li>
              <li>• Local SEO tuned to actual searches around each ramp and town</li>
              <li>• You own the site and code. No subscriptions required to keep your build.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="mb-6 text-muted-foreground">
          Specialty sites: <Link href="/marina-websites" className="text-primary">marinas</Link> ·{" "}
          <Link href="/fishing-guide-websites" className="text-primary">fishing guides</Link> ·{" "}
          <Link href="/food-truck-websites" className="text-primary">food trucks</Link> ·{" "}
          <Link href="/restaurant-websites" className="text-primary">restaurants</Link> ·{" "}
          <Link href="/contractor-websites" className="text-primary">contractors</Link> ·{" "}
          <Link href="/lake-house-rental-websites" className="text-primary">lake houses</Link> ·{" "}
          <Link href="/bait-and-tackle-websites" className="text-primary">bait &amp; boats</Link>
          <br />
          Town pages: <Link href="/web-design-somerset-ky" className="text-primary">Somerset KY web design</Link> ·{" "}
          <Link href="/web-design-russell-springs-ky" className="text-primary">Russell Springs KY web design</Link>
        </p>
        <h2 className="font-display text-4xl font-bold">Ready to show up for the boaters at your ramp?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CopperButton href="/quote">Get a free quote →</CopperButton>
          <GhostButton href="/work">See Lake Cumberland demos</GhostButton>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Not local? Get a ready-made website template for $129 at{" "}
          <a href="https://bluegrasstemplates.com/small-business-website-templates" target="_blank" rel="noopener noreferrer" className="text-primary">bluegrasstemplates.com</a>, or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary">{CONTACT_EMAIL}</a> about custom work.
        </p>
      </section>
    </>
  );
}

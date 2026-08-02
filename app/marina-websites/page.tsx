import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Marina Websites Lake Cumberland | Burnside, State Dock, Lee’s Ford | Flat Pricing Monticello KY",
  description:
    "Marina websites for Lake Cumberland — Burnside Marina, Lee’s Ford, State Dock, Conley Bottom, Grider Hill, Marina Rowena & more. Booking, amenities, fuel info, mobile-first. Flat one-time pricing. You own the code. Handcrafted in Monticello, KY. No monthly fees.",
  keywords: [
    "marina website Lake Cumberland",
    "Burnside Marina website",
    "Lee’s Ford marina website",
    "State Dock Jamestown website",
    "Conley Bottom website",
    "houseboat rental website Kentucky",
    "Lake Cumberland marina web design",
    "Monticello KY website designer",
    "flat rate marina website",
  ],
  alternates: { canonical: canonicalUrl("/marina-websites") },
  openGraph: {
    title:
      "Marina Websites for Lake Cumberland | Flat Pricing · Full Ownership | Monticello KY",
    description:
      "Websites for marinas and docks around Lake Cumberland — booking, slip info, fuel, amenities, and mobile-first design. Flat one-time pricing. You own everything. Built by a neighbor in Monticello.",
    url: canonicalUrl("/marina-websites"),
  },
};

const benefits = [
  {
    title: "Slip, rental & booking inquiries",
    body: "Weekend boaters and houseboat renters decide fast. A useful marina site usually makes trip types, seasonal rates, availability inquiries, and a phone number one tap away — so visitors can reach you without hunting.",
  },
  {
    title: "Amenities, fuel & pump-out — front and center",
    body: "Dock rules, fuel hours, pump-out, restrooms, restaurants, and lodging matter at the ramp. I put the practical stuff where boaters actually look, especially on a phone with spotty lake signal.",
  },
  {
    title: "Photo galleries that sell the experience",
    body: "Your docks, slips, houseboat rows, and real guests — not generic stock. The goal is a site that looks like Lake Cumberland, not a template from somewhere else.",
  },
  {
    title: "Mobile-first for dockside use",
    body: "Most visitors search from the parking lot, the cabin, or the boat. Big tap targets, fast load, tap-to-call, and directions that work when Wi-Fi is thin.",
  },
  {
    title: "Peak-season realities in mind",
    body: "Memorial Day through Labor Day is the money season. Holiday hours, busy-weekend notes, and “call ahead for slips” messaging help boaters get answers before they call the office ten times.",
  },
  {
    title: "Local SEO for real marina searches",
    body: "I tune pages for how people actually search: “Burnside Marina slip,” “houseboat rental Jamestown KY,” “Lee’s Ford restaurant,” “Conley Bottom launch.” Real towns, real ramps — not generic lake copy.",
  },
];

const marinas = [
  {
    name: "Burnside Marina",
    area: "Burnside · Pulaski County",
    note: "Gateway traffic for weekend families and lodging. A strong site pairs dock info with nearby dining and overnight stays.",
  },
  {
    name: "Lee’s Ford Marina Resort",
    area: "Nancy · Pulaski County",
    note: "Full-service resort marina. Typical needs include booking pages, restaurant menus, event calendars, and amenity detail.",
  },
  {
    name: "State Dock & Lake Cumberland Marina",
    area: "Jamestown · Russell County",
    note: "Houseboat and guide hub. Rentals, charters, and dockside services need clear rates and easy inquiries.",
  },
  {
    name: "Conley Bottom & Beaver Creek",
    area: "Monticello · Wayne County",
    note: "Home-base launches. Local marina, bait, and outfitter sites do well when they rank for real Wayne County searches.",
  },
  {
    name: "Grider Hill Dock",
    area: "Near Albany · Clinton County",
    note: "Southern shore access. Dock services and rentals serving Clinton County weekenders benefit from simple, phone-friendly pages.",
  },
  {
    name: "Marina Rowena & other docks",
    area: "Around the lake",
    note: "Smaller docks still need a fast site — fuel hours, contact, and directions that work on the road.",
  },
];

const faqs = [
  {
    q: "How much does a marina website cost?",
    a: "Starter Sites start at $1,200 one-time; Business Suites from $2,500 depending on booking tools, galleries, and page count. Flat scope-based pricing — no surprise retainers for the build. When we’re done, you own the site and the code.",
  },
  {
    q: "Do I have to pay monthly fees forever?",
    a: "No monthly fee is required to keep your website. Hosting can be yours (~$10–20/mo from a normal host) or optional care at $79/mo if you want me to handle updates. The build is a flat one-time price — not a forever agency lock-in.",
  },
  {
    q: "Can the site handle houseboat rentals and slip inquiries?",
    a: "Yes. I set up clear rental/slip inquiry forms, seasonal rate pages, amenity lists, and tap-to-call so busy visitors can reach the office without hunting. Complex live inventory systems can be scoped if you already use one.",
  },
  {
    q: "Will it work when lake cell signal is weak?",
    a: "That’s the point. Mobile-first design, lean pages, and the critical info (hours, fuel, phone, directions) high on the page so boaters get what they need even on a slow connection.",
  },
  {
    q: "Do you only work near Monticello?",
    a: "I’m based in Monticello and work with small businesses across the Lake Cumberland region — including marina towns like Burnside, Nancy (Lee’s Ford), Jamestown/State Dock, Russell Springs, Albany/Grider Hill, Conley Bottom, Marina Rowena, and the ramps between. Same neighborly process lake-wide.",
  },
  {
    q: "Who owns the website when it’s done?",
    a: "You do. Full ownership of the site and code after payment. No hostage hosting, no “we keep the files” agency model. Handcrafted in Monticello by a neighbor — then it’s yours.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Marina Websites for Lake Cumberland",
  description:
    "Custom marina websites for Lake Cumberland docks and resorts — booking inquiries, amenities, fuel info, photo galleries, and mobile-first design. Flat one-time pricing. Full ownership. Handcrafted in Monticello, KY.",
  url: canonicalUrl("/marina-websites"),
  provider: {
    "@type": "LocalBusiness",
    name: "Bluegrass Digital Forge",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monticello",
      addressRegion: "KY",
      postalCode: "42633",
      addressCountry: "US",
    },
  },
  areaServed: [
    { "@type": "Place", name: "Lake Cumberland" },
    { "@type": "City", name: "Burnside" },
    { "@type": "City", name: "Nancy" },
    { "@type": "City", name: "Jamestown" },
    { "@type": "City", name: "Monticello" },
    { "@type": "City", name: "Russell Springs" },
    { "@type": "City", name: "Albany" },
  ],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "1200",
    highPrice: "4500",
    priceCurrency: "USD",
    offerCount: "2",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function MarinaWebsitesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="label tracking-[1.6px]">
        SPECIALTY — MARINA WEBSITES LAKE CUMBERLAND
      </div>
      <h1 className="section-title tracking-tight">
        Marina Websites for Lake Cumberland — Burnside, State Dock, Lee&apos;s
        Ford &amp; Beyond
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        If you run a dock or marina on Lake Cumberland, this is the kind of
        website I build — handcrafted in Monticello, KY.{" "}
        <strong className="text-[#c8cfd3] font-medium">Flat one-time pricing</strong>
        .{" "}
        <strong className="text-[#c8cfd3] font-medium">
          You own the site and the code
        </strong>
        . No monthly retainer required to keep your build.
      </p>
      <p className="mt-3 text-[15px] text-[#c8cfd3]">
        Houseboat renters, slip holders, and weekend boaters search from the
        parking lot or the cabin. They need fuel hours, amenities, rates, and a
        phone number that works — not a slow brochure site. Whether you&apos;re
        near Burnside, Lee&apos;s Ford, State Dock, Conley Bottom, Grider Hill,
        Marina Rowena, or another dock on the lake, the job is the same: a
        clear, mobile-first site that answers boaters before they give up and
        call the next place.
      </p>

      {/* Differentiators callout */}
      <div className="mt-6 p-6 rounded-3xl bg-[#0a0c0f] border border-[#f4a261]/30">
        <div className="uppercase text-[10px] tracking-[2px] text-[#f4a261] mb-1">
          WHY THIS APPROACH FITS MARINA OWNERS
        </div>
        <h2 className="text-[21px] leading-tight font-semibold tracking-tight">
          Flat pricing. Full ownership. No agency retainer.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          Pay once for the build. Host it where you want. Keep every file.
          Optional care plan if you want help — never required. Built by a
          neighbor in Monticello who understands how this lake actually runs.
        </p>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-[14.5px] text-[#c8cfd3]">
          <li>• One-time flat rate from $1,200</li>
          <li>• You own the code forever</li>
          <li>• No monthly fees for the website itself</li>
          <li>• Handcrafted by a Monticello neighbor</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/quote" className="btn btn-primary">
          Get a marina site quote →
        </Link>
        <Link href="/services" className="btn btn-secondary">
          See pricing packages
        </Link>
        <Link href="/work" className="underline text-[#3ddbd9] self-center text-sm">
          Browse lake demos
        </Link>
      </div>

      {/* Benefits */}
      <div className="mt-12">
        <div className="label tracking-[1.5px]">WHAT A STRONG MARINA SITE USUALLY INCLUDES</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Features that matter at the dock — not generic agency fluff.
        </h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">
          Here&apos;s how I approach slip inquiries, fuel hours, photo galleries,
          and the other practical pieces boaters look for during peak season and
          last-minute Friday plans.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6"
            >
              <div className="font-semibold tracking-tight mb-1 text-[#f4a261]">
                {b.title}
              </div>
              <p className="text-[14.5px] text-[#c8cfd3]">{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Local marinas — capability + local SEO, not client list */}
      <div className="mt-12">
        <div className="label tracking-[1.5px]">LAKE CUMBERLAND DOCKS &amp; MARINAS</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          What a Lake Cumberland marina website needs
        </h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">
          Boaters around this lake search by real place names — Burnside, Lee&apos;s
          Ford, State Dock, Conley Bottom, and the rest. I live in Monticello, so
          I write and structure sites with those places and the summer rush in
          mind. Not a national franchise template. If you&apos;re running a dock
          or marina here, this is the kind of site I build.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {marinas.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5"
            >
              <div className="font-semibold tracking-tight text-white">
                {m.name}
              </div>
              <div className="text-[#c17a5a] text-[13px] mt-0.5 font-medium">
                {m.area}
              </div>
              <p className="mt-2 text-[14px] text-[#9aa6ad] leading-relaxed">
                {m.note}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-[#8a9599]">
          Local context for businesses in{" "}
          <Link href="/service-areas#jamestown" className="underline hover:text-white">
            Jamestown
          </Link>
          ,{" "}
          <Link href="/service-areas#burnside" className="underline hover:text-white">
            Burnside
          </Link>
          ,{" "}
          <Link href="/service-areas#nancy" className="underline hover:text-white">
            Nancy
          </Link>
          ,{" "}
          <Link href="/service-areas#russell-springs" className="underline hover:text-white">
            Russell Springs
          </Link>
          , and{" "}
          <Link href="/service-areas#albany" className="underline hover:text-white">
            Albany
          </Link>
          .{" "}
          <Link href="/service-areas" className="text-[#f4a261] underline hover:text-white">
            Full service areas →
          </Link>
        </p>
      </div>

      {/* Peak season practical block */}
      <div className="mt-12 rounded-3xl border border-[#1f282b] bg-[#0a0c0f] p-7">
        <div className="uppercase tracking-[1.5px] text-[11px] text-[#f4a261] mb-2">
          PEAK SEASON REALITY CHECK
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Summer weekends fill slips. Your site should work as hard as your dock
          hands.
        </h2>
        <p className="mt-3 text-[15px] text-[#c8cfd3]">
          Holiday weekends, houseboat turnover days, and storm delays all
          generate phone calls. A clear site answers the easy questions — hours,
          fuel, rules, “do you have a slip this weekend?” — so your team can
          focus on the water. Winter is often the best time to build or refresh
          so you&apos;re ready when the water warms.
        </p>
        <ul className="mt-4 space-y-2 text-[14.5px] text-[#c8cfd3]">
          <li>• Seasonal hours and holiday schedules that update without a developer</li>
          <li>• Directions that mention the right highway approaches (US 27, KY 90, US 127, KY 80)</li>
          <li>• Photo-led pages for restaurants, events, and lodging tied to the marina</li>
          <li>• Simple contact that works for out-of-state houseboat guests and locals alike</li>
        </ul>
      </div>

      {/* Ownership / pricing */}
      <div className="mt-12 rounded-3xl border border-[#f4a261]/30 bg-[#0a0c0f] p-7">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">
          FLAT PRICING · FULL OWNERSHIP
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Built for owners who hate monthly website retainers.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          Starter Sites from <strong className="text-white">$1,200</strong>{" "}
          one-time. Business Suites from{" "}
          <strong className="text-white">$2,500</strong> one-time for fuller
          booking, gallery, and multi-page marina needs. When the project is
          paid, <strong className="text-white">you own everything</strong> —
          site, code, content. Optional $79/mo care if you want me on call; host
          it yourself if you don&apos;t.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Get a free marina quote →
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Compare packages
          </Link>
        </div>
      </div>

      {/* Related verticals */}
      <div className="mt-10 rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
        <div className="font-semibold tracking-tight mb-2">Related Lake Cumberland specialties</div>
        <ul className="space-y-2 text-[14.5px] text-[#c8cfd3]">
          <li>
            <Link href="/fishing-guide-websites" className="text-[#f4a261] underline hover:text-white">
              Fishing guide websites
            </Link>{" "}
            — striper, bass &amp; multi-species captains
          </li>
          <li>
            <Link href="/food-truck-websites" className="text-[#f4a261] underline hover:text-white">
              Food truck websites
            </Link>{" "}
            — dockside and festival operators
          </li>
          <li>
            <Link href="/service-areas" className="text-[#f4a261] underline hover:text-white">
              Service areas
            </Link>{" "}
            — every major ramp town on the lake
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="mt-14">
        <h2 className="font-semibold text-xl tracking-tight mb-6">
          Marina website FAQ
        </h2>
        <div className="divide-y divide-[#1a2225] max-w-3xl">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium gap-4">
                {faq.q}
                <span className="text-[#3ddbd9] group-open:rotate-45 transition shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-2 text-[#8a9599] pr-8 text-[15px]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h2 className="text-2xl tracking-tight font-semibold">
          Ready for a marina site that works as hard as your dock?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me about your dock or marina — anywhere on Lake Cumberland. Flat
          quote. Full ownership. Honest recommendation from Monticello.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary px-8">
            Get a free quote in 2 minutes →
          </Link>
          <Link href="/contact" className="btn btn-secondary px-7">
            Contact me directly
          </Link>
        </div>
        <p className="mt-4 text-xs text-[#8a9599]">
          Handcrafted in Monticello, KY · Flat one-time pricing · You own the
          code · No monthly website retainer
        </p>
      </div>
    </div>
  );
}

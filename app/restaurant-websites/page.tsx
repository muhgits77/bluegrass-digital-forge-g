import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Restaurant Websites Monticello KY | Lake Cumberland Digital Menus",
  description:
    "Restaurant websites for Monticello KY and Lake Cumberland — readable digital menus, catering paths, mobile-first design for locals and weekend lake traffic. Flat one-time pricing from $1,200. You own the code. Handcrafted in Monticello, KY.",
  keywords: [
    "restaurant website Monticello KY",
    "Lake Cumberland restaurant website",
    "Wayne County restaurant web design",
    "digital menu website Kentucky",
    "Monticello KY website designer",
    "restaurant website Lake Cumberland",
    "steakhouse website Kentucky",
  ],
  alternates: { canonical: canonicalUrl("/restaurant-websites") },
  openGraph: {
    title:
      "Restaurant Websites for Monticello KY & Lake Cumberland | Flat Pricing",
    description:
      "Digital menus, catering paths, and mobile-first sites for restaurants around Monticello and Lake Cumberland. Flat one-time pricing. You own everything. Built by a neighbor in Monticello.",
    url: canonicalUrl("/restaurant-websites"),
  },
};

const benefits = [
  {
    title: "Menus people can actually read on a phone",
    body: "Not a blurry PDF. Clear sections, prices when you want them, and specials you can update without calling a developer every Friday.",
  },
  {
    title: "Catering and group paths that get used",
    body: "Cabin crowds, church dinners, post-ramp tables — a simple form or phone path for large orders beats an email buried in the footer.",
  },
  {
    title: "Hours, location, and tap-to-call up front",
    body: "Weekend guests decide fast. They need open hours, directions, and a number that works — especially after a day on the water.",
  },
  {
    title: "Photos of your food and room",
    body: "Your plates and your dining room, not stock from somewhere else. Honest pictures build more trust than perfect studio shots of food you don’t serve.",
  },
  {
    title: "Built for lake + town traffic",
    body: "Locals know you. Boaters and cabin renters often don’t. A clear site helps both — Monticello weeknights and Saturday nights when the lake empties into town.",
  },
  {
    title: "Local search language that fits",
    body: "Pages written for how people actually search around here — Monticello, Albany, Jamestown, Burnside, Nancy, Russell Springs — not generic “best restaurant near me” fluff.",
  },
];

const towns = [
  {
    name: "Monticello & Wayne County",
    note: "Home base. Supper after work, weekend family tables, and visitors coming off Conley Bottom or Beaver Creek.",
  },
  {
    name: "Jamestown & State Dock area",
    note: "Houseboat and cabin traffic looking for a sit-down meal after a day on the water.",
  },
  {
    name: "Burnside & US 27 corridor",
    note: "Gateway families and lodging guests comparing a few dinner options on the phone.",
  },
  {
    name: "Nancy · Lee’s Ford",
    note: "Resort and marina guests who want a clear menu and hours before they leave the dock.",
  },
  {
    name: "Russell Springs & Albany",
    note: "Local and southern-shore traffic — sites that rank for real nearby searches, not just big city names.",
  },
  {
    name: "Around the lake",
    note: "Same approach for any town-and-lake restaurant: readable menu, honest photos, easy contact.",
  },
];

const faqs = [
  {
    q: "How much does a restaurant website cost?",
    a: "Starter Sites start at $1,200 one-time; Business Suites from $2,500 if you need more pages, fuller menus, galleries, or booking detail. Flat scope-based pricing — not a monthly agency contract for the build. You own the finished site and code.",
  },
  {
    q: "Can we put the full menu online?",
    a: "Yes. Readable text menus work better than photo-only PDFs for phones and search. We can organize by section, note dietary tags if you use them, and leave room for daily specials.",
  },
  {
    q: "Do you handle catering inquiries?",
    a: "We set up a simple catering or large-order path — form, phone, or both — so groups don’t have to dig. Keep it light enough that the kitchen can answer without babysitting software.",
  },
  {
    q: "Will it help with “restaurant Monticello KY” or lake searches?",
    a: "That’s the goal of clear titles, real place names, and honest content about how you serve locals and weekend lake traffic. No keyword stuffing — just pages that match how people around here actually look for supper.",
  },
  {
    q: "Are there monthly fees?",
    a: "No monthly fee required for the website itself. Host it yourself for normal hosting costs, or use the optional $79/mo care plan if you want help with updates. The design and build are one-time flat rate.",
  },
  {
    q: "Who owns the site?",
    a: "You do. Full ownership of the site and code after payment. Handcrafted in Monticello by a neighbor — not locked inside an agency platform.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Restaurant Websites for Monticello KY & Lake Cumberland",
  description:
    "Custom restaurant websites for Monticello, Wayne County, and Lake Cumberland — digital menus, catering paths, mobile-first design. Flat one-time pricing. Full ownership. Handcrafted in Monticello, KY.",
  url: canonicalUrl("/restaurant-websites"),
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
    { "@type": "City", name: "Monticello" },
    { "@type": "City", name: "Jamestown" },
    { "@type": "City", name: "Burnside" },
    { "@type": "City", name: "Nancy" },
    { "@type": "City", name: "Russell Springs" },
    { "@type": "City", name: "Albany" },
    { "@type": "AdministrativeArea", name: "Wayne County" },
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

export default function RestaurantWebsitesPage() {
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
        SPECIALTY — RESTAURANT WEBSITES MONTICELLO KY
      </div>
      <h1 className="section-title tracking-tight">
        Restaurant Websites for Monticello KY &amp; Lake Cumberland
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        Websites for restaurants and supper houses around Monticello and the
        lake — built by a neighbor who lives here.{" "}
        <strong className="text-[#c8cfd3] font-medium">Flat one-time pricing</strong>
        .{" "}
        <strong className="text-[#c8cfd3] font-medium">
          You own the site and the code
        </strong>
        . No monthly retainer required to keep what you paid for.
      </p>
      <p className="mt-3 text-[15px] text-[#c8cfd3]">
        Locals already know your door. Weekend boaters and cabin guests often
        don&apos;t. They search from a phone for a menu they can read, hours
        that make sense, and whether you can seat a group — not a slow brochure
        or a PDF that won&apos;t open on weak signal.
      </p>

      <div className="mt-6 p-6 rounded-3xl bg-[#0a0c0f] border border-[#f4a261]/30">
        <div className="uppercase text-[10px] tracking-[2px] text-[#f4a261] mb-1">
          FLAT PRICING · FULL OWNERSHIP · NO RETAINER LOCK-IN
        </div>
        <h2 className="text-[21px] leading-tight font-semibold tracking-tight">
          Pay once for the build. Keep the files.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          Host it where you want. Update specials when the kitchen wants to.
          Optional care if you need help — never required. Handcrafted in
          Monticello for owners who already have enough monthly bills.
        </p>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-[14.5px] text-[#c8cfd3]">
          <li>• Starter Sites from $1,200 one-time</li>
          <li>• You own the code forever</li>
          <li>• No monthly fees for the website itself</li>
          <li>• Built by a neighbor — not a call center</li>
        </ul>
      </div>

      {/* Live examples */}
      <div className="mt-12">
        <div className="label tracking-[1.5px]">LIVE EXAMPLES</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Restaurant website examples
        </h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">
          Portfolio pieces on this site — menu language and layout ideas for
          sit-down places around the lake. Food trucks have their own page if
          that&apos;s closer to what you run.
        </p>
        <ul className="mt-5 space-y-4">
          <li className="rounded-2xl border border-[#f4a261]/30 bg-[#0a0c0f] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8a9599]">
              Featured · BBQ restaurant
            </div>
            <Link
              href="/work/blue-door-smokehouse"
              className="mt-1 block font-semibold tracking-tight text-white hover:text-[#f4a261]"
            >
              Blue Door Smokehouse
            </Link>
            <p className="mt-1.5 text-[14.5px] text-[#c8cfd3] leading-relaxed">
              Kentucky pit BBQ layout with menu, catering, and a local
              supper-house feel for lake and town traffic.
            </p>
            <Link
              href="/work/blue-door-smokehouse"
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Read the example →
            </Link>
          </li>
          <li className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8a9599]">
              Featured · Steakhouse
            </div>
            <Link
              href="/work/hickory-forge-steakhouse"
              className="mt-1 block font-semibold tracking-tight text-white hover:text-[#f4a261]"
            >
              Hickory Forge Steakhouse
            </Link>
            <p className="mt-1.5 text-[14.5px] text-[#c8cfd3] leading-relaxed">
              A warmer neighborhood steakhouse layout with menu and reservation
              feel for Lake Cumberland supper traffic.
            </p>
            <Link
              href="/work/hickory-forge-steakhouse"
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Read the example →
            </Link>
          </li>
          <li className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8a9599]">
              Supporting · Small-town food
            </div>
            <Link
              href="/work/sunny-hollow-donut-dash"
              className="mt-1 block font-semibold tracking-tight text-white hover:text-[#f4a261]"
            >
              Sunny Hollow Donut Dash
            </Link>
            <p className="mt-1.5 text-[14.5px] text-[#c8cfd3] leading-relaxed">
              Small-town shop feel with daily menu and simple pre-order path —
              useful if your place leans bakery or morning traffic.
            </p>
            <Link
              href="/work/sunny-hollow-donut-dash"
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Read the example →
            </Link>
          </li>
        </ul>
        <p className="mt-4 text-[14px] text-[#8a9599]">
          Running a truck instead of a dining room?{" "}
          <Link
            href="/food-truck-websites"
            className="text-[#f4a261] underline hover:text-white"
          >
            Food truck websites
          </Link>{" "}
          and the{" "}
          <Link
            href="/work/fiesta-taqueria"
            className="underline hover:text-white"
          >
            Fiesta Taqueria
          </Link>{" "}
          example.{" "}
          <Link href="/work" className="underline hover:text-white">
            All portfolio examples →
          </Link>
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/quote" className="btn btn-primary">
          Get a restaurant site quote →
        </Link>
        <Link href="/services" className="btn btn-secondary">
          See pricing packages
        </Link>
        <Link
          href="/work"
          className="underline text-[#3ddbd9] self-center text-sm"
        >
          Browse all examples
        </Link>
      </div>

      <div className="mt-12">
        <div className="label tracking-[1.5px]">WHAT HELPS GUESTS CHOOSE</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Practical pieces for restaurants around the lake.
        </h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">
          Written for how people actually decide on dinner here — often on a
          phone, sometimes after a long day on the water.
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

      <div className="mt-12 rounded-3xl border border-[#1f282b] bg-[#0a0c0f] p-7">
        <div className="uppercase tracking-[1.5px] text-[11px] text-[#f4a261] mb-2">
          TYPICAL RESTAURANT SITE INCLUSIONS
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-[#c8cfd3]">
          <li>Home page with clear hours, location, and tap-to-call</li>
          <li>Digital menu by section (not only a downloadable PDF)</li>
          <li>Catering or group inquiry path</li>
          <li>Photo space for food and the dining room</li>
          <li>About / story in plain local language</li>
          <li>Reservation or call-ahead notes if you use them</li>
          <li>Google Business basics and local SEO for Monticello &amp; lake searches</li>
        </ul>
      </div>

      <div className="mt-12">
        <div className="label tracking-[1.5px]">
          TOWNS &amp; LAKE TRAFFIC
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Built with Monticello and the shore towns in mind.
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {towns.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5"
            >
              <div className="font-semibold tracking-tight text-white">
                {t.name}
              </div>
              <p className="mt-2 text-[14px] text-[#9aa6ad] leading-relaxed">
                {t.note}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-[#8a9599]">
          More local context for{" "}
          <Link
            href="/service-areas#jamestown"
            className="underline hover:text-white"
          >
            Jamestown
          </Link>
          ,{" "}
          <Link
            href="/service-areas#burnside"
            className="underline hover:text-white"
          >
            Burnside
          </Link>
          ,{" "}
          <Link
            href="/service-areas#nancy"
            className="underline hover:text-white"
          >
            Nancy
          </Link>
          ,{" "}
          <Link
            href="/service-areas#russell-springs"
            className="underline hover:text-white"
          >
            Russell Springs
          </Link>
          , and{" "}
          <Link
            href="/service-areas#albany"
            className="underline hover:text-white"
          >
            Albany
          </Link>
          .{" "}
          <Link
            href="/service-areas"
            className="text-[#f4a261] underline hover:text-white"
          >
            Full service areas →
          </Link>
        </p>
      </div>

      <div className="mt-12 rounded-3xl border border-[#f4a261]/30 bg-[#0a0c0f] p-7">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">
          FLAT PRICING · FULL OWNERSHIP
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Honest pricing for small restaurants.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          You already pay for food cost, labor, and utilities. A website
          shouldn&apos;t be another forever subscription.{" "}
          <strong className="text-white">Flat one-time pricing</strong> for the
          build. <strong className="text-white">You own the code</strong>. Host
          it your way. Optional care if you want help — never required.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Get a free restaurant quote →
          </Link>
          <Link href="/services" className="btn btn-secondary">
            See Starter vs Business Suite
          </Link>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
        <div className="font-semibold tracking-tight mb-2">
          Related Lake Cumberland specialties
        </div>
        <ul className="space-y-2 text-[14.5px] text-[#c8cfd3]">
          <li>
            <Link
              href="/food-truck-websites"
              className="text-[#f4a261] underline hover:text-white"
            >
              Food truck websites
            </Link>{" "}
            — location updates and menus for trucks on the move
          </li>
          <li>
            <Link
              href="/marina-websites"
              className="text-[#f4a261] underline hover:text-white"
            >
              Marina websites
            </Link>{" "}
            — docks and resorts that send hungry weekend guests your way
          </li>
          <li>
            <Link
              href="/fishing-guide-websites"
              className="text-[#f4a261] underline hover:text-white"
            >
              Fishing guide websites
            </Link>{" "}
            — captains who book full days on the lake
          </li>
          <li>
            <Link
              href="/work/bluegrass-fence-co"
              className="text-[#f4a261] underline hover:text-white"
            >
              Bluegrass Fence Co. example
            </Link>
            {" · "}
            <Link
              href="/work/ridge-pasture-care"
              className="text-[#f4a261] underline hover:text-white"
            >
              Ridge Pasture Care
            </Link>
            {" · "}
            <Link
              href="/work/ignite-fitness-company"
              className="text-[#f4a261] underline hover:text-white"
            >
              Gym example
            </Link>
          </li>
          <li>
            <Link
              href="/work"
              className="text-[#f4a261] underline hover:text-white"
            >
              All portfolio examples
            </Link>{" "}
            — steakhouses, shops, trucks, and more
          </li>
        </ul>
      </div>

      <div className="mt-14">
        <h2 className="font-semibold text-xl tracking-tight mb-6">
          Restaurant website FAQ
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

      <div className="mt-12 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h2 className="text-2xl tracking-tight font-semibold">
          Thinking about a clearer menu and site for your place?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me about your restaurant — Monticello, the shore towns, or
          anywhere around Lake Cumberland. Flat quote. Full ownership. Honest
          recommendation from a neighbor.
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

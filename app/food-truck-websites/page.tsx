import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL } from "@/lib/constants";
import DemoLiveLink, { DemoPortfolioOrLiveLink } from "@/components/DemoLiveLink";
import { loadLivePublicDemosCatalog } from "@/lib/demos";

export const metadata: Metadata = {
  title:
    "Food Truck Websites Kentucky | Lake Cumberland & Monticello | Flat Pricing",
  description:
    "Food truck websites for Lake Cumberland and Kentucky operators. Real-time location, menus, festivals, mobile dashboard. Flat one-time pricing from $1,200. You own the code — no monthly website retainers. Handcrafted in Monticello, KY.",
  keywords: [
    "food truck website Kentucky",
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "Wayne County web design",
    "food truck website Lake Cumberland",
    "real-time food truck location",
    "food truck schedule updates",
    "Charleston Food Truck Website",
    "Lowcountry Web Design",
    "flat rate food truck website",
  ],
  alternates: { canonical: canonicalUrl("/food-truck-websites") },
  openGraph: {
    title:
      "Food Truck Websites Kentucky | Lake Cumberland | Flat Pricing · Full Ownership",
    description:
      "Real-time location, menus, and festival schedules for Kentucky food trucks. Flat one-time pricing. You own the code. Built by a neighbor in Monticello for Lake Cumberland and beyond.",
    url: canonicalUrl("/food-truck-websites"),
  },
};

const faqs = [
  {
    q: "How much does a food truck website cost in Kentucky?",
    a: "Starter Sites start at $1,200 one-time; fuller Business Suites from $2,500 if you need more pages, ordering, or custom features. TruckDash (the food-truck web app) is priced separately. Flat scope-based pricing — no monthly retainer required for the website build. You own the finished site and code.",
  },
  {
    q: "Can I update my location from my phone?",
    a: "Yes — that’s the whole point. A simple mobile dashboard lets you post “Where We Are Today,” change hours, and lock festival dates without a laptop or calling a developer. Built for owners who are prepping, driving, and serving — not sitting at a desk.",
  },
  {
    q: "Do I have to pay monthly website fees forever?",
    a: "No. The website build is a flat one-time price. Host it yourself for normal hosting costs, or use the optional $79/mo care plan if you want me handling updates. Nothing locks you into an agency retainer just to keep your pages live.",
  },
  {
    q: "Who owns the food truck website?",
    a: "You do. Full ownership of the site and code after payment. Handcrafted in Monticello by a neighbor — then it’s yours. No hostage files, no “we keep the keys” agency model.",
  },
  {
    q: "Do you only serve Lake Cumberland trucks?",
    a: "Lake Cumberland and broader Kentucky operators are home base — marina stops, festivals, Main Street lunch spots from Monticello to Somerset and beyond. We also build Charleston SC and Lowcountry food truck sites with the same real-time location approach.",
  },
  {
    q: "What’s the difference between a food truck website and TruckDash?",
    a: "A website is your public home — location, menu, ordering, SEO. TruckDash is our Bluegrass Command Center web app for schedule, live map, flyer studio, and offline tools. Many owners start with a site; some add TruckDash when they want the full ops toolkit.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Food Truck Websites Kentucky",
  description:
    "Custom food truck websites for Lake Cumberland and Kentucky operators with real-time location updates, menus, festival calendars, and mobile-first design. Flat one-time pricing. Full ownership. Handcrafted in Monticello, KY.",
  url: canonicalUrl("/food-truck-websites"),
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
    { "@type": "AdministrativeArea", name: "Kentucky" },
    { "@type": "City", name: "Monticello" },
    { "@type": "City", name: "Jamestown" },
    { "@type": "City", name: "Burnside" },
    { "@type": "City", name: "Somerset" },
    { "@type": "City", name: "Albany" },
    { "@type": "City", name: "Russell Springs" },
    { "@type": "City", name: "Nancy" },
    { "@type": "Place", name: "South Carolina Lowcountry" },
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

export default async function FoodTruckWebsites() {
  const { demos } = await loadLivePublicDemosCatalog();
  const bySlug = new Map(demos.map((d) => [d.slug.toLowerCase(), d]));
  const fiesta = bySlug.get("fiesta-taqueria");
  const smash = bySlug.get("cumberland-smash");
  const cluckin = bySlug.get("cluckin-chaos");

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
        SPECIALTY — FOOD TRUCK WEBSITE KENTUCKY
      </div>
      <h1 className="section-title tracking-tight">
        Food Truck Websites in Kentucky — Lake Cumberland, Monticello &amp;
        Beyond
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        Bold, fast food truck websites for Lake Cumberland and Kentucky operators —
        handcrafted in Monticello by a neighbor.{" "}
        <strong className="text-[#c8cfd3] font-medium">Flat one-time pricing</strong>
        .{" "}
        <strong className="text-[#c8cfd3] font-medium">
          You own the site and the code
        </strong>
        . No monthly website retainer required.
      </p>

      <p className="mt-3 text-[15px] text-[#c8cfd3]">
        The difference that matters most: your customers can always find you
        today. Real-time location, today&apos;s hours, and festival stops update
        in seconds from your phone — no laptop, no waiting on a designer. Warm,
        practical sites that turn “where are you today?” into “see you in 10
        minutes.” Built for trucks that roll to marina lots, Main Street lunch
        rushes, county festivals, and weekend lake traffic from Monticello to
        Somerset — and for operators across Kentucky who want the same honesty.
      </p>

      {/* Ownership differentiators */}
      <div className="mt-6 p-6 rounded-3xl bg-[#0a0c0f] border border-[#f4a261]/30">
        <div className="uppercase text-[10px] tracking-[2px] text-[#f4a261] mb-1">
          FLAT PRICING · FULL OWNERSHIP · NO RETAINER LOCK-IN
        </div>
        <h2 className="text-[21px] leading-tight font-semibold tracking-tight">
          You didn’t buy a truck to rent a website forever.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          Pay once for the build. Host it where you want. Keep every file.
          Optional care if you want help — never required. Handcrafted in
          Monticello for Kentucky food truckers who hate monthly agency fees.
        </p>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-[14.5px] text-[#c8cfd3]">
          <li>• Starter Sites from $1,200 one-time</li>
          <li>• You own the code forever</li>
          <li>• No monthly fees for the website itself</li>
          <li>• Built by a neighbor — not a call center</li>
        </ul>
      </div>

      {/* Biggest perk */}
      <div className="mt-6 p-6 rounded-3xl bg-[#0a0c0f] border border-[#f4a261]/30">
        <div className="uppercase text-[10px] tracking-[2px] text-[#f4a261] mb-1">
          THE BIGGEST PERK FOR FOOD TRUCKS
        </div>
        <h2 className="text-[21px] leading-tight font-semibold tracking-tight">
          “Where We Are Today” — update your location in seconds, from your
          phone.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          Daily spots, festival grounds, last-minute marina lots — post it
          before you roll out or while you&apos;re setting up. Customers,
          Google, and your site all see the right place at the right time. No
          more “we&apos;re around here somewhere” texts.
        </p>
        <div className="mt-3 text-[14.5px] text-[#8a9599]">
          Simple mobile dashboard. Big friendly buttons. One tap to say
          you&apos;re at the riverfront, the distillery, Conley Bottom for a
          weekend event, or downtown Monticello for lunch. Change it again
          mid-service if the crowd moves.
        </div>
      </div>

      <div className="mt-8 card p-7 rounded-3xl space-y-4 text-[15px]">
        <p>Typical inclusions for food truck sites:</p>
        <ul className="list-disc pl-5 space-y-1 text-[#c8cfd3]">
          <li>Current location + schedule (updated weekly or daily)</li>
          <li>Full menu with photos and dietary tags</li>
          <li>Online pre-order or catering inquiry form</li>
          <li>Instagram + Facebook feed embed or links</li>
          <li>Google Maps + tap-to-call prominently</li>
          <li>Event / private booking calendar link</li>
        </ul>
      </div>

      <div className="mt-8 rounded-3xl border border-[#1f282b] bg-[#0a0c0f] p-7">
        <div className="uppercase tracking-[1.5px] text-[11px] text-[#f4a261] mb-2">
          THE #1 PAIN POINT WE SOLVE
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Real-time location updates that actually work on the road.
        </h2>
        <p className="mt-3 text-[15px] text-[#c8cfd3]">
          Food truck owners don&apos;t sit at desks. You&apos;re prepping,
          driving, serving, breaking down. Our sites give you a dead-simple,
          mobile-friendly admin dashboard. Tap in today&apos;s spot before you
          leave the house. Update hours on the fly if a festival runs long or
          the crowd moves. Change your festival schedule between stops. Your
          website, Google, and customers see the truth instantly.
        </p>
        <p className="mt-3 text-[15px] text-[#c8cfd3]">
          The quick-update screen is designed for real life: big tap targets,
          clear “Where We Are Today” field, and a simple save that pushes
          everywhere in seconds. No menus to dig through, no desktop required.
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-[14.5px] text-[#c8cfd3]">
          <li className="flex gap-2">
            • Post “at the riverfront today 11–3” from the passenger seat
          </li>
          <li className="flex gap-2">
            • Mark sold-out items or add the daily special while the grill&apos;s hot
          </li>
          <li className="flex gap-2">
            • Lock in a full month of festival dates in one sitting
          </li>
          <li className="flex gap-2">
            • Customers get accurate directions and pre-order links without calling
          </li>
        </ul>
        <p className="mt-4 text-[13px] text-[#8a9599]">
          No training videos. No confusing CMS. We set it up so it feels like
          texting a friend who already knows your truck.
        </p>
      </div>

      {/* Local Lake Cumberland stops */}
      <div className="mt-12 rounded-3xl border border-[#1f282b] bg-[#0a0c0f] p-7">
        <div className="label tracking-[1.5px] text-[#f4a261]">
          LAKE CUMBERLAND + KENTUCKY STOPS
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Built for how trucks actually move around the lake and the Commonwealth.
        </h2>
        <p className="mt-3 text-[15px] text-[#c8cfd3]">
          Summer weekends mean marina lots, cabin rentals, and boaters looking
          for lunch without leaving the shore. Weekdays mean office parks,
          factory gates, and downtown lunch lines. Your site should make both
          easy to find.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-[14.5px] text-[#c8cfd3]">
          <div>
            <span className="font-medium text-white">Marina &amp; ramp days</span>
            <br />
            Burnside, Lee&apos;s Ford, State Dock, Conley Bottom — post the lot
            or event, hours, and menu so boaters know before they walk up the
            hill.
          </div>
          <div>
            <span className="font-medium text-white">Town lunch &amp; festivals</span>
            <br />
            Monticello, Jamestown, Russell Springs, Albany, Nancy, Somerset —
            clear “Where We Are Today” for locals who follow you stop to stop.
          </div>
          <div>
            <span className="font-medium text-white">Peak season chaos</span>
            <br />
            Holiday weekends and lake festivals fill parking lots. Update sold-outs
            and specials from the truck so the line stays happy.
          </div>
          <div>
            <span className="font-medium text-white">Broader Kentucky routes</span>
            <br />
            Same tools for operators running fairs, markets, and multi-town
            weeks — not just a single fixed address site.
          </div>
        </div>
        <p className="mt-4 text-[14px] text-[#8a9599]">
          Local context for{" "}
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

      {/* Live portfolio examples — first-party landings + TruckDash */}
      <div className="mt-12">
        <div className="label tracking-[1.5px]">LIVE EXAMPLES</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Food truck website examples
        </h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">
          Featured portfolio pieces — location, menu, and weekend stops for
          Kentucky and Lowcountry trucks. Flat one-time pricing on real builds;
          you own the code.
        </p>
        <ul className="mt-5 space-y-4">
          <li className="rounded-2xl border border-[#f4a261]/30 bg-[#0a0c0f] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8a9599]">
              Featured · Food truck
            </div>
            <DemoPortfolioOrLiveLink
              demo={fiesta}
              className="mt-1 block font-semibold tracking-tight text-white hover:text-[#f4a261]"
            >
              {fiesta?.title || "Fiesta Taqueria"}
            </DemoPortfolioOrLiveLink>
            <p className="mt-1.5 text-[14.5px] text-[#c8cfd3] leading-relaxed">
              {fiesta?.description ||
                "Mexican food truck example with a readable menu, today's location, and catering notes for Wayne County and lake traffic."}
            </p>
            <Link
              href="/work/fiesta-taqueria"
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Read the example →
            </Link>
            {" · "}
            <DemoLiveLink
              demo={fiesta}
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Open live demo →
            </DemoLiveLink>
          </li>
          <li className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8a9599]">
              Featured · Food truck
            </div>
            <DemoPortfolioOrLiveLink
              demo={smash}
              className="mt-1 block font-semibold tracking-tight text-white hover:text-[#f4a261]"
            >
              {smash?.title || "Cumberland Smash"} ↗
            </DemoPortfolioOrLiveLink>
            <p className="mt-1.5 text-[14.5px] text-[#c8cfd3] leading-relaxed">
              {smash?.description ||
                "Smashburger truck for Lake Cumberland — menu, today's location, and weekend lake-road stops."}
            </p>
            <DemoLiveLink
              demo={smash}
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Open live demo →
            </DemoLiveLink>
          </li>
          <li className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8a9599]">
              Featured · Food truck
            </div>
            <DemoPortfolioOrLiveLink
              demo={cluckin}
              className="mt-1 block font-semibold tracking-tight text-white hover:text-[#f4a261]"
            >
              {cluckin?.title || "Cluckin Chaos"} ↗
            </DemoPortfolioOrLiveLink>
            <p className="mt-1.5 text-[14.5px] text-[#c8cfd3] leading-relaxed">
              {cluckin?.description ||
                "Crispy chicken truck with live location, bold menu, and festival-ready layout for Lake Cumberland operators."}
            </p>
            <DemoLiveLink
              demo={cluckin}
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Open live demo →
            </DemoLiveLink>
          </li>
          <li className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5">
            <div className="text-[11px] uppercase tracking-wider text-[#8a9599]">
              Featured · Food truck app
            </div>
            <Link
              href="/truckdash"
              className="mt-1 block font-semibold tracking-tight text-white hover:text-[#f4a261]"
            >
              TruckDash
            </Link>
            <p className="mt-1.5 text-[14.5px] text-[#c8cfd3] leading-relaxed">
              Bluegrass Command Center — schedule, live map, flyer studio, and
              offline tools. Flat one-time pricing separate from the website
              build.
            </p>
            <Link
              href="/truckdash"
              className="mt-2 inline-block text-[13px] text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              Choose your TruckDash plan →
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <Link href="/quote" className="btn btn-primary">
          Get a food truck site quote →
        </Link>
        <span className="mx-3 text-[#8a9599]">or</span>
        <Link href="/work/fiesta-taqueria" className="underline text-[#3ddbd9]">
          see the Fiesta Taqueria example
        </Link>
      </div>

      {/* TruckDash */}
      <div className="mt-10 rounded-3xl border border-[#f4a261]/30 bg-[#0a0c0f] p-7">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">
          TRUCKDASH — FOOD TRUCK WEB APP
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Need the Bluegrass Command Center, not just a website?
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          TruckDash is our dashboard + flyer studio for Kentucky food truckers —
          schedule manager, live map with location sharing, offline mode, and
          lifetime updates. Starter $1,497 · Pro $2,497 one-time (Most Popular):
          Advanced Flyer Studio, multi-stop routing, recurring event calendar,
          advanced menu pricing, social caption generator, priority support
          &amp; custom branding guidance — launch offer: first 10 trucks get Pro
          for $1,997 through August 2026.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/truckdash" className="btn btn-primary">
            Choose Your TruckDash Plan →
          </Link>
          <Link href="/quote?plan=starter" className="btn btn-secondary">
            Buy Starter
          </Link>
          <Link href="/quote?plan=pro" className="btn btn-secondary">
            Buy Pro
          </Link>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="mt-12">
        <div className="max-w-2xl">
          <div className="label tracking-[1.5px]">MORE THAN A PRETTY MENU</div>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">
            Benefits that help you sell more barbecue, tacos, and donuts.
          </h2>
          <p className="mt-2 text-[15px] text-[#9aa6ad]">
            Every feature solves a real problem food truck owners face in Lake
            Cumberland, Wayne County, broader Kentucky, and the South Carolina
            Lowcountry.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#f4a261]/40 bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1 text-[#f4a261]">
              Where We Are Today — real-time location updates
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Easy on-the-fly updates for daily spots, festivals, and events.
              Change your location and hours in seconds using the simple mobile
              dashboard. Customers always know exactly where to find you.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1">
              Online ordering &amp; pre-orders
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Let customers place orders or reserve favorites before you arrive.
              Great for office park lunches, large groups at festivals, or busy
              waterfront days.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1">
              Beautiful food photography
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Your real shots or simple phone photos that look mouth-watering on
              every device. No stock photos of someone else&apos;s brisket. Your
              truck, your food, your style.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1">
              Festival &amp; event booking calendar
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Show organizers and private clients when you&apos;re available.
              Display confirmed festivals, markets, and private events so
              customers know where the good stuff will be all season.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1">
              Instant menu updates
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Sold out of pulled pork? Added a smoked brisket special? Toggle
              items live from the truck or the parking lot. Your site and your
              customers stay in sync.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1">
              Full ownership — no monthly lock-in
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Flat one-time pricing for the build. You own the code. Host it
              yourself or use optional care. Built for owners who already pay
              enough for grease, propane, and festival booth fees.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1">
              Customer reviews on the site
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Collect and display real reviews so new customers at a new stop
              see that the locals already love you. Instant trust when
              you&apos;re the new truck in town.
            </p>
          </div>
          <div className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <div className="font-semibold tracking-tight mb-1">
              Mobile-first everything
            </div>
            <p className="text-[14.5px] text-[#c8cfd3]">
              Your customers are on phones. You&apos;re on a phone between
              services. Viewing today&apos;s location to placing a pre-order is
              fast, big-tap friendly, and reliable on spotty festival Wi-Fi.
            </p>
          </div>
        </div>
      </div>

      {/* Charleston SC */}
      <div className="mt-12 rounded-3xl border border-[#243530] bg-[#0a0c0f] p-8">
        <div className="label tracking-[1.5px] text-[#f4a261]">
          CHARLESTON SC &amp; LOWCOUNTRY FOOD TRUCKS
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Websites that understand the Lowcountry rhythm.
        </h2>
        <p className="mt-3 text-[15px] text-[#c8cfd3]">
          Charleston food trucks roll to the waterfront, King Street pop-ups,
          North Charleston markets, Firefly Distillery events, Summerville town
          days, and festivals across the Lowcountry. Same flat pricing and
          neighborly process as our Lake Cumberland food truck sites. You own
          the code.
        </p>
        <div className="mt-5">
          <Link
            href="/south-carolina"
            className="text-[#f4a261] underline hover:text-white"
          >
            Learn more about Charleston SC &amp; Lowcountry websites →
          </Link>
        </div>
      </div>

      {/* Related */}
      <div className="mt-10 rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
        <div className="font-semibold tracking-tight mb-2">
          Related Lake Cumberland specialties
        </div>
        <ul className="space-y-2 text-[14.5px] text-[#c8cfd3]">
          <li>
            <Link
              href="/marina-websites"
              className="text-[#f4a261] underline hover:text-white"
            >
              Marina websites
            </Link>{" "}
            — docks and resorts that host weekend crowds
          </li>
          <li>
            <Link
              href="/fishing-guide-websites"
              className="text-[#f4a261] underline hover:text-white"
            >
              Fishing guide websites
            </Link>{" "}
            — striper &amp; bass captains around the lake
          </li>
          <li>
            <Link
              href="/restaurant-websites"
              className="text-[#f4a261] underline hover:text-white"
            >
              Restaurant websites
            </Link>{" "}
            — sit-down menus and catering for lake + town traffic
          </li>
          <li>
            <Link
              href="/work/sunny-hollow-donut-dash"
              className="text-[#f4a261] underline hover:text-white"
            >
              Sunny Hollow donut shop example
            </Link>{" "}
            — small-town food retail with daily menu notes
          </li>
          <li>
            <Link
              href="/services"
              className="text-[#f4a261] underline hover:text-white"
            >
              Full pricing
            </Link>{" "}
            — Starter Sites &amp; Business Suites
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="mt-14">
        <h2 className="font-semibold text-xl tracking-tight mb-6">
          Food truck website FAQ
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
          Ready for a truck site that tells people where you are — today?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          You didn&apos;t start a food truck to wrestle with a website. Tell me
          about your truck — flat quote, full ownership, honest recommendation
          from Monticello.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary px-8">
            Tell me about your truck →
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

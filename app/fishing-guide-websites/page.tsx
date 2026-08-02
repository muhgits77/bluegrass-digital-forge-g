import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Fishing Guide Websites Lake Cumberland | Striper & Bass Guides | Monticello KY",
  description:
    "Fishing guide websites for Lake Cumberland striper, bass & multi-species captains. Trip booking, captain bios, trophy photos, mobile-first. Flat one-time pricing from $1,200. You own the code. Handcrafted in Monticello, KY — no monthly retainers.",
  keywords: [
    "fishing guide website Lake Cumberland",
    "striper fishing guide website",
    "bass fishing guide Kentucky",
    "Lake Cumberland charter website",
    "Jamestown fishing guide site",
    "Creelsboro fishing guide",
    "Monticello KY website designer",
    "fishing guide web design Kentucky",
  ],
  alternates: { canonical: canonicalUrl("/fishing-guide-websites") },
  openGraph: {
    title:
      "Fishing Guide Websites for Lake Cumberland | Flat Pricing · Full Ownership",
    description:
      "Sites for striper, bass, and multi-species guides on Lake Cumberland. Trip types, booking forms, real trophy photos. Flat one-time pricing. You own everything. Built in Monticello, KY.",
    url: canonicalUrl("/fishing-guide-websites"),
  },
};

const benefits = [
  {
    title: "Species-based trip pages that sell the day",
    body: "Striper hunts, bass days, crappie, multi-species — separate clear pages so anglers know what they’re booking, what to bring, and what a full day looks like on this lake.",
  },
  {
    title: "Booking calendar & inquiry that actually get filled",
    body: "Simple date/party-size forms, deposit instructions if you use them, and tap-to-call for last-minute openings. No bloated booking software unless you already run one.",
  },
  {
    title: "Trophy photos & real water days",
    body: "Your fish, your clients, your boat. Galleries that prove you know Lake Cumberland — not stock photos of someone else’s striper on a different reservoir.",
  },
  {
    title: "Captain bios that build trust",
    body: "Out-of-town anglers book people they trust. A short story, years on the water, safety notes, and who you are as a captain — written in plain Kentucky, not corporate copy.",
  },
  {
    title: "Mobile-first for ramp-side decisions",
    body: "Guests compare captains from the cabin or the truck. Fast pages, big call buttons, clear rates, and weather/season notes that load even when signal is thin near the water.",
  },
  {
    title: "Local launch & season knowledge",
    body: "Mention the ramps you actually use — State Dock, Creelsboro, Conley Bottom, Burnside approaches — and how spring striper, summer heat, and fall patterns affect trip availability.",
  },
];

const guideAreas = [
  {
    name: "Jamestown & State Dock",
    detail: "Russell County houseboat & charter hub",
    note: "High visitor traffic. Sites that convert searches for “striper guide Jamestown KY” and dock-area charters.",
  },
  {
    name: "Creelsboro & river access",
    detail: "Scenic public ramp · serious anglers",
    note: "Perfect for guides who fish the lower lake and riverine stretches — authentic photos and trip details win here.",
  },
  {
    name: "Monticello · Conley Bottom · Beaver Creek",
    detail: "Wayne County home launches",
    note: "Local and regional clients. Strong Google presence for Wayne County and “Lake Cumberland fishing guide.”",
  },
  {
    name: "Burnside & Nancy (Lee’s Ford)",
    detail: "Pulaski gateway & resort marina",
    note: "Weekend families and resort guests looking for a half-day or full-day with a captain who knows the lake.",
  },
  {
    name: "Russell Springs & US 127 corridor",
    detail: "Local ramps & cabin traffic",
    note: "Quiet access points popular with locals — sites that rank for real nearby searches, not just big marina names.",
  },
  {
    name: "Albany & southern shore",
    detail: "Clinton County lake access",
    note: "Guides and small operators serving weekenders coming up from the south — clean, fast, phone-friendly sites.",
  },
];

const faqs = [
  {
    q: "How much does a fishing guide website cost?",
    a: "Most guides fit a Starter Site from $1,200 one-time or a Business Suite from $2,500 if you need more trip pages, galleries, and booking detail. Flat pricing based on scope — not a monthly agency contract for the build. You own the finished site and code.",
  },
  {
    q: "Can clients book trips online?",
    a: "Yes. We set up trip inquiry or booking forms (date, party size, species target, phone). If you already use a calendar tool, we can link it. Keep it simple so busy captains aren’t babysitting software on the water.",
  },
  {
    q: "Do I still need Facebook or Instagram?",
    a: "Keep social — it helps. But a real website you own ranks in Google, shows trip types clearly, and doesn’t disappear if an algorithm changes. We link your social and make the site the home base for bookings.",
  },
  {
    q: "Will the site help with “striper fishing guide Lake Cumberland” searches?",
    a: "That’s exactly what we optimize for — species + location language, clear titles, local place names (Jamestown, Creelsboro, State Dock, etc.), and honest content about how you fish this lake. No keyword stuffing; real local pages.",
  },
  {
    q: "Are there monthly fees?",
    a: "No monthly fee required for the website itself. Host it yourself for normal hosting costs, or use the optional $79/mo care plan if you want me handling updates. The design and build are one-time flat rate.",
  },
  {
    q: "Who owns the site and photos?",
    a: "You own the website and code after payment. Your photos stay yours. Handcrafted in Monticello by a neighbor — not locked inside an agency platform.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fishing Guide Websites for Lake Cumberland",
  description:
    "Custom websites for Lake Cumberland fishing guides — striper, bass, and multi-species trips. Booking forms, captain bios, trophy galleries, mobile-first design. Flat one-time pricing. Full ownership. Handcrafted in Monticello, KY.",
  url: canonicalUrl("/fishing-guide-websites"),
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
    { "@type": "City", name: "Jamestown" },
    { "@type": "City", name: "Monticello" },
    { "@type": "City", name: "Burnside" },
    { "@type": "City", name: "Nancy" },
    { "@type": "City", name: "Russell Springs" },
    { "@type": "City", name: "Albany" },
    { "@type": "Place", name: "Creelsboro" },
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

export default function FishingGuideWebsitesPage() {
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
        SPECIALTY — FISHING GUIDE WEBSITES LAKE CUMBERLAND
      </div>
      <h1 className="section-title tracking-tight">
        Fishing Guide Websites for Lake Cumberland — Striper, Bass &amp;
        Multi-Species Captains
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        Websites for working fishing guides on Lake Cumberland — built by a
        neighbor in Monticello, KY.{" "}
        <strong className="text-[#c8cfd3] font-medium">Flat one-time pricing</strong>
        .{" "}
        <strong className="text-[#c8cfd3] font-medium">
          Full ownership of the site and code
        </strong>
        . No monthly retainer required to keep what you paid for.
      </p>
      <p className="mt-3 text-[15px] text-[#c8cfd3]">
        Anglers searching for a striper trip out of Jamestown, a bass day near
        Creelsboro, or a multi-species charter off State Dock want three things
        fast: proof you catch fish, clear trip types and rates, and an easy way
        to book. Your Facebook page helps — a fast site you own wins the Google
        search and the deposit.
      </p>

      <div className="mt-6 p-6 rounded-3xl bg-[#0a0c0f] border border-[#f4a261]/30">
        <div className="uppercase text-[10px] tracking-[2px] text-[#f4a261] mb-1">
          BUILT FOR CAPTAINS WHO HATE RETAINERS
        </div>
        <h2 className="text-[21px] leading-tight font-semibold tracking-tight">
          Pay once. Own it forever. Fish more, fight websites less.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          No agency “management fee” just to keep your pages live. Host where you
          want. Update trip dates when the bite is on. Handcrafted in Monticello
          for guides who launch on this lake — not a generic charter template
          from three states away.
        </p>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-[14.5px] text-[#c8cfd3]">
          <li>• Flat rate from $1,200 one-time</li>
          <li>• You own the code — full ownership</li>
          <li>• No monthly website fees required</li>
          <li>• See the Anchorline guide demo live</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/quote" className="btn btn-primary">
          Get a guide site quote →
        </Link>
        <Link href="/work" className="btn btn-secondary">
          See Anchorline demo
        </Link>
        <Link href="/services" className="underline text-[#3ddbd9] self-center text-sm">
          Pricing packages
        </Link>
      </div>

      <div className="mt-12">
        <div className="label tracking-[1.5px]">WHAT GETS ANGLERS TO BOOK</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Practical features for striper, bass, and multi-species guides.
        </h2>
        <p className="mt-2 text-[15px] text-[#9aa6ad]">
          Every section is written for how Lake Cumberland clients actually
          choose a captain — on a phone, comparing options, often from out of
          town.
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
          TYPICAL GUIDE SITE INCLUSIONS
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-[#c8cfd3]">
          <li>Home page with hero photo, trip highlights, and tap-to-call</li>
          <li>Trip types (half-day / full-day / species) with clear rates or “from” pricing</li>
          <li>Captain bio, safety notes, and what to bring</li>
          <li>Trophy / day-on-the-water gallery</li>
          <li>Booking or inquiry form + optional calendar link</li>
          <li>Launch / meeting-point directions for your usual ramps</li>
          <li>Google Business basics and local SEO for Lake Cumberland guide searches</li>
        </ul>
        <p className="mt-4 text-[13px] text-[#8a9599]">
          Live reference:{" "}
          <a
            href="https://lake-cumberland-lines.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Anchorline Guide Service demo
          </a>{" "}
          — species-based trips, captain bio, striper focus.
        </p>
      </div>

      <div className="mt-12">
        <div className="label tracking-[1.5px]">WHERE LAKE CUMBERLAND GUIDES LAUNCH</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Sites tuned to the ramps and towns you actually fish from.
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {guideAreas.map((g) => (
            <div
              key={g.name}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5"
            >
              <div className="font-semibold tracking-tight text-white">
                {g.name}
              </div>
              <div className="text-[#c17a5a] text-[13px] mt-0.5 font-medium">
                {g.detail}
              </div>
              <p className="mt-2 text-[14px] text-[#9aa6ad] leading-relaxed">
                {g.note}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[14px] text-[#8a9599]">
          Deep local notes for{" "}
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

      <div className="mt-12 rounded-3xl border border-[#f4a261]/30 bg-[#0a0c0f] p-7">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">
          FLAT PRICING · FULL OWNERSHIP · NO MONTHLY LOCK-IN
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Small guide businesses deserve honest pricing.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          You already pay for fuel, bait, insurance, and boat time. A website
          shouldn&apos;t be another forever subscription.{" "}
          <strong className="text-white">Flat one-time pricing</strong> for the
          build. <strong className="text-white">You own the code</strong>. Host
          it your way. Optional care if you want help — never required.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Get a free guide quote →
          </Link>
          <Link href="/services" className="btn btn-secondary">
            See Starter vs Business Suite
          </Link>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
        <div className="font-semibold tracking-tight mb-2">Related specialties</div>
        <ul className="space-y-2 text-[14.5px] text-[#c8cfd3]">
          <li>
            <Link href="/marina-websites" className="text-[#f4a261] underline hover:text-white">
              Marina websites
            </Link>{" "}
            — docks, slips, houseboat rentals around the lake
          </li>
          <li>
            <Link href="/food-truck-websites" className="text-[#f4a261] underline hover:text-white">
              Food truck websites
            </Link>{" "}
            — real-time location for lake &amp; festival stops
          </li>
          <li>
            <Link href="/work" className="text-[#f4a261] underline hover:text-white">
              Live demos
            </Link>{" "}
            — including Anchorline guide service &amp; bait shop examples
          </li>
        </ul>
      </div>

      <div className="mt-14">
        <h2 className="font-semibold text-xl tracking-tight mb-6">
          Fishing guide website FAQ
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
          Ready for a guide site that books more water days?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me about your boat, your target species, and the ramps you run
          from. Flat quote from Monticello — full ownership, no retainer games.
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
          code · Serving guides lake-wide
        </p>
      </div>
    </div>
  );
}

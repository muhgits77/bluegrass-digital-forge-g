import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL, TEMPLATE_STORE_URL } from "@/lib/constants";

const title = "Bait & Tackle and Boat Rental Websites";
const description =
  "Websites for bait shops, tackle stores, and boat or pontoon rental docks. Live bait, hours, fleet cards, fishing reports, and dock directions.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "bait and tackle website",
    "boat rental website Lake Cumberland",
    "pontoon rental website Kentucky",
    "live bait shop website",
    "Monticello KY website designer",
  ],
  alternates: { canonical: canonicalUrl("/bait-and-tackle-websites") },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/bait-and-tackle-websites"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

const who = [
  {
    title: "Bait shops and tackle stores",
    body: "Anglers check hours and live bait before they drive to the lake. The site should answer that on a phone, then get them to the door.",
  },
  {
    title: "Boat and pontoon rental docks",
    body: "People want to see the boat they are renting, the rate, and how to reach the dock — not a cropped photo and a phone number in a footer.",
  },
  {
    title: "Shops that do both",
    body: "Bait in the morning, a pontoon in the afternoon. One site can cover the counter and the fleet without looking like two different businesses.",
  },
];

const included = [
  {
    title: "Live bait, described the way you sell it",
    body: "Minnows go into the customer’s bucket or a bag. Crickets go into the customer’s cage or a bag. Worms come in lidded styrofoam or plastic cups. The page can say what you have today without inventing a tank the customer will not see.",
  },
  {
    title: "Hours that match the door",
    body: "Open, closed, and “call ahead on Sunday” belong at the top. I set them so you can change a holiday without calling a developer.",
  },
  {
    title: "Rental fleet cards",
    body: "Each boat or pontoon gets a card with a photo of the whole boat, what it holds, and how to ask if it is free. No tight crop that hides the hull.",
  },
  {
    title: "Fishing reports and dock directions",
    body: "A short report and plain directions to the dock — the ramp, the road, and where to park — so a first-time renter can find you.",
  },
];

const faqs = [
  {
    q: "How much does a bait shop or boat rental website cost?",
    a: "Custom builds start at $1,200 one-time. A larger fleet, more gallery pages, or a fuller shop usually starts at $2,500. You own the finished site and the code. Ready-made templates start at $99 if you want a head start instead of a custom build.",
  },
  {
    q: "Can the site explain how live bait is packed?",
    a: "Yes. I write it the way a counter actually works: minnows into the customer’s bucket or a bag, crickets into the customer’s cage or a bag, and worms in lidded styrofoam or plastic cups. No stock copy about bait you do not sell.",
  },
  {
    q: "Will rental photos show the whole boat?",
    a: "That is the point of the fleet cards. Each card uses a photo of the whole boat or pontoon, plus capacity and how to inquire, so renters know what they are getting.",
  },
  {
    q: "Do I need a monthly retainer?",
    a: "No. The build is a flat price. Hosting can sit on a normal host. Optional care is only if you want me to keep updating hours and reports for you.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bait & Tackle and Boat Rental Websites",
  description,
  url: canonicalUrl("/bait-and-tackle-websites"),
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
    { "@type": "AdministrativeArea", name: "Kentucky" },
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

export default function BaitAndTackleWebsitesPage() {
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
        SPECIALTY — BAIT, TACKLE & BOAT RENTALS
      </div>
      <h1 className="section-title tracking-tight">
        Bait & Tackle and Boat Rental Websites
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        For bait shops, tackle stores, and boat or pontoon rental docks.
        Handcrafted by Brian in Monticello, KY.{" "}
        <strong className="text-[#c8cfd3] font-medium">Custom builds from $1,200</strong>
        . You own the site and the code.
      </p>
      <p className="mt-3 text-[13.5px]">
        <a
          href={TEMPLATE_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f4a261] underline underline-offset-2 hover:text-white"
        >
          Ready-made templates from $99
        </a>
      </p>
      <p className="mt-3 text-[15px] text-[#c8cfd3]">
        Someone at the ramp wants to know if you have minnows, what time you
        close, and whether the pontoon in the photo is the one they would
        actually get. The site should answer that before they call.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/quote" className="btn btn-primary">
          Get a quote
        </Link>
        <Link href="/services" className="btn btn-secondary">
          See pricing packages
        </Link>
      </div>

      <div className="mt-12">
        <div className="label tracking-[1.5px]">WHO IT'S FOR</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Counters, tackle walls, and rental docks.
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {who.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6"
            >
              <div className="font-semibold tracking-tight mb-1 text-[#f4a261]">
                {item.title}
              </div>
              <p className="text-[14.5px] text-[#c8cfd3]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="label tracking-[1.5px]">WHAT'S INCLUDED</div>
        <h2 className="text-2xl font-semibold tracking-tight mt-1">
          Practical pages for bait and boats.
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {included.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6"
            >
              <div className="font-semibold tracking-tight mb-1 text-[#f4a261]">
                {item.title}
              </div>
              <p className="text-[14.5px] text-[#c8cfd3]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 p-6 rounded-3xl bg-[#0a0c0f] border border-[#f4a261]/30">
        <div className="uppercase text-[10px] tracking-[2px] text-[#f4a261] mb-1">
          BUILT IN MONTICELLO
        </div>
        <h2 className="text-[21px] leading-tight font-semibold tracking-tight">
          Written by Brian, a Kentucky web designer who knows the dock.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          I live in Monticello and build for businesses that open early and
          stay busy when the bite is on. The copy stays specific — bait packed
          the way you pack it, boats shown whole, directions a visitor can
          follow. Flat price. The files stay yours.
        </p>
      </div>

      <div className="mt-12 rounded-3xl border border-[#f4a261]/30 bg-[#0a0c0f] p-7">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">
          FLAT PRICING · FULL OWNERSHIP
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Custom builds from $1,200.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          Starter sites from <strong className="text-white">$1,200</strong>{" "}
          one-time. Business Suites from{" "}
          <strong className="text-white">$2,500</strong> for a larger fleet or
          a shop with more pages. Or start with{" "}
          <a
            href={TEMPLATE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f4a261] underline hover:text-white"
          >
            ready-made templates from $99
          </a>
          .
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Get a quote
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Compare packages
          </Link>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-semibold text-xl tracking-tight mb-6">
          Bait and boat rental website FAQ
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
          Need a site for the shop or the rental dock?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me what you sell and how people find the dock. Flat quote from
          Monticello.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/quote" className="btn btn-primary px-8">
            Get a quote
          </Link>
          <Link href="/contact" className="btn btn-secondary px-7">
            Contact me directly
          </Link>
        </div>
      </div>
    </div>
  );
}

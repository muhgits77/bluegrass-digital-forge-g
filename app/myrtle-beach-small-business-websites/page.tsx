import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL, TEMPLATE_STORE_URL } from "@/lib/constants";

const title = "Myrtle Beach Small Business Websites";
const description =
  "Small business websites for Myrtle Beach and the Grand Strand — beach shops, rentals, restaurants, fishing charters, and service businesses.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Myrtle Beach small business website",
    "Grand Strand web design",
    "Myrtle Beach restaurant website",
    "Grand Strand fishing charter website",
    "beach house rental website Myrtle Beach",
    "Monticello KY website designer",
  ],
  alternates: { canonical: canonicalUrl("/myrtle-beach-small-business-websites") },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/myrtle-beach-small-business-websites"),
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
    title: "Beach shops and rental counters",
    body: "Chairs, bikes, and beach gear get decided on a phone in the parking lot. Hours, prices, and a map matter more than a long brand story.",
  },
  {
    title: "Restaurants and fishing charters",
    body: "A readable menu or a clear trip list, plus a way to call, is what visitors use between the ocean and dinner.",
  },
  {
    title: "Service businesses along the Strand",
    body: "Cleaners, repair, and property help for beach houses need a service list, the towns you cover, and a number that works.",
  },
];

const included = [
  {
    title: "A page that names the Strand",
    body: "Myrtle Beach, North Myrtle, Surfside, Garden City, and the rest of the Grand Strand — written as those places, not “a beach somewhere.”",
  },
  {
    title: "Coastal photos, described honestly",
    body: "When a photo fits, I use the coast you actually have: palmettos, marsh grass, and live oaks hung with Spanish moss. Every image gets alt text that says what is in the picture.",
  },
  {
    title: "Beach house lodging",
    body: "If you rent a place to stay, the page says beach house — the wording guests use on the Grand Strand.",
  },
  {
    title: "Menus, charters, and inquiries",
    body: "Restaurant menus, charter trip types, rental lists, and a direct inquiry or tap-to-call. Custom builds from $1,200, scoped to what you actually offer.",
  },
];

const faqs = [
  {
    q: "How much does a Myrtle Beach small business website cost?",
    a: "Custom builds start at $1,200 one-time. A larger restaurant, charter, or multi-page rental site usually starts at $2,500. You own the site and the code. Ready-made templates start at $49 if you want to launch from a template instead.",
  },
  {
    q: "What do you call a place to stay?",
    a: "A beach house. On the Grand Strand that is the wording I use in the page title, the headings, and the body copy.",
  },
  {
    q: "Can the site feel like the South Carolina coast?",
    a: "Yes, when you have the photos. Palmettos, marsh grass, and live oaks with Spanish moss belong in the gallery if they are really there. I do not drop in generic tropical stock and pretend it is your block.",
  },
  {
    q: "You are in Kentucky. Why build a Myrtle Beach site?",
    a: "I’m Brian, in Monticello, KY. I already build for small tourist businesses, including the South Carolina coast. You still get a flat price, the files, and a person who answers — not a call center.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Small Business Websites for Myrtle Beach & the Grand Strand",
  description,
  url: canonicalUrl("/myrtle-beach-small-business-websites"),
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
    { "@type": "City", name: "Myrtle Beach" },
    { "@type": "Place", name: "Grand Strand" },
    { "@type": "AdministrativeArea", name: "South Carolina" },
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

export default function MyrtleBeachSmallBusinessWebsitesPage() {
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
        SPECIALTY — MYRTLE BEACH & THE GRAND STRAND
      </div>
      <h1 className="section-title tracking-tight">
        Small Business Websites for Myrtle Beach & the Grand Strand
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        For beach shops, rentals, restaurants, fishing charters, and service
        businesses along the Strand. Built by Brian in Monticello, KY.{" "}
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
          Ready-made templates from $49
        </a>
      </p>
      <p className="mt-3 text-[15px] text-[#c8cfd3]">
        Visitors are already on the sand or stuck in Strand traffic. They need
        hours, a menu or a trip list, and a way to reach you. If you rent a
        place to stay, say beach house — that is the word people use here.
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
          Shops, rentals, kitchens, charters, and local services.
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
          A Strand site that looks like the coast you work on.
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
          Brian, a Kentucky web designer, builds the site with you.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          I am based in Monticello, KY, and I build for tourist businesses on
          the South Carolina coast as well as the lake. You get one person,
          a flat price, and the finished files. Palmettos, marsh grass, and
          mossy live oaks go in only when they are really part of your place.
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
          <strong className="text-white">$2,500</strong> for fuller menus,
          charter pages, or beach house rentals.{" "}
          <a
            href={TEMPLATE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f4a261] underline hover:text-white"
          >
            Ready-made templates from $49
          </a>{" "}
          are available if you want to start from a template.
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
          Myrtle Beach website FAQ
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
          Need a Grand Strand website?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me what you run and which part of the Strand you serve. Flat
          quote from Monticello.
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

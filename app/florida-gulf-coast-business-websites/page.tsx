import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL, TEMPLATE_STORE_URL } from "@/lib/constants";

const title = "Florida Gulf Coast Websites | Destin, PCB, 30A";
const description =
  "Websites for Destin, Panama City Beach, and 30A tourist businesses: beach rentals, charters, surf and bike rentals, restaurants, and gift shops.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Destin business website",
    "Panama City Beach website",
    "30A business website",
    "Florida Gulf Coast beach rental website",
    "fishing charter website Destin",
    "Monticello KY website designer",
  ],
  alternates: { canonical: canonicalUrl("/florida-gulf-coast-business-websites") },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/florida-gulf-coast-business-websites"),
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
    title: "Beach rentals and beach houses",
    body: "Destin, Panama City Beach, and 30A guests look for a beach house. The site should show the place, the dates, and how to ask you.",
  },
  {
    title: "Charters, surf, and bike rentals",
    body: "Trip types, board and bike fleets, and a phone number that works when someone is already on the sand.",
  },
  {
    title: "Restaurants and gift shops",
    body: "A menu people can read, shop hours, and directions off 98 or 30A so visitors are not guessing from a Facebook photo.",
  },
];

const included = [
  {
    title: "Pages named for the towns",
    body: "Destin, Panama City Beach, and 30A are different searches. I write for the stretch you actually serve instead of a vague “Florida beach” headline.",
  },
  {
    title: "Rentals, charters, and fleets",
    body: "Beach house inquiries, charter trips, and surf or bike rental cards with a photo of the whole item and a way to ask if it is free.",
  },
  {
    title: "Menus and shop hours",
    body: "Restaurants get a mobile menu. Gift shops get hours and what you carry. Both get tap-to-call and plain directions.",
  },
  {
    title: "Alt text on every photo",
    body: "If we use a photo of the boat, the beach house, or the shop, the alt text says what it is. No empty image labels.",
  },
];

const faqs = [
  {
    q: "How much does a Florida Gulf Coast business website cost?",
    a: "Custom builds start at $1,200 one-time. A larger charter, restaurant, or multi-page beach rental site usually starts at $2,500. You own the site and the code. Ready-made templates start at $99 if you would rather begin with a template.",
  },
  {
    q: "Which towns do you write for?",
    a: "Destin, Panama City Beach, and 30A. Tell me the towns you actually serve and the site will name those, not the whole state.",
  },
  {
    q: "What do you call a place to stay?",
    a: "A beach house. That is the wording I use in the headings and the page copy for Destin, Panama City Beach, and 30A lodging.",
  },
  {
    q: "Why work with a designer in Kentucky?",
    a: "I’m Brian, in Monticello, KY. I build sites for tourist businesses on the Gulf as well as in Kentucky. The price is flat, you keep the files, and you are talking to the person who builds the site.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Websites for Florida Gulf Coast Tourist Businesses",
  description,
  url: canonicalUrl("/florida-gulf-coast-business-websites"),
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
    { "@type": "City", name: "Destin" },
    { "@type": "City", name: "Panama City Beach" },
    { "@type": "Place", name: "30A" },
    { "@type": "AdministrativeArea", name: "Florida" },
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

export default function FloridaGulfCoastBusinessWebsitesPage() {
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
        SPECIALTY — FLORIDA GULF COAST
      </div>
      <h1 className="section-title tracking-tight">
        Websites for Florida Gulf Coast Tourist Businesses (Destin, Panama City
        Beach, 30A)
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        For beach rentals, charters, surf and bike rentals, restaurants, and
        gift shops. Built by Brian in Monticello, KY.{" "}
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
        People book a beach house, a charter, or a table from a phone. The site
        should name Destin, Panama City Beach, or 30A plainly and give them a
        way to reach you.
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
          Tourist businesses between Destin, Panama City Beach, and 30A.
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
          The pages a visitor uses before they walk in or book.
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
          A Kentucky web designer who builds for Gulf tourist businesses.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          I'm Brian, in Monticello, KY. Same flat-price work I do for lake
          businesses, aimed at Destin, Panama City Beach, and 30A. You talk to
          me, you keep the code, and the copy stays specific to the towns you
          serve.
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
          <strong className="text-white">$2,500</strong> for fuller charter,
          restaurant, or beach house sites.{" "}
          <a
            href={TEMPLATE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f4a261] underline hover:text-white"
          >
            Ready-made templates from $99
          </a>{" "}
          are on the template store if you want to start there.
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
          Gulf Coast website FAQ
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
          Need a site for a Gulf Coast business?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me the town and what you rent or serve. Flat quote from
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

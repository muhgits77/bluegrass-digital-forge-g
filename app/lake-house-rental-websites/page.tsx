import type { Metadata } from "next";
import Link from "next/link";
import { canonicalUrl, SITE_URL, CONTACT_EMAIL, TEMPLATE_STORE_URL } from "@/lib/constants";

const title = "Lake House Rental Websites | Lake Cumberland";
const description =
  "Lake house rental websites for owners and managers in Monticello, Jamestown, Somerset, and Burnside. Calendars, galleries, and booking inquiries.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "lake house rental website Lake Cumberland",
    "Monticello KY lake house website",
    "Jamestown KY vacation rental website",
    "Somerset KY lake house rental",
    "Burnside lodging website",
    "Monticello KY website designer",
  ],
  alternates: { canonical: canonicalUrl("/lake-house-rental-websites") },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/lake-house-rental-websites"),
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
    title: "Owners who rent one lake house",
    body: "You already take inquiries by text and Facebook. A simple site gives guests the photos, rules, and calendar before they message you.",
  },
  {
    title: "Property managers with a few houses",
    body: "Each house needs its own page — sleeps, docks, pet rules, and how to ask if those dates are open — without a 40-page resort brochure.",
  },
  {
    title: "Monticello, Jamestown, Somerset, Burnside",
    body: "Guests search the town and the lake together. I write for those places, not a generic “mountain getaway” template from somewhere else.",
  },
];

const included = [
  {
    title: "Availability calendars",
    body: "Show which weeks are open and which are taken. Guests stop asking about dates you already booked, and you spend less time repeating yourself.",
  },
  {
    title: "Photo galleries",
    body: "The dock, the kitchen, the bedrooms, and the view from the porch — your photos, with plain alt text, so people know what they are booking.",
  },
  {
    title: "House rules",
    body: "Quiet hours, parking, pets, and what to do with the trash. Put the rules where guests will actually read them before they arrive.",
  },
  {
    title: "Local food and marina tips",
    body: "A short, honest list of nearby docks, bait, and places to eat helps out-of-town guests plan the week without you answering the same texts.",
  },
  {
    title: "Direct booking inquiries",
    body: "A form and a tap-to-call number so people can ask you directly. I do not bolt on a marketplace you do not already use.",
  },
];

const faqs = [
  {
    q: "How much does a lake house rental website cost?",
    a: "Custom builds start at $1,200 one-time. A fuller site with several house pages, a larger gallery, and a calendar usually lands in the Business Suite range from $2,500. You own the site and the code when it is paid for. Ready-made templates start at $49 if you would rather start there.",
  },
  {
    q: "Can the site show which weeks are open?",
    a: "Yes. I can set up a clear availability calendar and an inquiry form so guests check dates before they write. If you already use a rental calendar, we can link to it instead of inventing a second one.",
  },
  {
    q: "Do I have to pay a monthly fee to keep the site?",
    a: "No monthly fee is required for the website itself. You can host it on a normal host, or ask about optional care if you want me to handle updates. The build is a flat price.",
  },
  {
    q: "What do you call the rental on the page?",
    a: "A lake house. Around Lake Cumberland that is the wording guests search for, so I use it in the title, the headings, and the photo descriptions.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lake House Rental Websites for Lake Cumberland",
  description,
  url: canonicalUrl("/lake-house-rental-websites"),
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
    { "@type": "City", name: "Somerset" },
    { "@type": "City", name: "Burnside" },
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

export default function LakeHouseRentalWebsitesPage() {
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
        SPECIALTY — LAKE HOUSE RENTAL WEBSITES
      </div>
      <h1 className="section-title tracking-tight">
        Lake House Rental Websites for Lake Cumberland
      </h1>
      <p className="mt-3 text-lg text-[#8a9599]">
        For lake house owners and property managers around Monticello,
        Jamestown, Somerset, and Burnside. I build these in Monticello, KY.{" "}
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
        Guests decide from a phone, often before they drive down. They want the
        dates, the photos, the rules, and a way to ask you directly — not a
        listing that sends them to someone else.
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
          Lake house owners and the people who manage them.
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
          The pages guests actually use before they book.
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
          A real Kentucky web designer, not a distant template mill.
        </h2>
        <p className="mt-2 text-[15px] text-[#c8cfd3]">
          I'm Brian, in Monticello. I know which towns people mean when they
          say they are “on the lake,” and I write the site that way. Flat
          pricing, the files are yours, and you can reach me without a ticket
          queue.
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
          <strong className="text-white">$2,500</strong> when you need more
          house pages, a larger gallery, or a fuller calendar. If you want to
          start smaller,{" "}
          <a
            href={TEMPLATE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f4a261] underline hover:text-white"
          >
            ready-made templates from $49
          </a>{" "}
          are on the template store.
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
          Lake house website FAQ
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
          Need a site for your lake house?
        </h2>
        <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">
          Tell me how many houses you rent and how guests book today. Flat
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

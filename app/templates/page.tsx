import type { Metadata } from "next";
import Link from "next/link";
import { Check, Eyebrow, GhostButton, PageHero, StoreButton } from "@/components/site/ui";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
  TEMPLATE_STORE_URL,
  canonicalUrl,
} from "@/lib/constants";

const PAGE_TITLE =
  "DIY Website Templates From $129 | Lake Cumberland & Monticello KY — Bluegrass Digital Forge";
const PAGE_DESCRIPTION =
  "Affordable ready-to-remix website templates for Lake Cumberland & Southern Kentucky businesses. Hand-built in Monticello, KY. Website templates from $129, calculators from $99, one-time — free bug-fix updates, full ownership after purchase. Food trucks, restaurants, shops & service businesses.";
const OG_IMAGE = "/assets/demo-bluegrass-templates.jpg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "website templates Kentucky",
    "DIY website templates",
    "affordable website templates $129",
    "Lake Cumberland website templates",
    "Monticello KY website designer",
    "Southern Kentucky website templates",
    "Wayne County web design",
    "food truck website template Kentucky",
    "restaurant website template Lake Cumberland",
    "ready to remix website templates",
    "one-time purchase website template",
    "Bluegrass Digital Forge templates",
  ],
  alternates: { canonical: canonicalUrl("/templates") },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl("/templates"),
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bluegrass Digital Forge ready-to-remix website templates — DIY sites from $129, hand-built in Monticello KY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIY Website Templates From $129 | Lake Cumberland & Monticello KY",
    description:
      "Ready-to-remix templates hand-built in Kentucky. Website templates from $129, calculators from $99, one-time, free updates, full ownership. Food trucks, restaurants, shops & service businesses around Lake Cumberland.",
    images: [OG_IMAGE],
  },
};

const benefitCards = [
  {
    title: "From $129",
    desc: "One-time purchase. No monthly template subscription — pay once and the files are yours to remix and launch.",
  },
  {
    title: "Hand-built in Kentucky",
    desc: "Forged in Monticello with the same care as our custom Lake Cumberland builds — not generic theme-store filler.",
  },
  {
    title: "Free bug-fix updates",
    desc: "Refinements and fixes stay included so your template remains solid as browsers and best practices shift.",
  },
  {
    title: "Full ownership after purchase",
    desc: "Once you buy, you own what you paid for. Remix it, host it, grow it — no renting a look forever.",
  },
];

const audienceItems = [
  {
    title: "Food trucks",
    desc: "Need a bold menu, “where we are,” and a mobile-first site without waiting on a full custom project. Great for festival season and lake-traffic weekends.",
  },
  {
    title: "Restaurants & supper houses",
    desc: "Menus, hours, directions, and a warm local feel — whether you’re on Main Street or feeding dock traffic after a day on the water.",
  },
  {
    title: "Shops & boutiques",
    desc: "Retail and mercantile sites that feel like walking in the door: hours, story, contact, and a clean path to call or visit.",
  },
  {
    title: "Service businesses",
    desc: "Trades, land care, auto, wellness, and other Wayne County / Southern Kentucky outfits that need a clear services list and an easy quote path.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Browse the store",
    desc: "Explore ready-to-remix templates on bluegrasstemplates.com — built for real small-business layouts, not one-size-fits-none demos.",
  },
  {
    step: "02",
    title: "Purchase once",
    desc: "Flat, one-time pricing: website templates from $129, calculators from $99. No monthly lock-in for the template itself. Clear checkout, yours after payment.",
  },
  {
    step: "03",
    title: "Remix & launch",
    desc: "Swap copy, photos, colors, and details for your Monticello, Jamestown, Burnside, or broader Kentucky business — then put it live.",
  },
  {
    step: "04",
    title: "Keep free updates",
    desc: "Bug fixes and refinements stay included so the foundation holds up after launch — practical craft, not a throwaway download.",
  },
];

/** CollectionPage + Offer for the DIY template path; ties to LocalBusiness in Monticello. */
const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${canonicalUrl("/templates")}#collection`,
  name: "Ready-to-Remix Website Templates — Bluegrass Digital Forge",
  description: PAGE_DESCRIPTION,
  url: canonicalUrl("/templates"),
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  about: {
    "@type": "Thing",
    name: "DIY website templates for Lake Cumberland and Southern Kentucky businesses",
  },
  mainEntity: {
    "@type": "OfferCatalog",
    name: "Bluegrass Digital Forge Template Store",
    url: TEMPLATE_STORE_URL,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Ready-to-Remix Website Templates",
        description:
          "Hand-built DIY website templates for food trucks, restaurants, shops, and service businesses. Website templates from $129 one-time; calculators from $99. Free updates for bug fixes and refinements. Full ownership after purchase. Forged in Monticello, KY for Lake Cumberland and Southern Kentucky businesses.",
        url: TEMPLATE_STORE_URL,
        price: "129",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "129",
          priceCurrency: "USD",
          name: "From $129 — one-time purchase",
        },
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#business`,
          name: SITE_NAME,
          url: SITE_URL,
          email: CONTACT_EMAIL,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Monticello",
            addressRegion: "KY",
            postalCode: "42633",
            addressCountry: "US",
          },
          areaServed: [
            { "@type": "Place", name: "Lake Cumberland" },
            { "@type": "AdministrativeArea", name: "Wayne County" },
            { "@type": "AdministrativeArea", name: "Southern Kentucky" },
            { "@type": "City", name: "Monticello" },
            { "@type": "City", name: "Jamestown" },
            { "@type": "City", name: "Burnside" },
            { "@type": "City", name: "Somerset" },
            { "@type": "City", name: "Russell Springs" },
            { "@type": "City", name: "Albany" },
            { "@type": "City", name: "Nancy" },
          ],
        },
      },
    ],
  },
  provider: {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
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
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "DIY Templates",
        item: canonicalUrl("/templates"),
      },
    ],
  },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Bluegrass Digital Forge Ready-to-Remix Website Templates",
  description:
    "DIY website templates hand-built in Monticello, Kentucky for Lake Cumberland and Southern Kentucky small businesses. Website templates from $129 and calculators from $99, one-time, with free bug-fix and refinement updates. Full ownership after purchase.",
  image: `${SITE_URL}${OG_IMAGE}`,
  brand: {
    "@type": "Brand",
    name: SITE_NAME,
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "99",
    highPrice: "129",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: TEMPLATE_STORE_URL,
    offerCount: "1",
    priceValidUntil: "2027-12-31",
  },
  manufacturer: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monticello",
      addressRegion: "KY",
      postalCode: "42633",
      addressCountry: "US",
    },
  },
};


const storeCategories: { label: string; href: string }[] = [
  { label: "Small business", href: "https://bluegrasstemplates.com/small-business-website-templates" },
  { label: "Food truck", href: "https://bluegrasstemplates.com/food-truck-website-templates" },
  { label: "Restaurant", href: "https://bluegrasstemplates.com/restaurant-website-templates" },
  { label: "Contractor", href: "https://bluegrasstemplates.com/contractor-website-templates" },
  { label: "Tire & auto", href: "https://bluegrasstemplates.com/automotive-website-templates" },
  { label: "Lake & marina", href: "https://bluegrasstemplates.com/lake-and-marina-website-templates" },
  { label: "Calculators from $99", href: "https://bluegrasstemplates.com/calculator-templates" },
];

export default function TemplatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema).replace(/</g, "\\u003c") }}
      />

      <PageHero eyebrow="Website templates from $129 · Calculators from $99" title="Prefer to build it yourself?">
        Ready-to-remix website templates hand-built in Kentucky — the same care and local craft as our custom Lake Cumberland builds, just self-serve. Launch in an afternoon.
      </PageHero>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="grid items-center gap-8 rounded-3xl border border-primary bg-card p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]">
          <ul className="space-y-3">
            <Check>Website templates from $129 — one-time purchase</Check>
            <Check>Hand-built in Kentucky, ready to remix</Check>
            <Check>Free updates for bug fixes &amp; refinements</Check>
            <Check>Calculators from $99</Check>
            <Check>Full ownership after purchase</Check>
          </ul>
          <div className="text-center md:text-right">
            <p className="text-copper font-display text-6xl font-bold">$129</p>
            <p className="text-sm text-muted-foreground">website templates · starting · one-time</p>
            <StoreButton href={TEMPLATE_STORE_URL} className="mt-6 px-5">Browse templates ↗</StoreButton>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {storeCategories.map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary">
              {c.label}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-4" aria-labelledby="how-heading">
        <h2 id="how-heading" className="sr-only">How templates work</h2>
        {howItWorks.map((h) => (
          <div key={h.step} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-copper font-display text-2xl font-bold">{h.step}</p>
            <h3 className="mt-2 font-display text-xl font-bold">{h.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{h.desc}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-border bg-card/50 py-16" aria-labelledby="who-heading">
        <div className="mx-auto max-w-5xl px-5">
          <Eyebrow>Who templates are for</Eyebrow>
          <h2 id="who-heading" className="mt-3 font-display text-3xl font-bold md:text-4xl">Small businesses that want a pro site without a full custom build.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {audienceItems.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-display text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16" aria-labelledby="why-heading">
        <Eyebrow>Why buy from a Kentucky builder</Eyebrow>
        <h2 id="why-heading" className="mt-3 font-display text-3xl font-bold">Pay once. Own what you bought.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {benefitCards.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-bold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <Eyebrow>Want it done for you?</Eyebrow>
        <p className="mt-3 text-muted-foreground">
          Custom builds start at $1,200 (Business Suites $2,500–$4,500) with full code ownership.{" "}
          <Link href="/services" className="text-primary">See pricing</Link> or <Link href="/quote" className="text-primary">get a free quote →</Link>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <StoreButton href={TEMPLATE_STORE_URL}>Browse templates ↗</StoreButton>
          <GhostButton href="/quote">Start a custom project</GhostButton>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Questions about a template? Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary">{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </>
  );
}

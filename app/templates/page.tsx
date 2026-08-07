import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_URL,
  TEMPLATE_STORE_URL,
  canonicalUrl,
} from "@/lib/constants";

const PAGE_TITLE =
  "DIY Website Templates from $99 | Lake Cumberland & Monticello KY — Bluegrass Digital Forge";
const PAGE_DESCRIPTION =
  "Affordable ready-to-remix website templates for Lake Cumberland & Southern Kentucky businesses. Hand-built in Monticello, KY. Starting at $99 one-time — free bug-fix updates, full ownership after purchase. Food trucks, restaurants, shops & service businesses.";
const OG_IMAGE = "/assets/demo-bluegrass-templates.jpg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "website templates Kentucky",
    "DIY website templates",
    "affordable website templates $99",
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
        alt: "Bluegrass Digital Forge ready-to-remix website templates — DIY sites from $99, hand-built in Monticello KY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIY Website Templates from $99 | Lake Cumberland & Monticello KY",
    description:
      "Ready-to-remix templates hand-built in Kentucky. One-time from $99, free updates, full ownership. Food trucks, restaurants, shops & service businesses around Lake Cumberland.",
    images: [OG_IMAGE],
  },
};

const benefitCards = [
  {
    title: "Starting at $99",
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
    desc: "Flat, one-time pricing starting at $99. No monthly lock-in for the template itself. Clear checkout, yours after payment.",
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
          "Hand-built DIY website templates for food trucks, restaurants, shops, and service businesses. Starting at $99 one-time. Free updates for bug fixes and refinements. Full ownership after purchase. Forged in Monticello, KY for Lake Cumberland and Southern Kentucky businesses.",
        url: TEMPLATE_STORE_URL,
        price: "99",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "99",
          priceCurrency: "USD",
          name: "Starting price — one-time purchase",
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
    "DIY website templates hand-built in Monticello, Kentucky for Lake Cumberland and Southern Kentucky small businesses. One-time purchase from $99 with free bug-fix and refinement updates. Full ownership after purchase.",
  image: `${SITE_URL}${OG_IMAGE}`,
  brand: {
    "@type": "Brand",
    name: SITE_NAME,
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "99",
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

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <header className="max-w-3xl">
        <div className="label tracking-[1.6px]">
          DIY TEMPLATES · BLUEGRASS DIGITAL FORGE · MONTICELLO KY
        </div>
        <h1 className="section-title tracking-tight mt-2">
          Ready-to-Remix Templates
        </h1>
        <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed max-w-prose">
          Prefer to build it yourself? Explore ready-to-remix website templates
          hand-built in Kentucky — a lower-cost DIY path for Lake Cumberland and
          Southern Kentucky businesses who want a professional site without a
          full custom project. Launch in an afternoon, starting at{" "}
          <strong className="text-[var(--cream)] font-medium">$99</strong>.
        </p>
        <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
          Same neighbor craft as our{" "}
          <Link
            href="/services"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            custom website services
          </Link>
          , just self-serve when that fits better. One-time purchase. Free
          updates for bug fixes and refinements. Full ownership after you buy.
        </p>
      </header>

      {/* Sticky-visible benefits strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          ["$99+", "starting · one-time"],
          ["Free updates", "bug fixes & refinements"],
          ["Yours", "full ownership after purchase"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-5 py-4 text-center shadow-[var(--shadow-card)]"
          >
            <div className="text-[1.35rem] font-semibold tracking-tight text-[var(--cream)] tabular-nums">
              {value}
            </div>
            <div className="mt-0.5 text-[12.5px] text-[var(--text-dim)] uppercase tracking-[0.12em]">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Store CTA card */}
      <div className="mt-10 relative overflow-hidden rounded-[1.5rem] border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative min-h-[220px] md:min-h-[340px]">
            <Image
              src="/assets/demo-bluegrass-templates.jpg"
              alt="Bluegrass Digital Forge DIY website template store for Lake Cumberland businesses — ready-to-remix sites from $99"
              fill
              priority
              quality={75}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-card)] hidden md:block opacity-80" />
          </div>
          <div className="p-7 md:p-9 flex flex-col justify-center">
            <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--copper-bright)] font-semibold mb-2">
              Template Store · From $99 one-time
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Browse the full collection
            </h2>
            <p className="mt-2.5 text-[15px] text-[var(--text-muted)] leading-relaxed">
              Food trucks, restaurants, shops, service businesses, and more —
              templates you can remix and launch without waiting on a full
              custom build. Hand-built in Monticello for real Southern Kentucky
              work.
            </p>
            <ul className="mt-4 space-y-2 text-[14px] text-[var(--text-muted)]">
              {[
                "One-time purchase — no monthly template lock-in",
                "Free updates for bug fixes & refinements",
                "Full ownership after purchase",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 items-start">
                  <IconCheck className="text-[var(--copper)] mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={TEMPLATE_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-8 py-3.5"
              >
                Browse Templates →
              </a>
              <Link href="/quote" className="btn btn-secondary px-7 py-3.5">
                Prefer custom? Get a quote
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-[var(--text-dim)]">
              Opens{" "}
              <a
                href={TEMPLATE_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[var(--copper-bright)]"
              >
                bluegrasstemplates.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Local SEO section */}
      <section className="mt-14 md:mt-16" aria-labelledby="affordable-heading">
        <h2
          id="affordable-heading"
          className="text-2xl md:text-[1.75rem] font-semibold tracking-tight max-w-[28ch]"
        >
          Affordable Website Templates for Lake Cumberland &amp; Southern
          Kentucky Businesses
        </h2>
        <div className="mt-4 space-y-3.5 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
          <p>
            Not every business around the lake needs a fully custom site on day
            one. A food truck prepping for festival season, a shop on Main
            Street, or a service crew covering Wayne County may just need a
            clean, professional web presence they can stand up quickly — without
            agency retainers or generic national theme clutter.
          </p>
          <p>
            These ready-to-remix templates are built by{" "}
            <strong className="text-[var(--cream)] font-medium">
              Bluegrass Digital Forge in Monticello, Kentucky
            </strong>
            , for the same towns and trades we serve with custom work: Lake
            Cumberland ramps and ridge roads, Monticello, Jamestown, Burnside,
            Russell Springs, Albany, Nancy, Somerset, and the wider Southern
            Kentucky map. Practical layouts. Warm local feel. Honest pricing
            that starts at $99 one-time.
          </p>
          <p>
            When DIY is the right fit, you get craft without the full custom
            timeline. When you outgrow the template — or know from the start you
            want something built only for you — our{" "}
            <Link
              href="/services"
              className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
            >
              custom Starter Sites and Business Suites
            </Link>{" "}
            are still right here, flat-priced and neighbor-built.
          </p>
        </div>
      </section>

      {/* Who for */}
      <section className="mt-14 md:mt-16" aria-labelledby="who-heading">
        <h2
          id="who-heading"
          className="text-2xl md:text-[1.75rem] font-semibold tracking-tight"
        >
          Who These Templates Are Built For
        </h2>
        <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
          Self-serve sites for owners who are hands-on, budget-conscious, and
          ready to launch — especially around Lake Cumberland and Southern
          Kentucky, where “good enough on social” stops converting once visitors
          start searching.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {audienceItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]"
            >
              <h3 className="font-semibold tracking-tight text-lg text-[var(--cream)]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-[var(--text-muted)] leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[14.5px] text-[var(--text-dim)] leading-relaxed max-w-prose">
          Looking for inspiration from live custom demos first? Browse{" "}
          <Link
            href="/work"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            portfolio work
          </Link>
          , or specialty pages for{" "}
          <Link
            href="/food-truck-websites"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            food truck websites
          </Link>
          ,{" "}
          <Link
            href="/restaurant-websites"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            restaurant websites
          </Link>
          , and{" "}
          <Link
            href="/marina-websites"
            className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
          >
            marina websites
          </Link>
          .
        </p>
      </section>

      {/* How it works */}
      <section className="mt-14 md:mt-16" aria-labelledby="how-heading">
        <h2
          id="how-heading"
          className="text-2xl md:text-[1.75rem] font-semibold tracking-tight"
        >
          How Ready-to-Remix Templates Work
        </h2>
        <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
          Straightforward from store to launch — no sales call required for the
          DIY path. You pick a template, purchase once, and make it yours.
        </p>
        <ol className="mt-6 grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
          {howItWorks.map((item) => (
            <li
              key={item.step}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-card)]"
            >
              <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--copper-bright)] font-semibold">
                Step {item.step}
              </div>
              <h3 className="mt-1.5 font-semibold tracking-tight text-lg">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] text-[var(--text-muted)] leading-snug">
                {item.desc}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-7">
          <a
            href={TEMPLATE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-8 py-3.5"
          >
            Browse Templates →
          </a>
        </div>
      </section>

      {/* Pricing differentiators */}
      <section className="mt-14 md:mt-16" aria-labelledby="pricing-heading">
        <div className="rounded-3xl border border-[var(--border-copper)] bg-[var(--bg-card)] p-7 md:p-9 shadow-[var(--shadow-card)]">
          <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--copper-bright)] font-semibold mb-2">
            One-time · From $99 · Free updates
          </div>
          <h2
            id="pricing-heading"
            className="text-2xl md:text-[1.75rem] font-semibold tracking-tight max-w-[24ch]"
          >
            One-Time Pricing — No Monthly Lock-In
          </h2>
          <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
            Template pricing stays simple on purpose. You&apos;re not renting a
            look or signing up for another subscription that forgets you live in
            Monticello, not a coastal tech hub. Pay once starting at $99, own
            what you purchased, and keep free updates for bug fixes and
            refinements.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {benefitCards.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5"
              >
                <h3 className="font-semibold tracking-tight text-[var(--cream)]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-[14px] text-[var(--text-muted)] leading-snug">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[14px] text-[var(--text-dim)] leading-relaxed max-w-prose">
            Custom sites are a different path:{" "}
            <Link
              href="/services"
              className="text-[var(--copper-bright)] underline decoration-[var(--copper)]/40 underline-offset-2 hover:text-[var(--cream)]"
            >
              Kentucky Starter Sites from $1,200
            </Link>{" "}
            and Business Suites from $2,500 — still flat, still one-time for the
            build, still full ownership of the code. Templates are the DIY lane;
            custom is when you want a neighbor building it with you.
          </p>
        </div>
      </section>

      {/* Custom alternative */}
      <section className="mt-14 md:mt-16" aria-labelledby="custom-heading">
        <h2
          id="custom-heading"
          className="text-2xl md:text-[1.75rem] font-semibold tracking-tight"
        >
          Prefer a Fully Custom Site Instead?
        </h2>
        <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
          Templates are honest about what they are: a strong, affordable
          starting point you control. Some businesses need more — unique
          branding, tighter local SEO for Lake Cumberland searches, booking
          flows, multi-page content, or a site that matches a marina, guide
          service, or restaurant brand down to the last detail.
        </p>
        <p className="mt-3 text-[15.5px] text-[var(--text-muted)] leading-relaxed max-w-prose">
          That&apos;s the custom side of Bluegrass Digital Forge: handcrafted in
          Monticello, flat pricing, full ownership of the code, and no monthly
          lock-in required for the build. Tell me about your business — food
          truck, restaurant, shop, service company, or something on the water —
          and I&apos;ll recommend the right fit.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary px-8 py-3.5">
            Get a free custom quote →
          </Link>
          <Link href="/services" className="btn btn-secondary px-7 py-3.5">
            See custom pricing
          </Link>
          <Link href="/work" className="btn btn-secondary px-7 py-3.5">
            View custom demos
          </Link>
        </div>
      </section>

      {/* Final dual CTA */}
      <section className="mt-14 md:mt-16 text-center border-t border-[var(--border)] pt-12">
        <div className="label mb-3 justify-center">Two clear paths</div>
        <h2 className="text-[clamp(1.5rem,3.5vw,2rem)] font-semibold tracking-tight max-w-[22ch] mx-auto">
          DIY templates or a site forged just for you
        </h2>
        <p className="mt-3 text-[15px] text-[var(--text-muted)] leading-relaxed max-w-[48ch] mx-auto">
          Browse ready-to-remix templates from $99 one-time — or start a custom
          project with flat Lake Cumberland pricing and full ownership.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row gap-3.5 justify-center">
          <a
            href={TEMPLATE_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-9 py-3.5"
          >
            Browse Templates →
          </a>
          <Link href="/quote" className="btn btn-secondary px-8 py-3.5">
            Prefer custom? Get a quote
          </Link>
        </div>
        <p className="mt-5 text-[13px] text-[var(--text-dim)]">
          Forged by a neighbor in Monticello, KY · Lake Cumberland region
        </p>
      </section>
    </div>
  );
}

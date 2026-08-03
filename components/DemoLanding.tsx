import Image from "next/image";
import Link from "next/link";
import type { Demo } from "@/lib/demos";
import type { DemoLandingContent } from "@/lib/demoLandings";
import { getPublicDemoBySlug } from "@/lib/demos";
import { SITE_URL } from "@/lib/constants";

type RelatedCard = {
  slug: string;
  title: string;
  category: string;
  image?: string;
  imageAlt?: string;
  blurb?: string;
};

type DemoLandingProps = {
  demo: Demo;
  content: DemoLandingContent;
  related: RelatedCard[];
};

/**
 * Server-rendered first-party portfolio landing for a live demo.
 * Text-rich for crawlers; screenshot first (no iframe required).
 */
export default function DemoLanding({ demo, content, related }: DemoLandingProps) {
  const previewImage =
    demo.image || "/hero-cumberland-golden.jpg";
  const imageAlt =
    demo.imageAlt ||
    `${content.categoryLabel} website example — ${demo.title}, portfolio piece built in Monticello KY`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_URL}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: demo.title,
        item: `${SITE_URL}/work/${content.slug}`,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/work/${content.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Bluegrass Digital Forge",
      url: SITE_URL,
    },
    about: {
      "@type": "CreativeWork",
      name: demo.title,
      description:
        "Portfolio website example (not a live client business listing).",
      genre: content.categoryLabel,
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema).replace(/</g, "\\u003c"),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-[13px] text-[var(--text-dim)]"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-white underline-offset-2 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-[var(--text-dim)]">
            →
          </li>
          <li>
            <Link
              href="/work"
              className="hover:text-white underline-offset-2 hover:underline"
            >
              Work
            </Link>
          </li>
          <li aria-hidden className="text-[var(--text-dim)]">
            →
          </li>
          <li className="text-[var(--text-muted)]">{demo.title}</li>
        </ol>
      </nav>

      <div className="label tracking-[1.6px]">PORTFOLIO EXAMPLE</div>
      <p className="mt-1 text-[13px] text-[var(--text-dim)]">
        {content.categoryLabel} · Not a live client site
      </p>

      <h1 className="section-title tracking-tight mt-2">{content.h1}</h1>

      <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-muted)]">
        {content.intro}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px]">
        <a
          href={demo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--copper-bright)] underline underline-offset-2 hover:text-white"
        >
          View live demo ↗
        </a>
        <Link
          href="/work"
          className="text-[var(--text-muted)] underline underline-offset-2 hover:text-white"
        >
          All examples
        </Link>
        <Link
          href={content.specialtyHub}
          className="text-[var(--text-muted)] underline underline-offset-2 hover:text-white"
        >
          {content.specialtyHubLabel}
        </Link>
      </div>

      {/* Screenshot preview — no iframe for speed */}
      <figure className="mt-8 rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--bg-card)]">
        <div className="flex items-center gap-3 px-3 py-2.5 bg-[#050a08] border-b border-[var(--border)]">
          <div className="flex gap-2" aria-hidden>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <div className="text-[11px] text-[var(--text-dim)] font-medium truncate">
            {content.slug}
          </div>
        </div>
        <div className="relative aspect-[16/10] bg-[#050708]">
          <Image
            src={previewImage}
            alt={imageAlt}
            fill
            priority
            quality={72}
            className="object-contain object-top"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <figcaption className="px-4 py-3 text-[13px] text-[var(--text-dim)] border-t border-[var(--border)]">
          Preview of the live demo.{" "}
          <a
            href={demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--copper-bright)] underline underline-offset-2 hover:text-white"
          >
            Open full site ↗
          </a>
        </figcaption>
      </figure>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          {content.featuresHeading}
        </h2>
        <ul className="mt-4 space-y-2 text-[15px] text-[var(--text-muted)]">
          {content.features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-[var(--copper)] shrink-0" aria-hidden>
                ·
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-7">
        <h2 className="text-xl font-semibold tracking-tight">
          {content.sampleHeading}
        </h2>
        {content.sampleIntro ? (
          <p className="mt-2 text-[15px] text-[var(--text-muted)] leading-relaxed">
            {content.sampleIntro}
          </p>
        ) : null}
        <dl className="mt-5 space-y-4">
          {content.sampleItems.map((item) => (
            <div key={item.name}>
              <dt className="font-medium text-white tracking-tight">
                {item.name}
              </dt>
              <dd className="mt-0.5 text-[14.5px] text-[var(--text-muted)] leading-relaxed">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[12px] text-[var(--text-dim)]">
          Sample wording for illustration only — not a real business menu or
          booking list.
        </p>
      </section>

      {content.serviceAreaNote ? (
        <section className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight">
            Local context
          </h2>
          <p className="mt-3 text-[15px] text-[var(--text-muted)] leading-relaxed">
            {content.serviceAreaNote}
          </p>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          Why this kind of site helps
        </h2>
        <p className="mt-3 text-[15px] text-[var(--text-muted)] leading-relaxed">
          {content.whyItHelps}
        </p>
        <p className="mt-3 text-[14px] text-[var(--text-dim)] leading-relaxed">
          Real projects from Bluegrass Digital Forge use flat, one-time pricing
          and you keep the finished site — handcrafted in Monticello for Lake
          Cumberland businesses.
        </p>
      </section>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight">
            Related examples
          </h2>
          <ul className="mt-5 grid sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/work/${r.slug}`}
                  className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 hover:border-[var(--copper)]/40 transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-wider text-[var(--text-dim)]">
                    {r.category}
                  </div>
                  <div className="mt-1 font-semibold tracking-tight text-white">
                    {r.title}
                  </div>
                  {r.blurb ? (
                    <p className="mt-1.5 text-[13.5px] text-[var(--text-muted)] leading-relaxed line-clamp-3">
                      {r.blurb}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-[14.5px] text-[var(--text-muted)]">
        <p>
          Looking for something in this direction?{" "}
          <Link
            href="/quote"
            className="text-[var(--copper-bright)] underline underline-offset-2 hover:text-white"
          >
            Ask about a quote
          </Link>
          {" · "}
          <Link
            href="/services"
            className="text-[var(--copper-bright)] underline underline-offset-2 hover:text-white"
          >
            See pricing
          </Link>
          {" · "}
          <Link
            href="/work"
            className="underline underline-offset-2 hover:text-white"
          >
            Browse all examples
          </Link>
        </p>
      </section>
    </article>
  );
}

/** Resolve related landing cards from slugs (skips missing). */
export function resolveRelatedCards(
  slugs: string[],
  blurbs?: Record<string, string>
): RelatedCard[] {
  const cards: RelatedCard[] = [];
  for (const slug of slugs) {
    const d = getPublicDemoBySlug(slug);
    if (!d) continue;
    cards.push({
      slug: d.slug,
      title: d.title,
      category: d.category,
      image: d.image,
      imageAlt: d.imageAlt,
      blurb: blurbs?.[slug],
    });
  }
  return cards;
}

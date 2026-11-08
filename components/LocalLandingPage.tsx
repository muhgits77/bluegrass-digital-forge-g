import Link from "next/link";
import NotLocalTemplates from "@/components/NotLocalTemplates";
import { CONTACT_EMAIL, SITE_URL, canonicalUrl } from "@/lib/constants";

export type LocalLandingProps = {
  path: string;
  label: string;
  h1: string;
  intro: string;
  sections: { title: string; body: string }[];
  builds: string[];
  areaServed: { type: "City" | "AdministrativeArea" | "Place"; name: string }[];
  serviceName: string;
  notLocal: { href: string; label: string };
};

/** Shared layout for Lake Cumberland town and trade landing pages. */
export default function LocalLandingPage(p: LocalLandingProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.serviceName,
    url: canonicalUrl(p.path),
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Bluegrass Digital Forge",
      email: CONTACT_EMAIL,
      sameAs: ["https://share.google/JKjYBoMEpHxleaFfL"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Monticello",
        addressRegion: "KY",
        postalCode: "42633",
        addressCountry: "US",
      },
    },
    areaServed: p.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="label tracking-[1.6px]">{p.label}</div>
      <h1 className="section-title tracking-tight">{p.h1}</h1>
      <p className="mt-3 text-lg text-[#8a9599]">{p.intro}</p>
      <p className="mt-3 text-[15px] text-[#c8cfd3]">
        <strong className="font-medium">Custom builds from $1,200</strong>,
        Business Suites from $2,500. Flat one-time pricing, and you own the site
        and the code.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/quote" className="btn btn-primary">
          Get a quote
        </Link>
        <Link href="/services" className="btn btn-secondary">
          See pricing
        </Link>
      </div>

      <div className="mt-12 grid gap-4">
        {p.sections.map((s) => (
          <div key={s.title} className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-6">
            <h2 className="font-semibold tracking-tight mb-1 text-[#f4a261]">{s.title}</h2>
            <p className="text-[14.5px] text-[#c8cfd3] leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="label tracking-[1.5px]">WHAT I BUILD</div>
        <ul className="mt-3 space-y-2 text-[15px] text-[#c8cfd3]">
          {p.builds.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      </div>

      <p className="mt-10 text-[14.5px] text-[#9aa6ad]">
        See every town I serve on the{" "}
        <Link href="/service-areas" className="underline hover:text-white">
          service areas page
        </Link>
        , or browse{" "}
        <Link href="/work" className="underline hover:text-white">
          live demo websites
        </Link>
        .
      </p>

      <NotLocalTemplates href={p.notLocal.href} label={p.notLocal.label} />
    </div>
  );
}

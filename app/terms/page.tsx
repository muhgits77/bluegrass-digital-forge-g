import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms | Bluegrass Digital Forge",
  description:
    "Plain terms for Bluegrass Digital Forge in Monticello, Kentucky — portfolio demos, quotes, and ownership after a paid build.",
  alternates: { canonical: canonicalUrl("/terms") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms | Bluegrass Digital Forge",
    description:
      "Plain terms for Bluegrass Digital Forge in Monticello, Kentucky — portfolio demos, quotes, and ownership after a paid build.",
    url: canonicalUrl("/terms"),
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="label tracking-[1.6px]">TERMS — MONTICELLO, KY</div>
      <h1 className="section-title tracking-tight mt-1">Terms</h1>
      <p className="text-[var(--text-muted)] mt-3 text-[15.5px] leading-relaxed">
        Short and plain. Bluegrass Digital Forge, Monticello, Kentucky. Last
        updated August 28, 2026.
      </p>

      <div className="mt-8 space-y-6 text-[#c8cfd3] text-[15.5px] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Portfolio demos
          </h2>
          <p>
            Demos on this site are fictional examples built by Bluegrass Digital
            Forge unless a page clearly marks a live local project — today that
            includes{" "}
            <a
              href="https://monticelloeatsandfinds.com"
              className="underline hover:text-[var(--gold-light)]"
              rel="noopener noreferrer"
            >
              Monticello Eats & Finds
            </a>
            . Do not copy a demo and present it as your own client work.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Quotes are not contracts
          </h2>
          <p>
            Sending a{" "}
            <Link href="/quote" className="underline hover:text-[var(--gold-light)]">
              quote request
            </Link>{" "}
            is not a contract. Work starts only after both sides agree in writing.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Ownership after a paid build
          </h2>
          <p>
            After a paid custom build, you own the code for that project as
            described on{" "}
            <Link href="/services" className="underline hover:text-[var(--gold-light)]">
              Services
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Templates
          </h2>
          <p>
            Templates sold separately follow the listing terms on{" "}
            <a
              href="https://bluegrasstemplates.com"
              className="underline hover:text-[var(--gold-light)]"
              rel="noopener noreferrer"
            >
              bluegrasstemplates.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            As-is, Kentucky law
          </h2>
          <p>
            This marketing site is provided as-is. These terms are governed by the
            laws of the Commonwealth of Kentucky.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Questions
          </h2>
          <p>
            Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline hover:text-[var(--gold-light)]"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-10 text-[14px] text-[var(--text-muted)]">
        Also see{" "}
        <Link href="/privacy" className="underline hover:text-[var(--gold-light)]">
          Privacy
        </Link>
        .
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy | Bluegrass Digital Forge",
  description:
    "How Bluegrass Digital Forge in Monticello, Kentucky handles information you send on the Quote and Contact forms.",
  alternates: { canonical: canonicalUrl("/privacy") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy | Bluegrass Digital Forge",
    description:
      "How Bluegrass Digital Forge in Monticello, Kentucky handles information you send on the Quote and Contact forms.",
    url: canonicalUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <div className="label tracking-[1.6px]">PRIVACY — MONTICELLO, KY</div>
      <h1 className="section-title tracking-tight mt-1">Privacy</h1>
      <p className="text-[var(--text-muted)] mt-3 text-[15.5px] leading-relaxed">
        Straight talk from Bluegrass Digital Forge in Monticello, Kentucky.
        Last updated August 28, 2026.
      </p>

      <div className="mt-8 space-y-6 text-[#c8cfd3] text-[15.5px] leading-relaxed">
        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Who we are
          </h2>
          <p>
            Bluegrass Digital Forge is a Monticello, Kentucky website studio.
            Questions:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline hover:text-[var(--gold-light)]"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            What we collect
          </h2>
          <p>
            We collect what you type on the{" "}
            <Link href="/quote" className="underline hover:text-[var(--gold-light)]">
              Quote
            </Link>{" "}
            and{" "}
            <Link href="/contact" className="underline hover:text-[var(--gold-light)]">
              Contact
            </Link>{" "}
            forms: name, email, phone, and project notes (and any other fields you
            fill in).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Why we collect it
          </h2>
          <p>
            That information is used only to reply to your request. We do not sell
            or rent it.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            How email is sent
          </h2>
          <p>
            Messages go out through Resend so we can answer from{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline hover:text-[var(--gold-light)]"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Accounts
          </h2>
          <p>
            This marketing site does not run a public account system. You are not
            creating a login when you send a quote or a hello.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Hosting and analytics
          </h2>
          <p>
            The site is hosted on Vercel. Platform hosting logs and analytics may
            exist at that level (including Google Analytics). We do not use that
            to sell your contact information.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-[var(--text)] text-lg tracking-tight mb-2">
            Change or delete what you sent
          </h2>
          <p>
            Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline hover:text-[var(--gold-light)]"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            and we will update or remove what you asked us to keep from a quote or
            contact message.
          </p>
        </section>
      </div>

      <p className="mt-10 text-[14px] text-[var(--text-muted)]">
        Also see{" "}
        <Link href="/terms" className="underline hover:text-[var(--gold-light)]">
          Terms
        </Link>
        .
      </p>
    </div>
  );
}

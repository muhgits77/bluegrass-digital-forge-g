"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

const EMAIL = CONTACT_EMAIL;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = responseData?.error || "We couldn't send your message. Please try again.";
        setSubmitError(msg);
        setIsSubmitting(false);
        return;
      }

      // Success — show thank you (no email client popup)
      setSent(true);
      form.reset();
      setIsSubmitting(false);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setSubmitError("Network error. Please check your connection and try again, or email us directly.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <div className="label">CONTACT — MONTICELLO KY WEBSITE DESIGNER</div>
      <h1 className="section-title tracking-tight mt-1">Contact the Monticello KY Website Designer for Lake Cumberland &amp; Charleston SC Business Websites</h1>
      <p className="text-[#8a9599] mt-2">Talk to the Monticello KY website designer serving Lake Cumberland business websites, Wayne County web design, and now Charleston SC, Summerville &amp; the South Carolina Lowcountry. I usually reply within a few hours.</p>
      <p className="text-[15px] text-[#c8cfd3] mt-4">
        Prefer to email directly? Reach me at{" "}
        <a
          href={`mailto:${EMAIL}`}
          className="text-[#f4a261] underline underline-offset-2 hover:text-white font-medium"
        >
          {EMAIL}
        </a>
        {" "}
        — real replies from Monticello.
      </p>

      {!sent ? (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="label mb-1.5">Your Name</div>
              <input name="name" className="input w-full" required autoComplete="name" />
            </div>
            <div>
              <div className="label mb-1.5">Business (optional)</div>
              <input name="business" className="input w-full" autoComplete="organization" />
            </div>
          </div>
          <div>
            <div className="label mb-1.5">Email</div>
            <input type="email" name="email" className="input w-full" required autoComplete="email" />
          </div>
          <div>
            <div className="label mb-1.5">Message</div>
            <textarea name="message" className="input w-full min-h-[140px]" placeholder="Tell me a bit about what you're looking for..." required />
          </div>

          {/* Honeypot — hidden from people; bots often fill it */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="contact-company-url">Company website</label>
            <input
              type="text"
              id="contact-company-url"
              name="company_url"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          {/* Lightweight human check — neighborly, not CAPTCHA-like */}
          <div>
            <label htmlFor="contact-human-check" className="label mb-1.5">
              Quick check — what is 4 + 5?
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="contact-human-check"
              name="humanCheck"
              className="input w-full max-w-[8rem]"
              required
              min={0}
              max={99}
              autoComplete="off"
              placeholder="?"
            />
          </div>

          {/* Error banner — matches quote form style */}
          {submitError && (
            <div className="rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-200" role="alert">
              {submitError}
              <div className="mt-2 text-[12.5px]">You can also email <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a> directly.</div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn btn-primary w-full py-3 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                SENDING...
              </>
            ) : (
              "Send Message →"
            )}
          </button>

          <p className="text-center text-[12.5px] text-[#9aa6ad] -mt-2">
            Sends securely via email. You’ll receive a confirmation — no email app opens.
          </p>
        </form>
      ) : (
        /* Beautiful Branded Thank You — consistent with quote page */
        <div className="mt-8 rounded-3xl border border-[#1a2225] bg-[#0a0c0f] p-9 sm:p-12 text-center">
          <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#c17a5a]/10">
            <span className="text-3xl">✓</span>
          </div>

          <h3 className="text-3xl font-semibold tracking-tighter">Thank you.</h3>
          
          <p className="mt-3 max-w-md mx-auto text-[#c9b9a8]">
            Your message was sent. A confirmation email is on its way, and I’ll reply personally from Monticello within a day (usually same day).
          </p>

          <div className="my-8 mx-auto max-w-md rounded-2xl bg-[#111518] border border-[#243530] p-6 text-left text-sm">
            <div className="uppercase tracking-[1.5px] text-xs text-[#8a9599] mb-2">What happens next</div>
            <ul className="space-y-2.5 text-[#d9d1c4]">
              <li className="flex gap-2.5"><span className="text-[#c17a5a] mt-1">→</span> I read every message myself.</li>
              <li className="flex gap-2.5"><span className="text-[#c17a5a] mt-1">→</span> You’ll get a real reply from me soon.</li>
              <li className="flex gap-2.5"><span className="text-[#c17a5a] mt-1">→</span> Need something faster? Reply to the confirmation email.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn btn-primary">Get a full custom quote →</Link>
            <Link href="/services" className="btn btn-secondary">See pricing &amp; packages</Link>
          </div>

          <div className="mt-10 text-xs text-[#8a9599]">
            Questions? Email <a href={`mailto:${EMAIL}`} className="underline hover:text-[#c17a5a]">{EMAIL}</a>
          </div>
        </div>
      )}

      {!sent && (
        <>
          <div className="mt-10 text-[14.5px] text-[#9aa6ad] border-t border-[#1a2225] pt-6">
            Prefer to call or text? Email{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#f4a261] underline underline-offset-2 hover:text-white"
            >
              {EMAIL}
            </a>{" "}
            and I&apos;ll happily share my number. Based in Monticello — serving the entire Lake Cumberland &amp; Wayne County region.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">Or get a full custom quote →</Link>
            <Link href="/services" className="btn btn-secondary">See pricing &amp; packages</Link>
          </div>
        </>
      )}
    </div>
  );
}
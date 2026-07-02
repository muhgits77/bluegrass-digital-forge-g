"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

const EMAIL = CONTACT_EMAIL; // Centralized — points to BluegrassDigitalForge@protonmail.com for all contact links

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name");
    const business = data.get("business");
    const email = data.get("email");
    const message = data.get("message");

    const subject = encodeURIComponent(`Contact from ${name} — ${business || "Website inquiry"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <div className="label">CONTACT — MONTICELLO KY WEBSITE DESIGNER</div>
      <h1 className="section-title tracking-tight mt-1">Let&apos;s talk about your Lake Cumberland website.</h1>
      <p className="text-[#8a9599] mt-2">I usually reply within a few hours during the week. No forms or tickets — just a real email.</p>

      {!sent ? (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="label mb-1.5">Your Name</div>
              <input name="name" className="input w-full" required />
            </div>
            <div>
              <div className="label mb-1.5">Business (optional)</div>
              <input name="business" className="input w-full" />
            </div>
          </div>
          <div>
            <div className="label mb-1.5">Email</div>
            <input type="email" name="email" className="input w-full" required />
          </div>
          <div>
            <div className="label mb-1.5">Message</div>
            <textarea name="message" className="input w-full min-h-[140px]" placeholder="Tell me a bit about what you're looking for..." required />
          </div>

          <button type="submit" className="btn btn-primary w-full py-3">Send Message →</button>
          <p className="text-[12.5px] text-center text-[#9aa6ad]">This will open your email app with the message ready to send to {EMAIL}.</p>
        </form>
      ) : (
        <div className="mt-8 rounded-2xl bg-[#0a0c0f] p-7 text-center border border-[#1a2225]">
          Thanks! Your email client should be open. Hit send and I&apos;ll be in touch shortly.
        </div>
      )}

      <div className="mt-10 text-[14.5px] text-[#9aa6ad] border-t border-[#1a2225] pt-6">
        Prefer to call or text? Reach out via the email above and I&apos;ll happily share my number. Based in Monticello — serving the entire Lake Cumberland &amp; Wayne County region.
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/quote" className="btn btn-primary">Or get a full custom quote →</Link>
        <Link href="/services" className="btn btn-secondary">See pricing &amp; packages</Link>
      </div>
    </div>
  );
}

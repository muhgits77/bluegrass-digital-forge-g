"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

const EMAIL = CONTACT_EMAIL; // Centralized — all business card / branding inquiries email to BluegrassDigitalForge@protonmail.com

interface BCForm {
  name: string;
  business: string;
  email: string;
  phone: string;
  package: string;
  customPrice: string;
  qrCode: string;
  paper: string;
  specialRequests: string;
  cardContent: string;
  timeline: string;
  notes: string;
}

const initial: BCForm = {
  name: "", business: "", email: "", phone: "",
  package: "",
  customPrice: "",
  qrCode: "", paper: "", specialRequests: "", cardContent: "",
  timeline: "", notes: "",
};

const packages = [
  { label: "Business Card Design Only", price: "$150", note: "Digital files only" },
  { label: "Printing Only (use your design)", price: "Custom quote", note: "We print your existing artwork" },
  { label: "Business Cards + 250 Printed", price: "$250", note: "" },
  { label: "Business Cards + 500 Printed", price: "$300", note: "Most Popular" },
  { label: "Branding Starter Kit", price: "$450", note: "" },
  { label: "Full Branding Kit", price: "$750", note: "" },
  { label: "Custom / Other", price: "Manual price", note: "" },
];

const paperOptions = ["Standard Matte", "Glossy", "Thick Premium (recommended)", "Other"];

export default function BusinessCardsPage() {
  const [form, setForm] = useState<BCForm>(initial);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof BCForm>(k: K, v: BCForm[K]) => setForm((f) => ({ ...f, [k]: v }));

  const buildMailto = () => {
    const lines: string[] = [];
    lines.push(`Name: ${form.name}`);
    lines.push(`Business: ${form.business}`);
    lines.push(`Email: ${form.email}`);
    if (form.phone) lines.push(`Phone: ${form.phone}`);
    lines.push("");
    lines.push(`SELECTED PACKAGE: ${form.package}`);
    if (form.package === "Custom / Other" && form.customPrice) lines.push(`Custom price noted: ${form.customPrice}`);
    lines.push("");
    lines.push(`QR CODE: ${form.qrCode || "—"}`);
    lines.push(`PAPER / FINISH: ${form.paper || "—"}`);
    lines.push(`SPECIAL REQUESTS: ${form.specialRequests || "—"}`);
    lines.push("");
    lines.push("CARD CONTENT DETAILS:");
    lines.push(form.cardContent || "(none provided)");
    lines.push("");
    lines.push(`TIMELINE: ${form.timeline || "—"}`);
    lines.push(`ADDITIONAL NOTES: ${form.notes || "—"}`);
    lines.push("");
    lines.push("Submitted via /business-cards form");

    const subject = encodeURIComponent(`Business Cards Quote — ${form.business}`);
    const body = encodeURIComponent(lines.join("\n"));
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.business || !form.email || !form.package) {
      alert("Please fill name, business, email and choose a package.");
      return;
    }
    window.location.href = buildMailto();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-7">
        <div className="label tracking-[2px]">BUSINESS CARDS &amp; BRANDING</div>
        <h1 className="section-title tracking-tight mt-1">Cards That Actually Get Handed Out</h1>
        <p className="mt-2 text-[#8a9599]">Custom designed and printed for local Lake Cumberland businesses. Premium quality, honest pricing.</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-9">
          {/* 01 Your Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="step active">01</span>
              <span className="font-semibold text-lg tracking-tight">Your Info</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><div className="label mb-1.5">Your Name *</div><input className="input w-full" value={form.name} onChange={e => update("name", e.target.value)} required /></div>
              <div><div className="label mb-1.5">Business Name *</div><input className="input w-full" value={form.business} onChange={e => update("business", e.target.value)} required /></div>
              <div><div className="label mb-1.5">Email *</div><input type="email" className="input w-full" value={form.email} onChange={e => update("email", e.target.value)} required /></div>
              <div><div className="label mb-1.5">Phone (optional)</div><input className="input w-full" value={form.phone} onChange={e => update("phone", e.target.value)} /></div>
            </div>
          </div>

          {/* 02 Choose a Package — premium cards with gold popular */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="step active">02</span>
              <span className="font-semibold text-lg tracking-tight">Choose a Package</span>
            </div>
            <div className="label mb-3">Pick the option that fits best. $300 card package is the local favorite.</div>

            <div className="grid sm:grid-cols-2 gap-3">
              {packages.map((p, idx) => {
                const isSelected = form.package === p.label;
                const isPopular = p.label === "Business Cards + 500 Printed";
                return (
                  <label
                    key={idx}
                    className={`choice-card flex justify-between p-4 cursor-pointer border ${isSelected ? "selected" : ""} ${isPopular ? "popular" : ""}`}
                  >
                    <div>
                      <input type="radio" name="package" className="accent-[#3ddbd9]" checked={isSelected} onChange={() => update("package", p.label)} />
                      <div className="font-medium mt-1.5 tracking-tight">{p.label}</div>
                      {p.note && <div className="text-[12.5px] text-[#9aa6ad]">{p.note}</div>}
                      {isPopular && <span className="badge-gold mt-1 inline-block text-[9.5px]">MOST POPULAR</span>}
                    </div>
                    <div className="text-right font-semibold tabular-nums tracking-tight text-lg self-start">{p.price}</div>
                  </label>
                );
              })}
            </div>

            {form.package === "Custom / Other" && (
              <div className="mt-3">
                <div className="label mb-1">Tell me your custom request / desired price</div>
                <input className="input w-full" placeholder="$" value={form.customPrice} onChange={(e) => update("customPrice", e.target.value)} />
              </div>
            )}
          </div>

          {/* 03 Design Details */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="step active">03</span>
              <span className="font-semibold text-lg tracking-tight">Design Details</span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="label mb-2">Would you like a QR code on your card?</div>
                <div className="flex gap-4 text-sm">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="qr" className="accent-[#3ddbd9]" checked={form.qrCode === v} onChange={() => update("qrCode", v)} /> {v}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="label mb-1.5">Preferred paper / finish (if printed)</div>
                <select className="input w-full" value={form.paper} onChange={(e) => update("paper", e.target.value)}>
                  <option value="">Choose one…</option>
                  {paperOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <div className="label mb-1.5">Any special requests? (rounded corners, spot gloss, etc.)</div>
                <textarea className="input w-full min-h-16" value={form.specialRequests} onChange={e => update("specialRequests", e.target.value)} />
              </div>

              <div>
                <div className="label mb-1.5">Card content details (tagline, services, social links, etc.)</div>
                <textarea className="input w-full min-h-[92px]" placeholder="Brian • Bluegrass Digital Forge • 606-555-0192 • brian@..." value={form.cardContent} onChange={e => update("cardContent", e.target.value)} />
              </div>
            </div>
          </div>

          {/* 04 Timeline & Notes */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="step active">04</span>
              <span className="font-semibold text-lg tracking-tight">Timeline &amp; Notes</span>
            </div>

            <div className="space-y-5">
              <div>
                <div className="label mb-1.5">When do you need them?</div>
                <input className="input w-full" placeholder="e.g. 3 weeks, before July 4th" value={form.timeline} onChange={e => update("timeline", e.target.value)} />
              </div>
              <div>
                <div className="label mb-1.5">Anything else I should know?</div>
                <textarea className="input w-full min-h-[80px]" value={form.notes} onChange={e => update("notes", e.target.value)} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-5 text-[14.5px] text-[#9aa6ad]">
            After we review your request, I&apos;ll send you a simple proposal. A small deposit is required to begin design work (usually $75 for design-only, $100–$150 for printed packages). This protects both of us and locks in your spot. Most projects delivered in 5–10 business days.
          </div>

          <button type="submit" className="btn btn-primary w-full py-3 text-base">Submit My Request →</button>

          <p className="text-center text-[12.5px] text-[#9aa6ad]">Submitting opens your email app with the details pre-filled. Just hit send.</p>
        </form>
      ) : (
        <div className="rounded-3xl border border-[#1a2225] bg-[#0a0c0f] p-9 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">Request received (in your email)!</h3>
          <p className="mt-2 text-[#8a9599]">Your mail client opened with everything ready. Send it over and I&apos;ll get back to you quickly with next steps and a deposit invoice.</p>
          <Link href="/" className="btn btn-secondary mt-6 inline-block">Back home</Link>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/services" className="text-sm text-[#3ddbd9] hover:underline">← See full pricing &amp; branding options</Link>
      </div>
    </div>
  );
}

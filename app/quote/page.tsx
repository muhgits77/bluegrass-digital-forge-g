"use client";

import React, { useState } from "react";
import Link from "next/link";

const EMAIL = "BluegrassDigitalForge@protonmail.com";

interface FormData {
  name: string;
  business: string;
  email: string;
  phone: string;
  goals: string[];
  goalOther: string;
  targetCustomers: string;
  menuFrequency: string;
  updatesWho: string;
  likedDemos: string;
  changesWanted: string;
  logoStatus: string;
  mustHaves: string[];
  hasDomain: string;
  desiredLive: string;
  budget: string;
  updatesAfter: string;
  gbpStatus: string;
}

const initialForm: FormData = {
  name: "", business: "", email: "", phone: "",
  goals: [], goalOther: "",
  targetCustomers: "",
  menuFrequency: "", updatesWho: "",
  likedDemos: "", changesWanted: "",
  logoStatus: "",
  mustHaves: [],
  hasDomain: "", desiredLive: "", budget: "", updatesAfter: "",
  gbpStatus: "",
};

const goalOptions = [
  "Get more people to find and visit my business",
  "Show my menu / services and current specials",
  "Let people pre-order or order online",
  "Show my weekly schedule & locations",
  "Promote catering / private events",
  "Collect emails for updates & specials",
];

const mustHaveOptions = [
  "Online / pre-ordering",
  "Live schedule & location page",
  "Catering / events inquiry form",
  "Email signup for specials & alerts",
];

const budgetOptions = [
  "Starter Site — from $1,200",
  "Business Suite — from $2,500",
  "Not sure yet",
];

const updateOptions = ["I'll update it myself", "I'd prefer Brian handles updates", "Mix of both"];
const updateAfterOptions = ["I'll handle it", "Brian handles it", "Someone else on my team"];
const logoOptions = ["Yes — I have a logo and colors", "Logo only", "Not yet — I'd like help"];
const gbpOptions = ["Yes — claimed and active", "Yes — but it needs work", "No — I need to set one up", "Not sure"];
const domainOptions = ["Yes", "No", "I have one but it's not active yet"];
const freqOptions = ["Daily", "Weekly", "Seasonal", "Stable"];

function StepHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-5">
      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3ddbd9] text-[#050708] text-xs font-bold mr-2 align-middle">{num}</div>
      <span className="font-semibold tracking-tight text-lg align-middle">{title}</span>
    </div>
  );
}

export default function QuotePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const toggleArray = (key: "goals" | "mustHaves", val: string) => {
    setForm((f) => {
      const arr = [...f[key]];
      if (arr.includes(val)) {
        return { ...f, [key]: arr.filter((v) => v !== val) };
      } else {
        return { ...f, [key]: [...arr, val] };
      }
    });
  };

  const canNext = () => {
    if (step === 0) return !!form.name && !!form.business && !!form.email;
    if (step === 1) return form.goals.length > 0 || !!form.goalOther;
    return true;
  };

  const buildMailto = () => {
    const lines: string[] = [];
    lines.push(`Name: ${form.name}`);
    lines.push(`Business: ${form.business}`);
    lines.push(`Email: ${form.email}`);
    if (form.phone) lines.push(`Phone: ${form.phone}`);
    lines.push("");
    lines.push("MAIN GOALS:");
    form.goals.forEach((g) => lines.push(`• ${g}`));
    if (form.goalOther) lines.push(`• Other: ${form.goalOther}`);
    lines.push("");
    lines.push(`TARGET CUSTOMERS: ${form.targetCustomers || "(not specified)"}`);
    lines.push("");
    lines.push(`MENU / CONTENT FREQUENCY: ${form.menuFrequency || "—"}`);
    lines.push(`WHO HANDLES UPDATES: ${form.updatesWho || "—"}`);
    lines.push("");
    lines.push("DESIGN FEEDBACK:");
    lines.push(`What you liked: ${form.likedDemos || "—"}`);
    lines.push(`Requested changes: ${form.changesWanted || "—"}`);
    lines.push(`Logo / brand ready: ${form.logoStatus || "—"}`);
    lines.push("");
    lines.push("MUST-HAVE FEATURES:");
    form.mustHaves.forEach((m) => lines.push(`• ${m}`));
    lines.push("");
    lines.push(`HAS DOMAIN: ${form.hasDomain || "—"}`);
    lines.push(`DESIRED LIVE DATE: ${form.desiredLive || "—"}`);
    lines.push(`BUDGET: ${form.budget || "—"}`);
    lines.push(`POST-LAUNCH UPDATES: ${form.updatesAfter || "—"}`);
    lines.push(`GOOGLE BUSINESS PROFILE: ${form.gbpStatus || "—"}`);
    lines.push("");
    lines.push("Submitted via bluegrass-digital-forge.lovable.app quote form");

    const subject = encodeURIComponent(`Website Quote Request — ${form.business}`);
    const body = encodeURIComponent(lines.join("\n"));
    return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = buildMailto();
    window.location.href = mailto;
    setSubmitted(true);
  };

  const steps = [
    "Your Info",
    "Main Goal",
    "Target Customers",
    "Menu & Updates",
    "Design Feedback",
    "Must-Have Features",
    "Practical Details",
    "Local Presence",
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <div className="label tracking-[2px]">CUSTOM QUOTE</div>
        <h1 className="section-title tracking-tight mt-1">Let&apos;s Build the Right Website for Your Business</h1>
        <p className="mt-2 text-[#8a9599]">Answer a few quick questions so I can create a proposal tailored to your needs. Takes about 4–6 minutes.</p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-9">
          {/* Premium Progress */}
          <div className="flex items-center gap-1.5 text-xs text-[#8a9599] flex-wrap">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`step ${i === step ? "active" : i < step ? "done" : ""}`}
                  aria-current={i === step}
                >
                  {i.toString().padStart(2, "0")}
                </button>
                {i < steps.length - 1 && <div className="h-px w-2.5 bg-[#1a2225]" />}
              </React.Fragment>
            ))}
          </div>

          {/* STEP 0: Your Info */}
          {step === 0 && (
            <div className="form-section">
              <StepHeader num="00" title="Your Info" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="label mb-1.5">Your Name *</div>
                  <input className="input w-full" value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder="Jane Doe" />
                </div>
                <div>
                  <div className="label mb-1.5">Business Name *</div>
                  <input className="input w-full" value={form.business} onChange={(e) => update("business", e.target.value)} required placeholder="Smoky Wheels BBQ" />
                </div>
                <div>
                  <div className="label mb-1.5">Email *</div>
                  <input type="email" className="input w-full" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder="you@business.com" />
                </div>
                <div>
                  <div className="label mb-1.5">Phone (optional)</div>
                  <input className="input w-full" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(606) 555-0123" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Main Goal */}
          {step === 1 && (
            <div className="form-section">
              <StepHeader num="01" title="Main Goal" />
              <div className="label mb-3">Select all that apply.</div>
              <div className="grid grid-cols-1 gap-2">
                {goalOptions.map((g, idx) => (
                  <label key={idx} className="flex items-start gap-3 rounded-xl border border-[#1a2225] p-3.5 hover:border-[#374145] cursor-pointer choice-card">
                    <input type="checkbox" checked={form.goals.includes(g)} onChange={() => toggleArray("goals", g)} className="mt-1 accent-[#3ddbd9]" />
                    <span className="text-sm">{g}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <div className="label mb-1.5">Other goals or details:</div>
                <input className="input w-full" placeholder="Tell me anything else..." value={form.goalOther} onChange={(e) => update("goalOther", e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 2: Target Customers */}
          {step === 2 && (
            <div className="form-section">
              <StepHeader num="02" title="Target Customers" />
              <div className="label mb-1.5">Who are your ideal customers?</div>
              <textarea className="input w-full min-h-[110px] resize-y" placeholder="Families at the lake, weekend visitors, local contractors, etc." value={form.targetCustomers} onChange={(e) => update("targetCustomers", e.target.value)} />
            </div>
          )}

          {/* STEP 3: Menu & Updates */}
          {step === 3 && (
            <div className="form-section space-y-6">
              <div>
                <StepHeader num="03" title="Menu &amp; Updates" />
                <div className="label mb-1.5">How often does your menu / content change?</div>
                <select className="input w-full" value={form.menuFrequency} onChange={(e) => update("menuFrequency", e.target.value)}>
                  <option value="">Choose one…</option>
                  {freqOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <div className="label mb-1.5">Who handles updates?</div>
                <select className="input w-full" value={form.updatesWho} onChange={(e) => update("updatesWho", e.target.value)}>
                  <option value="">Choose one…</option>
                  {updateOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: Design Feedback */}
          {step === 4 && (
            <div className="form-section space-y-6">
              <StepHeader num="04" title="Design Feedback" />
              <div>
                <div className="label mb-1.5">What did you like most about the demo(s) you saw?</div>
                <textarea className="input w-full min-h-[90px]" value={form.likedDemos} onChange={(e) => update("likedDemos", e.target.value)} />
              </div>
              <div>
                <div className="label mb-1.5">Any specific changes you&apos;d like? (colors, vibe, layout, etc.)</div>
                <textarea className="input w-full min-h-[90px]" value={form.changesWanted} onChange={(e) => update("changesWanted", e.target.value)} />
              </div>
              <div>
                <div className="label mb-1.5">Do you have a logo and brand colors ready?</div>
                <select className="input w-full" value={form.logoStatus} onChange={(e) => update("logoStatus", e.target.value)}>
                  <option value="">Choose one…</option>
                  {logoOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <p className="text-xs text-[#8a9599] mt-1.5">Have files to share? Email them to <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a> after you submit.</p>
              </div>
            </div>
          )}

          {/* STEP 5: Must-Have Features */}
          {step === 5 && (
            <div className="form-section">
              <StepHeader num="05" title="Must-Have Features" />
              <div className="label mb-3">Pick everything you need.</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {mustHaveOptions.map((m, i) => (
                  <label key={i} className="flex gap-3 rounded-xl border border-[#1a2225] p-3.5 cursor-pointer hover:border-[#374145] choice-card">
                    <input type="checkbox" className="accent-[#3ddbd9] mt-0.5" checked={form.mustHaves.includes(m)} onChange={() => toggleArray("mustHaves", m)} />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Practical Details */}
          {step === 6 && (
            <div className="form-section space-y-6">
              <StepHeader num="06" title="Practical Details" />
              <div>
                <div className="label mb-1.5">Do you have a domain name already?</div>
                <select className="input w-full" value={form.hasDomain} onChange={(e) => update("hasDomain", e.target.value)}>
                  <option value="">Select…</option>
                  {domainOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <div className="label mb-1.5">When would you like the site live?</div>
                <input className="input w-full" placeholder="e.g. end of July, before fall festival" value={form.desiredLive} onChange={(e) => update("desiredLive", e.target.value)} />
              </div>
              <div>
                <div className="label mb-1.5">Rough budget range</div>
                <select className="input w-full" value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                  <option value="">Choose one…</option>
                  {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <div className="label mb-1.5">Who manages small updates after launch?</div>
                <select className="input w-full" value={form.updatesAfter} onChange={(e) => update("updatesAfter", e.target.value)}>
                  <option value="">Choose one…</option>
                  {updateAfterOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* STEP 7: Local Presence */}
          {step === 7 && (
            <div className="form-section">
              <StepHeader num="07" title="Local Presence" />
              <div className="label mb-1.5">Are you on Google Business Profile?</div>
              <select className="input w-full" value={form.gbpStatus} onChange={(e) => update("gbpStatus", e.target.value)}>
                <option value="">Choose one…</option>
                {gbpOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>

              <div className="mt-8 rounded-2xl bg-[#0a0c0f] border border-[#1a2225] p-5 text-sm text-[#8a9599]">
                Submitting opens your email app with the answers pre-filled — just hit send. No data is stored here.
              </div>
            </div>
          )}

          {/* Nav buttons — premium */}
          <div className="flex items-center justify-between pt-1">
            <button type="button" onClick={() => setStep(Math.max(0, step - 1))} className="btn btn-ghost" disabled={step === 0}>← Back</button>

            {step < 7 ? (
              <button type="button" onClick={() => setStep(Math.min(7, step + 1))} disabled={!canNext()} className="btn btn-primary disabled:opacity-50">Continue →</button>
            ) : (
              <button type="submit" className="btn btn-primary">Submit My Answers →</button>
            )}
          </div>

          <p className="text-center text-xs text-[#8a9599] -mt-2">All answers go straight to my inbox via your email client. No tracking, no storage on this site.</p>
        </form>
      ) : (
        <div className="rounded-3xl border border-[#1a2225] bg-[#0a0c0f] p-9 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">Thank you!</h3>
          <p className="mt-2 text-[#8a9599]">Your email client opened with everything pre-filled. Hit send and I&apos;ll reply within a day (usually same day).</p>
          <div className="mt-6">
            <Link href="/" className="btn btn-secondary">Back to Home</Link>
          </div>
          <p className="text-xs mt-8 text-[#8a9599]">Or email directly: <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a></p>
        </div>
      )}

      <div className="mt-10 text-center text-sm">
        <Link href="/services" className="text-[#3ddbd9] hover:underline">← Back to Services &amp; Pricing</Link>
      </div>
    </div>
  );
}

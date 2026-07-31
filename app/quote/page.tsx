"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import ReferralDiscountNote from "@/components/ReferralDiscountNote";

const EMAIL = CONTACT_EMAIL;

/** TruckDash plan query → budget label (Buy Now buttons use ?plan=starter | ?plan=pro). */
const TRUCKDASH_PLAN_BUDGET: Record<string, string> = {
  starter: "TruckDash Starter — $1,497 one-time",
  pro: "TruckDash Pro — $2,497 (or $1,997 launch)",
};

/** Read ?plan= without useSearchParams — avoids Suspense “Loading quote form…” flash. */
function getPlanFromLocation(): string {
  if (typeof window === "undefined") return "";
  try {
    return (new URLSearchParams(window.location.search).get("plan") || "")
      .toLowerCase()
      .trim();
  } catch {
    return "";
  }
}

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
  "Easily update daily location and hours myself (food trucks & mobile businesses)",
];

const mustHaveOptions = [
  "Online / pre-ordering",
  "Live schedule & location page",
  "Catering / events inquiry form",
  "Email signup for specials & alerts",
  "Simple mobile dashboard to update location/hours/menu myself",
];

const budgetOptions = [
  "Starter Site — from $1,200",
  "Business Suite — from $2,500",
  "TruckDash Starter — $1,497 one-time",
  "TruckDash Pro — $2,497 (or $1,997 launch)",
  "Not sure yet",
];

const updateOptions = ["I'll update it myself", "I'd prefer Brian handles updates", "Mix of both"];
const updateAfterOptions = ["I'll handle it", "Brian handles it", "Someone else on my team"];
const logoOptions = ["Yes — I have a logo and colors", "Logo only", "Not yet — I'd like help"];
const gbpOptions = ["Yes — claimed and active", "Yes — but it needs work", "No — I need to set one up", "Not sure"];
const domainOptions = ["Yes", "No", "I have one but it's not active yet"];
const freqOptions = ["Daily", "Weekly", "Seasonal", "Stable"];

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

function StepHeader({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-5">
      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c17a5a] text-[#f8f1e6] text-xs font-bold mr-2 align-middle">{num}</div>
      <span className="font-semibold tracking-tight text-lg align-middle">{title}</span>
    </div>
  );
}

export default function QuotePage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedBusiness, setSubmittedBusiness] = useState("");
  const [truckDashPlan, setTruckDashPlan] = useState<string | null>(null);

  // Prefill budget + goals when arriving from TruckDash Buy Now (?plan=starter|pro)
  // Uses window.location so the form paints immediately (no Suspense fallback).
  useEffect(() => {
    const plan = getPlanFromLocation();
    if (plan !== "starter" && plan !== "pro") return;
    const budget = TRUCKDASH_PLAN_BUDGET[plan];
    if (!budget) return;
    setTruckDashPlan(plan);
    setForm((f) => {
      if (f.budget === budget) return f;
      const goals = f.goals.includes(
        "Easily update daily location and hours myself (food trucks & mobile businesses)"
      )
        ? f.goals
        : [
            ...f.goals,
            "Easily update daily location and hours myself (food trucks & mobile businesses)",
          ];
      return { ...f, budget, goals };
    });
  }, []);

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

  // Basic validation per step + overall
  const canNext = () => {
    if (step === 0) {
      return form.name.trim().length > 1 && form.business.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    }
    if (step === 1) return form.goals.length > 0 || form.goalOther.trim().length > 0;
    return true;
  };

  const isFormValid = () => {
    return (
      form.name.trim().length > 1 &&
      form.business.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    );
  };

  const goToStep = (target: number) => {
    // Allow jumping forward only if prior steps pass basic checks
    if (target > step) {
      for (let s = 0; s < target; s++) {
        if (s === 0 && !(form.name.trim() && form.business.trim() && form.email)) return;
        if (s === 1 && !(form.goals.length || form.goalOther.trim())) return;
      }
    }
    setStep(Math.max(0, Math.min(steps.length - 1, target)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = data?.error || "We couldn't send your request. Please try again.";
        setSubmitError(msg);
        setIsSubmitting(false);
        return;
      }

      // Success — clear friendly confirmation (no email client popup)
      setSubmittedName(form.name.trim().split(/\s+/)[0] || form.name.trim());
      setSubmittedBusiness(form.business);
      setSubmitted(true);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Network error. Please check your connection and try again, or email us directly."
      );
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setStep(0);
    setSubmitted(false);
    setSubmitError(null);
    setSubmittedName("");
    setSubmittedBusiness("");
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-8">
        <div className="label tracking-[2px]">CUSTOM QUOTE — MONTICELLO KY WEBSITE DESIGNER</div>
        <h1 className="section-title tracking-tight mt-1">Get a Quote from the Monticello KY Website Designer for Lake Cumberland &amp; South Carolina Lowcountry Business Websites</h1>
        <p className="mt-2 text-[#8a9599]">A few quick questions for your Wayne County, Lake Cumberland, or Charleston SC / Lowcountry project. Flat price proposal from the local Monticello builder. Real responses, no automated fluff. Takes 4–6 minutes.</p>
        {truckDashPlan && (
          <div className="mt-4 rounded-xl border border-[#f4a261]/35 bg-[#0a0c0f] px-4 py-3 text-[14px] text-[#c8cfd3]">
            <span className="font-medium text-[#f4a261]">TruckDash {truckDashPlan === "pro" ? "Pro" : "Starter"}</span>
            {" — "}
            interest noted. Budget is pre-filled; complete the form and Brian will follow up on purchase details.
            {" "}
            <Link href="/truckdash" className="underline hover:text-white text-[#d4a373]">
              View TruckDash plans
            </Link>
          </div>
        )}
        <ReferralDiscountNote className="mt-4 rounded-xl border border-[#1f282b]/80 bg-[#0a0c0f]/60 px-4 py-2.5" />
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-9" noValidate>
          {/* Premium Progress — clickable + visual warmth */}
          <div className="flex items-center gap-1.5 text-[12.5px] text-[#9aa6ad] flex-wrap" role="tablist" aria-label="Form steps">
            {steps.map((s, i) => (
              <React.Fragment key={i}>
                <button
                  type="button"
                  onClick={() => goToStep(i)}
                  className={`step ${i === step ? "active" : i < step ? "done" : ""}`}
                  aria-current={i === step}
                  aria-label={`Go to step ${i + 1}: ${s}`}
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
                  <input 
                    className="input w-full" 
                    value={form.name} 
                    onChange={(e) => update("name", e.target.value)} 
                    required 
                    placeholder="Jane Doe" 
                    autoComplete="name"
                  />
                </div>
                <div>
                  <div className="label mb-1.5">Business Name *</div>
                  <input 
                    className="input w-full" 
                    value={form.business} 
                    onChange={(e) => update("business", e.target.value)} 
                    required 
                    placeholder="Smoky Wheels BBQ" 
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <div className="label mb-1.5">Email *</div>
                  <input 
                    type="email" 
                    className="input w-full" 
                    value={form.email} 
                    onChange={(e) => update("email", e.target.value)} 
                    required 
                    placeholder="you@business.com" 
                    autoComplete="email"
                  />
                </div>
                <div>
                  <div className="label mb-1.5">Phone (optional)</div>
                  <input
                    type="tel"
                    inputMode="tel"
                    className="input w-full"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="Optional — if you prefer a call back"
                    autoComplete="tel"
                  />
                </div>
              </div>
              <p className="mt-4 text-[12.5px] text-[#9aa6ad]">Your information stays private and is only used to prepare your proposal.</p>
            </div>
          )}

          {/* STEP 1: Main Goal */}
          {step === 1 && (
            <div className="form-section">
              <StepHeader num="01" title="Main Goal" />
              <div className="label mb-3">Select all that apply.</div>
              <div className="grid grid-cols-1 gap-2">
                {goalOptions.map((g, idx) => (
                  <label key={idx} className={`flex items-start gap-3 rounded-xl border p-3.5 cursor-pointer choice-card ${form.goals.includes(g) ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={form.goals.includes(g)} 
                      onChange={() => toggleArray("goals", g)} 
                      className="mt-1 accent-[#c17a5a]" 
                    />
                    <span className="text-sm">{g}</span>
                  </label>
                ))}
              </div>
              <div className="mt-3">
                <div className="label mb-1.5">Other goals or details:</div>
                <input 
                  className="input w-full" 
                  placeholder="Tell me anything else about the project..." 
                  value={form.goalOther} 
                  onChange={(e) => update("goalOther", e.target.value)} 
                />
              </div>
            </div>
          )}

          {/* STEP 2: Target Customers */}
          {step === 2 && (
            <div className="form-section">
              <StepHeader num="02" title="Target Customers" />
              <div className="label mb-1.5">Who are your ideal customers?</div>
              <textarea 
                className="input w-full min-h-[110px] resize-y" 
                placeholder="Families at the lake, weekend visitors, local contractors, tourists passing through..." 
                value={form.targetCustomers} 
                onChange={(e) => update("targetCustomers", e.target.value)} 
              />
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
                <textarea className="input w-full min-h-[90px]" value={form.likedDemos} onChange={(e) => update("likedDemos", e.target.value)} placeholder="The warm tones, clean layout, the way the menu feels..." />
              </div>
              <div>
                <div className="label mb-1.5">Any specific changes you&apos;d like? (colors, vibe, layout, photos...)</div>
                <textarea className="input w-full min-h-[90px]" value={form.changesWanted} onChange={(e) => update("changesWanted", e.target.value)} />
              </div>
              <div>
                <div className="label mb-1.5">Do you have a logo and brand colors ready?</div>
                <select className="input w-full" value={form.logoStatus} onChange={(e) => update("logoStatus", e.target.value)}>
                  <option value="">Choose one…</option>
                  {logoOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <p className="text-[12.5px] text-[#9aa6ad] mt-1.5">Have logo files ready? You can reply to the confirmation email after submitting.</p>
              </div>
            </div>
          )}

          {/* STEP 5: Must-Have Features */}
          {step === 5 && (
            <div className="form-section">
              <StepHeader num="05" title="Must-Have Features" />
              <div className="label mb-3">Pick everything you need for launch.</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {mustHaveOptions.map((m, i) => (
                  <label key={i} className={`flex gap-3 rounded-xl border p-3.5 cursor-pointer choice-card ${form.mustHaves.includes(m) ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      className="accent-[#c17a5a] mt-0.5" 
                      checked={form.mustHaves.includes(m)} 
                      onChange={() => toggleArray("mustHaves", m)} 
                    />
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
                <input 
                  className="input w-full" 
                  placeholder="e.g. end of July, before the fall festival, ASAP" 
                  value={form.desiredLive} 
                  onChange={(e) => update("desiredLive", e.target.value)} 
                />
              </div>
              <div>
                <div className="label mb-1.5">Rough budget range</div>
                <select className="input w-full" value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                  <option value="">Choose one…</option>
                  {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <ReferralDiscountNote className="mt-2.5" />
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
              <div>
                <div className="label mb-1.5">Are you on Google Business Profile?</div>
                <select className="input w-full" value={form.gbpStatus} onChange={(e) => update("gbpStatus", e.target.value)}>
                  <option value="">Choose one…</option>
                  {gbpOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div className="mt-8 rounded-2xl bg-[#0a0c0f] border border-[#1a2225] p-5 text-sm text-[#8a9599]">
                Your answers go straight to Brian’s inbox in Monticello. No agency middleman. No data stored on this site.
              </div>
            </div>
          )}

          {/* Error banner */}
          {submitError && (
            <div className="rounded-xl border border-red-900/60 bg-red-950/30 px-5 py-4 text-sm text-red-200" role="alert">
              {submitError}
              <div className="mt-2 text-[12.5px]">
                You can also email{" "}
                <a href={`mailto:${EMAIL}`} className="underline">
                  {EMAIL}
                </a>{" "}
                directly.
              </div>
            </div>
          )}

          {/* Nav buttons — premium Kentucky style */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              className="btn btn-secondary w-full sm:w-auto min-h-[48px]"
              disabled={step === 0 || isSubmitting}
            >
              ← Back
            </button>

            {step < 7 ? (
              <button
                type="button"
                onClick={() => setStep(Math.min(7, step + 1))}
                disabled={!canNext() || isSubmitting}
                className="btn btn-primary w-full sm:w-auto min-h-[48px] disabled:opacity-60"
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="btn btn-primary w-full sm:w-auto min-h-[48px] disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Submit My Quote Request →"
                )}
              </button>
            )}
          </div>

          {step === 7 && (
            <p className="text-center text-[13px] leading-relaxed text-[#c9b9a8] -mt-1 max-w-lg mx-auto">
              Your answers go straight to Brian’s inbox. Expect a real reply from Monticello within 24 hours (usually much faster).
            </p>
          )}

          <p className="text-center text-[12.5px] text-[#9aa6ad] -mt-2">
            Submitting sends your request securely by email — no email app will open on your device.
          </p>
        </form>
      ) : (
        /* Confirmation — honest, local, no public phone number */
        <div className="rounded-3xl border border-[#1a2225] bg-[#0a0c0f] p-9 sm:p-12 text-center">
          <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#c17a5a]/10">
            <span className="text-3xl" aria-hidden>
              ✓
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-tighter">
            Thank you{submittedName ? `, ${submittedName}` : ""}.
          </h2>

          <p className="mt-3 max-w-md mx-auto text-[#c9b9a8]">
            {submittedBusiness
              ? `Your quote request for ${submittedBusiness} is in.`
              : "Your quote request is in."}{" "}
            A confirmation email is on its way to your inbox.
          </p>

          <div className="my-8 mx-auto max-w-md rounded-2xl bg-[#111518] border border-[#243530] p-6 text-left text-sm">
            <div className="uppercase tracking-[1.5px] text-xs text-[#8a9599] mb-3">
              What happens next
            </div>
            <p className="text-[#d9d1c4] leading-relaxed mb-4">
              Your answers go straight to Brian’s inbox. Expect a real reply from Monticello within 24 hours (usually much faster).
            </p>
            <ul className="space-y-2.5 text-[#d9d1c4]">
              <li className="flex gap-2.5">
                <span className="text-[#c17a5a] mt-1">→</span>
                I personally review every request — no agency queue.
              </li>
              <li className="flex gap-2.5">
                <span className="text-[#c17a5a] mt-1">→</span>
                You’ll get a flat-price proposal built around your goals and timeline.
              </li>
              <li className="flex gap-2.5">
                <span className="text-[#c17a5a] mt-1">→</span>
                We’ll talk through the details for your Lake Cumberland or Lowcountry business.
              </li>
            </ul>
            <p className="mt-5 pt-4 border-t border-[#243530] text-[#9aa6ad] leading-relaxed">
              Once we’re talking about a real project, I’m happy to share a direct number for calls or texts if that works better for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn btn-secondary min-h-[48px]">
              Back to Home
            </Link>
            <Link href="/services" className="btn btn-primary min-h-[48px]">
              See Services &amp; Pricing
            </Link>
          </div>

          <div className="mt-10 text-xs text-[#8a9599]">
            Questions right now? Email{" "}
            <a href={`mailto:${EMAIL}`} className="underline hover:text-[#c17a5a]">
              {EMAIL}
            </a>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="mt-6 text-xs text-[#9aa6ad] hover:text-[#c17a5a] underline"
          >
            Submit another request
          </button>
        </div>
      )}

      {!submitted && (
        <div className="mt-10 text-center text-[14.5px]">
          <Link href="/services" className="text-[#c17a5a] hover:underline">
            ← Back to Services &amp; Pricing
          </Link>
          {" · "}
          <Link href="/truckdash" className="text-[#c17a5a] hover:underline">
            TruckDash plans
          </Link>
        </div>
      )}
    </div>
  );
}
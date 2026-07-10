import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "TruckDash Pricing | Kentucky Food Truck Dashboard & Flyer Studio",
  description:
    "Choose your TruckDash plan — Starter $1,497 or Pro $2,497 one-time. Pro includes Advanced Flyer Studio, multi-stop live map, recurring event calendar, advanced menu management, social caption generator, priority support & lifetime updates. Limited launch: Pro for $1,997 for the first 10 trucks.",
  keywords: [
    "TruckDash",
    "food truck dashboard Kentucky",
    "food truck flyer studio",
    "Kentucky food truck software",
    "Bluegrass Kitchen TruckDash",
    "Lake Cumberland food truck tools",
  ],
};

const starterFeatures = [
  "Core Dashboard & Schedule Manager",
  "Basic Flyer Studio (templates + QR codes)",
  "One-tap JSON export for your website",
  "Live Map with location sharing",
  "Offline mode",
  "Kentucky-style design & branding kit",
  "Lifetime updates",
];

const proFeatures = [
  "Everything in Starter, plus:",
  "Advanced Flyer Studio with custom templates",
  "Full Live Map with multi-stop routing",
  "Recurring event calendar integration",
  "Advanced menu management with pricing",
  "Social media caption generator",
  "Priority support & lifetime updates",
  "Custom branding & domain setup guidance",
];

const addOns = [
  { name: "Custom Menu Import & Data Migration", price: "$497" },
  { name: "Full PWA + Mobile App Setup", price: "$497" },
  { name: "Ongoing Hosting & Updates (annual)", price: "$397/year" },
  { name: "White-Label / Multi-Truck License", price: "Contact us" },
];

export default function TruckDashPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">TRUCKDASH — WEB APP FOR KENTUCKY FOOD TRUCKS</div>
        <h1 className="section-title tracking-tight mt-2">Choose Your TruckDash Plan</h1>
        <p className="mt-3 text-lg text-[#9aa6ad]">
          Built for Kentucky food truckers who work hard and deserve tools that make life easier. Honest pricing, no
          hidden fees, lifetime updates for your purchase.
        </p>
      </div>

      {/* Plan cards */}
      <div className="mt-9 grid lg:grid-cols-2 gap-5">
        {/* Starter */}
        <div className="pricing-card rounded-3xl p-8 md:p-9 flex flex-col border border-[#1a2225]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Starter</h2>
            <p className="text-[#8a9599] mt-1 font-medium">Perfect for getting started</p>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums">$1,497</span>
            <span className="text-[14px] text-[#9aa6ad]">one-time</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-[#f4a261]">HONEST FLAT PRICING</div>

          <ul className="mt-7 space-y-3 text-[15px]">
            {starterFeatures.map((f) => (
              <li key={f} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0 text-[#c17a5a]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[14px] text-[#9aa6ad]">
            <span className="font-medium text-[#c9b9a8]">Best for:</span> New trucks or simple operations.
          </p>

          <div className="mt-auto pt-8">
            <Link href="/quote?plan=starter" className="btn btn-secondary w-full">
              Buy Now →
            </Link>
          </div>
        </div>

        {/* Pro — Most Popular */}
        <div className="pricing-card popular rounded-3xl p-8 md:p-9 flex flex-col">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-3xl font-semibold tracking-tight">Pro</h2>
            <span className="badge">MOST POPULAR</span>
          </div>
          <p className="text-[#8a9599] font-medium">Perfect for growing food trucks</p>

          <div className="mt-4 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums">$2,497</span>
            <span className="text-[14px] text-[#9aa6ad]">one-time</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[1.5px] text-[#f4a261]">HONEST FLAT PRICING</div>
          <p className="mt-2 text-[13px] text-[#d4a373] font-medium">Save $500 with launch offer</p>

          <ul className="mt-7 space-y-3 text-[15px]">
            {proFeatures.map((f) => (
              <li key={f} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0 text-[#c17a5a]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[14px] text-[#9aa6ad]">
            <span className="font-medium text-[#c9b9a8]">Best for:</span> Established trucks wanting more automation
            and professional marketing tools.
          </p>

          <div className="mt-auto pt-8">
            <Link href="/quote?plan=pro" className="btn btn-primary w-full">
              Buy Now →
            </Link>
            <p className="text-center text-[12.5px] text-[#d4a373] mt-3">Save $500 with launch offer</p>
          </div>
        </div>
      </div>

      {/* Add-Ons */}
      <div className="mt-12">
        <div className="max-w-2xl mb-6">
          <div className="label tracking-[1.5px]">ADD-ONS</div>
          <h2 className="text-2xl font-semibold tracking-tight mt-1">Optional upgrades when you need them.</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {addOns.map((a) => (
            <div
              key={a.name}
              className="rounded-2xl border border-[#1f282b] bg-[#0a0c0f] p-5 flex items-start justify-between gap-4"
            >
              <div className="font-medium tracking-tight text-[15px]">{a.name}</div>
              <div className="shrink-0 text-right">
                {a.price === "Contact us" ? (
                  <Link href="/contact" className="text-[#f4a261] underline hover:text-white text-sm font-semibold">
                    Contact us
                  </Link>
                ) : (
                  <span className="font-semibold tabular-nums text-lg tracking-tight">{a.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limited Launch Offer */}
      <div className="mt-10 rounded-3xl border border-[#f4a261]/35 bg-[#0a0c0f] p-7 md:p-9">
        <div className="text-[#f4a261] text-xs tracking-[1.5px] mb-1">LIMITED LAUNCH OFFER</div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          First 10 Kentucky Food Trucks get{" "}
          <span className="text-[#f4a261]">Pro for only $1,997</span>
        </h2>
        <p className="mt-3 text-[15px] text-[#c8cfd3] max-w-2xl">
          Valid through August 2026 — Russell Springs, Jamestown, Monticello &amp; Lake Cumberland operators priority.
        </p>
        <div className="mt-5">
          <Link href="/quote?plan=pro" className="btn btn-primary">
            Claim Launch Pricing →
          </Link>
        </div>
      </div>

      {/* Testimonial */}
      <blockquote className="mt-10 max-w-2xl mx-auto text-center">
        <p className="text-lg md:text-xl text-[#c9b9a8] leading-relaxed italic">
          “Finally a tool that feels like it was built by someone who actually understands food truck life in Kentucky.”
        </p>
        <footer className="mt-4 text-[14px] text-[#9aa6ad]">
          — <cite className="not-italic font-medium text-[#d4a373]">Bluegrass Kitchen</cite>
        </footer>
      </blockquote>

      {/* Cross-links */}
      <div className="mt-14 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h3 className="text-xl font-semibold tracking-tight">Need a website too?</h3>
        <p className="text-[#8a9599] mt-1 max-w-lg mx-auto">
          Pair TruckDash with a food truck website that shows “Where We Are Today” and your live menu.
        </p>
        <div className="mt-5 flex gap-3 justify-center flex-wrap">
          <Link href="/food-truck-websites" className="btn btn-secondary">
            Food truck websites
          </Link>
          <Link href="/services" className="btn btn-secondary">
            Website pricing
          </Link>
          <Link href="/contact" className="btn btn-primary">
            Talk to Brian →
          </Link>
        </div>
      </div>
    </div>
  );
}

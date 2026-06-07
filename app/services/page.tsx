"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import BrandingCard from "@/components/BrandingCard";

const starterFeatures = [
  "Up to 4 pages (Home, Menu/Services, About, Contact)",
  "Mobile-first design that looks great on a phone",
  "Tap-to-call, tap-to-directions, contact form",
  "Domain & hosting setup walkthrough",
  "Google Business Profile basics",
  "30 days of post-launch tweaks included",
];

const businessFeatures = [
  "Up to 10 pages, fully custom",
  "Online menu, schedule, gallery, or service catalog",
  "Booking, reservation, ordering link, or lead forms",
  "Google Business Profile setup & local SEO tune-up",
  "Review collection link + analytics dashboard",
  "Photo touch-ups & on-brand styling",
  "Branded email signature & social cover graphics",
  "60 days of post-launch tweaks included",
];

const brandingAddons = [
  { title: "Business Card Design Only", price: "$150", popular: false, desc: "Custom digital business card files, print-ready. You own the files." },
  { title: "Cards + 250 Printed", price: "$250", popular: false, desc: "Design plus 250 premium printed cards delivered to your door." },
  { title: "Cards + 500 Printed", price: "$300", popular: true, desc: "Design plus 500 premium printed cards — best value for local businesses." },
  { title: "Branding Starter", price: "$450", popular: false, desc: "Logo refinement, color palette, business cards, email signature." },
  { title: "Full Branding Kit", price: "$750", popular: false, desc: "Logo design, complete brand kit, printed cards, social templates, email signature." },
];

const careBullets = [
  "Fast, secure hosting + SSL",
  "Uptime monitoring & monthly backups",
  "Small content updates anytime (text, photos, menus)",
  "Plugin & security updates",
  "Priority email response",
  "Cancel anytime — no contract",
];

const faqs = [
  { q: "How long does a site take?", a: "Most Starter Sites launch in about 2 weeks. Business Suites usually 3–5 weeks once we've got photos and content." },
  { q: "Do I have to use your hosting?", a: "Nope. The $79/mo care plan is optional. You can host wherever you want — direct hosting usually runs $10–20/month from the provider." },
  { q: "Can I update the site myself?", a: "Absolutely. I'll show you how to update content, photos, and menus on a quick screen-share. Or let me handle it on the care plan." },
  { q: "What if I just need a one-page site?", a: "If a single page is genuinely all you need, a Starter Site starting at $1,200 covers it with room to spare." },
  { q: "Do you work outside Monticello?", a: "Most clients are around Wayne County and Lake Cumberland, but I'm happy to work with any small business in Kentucky." },
  { q: "What if I just need a logo or business cards?", a: "Branding add-ons can be bought on their own — no website required. Visit the business cards page." },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="label tracking-[2px]">SERVICES &amp; PRICING</div>
        <h1 className="section-title tracking-tight mt-2">Flat pricing. Forged honest.</h1>
        <p className="mt-3 text-lg text-[#8a9599]">Two website packages. You own your site, your domain, and your content — forever. Hosting is optional.</p>
        <p className="text-sm text-[#8a9599] mt-1">Local web designer serving Monticello, Albany, Somerset, Jamestown, Burnside, and all of Wayne County, KY.</p>
      </div>

      {/* Two Big Website Cards — premium modern treatment, exact content */}
      <div className="mt-9 grid lg:grid-cols-2 gap-5">
        <div className="pricing-card rounded-3xl p-8 md:p-9 flex flex-col border border-[#1a2225]">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight">Starter Sites</h3>
            <p className="text-[#8a9599] mt-1">Food trucks, barbers &amp; small shops</p>
          </div>
          <div className="mt-4">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums">$1,200</span>
            <span className="ml-1.5 text-sm text-[#8a9599]">starting at • one-time</span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-[#3ddbd9]">FLAT SCOPE-BASED PRICING</div>

          <ul className="mt-7 space-y-[11px] text-[15px]">
            {starterFeatures.map((f, i) => (
              <li key={i} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Link href="/quote" className="btn btn-secondary w-full">Start a Starter Site →</Link>
            <p className="text-center text-xs text-[#8a9599] mt-3">
              See it live: <a href="https://smoky-wheels.lovable.app" target="_blank" className="underline hover:text-[#3ddbd9]">Smoky Wheels demo</a>
            </p>
          </div>
        </div>

        <div className="pricing-card popular rounded-3xl p-8 md:p-9 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-3xl font-semibold tracking-tight">Business Suites</h3>
            <span className="badge">MOST POPULAR</span>
          </div>
          <p className="text-[#8a9599]">Restaurants, shops &amp; co-ops</p>

          <div className="mt-4">
            <span className="text-5xl font-semibold tracking-[-2.5px] tabular-nums">$2,500</span>
            <span className="ml-1.5 text-sm text-[#8a9599]">starting at • one-time</span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-[#3ddbd9]">FLAT SCOPE-BASED PRICING</div>

          <ul className="mt-7 space-y-[11px] text-[15px]">
            {businessFeatures.map((f, i) => (
              <li key={i} className="flex gap-3 text-[#c8cfd3]">
                <Check size={18} className="check mt-[3px] shrink-0" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <Link href="/quote" className="btn btn-primary w-full">Start a Business Suite →</Link>
            <p className="text-center text-xs text-[#8a9599] mt-3">
              See it live: <a href="https://hickory-forge-steakhouse.lovable.app" target="_blank" className="underline hover:text-[#3ddbd9]">Hickory Forge demo</a>
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-center mt-6 text-[#8a9599]">Not sure which one? Tell me about your business — I&apos;ll point you to the Starter if that&apos;s all you need.</p>

      {/* Branding Add-ons — 5 cards, $300 marked Most Popular */}
      <div className="mt-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
          <div>
            <div className="label tracking-[1.5px]">BRANDING ADD-ONS</div>
            <h2 className="text-3xl tracking-tight font-semibold">Look the part, everywhere.</h2>
          </div>
          <p className="text-[#8a9599] max-w-md text-sm">Business cards, logo work, and full branding kits. Add to any website, or buy on their own.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {brandingAddons.map((b, idx) => (
            <BrandingCard key={idx} title={b.title} price={b.price} popular={b.popular} description={b.desc} />
          ))}
        </div>

        <div className="mt-5">
          <Link href="/business-cards" className="btn btn-secondary text-sm">Get a Business Card Quote →</Link>
        </div>
        <p className="text-xs text-[#8a9599] mt-2">Deposit required to begin design work. You own everything once paid in full.</p>
      </div>

      {/* Optional Care Plan — $79/mo full benefits */}
      <div className="mt-16 care-card rounded-3xl p-8 md:p-10 border border-[#1a2225]">
        <div className="max-w-2xl">
          <div className="label tracking-[1.5px]">OPTIONAL CARE PLAN</div>
          <h2 className="text-3xl tracking-tight font-semibold mt-1">I&apos;ll keep it running. You run your business.</h2>
          <p className="mt-2 text-[#8a9599]">Optional hosting + maintenance so you never have to think about it. Cancel anytime, no contract.</p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center gap-x-8 gap-y-4">
          <div>
            <span className="text-[42px] font-semibold tracking-[-2px] tabular-nums">$79</span>
            <span className="text-xl text-[#8a9599]">/month</span>
            <div className="text-xs text-[#3ddbd9] tracking-widest mt-0.5">TOTALLY OPTIONAL — HOST IT WHEREVER YOU WANT.</div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-[#c8cfd3] flex-1">
            {careBullets.map((b, i) => (
              <li key={i} className="flex gap-2.5"><Check size={16} className="check mt-1" /> {b}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16">
        <h3 className="font-semibold text-xl tracking-tight mb-6">FAQ</h3>
        <div className="divide-y divide-[#1a2225] max-w-3xl">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {faq.q}
                <span className="text-[#3ddbd9] group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-2 text-[#8a9599] pr-8 text-[15px]">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 rounded-2xl border border-[#1a2225] bg-[#0a0c0f] p-8 text-center">
        <h3 className="text-xl font-semibold tracking-tight">Not sure which one fits?</h3>
        <p className="text-[#8a9599] mt-1">Tell me about your business — I&apos;ll give an honest recommendation, even if it&apos;s the Starter.</p>
        <div className="mt-5">
          <Link href="/quote" className="btn btn-primary">Get a Free Recommendation →</Link>
        </div>
      </div>
    </div>
  );
}

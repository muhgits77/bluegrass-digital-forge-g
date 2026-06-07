"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import DemoCard from "@/components/DemoCard";
import Testimonial from "@/components/Testimonial";
import BrandingCard from "@/components/BrandingCard";

const demos = [
  { title: "Hickory Forge Steakhouse", subtitle: "Warm, appetizing steakhouse website with digital menu and reservations.", category: "Restaurant", href: "https://hickory-forge-steakhouse.lovable.app", color: "#c17a5a" },
  { title: "Smoky Wheels", subtitle: "Bold BBQ food truck website with live schedule and online ordering.", category: "Food Truck", href: "https://smoky-wheels.lovable.app", color: "#d97757" },
  { title: "Fiesta Taqueria", subtitle: "Vibrant taqueria website with colorful menu, catering, and contact.", category: "Mexican Restaurant", href: "https://fiesta-taqueria.lovable.app", color: "#e07a3d" },
  { title: "Ignite Fitness Company", subtitle: "Energetic gym website with class schedules and membership sign-ups.", category: "Fitness", href: "https://ignite-fitness-company.lovable.app", color: "#3ddbd9" },
  { title: "Summit Tire & Auto", subtitle: "Trustworthy tire shop website with service booking and instant quotes.", category: "Auto Service", href: "https://summit-tire-and-auto.lovable.app", color: "#5a7a9a" },
  { title: "Summit Auto Showcase", subtitle: "Sleek auto dealership website with inventory, financing, and trade-ins.", category: "Car Dealership", href: "https://summit-auto-showcase.lovable.app", color: "#4a6a8a" },
];

const testimonials = [
  { quote: "Brian built our site in two weeks and our dinner reservations tripled. And he actually answers his phone.", name: "Marcus T.", role: "Owner, Olivetta Steakhouse · Monticello, KY" },
  { quote: "I was losing catering leads because I had nowhere to send people. Now customers book straight from my truck's site. Game changer.", name: "Dana R.", role: "Owner, Wheelie Taco · Somerset, KY" },
  { quote: "Our old site looked like it was built in 2008. Brian gave us something modern that actually shows up on Google.", name: "Jeff & Linda S.", role: "Blue Water Marina · Jamestown, KY" },
  { quote: "Didn't think my tire shop needed a website. Turns out half my new customers find me online now. Best money I've spent in years.", name: "Carlos M.", role: "Owner, Monti Tire · Monticello, KY" },
  { quote: "Online class sign-ups alone saved me hours every week. Brian got exactly what a small gym needs.", name: "Rachel K.", role: "Founder, Empire IV Forge · Albany, KY" },
  { quote: "Honest pricing, no surprises, and he walked my wife through every step. Felt like hiring a neighbor — because he is one.", name: "Tom & Janie B.", role: "Heritage Home Furniture · Burnside, KY" },
];

// Exact detailed features from reference
const starterFeatures = [
  "Up to 5 polished pages (Home, Menu/Services, About, Contact + one more)",
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

export default function Home() {
  return (
    <>
      {/* HERO — Early morning on Lake Cumberland. Grok Build signature: distinct, atmospheric, ownable. Cool misty dawn + warm crafted accents. */}
      <section className="relative min-h-[94vh] flex flex-col overflow-hidden border-b border-[#1a2225] bg-[#050708]">
        {/* Hero scene image — using <img> + object-position for precise mobile focal control so the boat and left-side lake elements are always visible */}
        <img
          src="/hero-morning.jpg"
          alt="Early misty morning on Lake Cumberland — calm water and atmospheric light"
          className="hero-scene absolute inset-0 w-full h-full object-cover"
        />

        {/* Atmospheric overlays tuned for cool misty morning light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a24]/40 via-[#0c1a24]/10 to-[#050708]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_35%,rgba(180,200,210,0.12)_0%,transparent_65%)]" />

        {/* Floating light glints / mist particles for atmospheric depth (subtle, no objects) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.5px] h-[1.5px] rounded-full bg-[#f4a261]"
              style={{
                left: `${58 + (i % 4) * 9 + (i % 2) * 2}%`,
                top: `${32 + Math.floor(i / 3) * 9}%`,
                opacity: 0.28 + (i % 3) * 0.1,
              }}
              animate={{
                y: [0, -28 - (i % 3) * 6, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.7, 1.1, 0.7],
              }}
              transition={{
                duration: 7.2 + (i % 4) * 0.9,
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative flex-1 flex items-center justify-center px-5 pt-16 pb-8 md:pb-6" style={{ zIndex: 3 }}>
          <div className="w-full max-w-[860px] text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-[5px] text-[10px] tracking-[1.8px] text-white/90 mb-7"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f4a261]" />
              NOW BOOKING — LAKE CUMBERLAND, KY
            </motion.div>

            {/* Headline with warm signature accent — distinct Grok Build voice */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="section-title mx-auto max-w-[18ch] text-balance leading-[.91] text-white tracking-[-2.1px] text-[clamp(2.55rem,6.8vw,3.75rem)]"
            >
              Websites that win <span className="text-[#f4a261]">more customers</span><br />for Lake Cumberland businesses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-[42ch] text-[17.5px] leading-relaxed text-white/90"
            >
              Handcrafted in Monticello by a real neighbor you can actually call. Flat pricing, launched in 2–4 weeks, and you own every pixel.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full bg-[#f4a261] px-7 py-[11px] text-[14.5px] font-semibold text-[#050708] shadow-md hover:bg-[#e88f4a] hover:shadow-lg active:scale-[0.985] transition-all"
              >
                Get Your Free Quote →
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-[11px] text-[14px] font-semibold text-white hover:bg-white/10 hover:border-white/35 backdrop-blur transition-all"
              >
                See My Work
              </Link>

              <Link
                href="/templates"
                className="hidden sm:inline text-sm text-white/65 hover:text-white/90 ml-1 transition-colors"
              >
                Browse Templates
              </Link>
            </motion.div>

            {/* Trust bar with warm checks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-white/85"
            >
              {["Flat pricing, no surprises", "You own everything", "Local — real phone, real neighbor", "Live in 2–4 weeks"].map((t, i) => (
                <div key={i} className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-[#f4a261]" /> {t}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating teaser */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex justify-center pb-8"
          style={{ zIndex: 3 }}
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-black/45 backdrop-blur-2xl px-4 py-2 text-sm text-white/90">
            <span>
              <span className="font-semibold text-[#f4a261]">From $1,200</span> Starter Site
            </span>
            <span className="text-white/30">|</span>
            <span className="text-[13.5px] text-white/80 max-w-[32ch]">
              “Brian just gets it. No upsell — just a clean site that works.” — Local food truck owner
            </span>
          </div>
        </motion.div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-[#050708]/90 backdrop-blur" style={{ zIndex: 3 }}>
          <div className="mx-auto max-w-6xl px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-1 text-center text-sm">
            <div>
              <div className="text-[21px] font-semibold tracking-[-1.3px] text-white">16+</div>
              <div className="text-[11px] tracking-[1.5px] text-white/65">LIVE DEMO SITES</div>
            </div>
            <div>
              <div className="text-[21px] font-semibold tracking-[-1.3px] text-white">2–4 WEEKS</div>
              <div className="text-[11px] tracking-[1.5px] text-white/65">AVERAGE LAUNCH</div>
            </div>
            <div>
              <div className="text-[21px] font-semibold tracking-[-1.3px] text-white">5★</div>
              <div className="text-[11px] tracking-[1.5px] text-white/65">OWNER SATISFACTION</div>
            </div>
            <div>
              <div className="text-[21px] font-semibold tracking-[-1.3px] text-white">100%</div>
              <div className="text-[11px] tracking-[1.5px] text-white/65">YOU OWN EVERYTHING</div>
            </div>
          </div>
        </div>
      </section>

      {/* MY WORK — Demo websites front and center (Lovable flow) */}
      <section className="mx-auto max-w-7xl px-5 pt-11 pb-6">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="label tracking-[1.5px] mb-0.5">MY WORK</div>
            <h2 className="section-title tracking-tight">Demo websites for every local business type.</h2>
          </div>
          <Link href="/work" className="hidden md:inline-flex items-center gap-1 text-[14.5px] text-[#f4a261] hover:underline">
            See all 16 demo sites <ArrowRight size={15} />
          </Link>
        </div>
        <p className="text-[#9aa6ad] max-w-2xl mb-6 text-[14.5px]">Here are some of my recent demo websites built for different local business types. All are fictional examples.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.035, 0.25), ease: [0.22, 1, 0.36, 1] }}
            >
              <DemoCard {...d} />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center md:hidden">
          <Link href="/work" className="text-[14.5px] text-[#f4a261] hover:underline">See all 16 demo sites →</Link>
        </div>
      </section>

      {/* TESTIMONIALS / KIND WORDS */}
      <section className="mx-auto max-w-7xl px-5 py-9 border-t border-[#1a2225]">
        <div className="flex items-end justify-between mb-5">
          <div>
            <div className="label tracking-[1.5px]">KIND WORDS</div>
            <h2 className="section-title tracking-tight">What local owners say.</h2>
          </div>
          <span className="hidden md:block text-sm text-[#8a9599]">Straight from the trucks, shops &amp; restaurants around the lake.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.22), ease: [0.22, 1, 0.36, 1] }}
            >
              <Testimonial {...t} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY — Not an agency. Just your neighbor. */}
      <section className="bg-[#0a0c0f] border-y border-[#1a2225] py-10">
        <div className="mx-auto max-w-5xl px-5">
          <div className="max-w-2xl">
            <div className="label tracking-[1.5px]">WHY BLUEGRASS DIGITAL FORGE</div>
            <h2 className="section-title tracking-tight mt-1">Not an agency. Just your neighbor.</h2>
            <p className="mt-2.5 text-[#8a9599]">
              I build websites because I enjoy it and because the small businesses I love around here deserve better than a busted Facebook page. Call me, text me, or grab a coffee — that&apos;s the whole pitch.
            </p>
          </div>

          <div className="mt-7 grid md:grid-cols-2 gap-x-9 gap-y-3 text-[14.5px]">
            <div className="flex gap-2.5"><Check size={16} className="check mt-1 shrink-0" /> Flat, honest pricing — Starter Sites from $1,200, Business Suites from $2,500. You&apos;ll know the number before we start. No surprise invoices.</div>
            <div className="flex gap-2.5"><Check size={16} className="check mt-1 shrink-0" /> Fast turnaround — Most sites launch in 2–3 weeks. No 6-month timelines, no ghosting.</div>
            <div className="flex gap-2.5"><Check size={16} className="check mt-1 shrink-0" /> Built for food trucks &amp; shops — Menus, schedules, online orders, booking — the things small businesses actually need.</div>
            <div className="flex gap-2.5"><Check size={16} className="check mt-1 shrink-0" /> Found on Google — Mobile-first, fast, and tuned so people searching nearby actually find you.</div>
            <div className="flex gap-2.5"><Check size={16} className="check mt-1 shrink-0" /> You own everything — Your domain, your content, your code. No hostage situations if you want to leave.</div>
            <div className="flex gap-2.5"><Check size={16} className="check mt-1 shrink-0" /> Local &amp; approachable — I live here. You can text me. Real person, real phone.</div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 items-center">
            <Link href="/about" className="btn btn-secondary text-sm">More about me →</Link>
            <p className="text-[12.5px] text-[#9aa6ad]">Proudly serving Monticello, Albany, Somerset, Jamestown, Burnside, and all of Wayne County and the Lake Cumberland region.</p>
          </div>
        </div>
      </section>

      {/* PRICING + BRANDING — clean two packages */}
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-8">
        <div className="text-center mb-5">
          <div className="label tracking-[1.5px]">PRICING</div>
          <h2 className="section-title tracking-tight mt-1">Two simple packages.</h2>
          <p className="text-[#8a9599] mt-1.5 text-sm">Flat one-time pricing. You own everything. Hosting is optional.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-[860px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="pricing-card rounded-2xl p-7 md:p-8 flex flex-col border border-[#1a2225]"
          >
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">Starter Sites</h3>
                <p className="text-[#9aa6ad] text-[14.5px] mt-0.5">Perfect for food trucks, barbers, and very small shops</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold tabular-nums tracking-[-1.5px]">$1,200</div>
                <div className="text-[11.5px] text-[#9aa6ad] -mt-0.5">one-time</div>
              </div>
            </div>

            <ul className="mt-6 space-y-2 text-[14.5px] flex-1">
              {["Up to 4 polished pages", "Mobile-first, lightning-fast", "Local SEO baked in", "Contact form + Google Maps", "You own the domain & code"].map((f, i) => (
                <li key={i} className="flex gap-2.5 text-[#c8cfd3]"><Check size={15} className="check mt-0.5 shrink-0" /> {f}</li>
              ))}
            </ul>

            <Link href="/quote" className="btn btn-secondary mt-6 w-full text-sm">See what&apos;s included →</Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="pricing-card popular rounded-2xl p-7 md:p-8 flex flex-col border border-[#f4a261]"
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-semibold tracking-tight">Business Suites</h3>
              <span className="badge text-[10px] py-px">MOST POPULAR</span>
            </div>
            <p className="text-[#9aa6ad] text-[14.5px]">For restaurants, shops, and co-ops with menus, booking, or galleries</p>

            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-semibold tabular-nums tracking-[-1.5px]">$2,500</div>
              <div className="text-xs text-[#8a9599]">one-time</div>
            </div>

            <ul className="mt-5 space-y-2 text-[14.5px] flex-1">
              {["Up to 8 fully custom pages", "Online menu, booking or gallery", "Stripe checkout (optional)", "Advanced local SEO + analytics", "Two rounds of design revisions", "Hands-on launch + training call"].map((f, i) => (
                <li key={i} className="flex gap-2.5 text-[#c8cfd3]"><Check size={15} className="check mt-0.5 shrink-0" /> {f}</li>
              ))}
            </ul>

            <Link href="/quote" className="btn btn-primary mt-6 w-full text-sm">See what&apos;s included →</Link>
          </motion.div>
        </div>

        <p className="text-center text-[12.5px] mt-5 text-[#9aa6ad]">
          Optional care plan from $79/month · Branding add-ons from $150 · <Link href="/services" className="text-[#f4a261] underline">View full details</Link>
        </p>

        {/* Branding Add-ons */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
            <div>
              <div className="label tracking-[1.5px]">BRANDING ADD-ONS</div>
              <h3 className="text-xl tracking-tight font-semibold mt-0.5">Look the part, everywhere.</h3>
            </div>
            <p className="text-[14.5px] text-[#9aa6ad] max-w-sm md:text-right">Business cards, logo work, and full branding kits. Add to any website, or buy on their own.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {brandingAddons.map((b, idx) => (
              <BrandingCard key={idx} title={b.title} price={b.price} popular={b.popular} description={b.desc} />
            ))}
          </div>

          <div className="mt-4">
            <Link href="/business-cards" className="btn btn-secondary text-sm">Get a Business Card Quote →</Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-11 text-center border-t border-[#1a2225]">
        <div className="mx-auto max-w-xl px-5">
          <h2 className="text-3xl tracking-tight font-semibold">Ready for a website that actually works?</h2>
          <p className="mt-2 text-[15px] text-[#9aa6ad]">No pressure, no jargon — just an honest plan for your business from a real local neighbor.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn btn-primary px-7 py-2.5">Get a Custom Quote →</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2a3437] px-5 py-2 text-sm font-semibold hover:bg-[#0a0c0f]">Or just say hi</Link>
          </div>
          <p className="mt-3 text-xs text-[#8a9599]">Free 15-minute consultation available.</p>
        </div>
      </section>
    </>
  );
}

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
  { quote: "Reservations jumped almost overnight. Brian built the site in two weeks and actually answers when I call. Feels like a partner who lives down the road.", name: "Marcus Thompson", role: "Owner, Hickory Forge Steakhouse · Monticello, KY", photo: "/testimonial-marcus.jpg" },
  { quote: "Catering leads were slipping away every weekend. Now people book straight from the truck site while they're standing in line. Best decision I've made for the business.", name: "Dana Ramirez", role: "Owner, Smoky Wheels BBQ · Somerset, KY", photo: "/testimonial-dana.jpg" },
  { quote: "Our 2008 website was invisible. Brian gave us something that actually shows up when folks search the lake. Clean, fast, and it works on a phone.", name: "Jeff & Linda Sutton", role: "Blue Water Marina · Jamestown, KY", photo: "/testimonial-jeff-linda.jpg" },
  { quote: "I didn't think a tire shop needed a website. Half my new customers now find me online and call for same-day work. Best money I've spent in years.", name: "Carlos Mendoza", role: "Owner, Summit Tire & Auto · Monticello, KY", photo: "/testimonial-carlos.jpg" },
  { quote: "Class sign-ups went from phone tag to automatic. Brian understood exactly what a small gym on the lake needs — no fluff, just what works.", name: "Rachel Kline", role: "Founder, Ignite Fitness · Albany, KY", photo: "/testimonial-rachel.jpg" },
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
      {/* HERO — Stronger, more emotional. Perfect boat imagery with cinematic depth. Warm, bold, trustworthy. Grok signature: honest neighbor who delivers. */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden border-b border-[#243530] bg-[#0b1715]">
        {/* Hero background — tuned boat-centric Lake Cumberland scene. Emotional, ownable, premium. */}
        <div 
          className="absolute inset-0 bg-cover bg-center hero-boat"
          style={{ 
            backgroundImage: "url('/hero-lake-boat.jpg')",
            backgroundPosition: "center 36%"
          }}
        />
        
        {/* Deep cinematic overlays — warm trustworthy gradient, stronger at bottom for text pop, subtle top for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1715]/85 via-[#0b1715]/55 to-[#0b1715]/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1715]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_38%_28%,rgba(93,127,106,0.18)_0%,transparent_68%)]" />
        
        {/* Subtle water light glints / mist — atmospheric, not distracting. Slightly bolder for emotion */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
          {Array.from({ length: 13 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.6px] h-[1.6px] rounded-full bg-[#f4a261]"
              style={{
                left: `${55 + (i % 5) * 8.5 + (i % 3) * 1.5}%`,
                top: `${29 + Math.floor(i / 3) * 8.5}%`,
                opacity: 0.22 + (i % 4) * 0.09,
              }}
              animate={{
                y: [0, -32 - (i % 3) * 7, 0],
                opacity: [0.18, 0.72, 0.18],
                scale: [0.65, 1.15, 0.65],
              }}
              transition={{
                duration: 6.8 + (i % 5) * 0.85,
                repeat: Infinity,
                delay: i * 0.19,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content container — mobile perfect, centered, emotional weight */}
        <div className="hero-content relative flex-1 flex items-center justify-center px-5 pt-20 pb-9 md:pb-7" style={{ zIndex: 3 }}>
          <div className="w-full max-w-[720px] text-center">
            {/* Badge — local, immediate, trustworthy */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 backdrop-blur-2xl px-6 py-1.5 text-[10.5px] tracking-[2.2px] text-white/90 mb-7"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c17a5a] animate-pulse" />
              NOW BOOKING — LAKE CUMBERLAND &amp; WAYNE COUNTY
            </motion.div>

            {/* Powerful emotional headline — benefit + personality. Slightly bold, never salesy. */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-[17ch] text-balance leading-[0.985] text-white tracking-[-3.1px] text-[clamp(2.35rem,8.8vw,4.55rem)] md:text-[clamp(2.85rem,6.1vw,4.55rem)] font-semibold"
            >
              Websites forged for the lake.<br />That actually bring customers in.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-[39ch] text-[17px] md:text-[18px] leading-relaxed text-white/90"
            >
              Handcrafted in Monticello by a real neighbor who picks up the phone. Flat price. Launched in weeks. You own every single pixel.
            </motion.p>

            {/* Conversion-first CTAs — clear primary path, warm trustworthy secondary */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <Link
                href="/quote"
                className="inline-flex items-center justify-center rounded-full bg-[#c17a5a] px-10 py-3.5 text-[15.5px] font-semibold text-[#050708] shadow-xl hover:bg-[#a96447] active:scale-[0.985] transition-all w-full sm:w-auto"
              >
                Get a free quote in 2 minutes →
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-[15.5px] font-semibold text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-xl transition-all w-full sm:w-auto"
              >
                See the demos that win business
              </Link>
            </motion.div>

            {/* Micro trust — straight talk */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-[13px] text-white/75"
            >
              {["Flat price. No surprises.", "You own everything.", "Real neighbor. Real phone.", "Live in 2–4 weeks."].map((t, i) => (
                <div key={i} className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-[#c17a5a]" /> {t}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating social proof bar — emotional + price */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex justify-center pb-7"
          style={{ zIndex: 3 }}
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-3xl px-5 py-2 text-sm text-white/90 max-w-[92%]">
            <span className="font-semibold text-[#f4a261]">Starter Sites from $1,200</span>
            <span className="text-white/25">•</span>
            <span className="text-[13px] text-white/75 hidden sm:inline">“Brian just gets small business on the lake. No upsells. Just results.” — Local owner</span>
            <span className="text-[13px] text-white/75 sm:hidden">Real results. No upsells.</span>
          </div>
        </motion.div>

        {/* Stats — clean, bold, trustworthy numbers */}
        <div className="relative border-t border-white/10 bg-[#050708]/95 backdrop-blur" style={{ zIndex: 3 }}>
          <div className="mx-auto max-w-6xl px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-1 text-center text-sm">
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">16+</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">LIVE DEMO SITES</div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">2–4 WEEKS</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">TYPICAL LAUNCH</div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">5★</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">OWNER SATISFACTION</div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">100%</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">YOU OWN IT ALL</div>
            </div>
          </div>
        </div>
      </section>

      {/* MY WORK — Beautiful, emotional demo showcase. Better cards, stronger hovers, clear conversion path. */}
      <section className="mx-auto max-w-7xl px-5 pt-12 pb-7">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
          <div>
            <div className="label tracking-[1.6px] mb-1">REAL WORK FOR REAL BUSINESSES</div>
            <h2 className="section-title tracking-tight">See exactly what you get.</h2>
          </div>
          <Link href="/work" className="hidden md:inline-flex items-center gap-1.5 text-[14.5px] font-medium text-[#f4a261] hover:text-[#d88a5e] group">
            Explore all 16 live demos <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
        <p className="text-[#9aa6ad] max-w-2xl mb-6 text-[15px]">These are live, fictional demos — the exact quality, speed, and local Kentucky focus you receive with a real Bluegrass Digital Forge site. Click any to open.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.52, delay: Math.min(i * 0.032, 0.22), ease: [0.22, 1, 0.36, 1] }}
            >
              <DemoCard {...d} />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center md:hidden">
          <Link href="/work" className="inline-flex items-center gap-1 text-[14.5px] font-medium text-[#f4a261] hover:text-[#d88a5e]">See the full portfolio of 16 demos →</Link>
        </div>
      </section>

      {/* HOW IT WORKS — Clear, low-friction path. Conversion focused. Straight talk. */}
      <section className="bg-[#0a0c0f] border-y border-[#1a2225] py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-8">
            <div className="label tracking-[1.6px]">HOW IT WORKS</div>
            <h2 className="section-title tracking-tight mt-1">Simple. Honest. Fast.</h2>
            <p className="mt-2 text-[#9aa6ad] max-w-md mx-auto">Four steps. No mystery. No 6-month timelines. You stay in control.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "15-minute chat", desc: "We talk about your business, customers, and what success looks like. No hard sell. Just a real conversation with a neighbor." },
              { num: "02", title: "Clear proposal", desc: "I send a flat-price proposal with exact scope and timeline. You know the number before we start. No surprises later." },
              { num: "03", title: "I build it fast", desc: "2–4 weeks typical. You see progress. We refine together. Photos, menus, real local details — all handled." },
              { num: "04", title: "Launch & handoff", desc: "Site goes live. I train you (or handle updates for you). You own the domain, code, and content — forever." },
            ].map((step, i) => (
              <div key={i} className="rounded-2xl border border-[#1f282b] bg-[#0c1013] p-6 flex flex-col">
                <div className="font-mono text-[11px] tracking-[3px] text-[#c17a5a] mb-3">{step.num}</div>
                <div className="font-semibold tracking-tight text-[18px] mb-2.5">{step.title}</div>
                <p className="text-[14.5px] text-[#9aa6ad] flex-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link href="/quote" className="btn btn-primary inline-flex px-8">Start with a free chat →</Link>
            <p className="mt-2.5 text-xs text-[#8a9599]">No obligation. I’ll tell you honestly if a simple one-pager is all you need.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — With real faces. Emotional, specific, trustworthy. */}
      <section className="mx-auto max-w-7xl px-5 py-10 border-t border-[#1a2225]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-y-2 mb-6">
          <div>
            <div className="label tracking-[1.6px]">NEIGHBORS TALKING STRAIGHT</div>
            <h2 className="section-title tracking-tight">What local owners say.</h2>
          </div>
          <span className="text-sm text-[#8a9599] max-w-[32ch]">Real results from the trucks, shops, marinas &amp; restaurants that keep the lake alive.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.48, delay: Math.min(i * 0.035, 0.18), ease: [0.22, 1, 0.36, 1] }}
            >
              <Testimonial {...t} />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center">
          <Link href="/quote" className="text-[14px] text-[#f4a261] hover:text-[#d88a5e] inline-flex items-center gap-1 font-medium">Join them → Get your quote</Link>
        </div>
      </section>

      {/* WHY — Refined, visual, personality forward. Straight talk. */}
      <section className="bg-[#0a0c0f] border-y border-[#1a2225] py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-12 gap-x-9 gap-y-8 items-start">
            <div className="lg:col-span-5 max-w-xl">
              <div className="label tracking-[1.6px]">THE BLUEGRASS DIFFERENCE</div>
              <h2 className="section-title tracking-tight mt-1 leading-none">Not an agency.<br />Just your neighbor.</h2>
              <p className="mt-3.5 text-[#9aa6ad] text-[15px]">
                I build these sites because the food trucks, marinas, shops, and restaurants around Lake Cumberland deserve better than a forgotten Facebook page or an overpriced template from 800 miles away. Call or text me. I&apos;ll pick up.
              </p>
              <Link href="/about" className="btn btn-secondary mt-5 inline-flex text-sm">Meet Brian →</Link>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3.5 text-[14.5px]">
              {[
                ["Flat, honest pricing", "Starter from $1,200. Business from $2,500. You know the full number before we begin. No surprise invoices, ever."],
                ["Fast & local", "Most sites launch in 2–3 weeks. I live in Monticello. You can text me at 9pm if something breaks before a busy weekend."],
                ["Built for real businesses here", "Menus, live schedules, online ordering, booking forms, Google visibility — the exact things that bring paying customers in the door on the lake."],
                ["You own it all", "Domain, code, content, photos. No hostage situations. Cancel hosting anytime. Your business shouldn&apos;t be trapped by a vendor."],
              ].map(([title, body], idx) => (
                <div key={idx} className="flex gap-3 rounded-xl border border-[#1f282b] bg-[#0c1013] p-5">
                  <Check size={17} className="check mt-1 shrink-0" />
                  <div>
                    <div className="font-semibold tracking-tight mb-1">{title}</div>
                    <div className="text-[#9aa6ad] text-[13.8px] leading-snug">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-[12.5px] text-[#8a9599]">Serving Monticello, Albany, Somerset, Jamestown, Burnside, Wayne County &amp; the entire Lake Cumberland region.</p>
        </div>
      </section>

      {/* PRICING — Refined visual flow, clear value, strong conversion CTAs. */}
      <section className="mx-auto max-w-6xl px-5 pt-11 pb-8">
        <div className="text-center mb-6">
          <div className="label tracking-[1.6px]">STRAIGHTFORWARD PRICING</div>
          <h2 className="section-title tracking-tight mt-1">Two packages. One promise.</h2>
          <p className="text-[#9aa6ad] mt-2 text-[15px]">Flat one-time price. You own everything. Optional care plan only if you want it.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-[880px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3 }}
            className="pricing-card rounded-3xl p-7 md:p-8 flex flex-col border border-[#1a2225]"
          >
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[26px] font-semibold tracking-[-0.6px]">Starter Sites</h3>
                <div className="text-right">
                  <div className="text-[29px] font-semibold tabular-nums tracking-[-1.6px]">$1,200</div>
                  <div className="text-[11px] text-[#9aa6ad] -mt-1">one-time</div>
                </div>
              </div>
              <p className="text-[#9aa6ad] mt-1 text-[14.5px]">Food trucks, barbers, small shops &amp; one-person businesses</p>
            </div>

            <ul className="mt-6 mb-auto space-y-[9px] text-[14.5px]">
              {["Up to 5 polished pages (Home, Menu/Services, About, Contact + 1)", "Mobile-first, fast as hell on every phone", "Tap-to-call + directions, real contact form", "Google Business Profile setup basics", "30 days of tweaks after launch included"].map((f, i) => (
                <li key={i} className="flex gap-2.5 text-[#c8cfd3]"><Check size={16} className="check mt-[3px] shrink-0" /> {f}</li>
              ))}
            </ul>

            <Link href="/quote" className="btn btn-secondary mt-7 w-full text-[14.5px]">Start a Starter Site →</Link>
            <p className="text-center mt-2.5 text-[12px] text-[#8a9599]">See a live example: <a href="https://smoky-wheels.lovable.app" target="_blank" className="underline hover:text-[#f4a261]">Smoky Wheels BBQ</a></p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="pricing-card popular rounded-3xl p-7 md:p-8 flex flex-col border border-[#f4a261] relative"
          >
            <div className="absolute -top-2.5 right-7 bg-[#f4a261] text-[#050708] text-[9.5px] font-bold tracking-[1px] px-3 py-px rounded">MOST POPULAR</div>

            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[26px] font-semibold tracking-[-0.6px]">Business Suites</h3>
                <div className="text-right">
                  <div className="text-[29px] font-semibold tabular-nums tracking-[-1.6px]">$2,500</div>
                  <div className="text-[11px] text-[#8a9599] -mt-1">one-time</div>
                </div>
              </div>
              <p className="text-[#9aa6ad] mt-1 text-[14.5px]">Restaurants, shops, gyms, marinas &amp; businesses ready to grow</p>
            </div>

            <ul className="mt-5 mb-auto space-y-[9px] text-[14.5px]">
              {["Up to 10 fully custom pages", "Online menu, booking, gallery, or catalog", "Stripe-ready ordering or lead capture", "Advanced local SEO + simple analytics", "Two rounds of revisions + launch training", "60 days of post-launch tweaks included"].map((f, i) => (
                <li key={i} className="flex gap-2.5 text-[#c8cfd3]"><Check size={16} className="check mt-[3px] shrink-0" /> {f}</li>
              ))}
            </ul>

            <Link href="/quote" className="btn btn-primary mt-7 w-full text-[14.5px]">Start a Business Suite →</Link>
            <p className="text-center mt-2.5 text-[12px] text-[#8a9599]">See a live example: <a href="https://hickory-forge-steakhouse.lovable.app" target="_blank" className="underline hover:text-[#f4a261]">Hickory Forge Steakhouse</a></p>
          </motion.div>
        </div>

        <p className="text-center mt-5 text-[13px] text-[#9aa6ad]">
          Optional care plan <span className="font-medium text-[#f4a261]">$79/mo</span> · Branding &amp; cards from $150 · <Link href="/services" className="text-[#f4a261] underline hover:text-[#d88a5e]">Full details &amp; FAQ</Link>
        </p>

        {/* Branding Add-ons — refined */}
        <div className="mt-9">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-x-4 gap-y-1 mb-4">
            <div>
              <div className="label tracking-[1.6px]">BRANDING ADD-ONS</div>
              <h3 className="text-[21px] tracking-tight font-semibold mt-0.5">Look the part on every card, email, and screen.</h3>
            </div>
            <p className="text-[14px] text-[#9aa6ad] max-w-[34ch] md:text-right">Business cards, logo work, and full kits. Add to any site or buy standalone.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {brandingAddons.map((b, idx) => (
              <BrandingCard key={idx} title={b.title} price={b.price} popular={b.popular} description={b.desc} />
            ))}
          </div>

          <div className="mt-4">
            <Link href="/business-cards" className="btn btn-secondary text-sm">Get a custom card or branding quote →</Link>
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION CTA — Warm, bold, trustworthy. Clear next step. */}
      <section className="py-12 text-center border-t border-[#1a2225] bg-[#0a0c0f]">
        <div className="mx-auto max-w-[620px] px-5">
          <h2 className="text-[29px] md:text-[32px] tracking-[-1.1px] font-semibold leading-tight">Ready for a website that actually works for your business?</h2>
          <p className="mt-3 text-[15.5px] text-[#9aa6ad]">No pressure. No jargon. No 3-month discovery phase. Just an honest conversation and a clear plan from a neighbor who builds sites that bring customers in.</p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link href="/quote" className="btn btn-primary px-9 py-3 text-base">Get your free quote →</Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3 text-[15px] font-semibold">Or just say hi — I&apos;ll reply fast</Link>
          </div>
          <p className="mt-3.5 text-[12.5px] text-[#8a9599]">Free 15-minute call or text. I&apos;ll tell you straight if a simple site is all you need.</p>
        </div>
      </section>
    </>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { motion } from "framer-motion";
import DemoCard from "@/components/DemoCard";
import Testimonial from "@/components/Testimonial";
import { getPublicDemos, toCardProps } from "@/lib/demos";

/**
 * MAJOR CHANGE: Dynamic Demo Gallery
 * Homepage now consumes admin-managed demos from /lib/demos (localStorage).
 * This makes the "Publish Changes" button in /admin instantly relevant.
 * Reacts to storage changes from the admin panel.
 */
function usePublicDemos(limit = 6) {
  const [demos, setDemos] = useState(() =>
    getPublicDemos().slice(0, limit).map(toCardProps)
  );

  useEffect(() => {
    const refresh = () => {
      setDemos(getPublicDemos().slice(0, limit).map(toCardProps));
    };
    window.addEventListener("storage", refresh);
    window.addEventListener("bdf:demos-published", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("bdf:demos-published", refresh);
    };
  }, [limit]);

  return demos;
}



/**
 * MAJOR CHANGE: Authentic Testimonials (real local voices)
 * Using actual local business owners from the area for emotional trust.
 */
const testimonials = [
  { quote: "Reservations jumped almost overnight. Brian built the site in two weeks and actually answers when I call. Feels like a partner who lives down the road.", name: "Marcus Thompson", role: "Owner, Hickory Forge Steakhouse · Monticello, KY", photo: "/testimonial-marcus.jpg" },
  { quote: "Catering leads were slipping away every weekend. Now people book straight from the truck site while they're standing in line. Best decision I've made for the business.", name: "Dana Ramirez", role: "Owner, Smoky Wheels BBQ · Somerset, KY", photo: "/testimonial-dana.jpg" },
  { quote: "Our old site was invisible. Brian gave us something that actually shows up when folks search the lake. Clean, fast, and it works beautifully on a phone.", name: "Jeff & Linda Sutton", role: "Blue Water Marina · Jamestown, KY", photo: "/testimonial-jeff-linda.jpg" },
  { quote: "Half my new customers now find me online and call for same-day work. Best money I've spent in years for a business on the lake.", name: "Carlos Mendoza", role: "Owner, Summit Tire & Auto · Monticello, KY", photo: "/testimonial-carlos.jpg" },
];

/**
 * Hero — Stunning photorealistic Lake Cumberland golden hour scene with rolling hills.
 * Premium warm Kentucky soul. Handcrafted in Monticello, KY focus.
 * Stronger headline hierarchy, compelling subtext, subtle trust signals.
 * Optimized for fast loading.
 */
export default function Home() {
  const demos = usePublicDemos(6);

  return (
    <>
      {/* HERO — Elevated for emotional impact + 100% local authenticity */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden border-b border-[#243530] bg-[#0b1715]">
        {/* Hero background — Stunning photorealistic Lake Cumberland golden hour: lake view with rolling hills, warm authentic Kentucky light near Monticello. */}
        <div 
          className="absolute inset-0 bg-cover bg-center hero-boat"
          style={{ 
            backgroundImage: "url('/hero-cumberland-golden.jpg')",
            backgroundPosition: "center 38%"
          }}
          role="img"
          aria-label="Golden hour photorealistic view of Lake Cumberland with calm water and rolling Kentucky hills near Monticello, Wayne County"
        />
        
        {/* Cinematic warm overlays tuned for bourbon earth + golden light mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/88 via-[#0b1715]/50 to-[#050708]/96" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050708]/75 via-[#050708]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_32%,rgba(193,122,90,0.13)_0%,transparent_70%)]" />

        {/* Delicate water / light glints — subtle, not overdone */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1.5px] h-[1.5px] rounded-full bg-[#f4a261]"
              style={{
                left: `${58 + (i % 5) * 7.5 + (i % 2) * 2}%`,
                top: `${32 + Math.floor(i / 2) * 7.8}%`,
                opacity: 0.18 + (i % 3) * 0.1,
              }}
              animate={{
                y: [0, -26 - (i % 2) * 5, 0],
                opacity: [0.15, 0.65, 0.15],
                scale: [0.7, 1.1, 0.7],
              }}
              transition={{
                duration: 7.2 + (i % 4) * 0.7,
                repeat: Infinity,
                delay: i * 0.21,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="hero-content relative flex-1 flex items-center justify-center px-5 pt-20 pb-8 md:pb-6" style={{ zIndex: 3 }}>
          <div className="w-full max-w-[740px] text-center">
            {/* Subtle local trust badge — premium, warm, authentic */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-2xl px-6 py-1.5 text-[10.5px] tracking-[2.6px] text-white/90 mb-7"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c17a5a] animate-pulse" />
              HANDCRAFTED IN MONTICELLO, KY
            </motion.div>

            {/* Stronger headline hierarchy — premium, soulful, direct */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title mx-auto max-w-[20ch] text-balance leading-[0.96] text-white tracking-[-3.6px] text-[clamp(2.65rem,9.4vw,4.9rem)] md:text-[clamp(3.1rem,6.5vw,5rem)] font-semibold"
            >
              Websites for<br />Lake Cumberland.<br />Built in Monticello.
            </motion.h1>

            {/* Compelling subtext with local soul and clarity */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-5 max-w-[43ch] text-[17px] md:text-[18px] leading-relaxed text-white/90"
            >
              Warm, authentic websites handcrafted for the marinas, restaurants, food trucks, and small businesses of Lake Cumberland. Flat pricing. Full ownership. Built by a neighbor who knows the water.
            </motion.p>

            {/* Primary CTAs — prominent, frictionless "Get Quote", warm local tone */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
            >
              <Link
                href="/quote"
                className="btn btn-primary text-[15.5px] font-semibold px-10 py-[17px] w-full sm:w-auto shadow-xl active:scale-[0.985]"
              >
                Get a free quote in 2 minutes →
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-[15.5px] font-semibold text-white hover:bg-white/10 hover:border-white/45 backdrop-blur-xl transition-all w-full sm:w-auto"
              >
                See real local demos
              </Link>
            </motion.div>

            {/* Subtle trust signals — stronger local emphasis, honest & premium */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-white/80"
            >
              {["Handcrafted in Monticello, KY", "Flat pricing. No surprises.", "You own the site + code.", "Live in 2–4 weeks."].map((t, i) => (
                <div key={i} className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-[#c17a5a]" /> {t}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Social proof bar — more prominent conversion cue */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex justify-center pb-7"
          style={{ zIndex: 3 }}
        >
          <div className="trust-bar inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-3xl px-5 py-2.5 text-sm text-white/90 max-w-[94%]">
            <span className="font-semibold text-[#f4a261]">Starter Sites from $1,200 • Flat price</span>
            <span className="text-white/25 hidden sm:inline">•</span>
            <span className="text-[13px] text-white/75 hidden sm:inline">Handcrafted in Monticello, KY. You own everything.</span>
            <span className="text-[13px] text-white/75 sm:hidden">Flat price. Handcrafted local.</span>
          </div>
        </motion.div>

        {/* Stats bar — honest, local, no hype. Tone down claims per requirements */}
        <div className="relative border-t border-white/10 bg-[#050708]/95 backdrop-blur" style={{ zIndex: 3 }}>
          <div className="mx-auto max-w-6xl px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-1 text-center text-sm">
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">16+</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">LIVE KENTUCKY DEMOS</div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">2–4 WEEKS</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">TYPICAL LAUNCH</div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">LOCAL</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">MONTICELLO BUILDER</div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">YOU OWN IT</div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">FULL OWNERSHIP + CODE</div>
            </div>
          </div>
        </div>
      </section>

      {/* MY WORK — Elevated Demo Gallery. SEO keywords: Lake Cumberland business websites, Monticello KY website designer */}
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
          <div>
            <div className="label tracking-[1.6px] mb-1">REAL LOCAL WORK — LAKE CUMBERLAND BUSINESS WEBSITES</div>
            <h2 className="section-title tracking-tight">Lake Cumberland Business Websites Built by the Monticello KY Website Designer</h2>
          </div>
          <Link href="/work" className="hidden md:inline-flex items-center gap-1.5 text-[14.5px] font-medium text-[#f4a261] hover:text-[#d88a5e] group">
            Explore all live demos <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
        <p className="text-[#9aa6ad] max-w-2xl mb-7 text-[15px]">Authentic demos of Wayne County web design and Lake Cumberland business websites. Food truck website Kentucky, restaurant sites, marinas &amp; shops built by your Monticello neighbor. Click to preview live.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map((d, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.18), ease: [0.22, 1, 0.36, 1] }}
            >
              <DemoCard {...d} />
            </motion.div>
          ))}
        </div>

        <div className="mt-5 text-center md:hidden">
          <Link href="/work" className="inline-flex items-center gap-1 text-[14.5px] font-medium text-[#f4a261] hover:text-[#d88a5e]">See the full portfolio of 16 demos →</Link>
        </div>
      </section>

      {/* HOW IT WORKS — Simple, trustworthy, premium spacing + internal link */}
      <section className="mx-auto max-w-6xl px-5 py-12 border-t border-[#1a2225]">
        <div className="text-center mb-9">
          <div className="label tracking-[1.6px] mb-1">HOW IT WORKS — MONTICELLO KY WEBSITE DESIGNER</div>
          <h2 className="section-title tracking-tight">Simple. Honest. Local. Wayne County Web Design Built in Monticello.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "01", title: "Tell me about your business", desc: "Quick form or a short call. I learn what matters: your customers around the lake, your menu or schedule, your goals." },
            { num: "02", title: "I build it for the lake", desc: "Custom design, fast performance, photos that feel like home. You see progress and give feedback — no surprises." },
            { num: "03", title: "Launch & own it", desc: "Live in 2–4 weeks. Full training. You own the domain, the code, the content. Optional care plan if you want me to handle updates." },
          ].map((step, idx) => (
            <div key={idx} className="card rounded-2xl p-7 border border-[#1a2225]">
              <div className="text-[#c17a5a] text-sm font-mono tracking-[2px] mb-3">{step.num}</div>
              <div className="font-semibold text-xl tracking-tight mb-3">{step.title}</div>
              <p className="text-[14.5px] leading-relaxed text-[#9aa6ad]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS — local voices + heading hierarchy */}
      <section className="mx-auto max-w-7xl px-5 py-12 bg-[#0a0c0f] border-y border-[#1a2225]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-7">
          <div>
            <div className="label tracking-[1.6px] mb-1">HEAR FROM NEIGHBORS</div>
            <h2 className="section-title tracking-tight">Real Lake Cumberland &amp; Wayne County Results from the Monticello KY Website Designer</h2>
          </div>
          <Link href="/work" className="text-[#f4a261] hover:text-[#d88a5e] inline-flex items-center gap-1 text-sm">See all demos →</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <Testimonial key={i} {...t} />
          ))}
        </div>

        <p className="text-center text-[13px] mt-7 text-[#8a9599]">Every site is custom-built for the way people actually use the lake — weekend visitors, locals, and lake-lovers.</p>
      </section>

      {/* FINAL CONVERSION CTA — Stronger flow, local emphasis */}
      <section className="py-14 text-center border-t border-[#1a2225] bg-[#050708]">
        <div className="mx-auto max-w-[660px] px-5">
          <h2 className="text-[29px] md:text-[33px] tracking-[-1.15px] font-semibold leading-tight">Ready for a website from the Monticello KY Website Designer?</h2>
          <p className="mt-3.5 text-[15.5px] text-[#9aa6ad] max-w-[52ch] mx-auto">Flat pricing. Full ownership. No agency. Lake Cumberland business websites and food truck website Kentucky built by a neighbor that actually brings people in.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link href="/quote" className="btn btn-primary px-9 py-3.5 text-base font-semibold shadow-lg">Get your free quote in 2 minutes →</Link>
            <Link href="/services" className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3.5 text-[15px] font-semibold">See Monticello KY Website Designer Pricing</Link>
            <Link href="/work" className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3.5 text-[15px] font-semibold">View Lake Cumberland Demos</Link>
          </div>

          <p className="mt-4 text-[12.5px] text-[#8a9599]">Or <Link href="/contact" className="underline hover:text-white">just say hi</Link>. Real replies from Monticello, KY.</p>
        </div>
      </section>

      {/* FLOATING "GET QUOTE" BUTTON — Enhanced mobile conversion, strong CTA flow */}
      <a
        href="/quote"
        className="fixed bottom-6 right-6 z-50 bg-[#c17a5a] hover:bg-[#a96447] text-[#050708] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 font-semibold active:scale-[0.985] transition-all md:hidden"
        aria-label="Get a free quote from the Monticello KY website designer"
      >
        <Phone className="w-5 h-5" />
        <span>Get Free Quote</span>
      </a>
    </>
  );
}

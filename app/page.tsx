import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Phone } from "lucide-react";
import FeaturedDemos from "@/components/FeaturedDemos";
import ServiceAreas from "@/components/ServiceAreas";

/**
 * Homepage — Server Component for critical LCP path.
 * Hero uses next/image with priority (AVIF/WebP, sized for device).
 * Demo grid is a small client island (FeaturedDemos) for live data only.
 * Framer Motion removed from hero — CSS fade-ins keep the warm feel without JS cost.
 */
export default function Home() {
  return (
    <>
      {/* HERO — LCP-critical: optimized Image, no client JS, no Framer Motion */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden border-b border-[#243530] bg-[#0b1715]">
        <Image
          src="/hero-lake-cumberland-golden.jpg"
          alt="Golden hour view of Lake Cumberland with calm water and rolling hills near Monticello, Kentucky — authentic local scene"
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          className="object-cover z-0"
          style={{ objectPosition: "center 38%" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050708]/88 via-[#0b1715]/50 to-[#050708]/96 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050708]/75 via-[#050708]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_32%,rgba(193,122,90,0.13)_0%,transparent_70%)] z-10" />

        {/* CSS-only warm amber sparks — no Framer Motion, GPU-cheap transforms */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-20 hero-sparks"
          aria-hidden
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const style = {
              left: `${58 + (i % 5) * 7.5 + (i % 2) * 2}%`,
              top: `${32 + Math.floor(i / 2) * 7.8}%`,
              opacity: 0.18 + (i % 3) * 0.1,
              ["--spark-delay"]: `${i * 0.21}s`,
              ["--spark-dur"]: `${7.2 + (i % 4) * 0.7}s`,
            } as CSSProperties;
            return (
              <span
                key={i}
                className="hero-spark absolute w-[1.5px] h-[1.5px] rounded-full bg-[#f4a261]"
                style={style}
              />
            );
          })}
        </div>

        <div className="hero-content relative flex-1 flex items-center justify-center px-5 pt-20 pb-8 md:pb-6 z-30">
          <div className="w-full max-w-[740px] text-center">
            <div className="hero-fade hero-fade-1 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-2xl px-6 py-1.5 text-[10.5px] tracking-[2.6px] text-white/90 mb-7">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c17a5a] animate-pulse" />
              HANDCRAFTED IN MONTICELLO, KY
            </div>

            <h1 className="hero-fade hero-fade-2 hero-title mx-auto max-w-[20ch] text-balance leading-[0.96] text-white tracking-[-3.6px] text-[clamp(2.65rem,9.4vw,4.9rem)] md:text-[clamp(3.1rem,6.5vw,5rem)] font-semibold">
              Websites for
              <br />
              Lake Cumberland.
              <br />
              Built in Monticello.
            </h1>

            <p className="hero-fade hero-fade-3 mx-auto mt-5 max-w-[40ch] text-[17px] md:text-[18px] leading-relaxed text-white/90">
              Handcrafted for Lake Cumberland businesses and South Carolina
              Lowcountry food trucks, restaurants &amp; local gems. Flat pricing.
              You own everything. Built by a neighbor in Monticello.
            </p>

            <div className="hero-fade hero-fade-4 mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
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
                See our work
              </Link>
            </div>

            <div className="hero-fade hero-fade-5 mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px] text-white/80">
              {[
                "Handcrafted in Monticello, KY",
                "Flat pricing. No surprises.",
                "You own the site + code.",
                "Live in 2–4 weeks.",
              ].map((t, i) => (
                <div key={i} className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-[#c17a5a]" aria-hidden /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-fade hero-fade-6 relative z-30 flex justify-center pb-7">
          <div className="trust-bar inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-3xl px-5 py-2.5 text-sm text-white/90 max-w-[94%]">
            <span className="font-semibold text-[#f4a261]">
              Starter Sites from $1,200 • Flat price
            </span>
            <span className="text-white/25 hidden sm:inline">•</span>
            <span className="text-[13px] text-white/75 hidden sm:inline">
              Handcrafted in Monticello, KY. Bluegrass &amp; Lowcountry. You own
              everything.
            </span>
            <span className="text-[13px] text-white/75 sm:hidden">
              Flat price. KY + SC Lowcountry.
            </span>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-[#050708]/95 backdrop-blur z-30">
          <div className="mx-auto max-w-6xl px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-1 text-center text-sm">
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">
                16+
              </div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">
                LIVE KENTUCKY DEMOS
              </div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">
                2–4 WEEKS
              </div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">
                TYPICAL LAUNCH
              </div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">
                LOCAL
              </div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">
                MONTICELLO BUILDER
              </div>
            </div>
            <div>
              <div className="text-[22px] font-semibold tracking-[-1.4px] text-white">
                YOU OWN IT
              </div>
              <div className="text-[10.5px] tracking-[1.6px] text-white/55">
                FULL OWNERSHIP + CODE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-5 pt-14 pb-6 border-b border-[#1a2225]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
          <div>
            <div className="label tracking-[1.6px] mb-1">FEATURED WORK</div>
            <h2 className="section-title tracking-tight">
              Here&apos;s the kind of work I build for local businesses
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-1.5 text-[14.5px] font-medium text-[#f4a261] hover:text-[#d88a5e] group"
          >
            See all projects{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition"
              aria-hidden
            />
          </Link>
        </div>
        <p className="text-[#9aa6ad] max-w-2xl mb-7 text-[15px]">
          Real websites for restaurants, food trucks, guides, and shops around
          Lake Cumberland — built by a neighbor in Monticello. Click to preview
          live.
        </p>

        <FeaturedDemos limit={4} />

        <div className="mt-5 text-center md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-[14.5px] font-medium text-[#f4a261] hover:text-[#d88a5e]"
          >
            See all projects →
          </Link>
        </div>
      </section>

      {/* SERVICE AREAS — robust local coverage for all Lake Cumberland boat ramp towns */}
      <ServiceAreas />

      {/* Additive internal link to SC page — Lowcountry teaser image (lazy, optimized) */}
      <div className="border-t border-[#1a2225] bg-[#050708]">
        <div className="mx-auto max-w-6xl px-5 pt-6">
          <div className="relative overflow-hidden rounded-2xl border border-[#1f282b] mb-6 h-40 md:h-52">
            <Image
              src="/sc-palmetto-marsh.jpg"
              alt="South Carolina Lowcountry coastal marsh with palmetto trees glowing at golden hour — authentic photorealistic photography representing Charleston SC and Summerville web design expansion"
              fill
              loading="lazy"
              decoding="async"
              quality={70}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
              style={{ objectPosition: "center 40%" }}
            />
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-6 text-center text-[14.5px] text-[#9aa6ad]">
          Expanding our handcrafted websites to the South Carolina Lowcountry.{" "}
          <Link
            href="/south-carolina"
            className="text-[#f4a261] underline hover:text-white font-medium"
          >
            Charleston SC web design, Summerville small business sites &amp;
            Lowcountry projects →
          </Link>
        </div>
      </div>

      {/* FINAL CONVERSION CTA */}
      <section className="py-14 text-center border-t border-[#1a2225] bg-[#050708]">
        <div className="mx-auto max-w-[660px] px-5">
          <h2 className="text-[29px] md:text-[33px] tracking-[-1.15px] font-semibold leading-tight">
            Ready for a website from a neighbor in Monticello?
          </h2>
          <p className="mt-3.5 text-[15.5px] text-[#9aa6ad] max-w-[52ch] mx-auto">
            Flat pricing. Full ownership. No agency. Websites handcrafted for Lake
            Cumberland businesses — marinas, guides, and shops near every ramp from
            Monticello to Creelsboro, Jamestown, Burnside and Nancy. Now also
            serving Charleston SC, Summerville, Walterboro, Ladson &amp; North
            Charleston with Lowcountry web design.
          </p>
          <p className="mt-2 text-[13.5px] text-[#8a9599] max-w-[52ch] mx-auto">
            Food truck owners lead with the biggest perk: easy on-the-fly location
            updates for daily spots and festivals using a simple mobile dashboard.
            Change “Where We Are Today” in seconds from your phone, plus festival
            calendar, online ordering, beautiful food photos, and menu updates.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              href="/quote"
              className="btn btn-primary px-9 py-3.5 text-base font-semibold shadow-lg"
            >
              Get your free quote in 2 minutes →
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3.5 text-[15px] font-semibold"
            >
              See Monticello KY Website Designer Pricing
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full border border-[#2a3437] hover:bg-[#111518] px-7 py-3.5 text-[15px] font-semibold"
            >
              View Lake Cumberland Demos
            </Link>
          </div>

          <p className="mt-4 text-[12.5px] text-[#8a9599]">
            Or{" "}
            <Link href="/contact" className="underline hover:text-white">
              just say hi
            </Link>
            . Real replies from Monticello, KY.{" "}
            <Link
              href="/south-carolina"
              className="underline hover:text-[#f4a261]"
            >
              See our South Carolina Lowcountry services →
            </Link>
          </p>
        </div>
      </section>

      {/* FLOATING BUTTON — mobile conversion CTA */}
      <a
        href="/quote"
        className="fixed bottom-6 right-6 z-50 bg-[#c17a5a] hover:bg-[#a96447] text-[#050708] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 font-semibold active:scale-[0.985] transition-all md:hidden"
        aria-label="Get a free quote from the Monticello KY website designer"
      >
        <Phone className="w-5 h-5" aria-hidden />
        <span>Get Free Quote</span>
      </a>
    </>
  );
}

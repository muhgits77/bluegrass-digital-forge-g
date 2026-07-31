import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import ServiceAreas from "@/components/ServiceAreas";
import ReferralDiscountNote from "@/components/ReferralDiscountNote";

/**
 * Homepage — Server Component for critical LCP path.
 * Hero: next/image priority + fetchPriority high (discoverable LCP in HTML).
 * FeaturedDemos is a deferred client island (no Framer; Supabase loads idle).
 */
const FeaturedDemos = dynamic(() => import("@/components/FeaturedDemos"), {
  loading: () => (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      aria-busy="true"
      aria-label="Loading featured demos"
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[460px] sm:h-[480px] rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] animate-pulse"
        />
      ))}
    </div>
  ),
});

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO — LCP-critical: relative parent + Image fill + priority */}
      <section className="relative min-h-[100dvh] flex flex-col overflow-hidden border-b border-[var(--border-strong)] bg-[var(--bg-elev)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-lake-cumberland-golden.jpg"
            alt="Golden hour view of Lake Cumberland with calm water and rolling hills near Monticello, Kentucky — authentic local scene"
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 38%" }}
          />
        </div>

        {/* Deeper forge night overlays — richer amber + deep green depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030605]/92 via-[#061210]/55 to-[#030605]/97 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030605]/80 via-[#030605]/25 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_28%,rgba(201,122,58,0.18)_0%,transparent_62%)] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_78%,rgba(26,74,58,0.22)_0%,transparent_55%)] z-10" />

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
                className="hero-spark absolute w-[1.5px] h-[1.5px] rounded-full bg-[#f0a86a]"
                style={style}
              />
            );
          })}
        </div>

        <div className="hero-content relative flex-1 flex items-center justify-center px-5 pt-20 pb-10 md:pb-8 z-30">
          <div className="w-full max-w-[760px] text-center">
            <div className="hero-fade hero-fade-1 inline-flex items-center gap-2.5 rounded-full border border-[var(--warm)]/25 bg-black/35 backdrop-blur-2xl px-6 py-2 text-[10.5px] tracking-[2.6px] text-white/92 mb-8 shadow-[0_0_40px_-12px_rgba(201,122,58,0.45)]">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--warm)] animate-pulse" />
              HANDCRAFTED IN MONTICELLO, KY
            </div>

            <h1 className="hero-fade hero-fade-2 hero-title mx-auto max-w-[18ch] text-balance leading-[0.95] text-white tracking-[-0.04em] text-[clamp(2.75rem,9.6vw,5.1rem)] md:text-[clamp(3.2rem,6.6vw,5.15rem)] font-semibold">
              Websites for
              <br />
              <span className="kentucky-accent">Lake Cumberland.</span>
              <br />
              Built in Monticello.
            </h1>

            <p className="hero-fade hero-fade-3 mx-auto mt-6 max-w-[38ch] text-[17px] md:text-[18.5px] leading-relaxed text-white/88">
              Flat pricing. You own everything. Handcrafted for local businesses
              — Lake Cumberland &amp; the South Carolina Lowcountry.
            </p>

            <div className="hero-fade hero-fade-4 mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/quote"
                className="btn btn-primary text-[15.5px] font-semibold px-10 py-[17px] w-full sm:w-auto shadow-xl active:scale-[0.985]"
              >
                Get a free quote in 2 minutes →
              </Link>

              <Link
                href="/work"
                className="btn btn-ghost w-full sm:w-auto"
              >
                See our work
              </Link>
            </div>

            <div className="hero-fade hero-fade-5 mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-[13px] text-white/78">
              {[
                "Handcrafted in Monticello, KY",
                "Flat pricing. No surprises.",
                "You own the site + code.",
                "Live in 2–4 weeks.",
              ].map((t, i) => (
                <div key={i} className="inline-flex items-center gap-1.5">
                  <IconCheck className="text-[var(--warm)]" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-fade hero-fade-6 relative z-30 flex justify-center pb-8">
          <div className="trust-bar inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-black/65 backdrop-blur-3xl px-5 py-3 text-sm text-white/90 max-w-[94%] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.7)]">
            <span className="font-semibold text-[var(--gold-light)]">
              Starter Sites from $1,200 • Flat price
            </span>
            <span className="text-white/25 hidden sm:inline">•</span>
            <span className="text-[13px] text-white/75 hidden sm:inline">
              Monticello, KY · Bluegrass &amp; Lowcountry · Full ownership
            </span>
            <span className="text-[13px] text-white/75 sm:hidden">
              Flat price. KY + SC Lowcountry.
            </span>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-[#030605]/96 backdrop-blur z-30">
          <div className="mx-auto max-w-6xl px-5 py-5 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-3 text-center text-sm">
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
      <section
        id="featured-work"
        className="section-block mx-auto max-w-7xl px-5 border-b border-[var(--border)]"
        aria-labelledby="featured-work-heading"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
          <div>
            <div className="label tracking-[1.6px] mb-1">FEATURED WORK</div>
            <h2 id="featured-work-heading" className="section-title tracking-tight">
              Here&apos;s the kind of work I build for local businesses
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-1.5 text-[14.5px] font-medium text-[var(--gold-light)] hover:text-[var(--warm)] group"
          >
            See all projects{" "}
            <IconArrowRight className="group-hover:translate-x-0.5 transition" />
          </Link>
        </div>
        <p className="text-[var(--text-muted)] max-w-2xl mb-8 text-[15px] leading-relaxed">
          Real websites for restaurants, food trucks, guides, and shops around
          Lake Cumberland — built by a neighbor in Monticello. Click to preview
          live.
        </p>

        <FeaturedDemos limit={4} />

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-1 text-[14.5px] font-medium text-[var(--gold-light)] hover:text-[var(--warm)]"
          >
            See all projects →
          </Link>
        </div>
      </section>

      {/* SERVICE AREAS — compact teaser; full detail on /service-areas */}
      <ServiceAreas variant="compact" />

      {/* SC teaser */}
      <div className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-5 pt-8">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] mb-6 h-40 md:h-52 shadow-[var(--shadow-card)]">
            <Image
              src="/sc-palmetto-marsh.jpg"
              alt="South Carolina Lowcountry coastal marsh with palmetto trees glowing at golden hour — authentic photorealistic photography representing Charleston SC and Summerville web design expansion"
              fill
              loading="lazy"
              decoding="async"
              quality={70}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
              className="object-cover"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030605]/70 via-transparent to-transparent" />
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-8 text-center text-[14.5px] text-[var(--text-muted)]">
          Expanding handcrafted websites to the South Carolina Lowcountry.{" "}
          <Link
            href="/south-carolina"
            className="text-[var(--gold-light)] underline hover:text-white font-medium"
          >
            Charleston SC web design &amp; Lowcountry projects →
          </Link>
        </div>
      </div>

      {/* FINAL CONVERSION CTA — short, high-impact */}
      <section className="section-block text-center border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-[640px] px-5">
          <h2 className="text-[28px] md:text-[34px] tracking-[-0.03em] font-semibold leading-tight">
            Ready for a website from a neighbor in Monticello?
          </h2>
          <p className="mt-4 text-[15.5px] text-[var(--text-muted)] max-w-[48ch] mx-auto leading-relaxed">
            Flat pricing. Full ownership. No agency. Built for Lake Cumberland
            businesses — and now Charleston SC &amp; the Lowcountry.
          </p>
          <p className="mt-3 text-[14px] text-[var(--text-dim)] max-w-[46ch] mx-auto leading-relaxed">
            Food trucks?{" "}
            <Link
              href="/food-truck-websites"
              className="text-[var(--gold-light)] underline hover:text-white"
            >
              Real-time location updates
            </Link>{" "}
            &amp;{" "}
            <Link
              href="/truckdash"
              className="text-[var(--gold-light)] underline hover:text-white"
            >
              TruckDash plans
            </Link>
            .
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link
              href="/quote"
              className="btn btn-primary px-9 py-3.5 text-base font-semibold shadow-lg"
            >
              Get your free quote in 2 minutes →
            </Link>
            <Link href="/services" className="btn btn-secondary px-7 py-3.5 text-[15px]">
              See pricing
            </Link>
            <Link href="/work" className="btn btn-secondary px-7 py-3.5 text-[15px]">
              View demos
            </Link>
          </div>

          <ReferralDiscountNote
            align="center"
            className="mt-6 mx-auto max-w-[48ch] rounded-xl border border-[var(--border)]/80 bg-[var(--bg-card)]/60 px-4 py-2.5"
          />

          <p className="mt-5 text-[12.5px] text-[var(--text-dim)]">
            Or{" "}
            <Link href="/contact" className="underline hover:text-white">
              just say hi
            </Link>
            . Real replies from Monticello, KY.
          </p>
        </div>
      </section>

      {/* FLOATING BUTTON — mobile conversion CTA */}
      <a
        href="/quote"
        className="fixed bottom-6 right-6 z-50 bg-[var(--warm)] hover:bg-[var(--warm-dark)] text-[#0a0604] px-5 py-3.5 rounded-2xl shadow-[0_12px_40px_-8px_rgba(201,122,58,0.55)] flex items-center gap-2.5 font-semibold active:scale-[0.985] transition-all md:hidden"
        aria-label="Get a free quote from the Monticello KY website designer"
      >
        <IconPhone className="w-5 h-5" />
        <span>Get Free Quote</span>
      </a>
    </>
  );
}

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
          className="h-[460px] sm:h-[480px] rounded-[1.35rem] border border-[var(--border)] bg-[var(--bg-elev)] animate-pulse"
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
      {/* HERO — sculptural left-aligned forge layout */}
      <section className="hero-shell">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-lake-cumberland-golden.jpg"
            alt="Golden hour view of Lake Cumberland with calm water and rolling hills near Monticello, Kentucky — authentic local scene"
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className="object-cover scale-[1.02]"
            style={{ objectPosition: "center 36%" }}
          />
        </div>

        <div className="absolute inset-0 z-10 hero-overlay-main" />
        <div className="absolute inset-0 z-10 hero-overlay-glow" />

        {/* Ambient copper sparks */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-20"
          aria-hidden
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const style = {
              left: `${52 + (i % 6) * 7 + (i % 2) * 2}%`,
              top: `${28 + Math.floor(i / 2) * 7}%`,
              opacity: 0.2 + (i % 3) * 0.1,
              ["--spark-delay"]: `${i * 0.18}s`,
              ["--spark-dur"]: `${6.8 + (i % 4) * 0.8}s`,
            } as CSSProperties;
            return (
              <span
                key={i}
                className="hero-spark absolute w-[2px] h-[2px] rounded-full"
                style={style}
              />
            );
          })}
        </div>

        <div className="relative flex-1 flex items-center z-30 px-5 sm:px-8 lg:px-10 pt-24 pb-12">
          <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left column — primary message */}
            <div className="lg:col-span-7 text-left">
              <div className="hero-fade hero-fade-1 hero-eyebrow mb-7">
                <span className="hero-eyebrow-dot" />
                Forged in Monticello, KY
              </div>

              <h1 className="hero-fade hero-fade-2 hero-title max-w-[16ch] text-balance leading-[0.94] tracking-[-0.045em] text-[clamp(2.9rem,8.5vw,5.4rem)] font-semibold text-white">
                Websites for Lake Cumberland.{" "}
                <span className="kentucky-accent">Built in Monticello.</span>
              </h1>

              <p className="hero-fade hero-fade-3 mt-6 max-w-[40ch] text-[17px] md:text-[19px] leading-relaxed text-white/85">
                Websites for Lake Cumberland businesses — built in Monticello.
              </p>
              <p className="hero-fade hero-fade-3 mt-3 max-w-[40ch] text-[15px] md:text-[16px] leading-relaxed text-white/75">
                Flat pricing. Full ownership. Built by a neighbor — never an
                agency.
              </p>

              <div className="hero-fade hero-fade-4 mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/quote"
                  className="btn btn-primary text-[15.5px] px-9 py-[17px] shadow-xl"
                >
                  Get a free quote →
                </Link>
                <Link href="/work" className="btn btn-ghost">
                  Browse live demos
                </Link>
              </div>

              <div className="hero-fade hero-fade-5 mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[13px] text-white/75">
                {[
                  "Flat price, no surprises",
                  "You own the code",
                  "Live in 2–4 weeks",
                ].map((t) => (
                  <div key={t} className="inline-flex items-center gap-1.5">
                    <IconCheck className="text-[var(--copper-bright)]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — sculptural trust card */}
            <div className="lg:col-span-5 hero-fade hero-fade-6">
              <div className="relative rounded-[1.75rem] border border-[rgba(212,140,74,0.28)] bg-[rgba(2,4,3,0.55)] backdrop-blur-2xl p-6 sm:p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--copper-bright)] to-transparent opacity-80" />
                <div className="text-[11px] tracking-[0.2em] uppercase text-[var(--copper-bright)] font-semibold mb-3">
                  Starting investment
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[clamp(2.8rem,6vw,3.6rem)] font-semibold tracking-[-0.05em] text-white tabular-nums">
                    $1,200
                  </span>
                  <span className="text-[var(--text-muted)] text-sm">
                    one-time · Starter Sites
                  </span>
                </div>
                <p className="mt-3 text-[14.5px] text-white/75 leading-relaxed">
                  Business Suites from $2,500. No monthly lock-in for the build.
                  You own everything.
                </p>
                <ul className="mt-5 space-y-2.5 text-[14px] text-white/80">
                  {[
                    "Mobile-first, fast, accessible",
                    "Local SEO for real lake searches",
                    "Handcrafted — not template spam",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 items-start">
                      <IconCheck className="text-[var(--copper)] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--copper-bright)] hover:text-[var(--cream)] transition-colors"
                >
                  See full pricing
                  <IconArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-30 hero-stat-bar">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              ["16+", "Live Kentucky demos"],
              ["2–4 wks", "Typical launch"],
              ["Local", "Monticello builder"],
              ["Yours", "Full ownership"],
            ].map(([value, label]) => (
              <div key={label} className="hero-stat">
                <div className="hero-stat-value">{value}</div>
                <div className="hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section
        id="featured-work"
        className="section-block forge-panel"
        aria-labelledby="featured-work-heading"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-3">
            <div>
              <div className="label mb-2">Featured work</div>
              <h2
                id="featured-work-heading"
                className="section-title tracking-tight max-w-[18ch]"
              >
                Built for real lake businesses
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[var(--copper-bright)] hover:text-[var(--cream)] group"
            >
              See all projects
              <IconArrowRight className="group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
          <p className="text-[var(--text-muted)] max-w-2xl mb-9 text-[15.5px] leading-relaxed">
            Restaurants, food trucks, guides, and shops around Lake Cumberland —
            click any card to open the live site.
          </p>

          <FeaturedDemos limit={4} />

          <div className="mt-7 text-center md:hidden">
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-[14.5px] font-semibold text-[var(--copper-bright)]"
            >
              See all projects →
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-rule mx-auto max-w-7xl" />

      {/* SERVICE AREAS — compact */}
      <ServiceAreas variant="compact" />

      {/* SC teaser */}
      <div className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-10">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[var(--border-strong)] h-44 md:h-56 shadow-[var(--shadow-card)]">
            <Image
              src="/sc-palmetto-marsh.jpg"
              alt="South Carolina Lowcountry coastal marsh with palmetto trees glowing at golden hour"
              fill
              loading="lazy"
              decoding="async"
              quality={70}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              className="object-cover"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020403]/85 via-[#020403]/35 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div>
                <div className="text-[11px] tracking-[0.18em] uppercase text-[var(--copper-bright)] font-semibold mb-1">
                  Expanding south
                </div>
                <p className="text-white text-[17px] md:text-[20px] font-semibold tracking-tight max-w-md">
                  Charleston SC &amp; Lowcountry web design
                </p>
                <Link
                  href="/south-carolina"
                  className="mt-2 inline-flex text-[14px] font-semibold text-[var(--cream)] underline decoration-[var(--copper)] underline-offset-4 hover:text-white"
                >
                  Explore Lowcountry services →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8" />
      </div>

      {/* FINAL CTA */}
      <section className="section-block text-center border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="label mb-3 justify-center">Let&apos;s build</div>
          <h2 className="text-[clamp(1.75rem,4.5vw,2.35rem)] tracking-[-0.03em] font-semibold leading-tight">
            Ready for a website forged in Monticello?
          </h2>
          <p className="mt-4 text-[15.5px] text-[var(--text-muted)] max-w-[46ch] mx-auto leading-relaxed">
            Flat pricing. Full ownership. No agency. Lake Cumberland &amp;
            Charleston Lowcountry.
          </p>
          <p className="mt-3 text-[14px] text-[var(--text-dim)]">
            Food trucks?{" "}
            <Link
              href="/food-truck-websites"
              className="text-[var(--copper-bright)] underline hover:text-white"
            >
              Location-first sites
            </Link>{" "}
            &amp;{" "}
            <Link
              href="/truckdash"
              className="text-[var(--copper-bright)] underline hover:text-white"
            >
              TruckDash
            </Link>
            .
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link href="/quote" className="btn btn-primary px-9 py-3.5 text-base">
              Get your free quote →
            </Link>
            <Link href="/services" className="btn btn-secondary px-7 py-3.5">
              See pricing
            </Link>
            <Link href="/work" className="btn btn-secondary px-7 py-3.5">
              View demos
            </Link>
          </div>

          <ReferralDiscountNote
            align="center"
            className="mt-6 mx-auto max-w-[48ch] rounded-xl border border-[var(--border)] bg-[var(--bg-card)]/70 px-4 py-2.5"
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

      {/* Mobile float CTA */}
      <a
        href="/quote"
        className="fixed bottom-6 right-6 z-50 float-cta px-5 py-3.5 rounded-2xl flex items-center gap-2.5 font-semibold active:scale-[0.985] transition-all md:hidden"
        aria-label="Get a free quote from the Monticello KY website designer"
      >
        <IconPhone className="w-5 h-5" />
        <span>Get Free Quote</span>
      </a>
    </>
  );
}

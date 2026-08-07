import Image from "next/image";
import { TEMPLATE_STORE_URL } from "@/lib/constants";

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

const highlights = [
  "Starting at $99 — one-time purchase",
  "Hand-built in Kentucky, ready to remix",
  "Free updates for bug fixes & refinements",
];

type TemplateStoreSectionProps = {
  /** Compact variant for embedding inside services page */
  variant?: "full" | "compact";
  className?: string;
};

/**
 * Promotes the Bluegrass Digital Forge Template Store as a lower-cost DIY
 * path alongside custom website services. External store: bluegrasstemplates.com
 */
export default function TemplateStoreSection({
  variant = "full",
  className = "",
}: TemplateStoreSectionProps) {
  const isCompact = variant === "compact";

  return (
    <section
      id="diy-templates"
      className={
        isCompact
          ? `mt-10 ${className}`
          : `section-block border-t border-[var(--border)] bg-[var(--bg)] ${className}`
      }
      aria-labelledby="diy-templates-heading"
    >
      <div className={isCompact ? "" : "mx-auto max-w-7xl px-5 sm:px-8"}>
        <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-[1.75rem] border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
          {/* Soft copper / moss ambient */}
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            aria-hidden
            style={{
              background:
                "radial-gradient(800px 320px at 0% 0%, rgba(212,140,74,0.12), transparent 55%), radial-gradient(600px 280px at 100% 100%, rgba(31,92,72,0.14), transparent 50%)",
            }}
          />
          <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-[var(--copper-bright)] to-transparent opacity-70" />

          <div
            className={`relative grid items-center gap-8 ${
              isCompact
                ? "p-7 md:p-9 lg:grid-cols-[1fr_auto]"
                : "p-7 sm:p-9 md:p-11 lg:grid-cols-12 lg:gap-10"
            }`}
          >
            {/* Copy */}
            <div className={isCompact ? "" : "lg:col-span-7"}>
              <div className="label mb-2.5">
                DIY Templates · One-time from $99
              </div>
              <h2
                id="diy-templates-heading"
                className={`font-semibold tracking-tight ${
                  isCompact
                    ? "text-2xl md:text-3xl max-w-[22ch]"
                    : "section-title text-[clamp(1.65rem,4vw,2.45rem)] max-w-[18ch]"
                }`}
              >
                Prefer to build it yourself?
              </h2>
              <p
                className={`mt-3 text-[var(--text-muted)] leading-relaxed ${
                  isCompact
                    ? "text-[15px] max-w-xl"
                    : "text-[15.5px] md:text-[16.5px] max-w-xl"
                }`}
              >
                Explore ready-to-remix website templates hand-built in Kentucky.
                Launch a professional site in an afternoon — starting at{" "}
                <strong className="text-[var(--cream)] font-medium">$99</strong>
                . One-time purchase, no monthly lock-in, with free updates for
                bug fixes and refinements.
              </p>
              <p className="mt-2.5 text-[14px] text-[var(--text-dim)] max-w-lg leading-relaxed">
                A lower-cost path when you want to DIY — same care and local
                craft as our custom Lake Cumberland builds, just self-serve.
              </p>

              <ul
                className={`mt-5 space-y-2 ${
                  isCompact ? "text-[13.5px]" : "text-[14px]"
                } text-[var(--text-muted)]`}
              >
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2.5 items-start">
                    <IconCheck className="text-[var(--copper)] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <a
                  href={TEMPLATE_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-8 py-3.5 text-[15px]"
                >
                  Browse Templates
                  <IconArrowRight />
                </a>
              </div>
            </div>

            {/* Visual / price card */}
            {!isCompact && (
              <div className="lg:col-span-5">
                <a
                  href={TEMPLATE_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative rounded-[1.35rem] overflow-hidden border border-[var(--border-copper)] bg-[var(--bg-elev)] shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--copper)]"
                >
                  <div className="relative aspect-[16/11] w-full">
                    <Image
                      src="/assets/demo-bluegrass-templates.jpg"
                      alt="Bluegrass Digital Forge ready-to-remix website templates — DIY sites starting at $99"
                      fill
                      loading="lazy"
                      decoding="async"
                      quality={70}
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020403]/90 via-[#020403]/25 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--copper-bright)] font-semibold mb-1">
                      Template Store
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[clamp(2rem,4vw,2.5rem)] font-semibold tracking-[-0.04em] text-white tabular-nums">
                        $99
                      </span>
                      <span className="text-[13px] text-white/70">
                        starting · one-time
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] text-white/75 leading-snug max-w-[28ch]">
                      Free updates for bug fixes &amp; refinements. Built in
                      Monticello, KY.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--copper-bright)] group-hover:text-[var(--cream)] transition-colors">
                      Browse the store
                      <IconArrowRight className="transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </a>
              </div>
            )}

            {isCompact && (
              <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
                <div className="rounded-2xl border border-[var(--border-copper)] bg-[var(--bg-elev)] px-6 py-5 text-left lg:text-right">
                  <div className="text-[11px] tracking-[0.16em] uppercase text-[var(--copper-bright)] font-semibold">
                    From
                  </div>
                  <div className="flex items-baseline gap-1.5 lg:justify-end mt-0.5">
                    <span className="text-4xl font-semibold tracking-[-0.04em] text-[var(--cream)] tabular-nums">
                      $99
                    </span>
                    <span className="text-[13px] text-[var(--text-muted)]">
                      one-time
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-[var(--text-dim)]">
                    Free updates included
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

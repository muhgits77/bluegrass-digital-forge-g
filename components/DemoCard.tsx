import Image from "next/image";
import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";

interface DemoCardProps {
  title: string;
  subtitle: string;
  category: string;
  /** Primary link — first-party /work/[slug] when a landing exists, else external demo */
  href: string;
  /** External live demo URL (shown as quiet secondary when primary is a landing) */
  liveHref?: string;
  color?: string;
  image?: string;
  /** Preferred SEO alt: "[Business type] website demo for [location] — [key feature]" */
  imageAlt?: string;
  slug?: string;
  isPortfolioLanding?: boolean;
}

/**
 * Demo Gallery — local authenticity & premium feel without Framer Motion.
 * Hover lift / shadow live in globals.css (.demo-card) so this stays zero-JS motion.
 *
 * Primary click → same-site portfolio landing when available; secondary "View live demo"
 * is a sibling link (not nested) with rel="noopener noreferrer".
 */
const demoImageMap: Record<string, string> = {
  "Hickory Forge Steakhouse": "/assets/demo-hickory-forge.jpg",
  "Smoky Wheels": "/assets/demo-smoky-wheels.jpg",
  "Fiesta Taqueria": "/assets/demo-fiesta-taqueria.jpg",
  "Ignite Fitness Company": "/assets/demo-ignite-fitness.jpg",
  "Summit Tire & Auto": "/assets/demo-summit-tire.jpg",
  "Summit Auto Showcase": "/assets/demo-summit-auto.jpg",
  "Heritage Home Furniture & Appliances": "/assets/demo-heritage-home.png",
  "Hickory & Bloom": "/assets/demo-hickory-bloom.png",
  "Anchorline Guide Service": "/assets/demo-anchorline.png",
  "Sunny Hollow Donut Dash": "/assets/demo-sunny-hollow.png",
  "Cumberland Forge Steakhouse": "/assets/demo-cumberland-forge.png",
  "Han River BBQ": "/assets/demo-han-river.png",
  "Landing Point Bait & Tackle": "/assets/demo-landing-point.jpg",
  "Ridge Pasture Care": "/assets/demo-ridge-pasture.jpg",
  "Blade Haven": "/assets/demo-blade-haven.jpg",
  "Blue Door Smokehouse": "/assets/demo-blue-door-smokehouse.jpg",
  "Bluegrass Fence Co.": "/assets/demo-bluegrass-fence.jpg",
  "Sea Island Soul": "/assets/demo-sea-island-soul.jpg",
  "La Hacienda Cumberland": "/assets/demo-la-hacienda.jpg",
  "Bourbon Ridge Artisan Studio": "/assets/demo-bourbon-ridge.png",
  TruckDash: "/assets/demo-smoky-wheels.jpg",
  "Cumberland Smash": "/assets/demo-cumberland-smash.jpg",
  "Cluckin Chaos": "/assets/demo-cluckin-chaos.jpg",
  "Bluegrass Market & Mercantile": "/assets/demo-bluegrass-market.webp",
  "Lakeside Harmony Massage": "/assets/demo-lakeside-harmony.jpg",
  "Bluegrass Digital Forge Templates": "/assets/demo-bluegrass-templates.jpg",
};

/** Fallback alts when demos lack imageAlt — follows SEO pattern for main cards. */
const demoAltMap: Record<string, string> = {
  "Fiesta Taqueria":
    "Mexican food truck website demo for Wayne County and Lake Cumberland with digital menu and location updates",
  "Hickory Forge Steakhouse":
    "Steakhouse website demo for Lake Cumberland restaurants with digital menu and reservations",
  "Smoky Wheels":
    "Kentucky food truck website demo for Lake Cumberland with live location updates and online ordering",
  "Ridge Pasture Care":
    "Land and pasture services website demo for Wayne County with fence building and free quotes",
  "Landing Point Bait & Tackle":
    "Bait and tackle shop website demo for Wayne County and Lake Cumberland with live bait availability",
  "Anchorline Guide Service":
    "Fishing guide website demo for Lake Cumberland with trip booking and captain bios",
  "Cumberland Forge Steakhouse":
    "Fine-dining steakhouse website demo for Lake Cumberland with reservations and bourbon flights",
  "Sunny Hollow Donut Dash":
    "Donut shop website demo for small-town Kentucky with online ordering and daily menu",
  "Hickory & Bloom":
    "Florist website demo for Kentucky with same-day delivery and wedding bouquets",
  "Ignite Fitness Company":
    "Gym and fitness website demo with class schedules and membership sign-ups",
  "Summit Tire & Auto":
    "Auto service website demo for tire shops with service booking and instant quotes",
  "Summit Auto Showcase":
    "Car dealership website demo with vehicle inventory, financing, and trade-ins",
  "Heritage Home Furniture & Appliances":
    "Furniture store website demo with showroom catalog and financing options",
  "Han River BBQ":
    "Korean BBQ restaurant website demo with table grills, menu, and group reservations",
  "Blade Haven":
    "Specialty knife shop website demo with featured blades and store story",
  "Blue Door Smokehouse":
    "BBQ restaurant website demo for Lake Cumberland with pit-smoked menu and catering",
  "Bluegrass Fence Co.":
    "Fence company website demo for Somerset KY and Lake Cumberland with services and free quotes",
  "Sea Island Soul":
    "Lowcountry food truck website demo for Beaufort SC with menu and location updates",
  "La Hacienda Cumberland":
    "Mexican restaurant website demo for Lake Cumberland with digital menu and lakeside dining feel",
  "Bourbon Ridge Artisan Studio":
    "Artisan studio website demo for Kentucky makers with classes and handmade goods",
  TruckDash:
    "TruckDash food truck dashboard product for Kentucky operators — schedule and live location tools",
  "Cumberland Smash":
    "Smashburger food truck website demo for Lake Cumberland with menu and location updates",
  "Cluckin Chaos":
    "Chicken food truck website demo for Lake Cumberland with digital menu and location updates",
  "Bluegrass Market & Mercantile":
    "Market and mercantile website demo for Central Kentucky with antiques and handmade goods",
  "Lakeside Harmony Massage":
    "Massage therapy website demo for Jamestown KY and Lake Cumberland with services and booking",
};

export default function DemoCard({
  title,
  subtitle,
  category,
  href,
  liveHref,
  image,
  imageAlt,
  slug,
  isPortfolioLanding,
}: DemoCardProps) {
  const previewImage =
    image || demoImageMap[title] || "/hero-cumberland-golden.jpg";
  const displaySlug =
    slug ||
    href.replace("https://", "").replace("http://", "").replace(/^\//, "");

  const isTemplateSite = title === "Bluegrass Digital Forge Templates";
  const isDataUrl = !!previewImage && previewImage.startsWith("data:");
  const isInternal = href.startsWith("/");
  const showLiveSecondary = Boolean(liveHref && isPortfolioLanding);

  const localAlt =
    imageAlt ||
    demoAltMap[title] ||
    `${category} website demo for Lake Cumberland — ${title}, handcrafted in Monticello KY`;

  const shellClass =
    "demo-card shimmer-hover group min-h-[480px] sm:min-h-[500px] md:min-h-[520px] flex flex-col bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden rounded-[1.35rem]";

  const primaryInner = (
    <>
      <div className="flex items-center gap-3 px-3 py-2.5 bg-[#050a08] border-b border-[var(--border)] shrink-0">
        <div className="flex gap-2" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-2 text-[11px] text-[var(--text-dim)] font-medium truncate">
          {displaySlug}
        </div>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden bg-[#050708] shrink-0">
        {isDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- data: URLs from admin uploads
          <img
            src={previewImage}
            alt={localAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <Image
            src={previewImage}
            alt={localAlt}
            fill
            loading="lazy"
            decoding="async"
            quality={70}
            className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(at_70%_20%,rgba(212,140,74,0.16)_0%,transparent_55%)] pointer-events-none" />
      </div>

      <div
        className={`p-4 sm:p-5 flex-1 flex flex-col min-h-0 ${
          showLiveSecondary ? "pb-2" : ""
        }`}
      >
        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#050a08] border border-[var(--border-strong)] rounded text-[var(--text-muted)]">
            {category}
          </span>
          {!isTemplateSite && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#2a1c12] border border-[rgba(212,140,74,0.4)] rounded text-[var(--copper-bright)]">
              {isPortfolioLanding ? "PORTFOLIO EXAMPLE" : "LIVE DEMO"}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-[17px] leading-[1.18] mb-1.5 group-hover:text-[var(--copper-bright)] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[var(--text-muted)] text-[14px] leading-relaxed line-clamp-3 min-h-[4.35rem]">
          {subtitle}
        </p>

        <p className="mt-2.5 text-[12px] font-medium tracking-[0.03em] text-[var(--copper)]">
          {SITE_TAGLINE}
        </p>

        <div className="mt-auto pt-3">
          <div className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--copper-bright)] group-hover:text-[var(--cream)] transition-colors">
            <span>
              {isPortfolioLanding ? "View example" : "Open live site"}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );

  const primaryClass =
    "flex flex-col flex-1 min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--copper)] focus-visible:ring-inset";

  return (
    <div className={shellClass}>
      {isInternal ? (
        <Link
          href={href}
          className={primaryClass}
          aria-label={`View portfolio example: ${title}`}
        >
          {primaryInner}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={primaryClass}
          aria-label={`Open live demo of ${title}`}
        >
          {primaryInner}
        </a>
      )}

      {showLiveSecondary && liveHref ? (
        <div className="px-4 sm:px-5 pb-4 pt-0 shrink-0 border-t border-transparent">
          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-[var(--text-dim)] hover:text-[var(--text-muted)] underline underline-offset-2"
          >
            View live demo ↗
          </a>
        </div>
      ) : null}
    </div>
  );
}

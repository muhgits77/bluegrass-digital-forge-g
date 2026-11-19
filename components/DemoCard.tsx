import Image from "next/image";
import Link from "next/link";

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
  /** Real client/community project (not a fictional demo) */
  isLocalProject?: boolean;
  /** Override primary CTA text (e.g. "Open live guide") */
  ctaLabel?: string;
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
  "Ridge Run Smokehouse": "/assets/demo-ridge-run-smokehouse.jpg",
  "Bluegrass Fence Co.": "/assets/demo-bluegrass-fence.jpg",
  "Sea Island Soul": "/assets/demo-sea-island-soul.jpg",
  "La Hacienda Cumberland": "/assets/demo-la-hacienda.jpg",
  "Bourbon Ridge Artisan Studio": "/assets/demo-bourbon-ridge.png",
  "Cumberland Smash": "/assets/demo-cumberland-smash.jpg",
  "Cluckin Chaos": "/assets/demo-cluckin-chaos.jpg",
  "Bluegrass Market & Mercantile": "/assets/demo-bluegrass-market.webp",
  "Lakeside Harmony Massage": "/assets/demo-lakeside-harmony.jpg",
  "Bluegrass Digital Forge Templates": "/assets/demo-bluegrass-templates.jpg",
  "Monticello Eats & Finds": "/assets/demo-monticello-eats-and-finds.jpg",
};

/** Fallback alts when demos lack imageAlt — follows SEO pattern for main cards. */
const demoAltMap: Record<string, string> = {
  "Fiesta Taqueria":
    "Mexican food truck website demo for Wayne County and Lake Cumberland with digital menu and location updates",
  "Hickory Forge Steakhouse":
    "Steakhouse website demo for Lake Cumberland restaurants with digital menu and reservations",
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
  "Ridge Run Smokehouse":
    "Ridge Run Smokehouse website demo for Lake Cumberland BBQ with pit-smoked menu and catering",
  "Bluegrass Fence Co.":
    "Fence company website demo for Somerset KY and Lake Cumberland with services and free quotes",
  "Sea Island Soul":
    "Lowcountry food truck website demo for Beaufort SC with menu and location updates",
  "La Hacienda Cumberland":
    "Mexican restaurant website demo for Lake Cumberland with digital menu and lakeside dining feel",
  "Bourbon Ridge Artisan Studio":
    "Artisan studio website demo for Kentucky makers with classes and handmade goods",
  "Cumberland Smash":
    "Smashburger food truck website demo for Lake Cumberland with menu and location updates",
  "Cluckin Chaos":
    "Chicken food truck website demo for Lake Cumberland with digital menu and location updates",
  "Bluegrass Market & Mercantile":
    "Market and mercantile website demo for Central Kentucky with antiques and handmade goods",
  "Lakeside Harmony Massage":
    "Massage therapy website demo for Jamestown KY and Lake Cumberland with services and booking",
  "Monticello Eats & Finds":
    "Monticello Eats & Finds live food guide for Lake Cumberland — menus, hours, and directions for Wayne County restaurants and food trucks",
};

export default function DemoCard({
  title,
  subtitle,
  category,
  href,
  liveHref,
  image,
  imageAlt,

  isPortfolioLanding,
  isLocalProject,
  ctaLabel,
}: DemoCardProps) {
  const previewImage =
    image || demoImageMap[title] || "/hero-cumberland-golden.jpg";
  const isDataUrl = !!previewImage && previewImage.startsWith("data:");
  const isInternal = href.startsWith("/");
  const showLiveSecondary = Boolean(liveHref && isPortfolioLanding);

  const localAlt =
    imageAlt ||
    demoAltMap[title] ||
    (isLocalProject
      ? `${title} — live local project built in Monticello KY for Lake Cumberland`
      : `${category} website demo for Lake Cumberland — ${title}, handcrafted in Monticello KY`);

  const primaryCta =
    ctaLabel ||
    (isPortfolioLanding
      ? "View example"
      : isLocalProject
        ? "Open live project"
        : "View live demo");

  const shellClass =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary";

  const primaryInner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-elev)] shrink-0">
        {isDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- data: URLs from admin uploads
          <img
            src={previewImage}
            alt={localAlt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={previewImage}
            alt={localAlt}
            fill
            loading="lazy"
            decoding="async"
            quality={70}
            className="object-cover object-top transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${showLiveSecondary ? "pb-2" : ""}`}>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">{category}</span>
        <h3 className="mt-2 font-display text-xl font-bold">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{subtitle}</p>
        <span className="mt-auto pt-4 text-sm font-semibold text-primary">
          {primaryCta} {isInternal ? "→" : "↗"}
        </span>
      </div>
    </>
  );
  const primaryClass =
    "flex flex-col flex-1 min-h-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset";

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
          aria-label={
            isLocalProject
              ? `Open live project: ${title}`
              : `Open live demo of ${title}`
          }
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

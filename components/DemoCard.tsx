import Image from "next/image";
import { SITE_TAGLINE } from "@/lib/constants";

interface DemoCardProps {
  title: string;
  subtitle: string;
  category: string;
  href: string;
  color?: string;
  image?: string;
  /** Preferred SEO alt: "[Business type] website demo for [location] — [key feature]" */
  imageAlt?: string;
  slug?: string;
}

/**
 * Demo Gallery — local authenticity & premium feel without Framer Motion.
 * Hover lift / shadow live in globals.css (.demo-card) so this stays zero-JS motion.
 * Uses per-business screenshots in /public/assets/ (Lake Cumberland / Wayne County styles).
 * Supports base64 images from /admin drag-and-drop.
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
  "Bluegrass Digital Forge Templates": "/assets/demo-bluegrass-templates.jpg",
};

/** Fallback alts when demos lack imageAlt — follows SEO pattern for main cards. */
const demoAltMap: Record<string, string> = {
  "Fiesta Taqueria":
    "Mexican restaurant website demo for Wayne County and Lake Cumberland with digital menu and catering",
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
};

export default function DemoCard({
  title,
  subtitle,
  category,
  href,
  image,
  imageAlt,
  slug,
}: DemoCardProps) {
  const previewImage =
    image || demoImageMap[title] || "/hero-cumberland-golden.jpg";
  const displaySlug =
    slug || href.replace("https://", "").replace("http://", "");

  const isTemplateSite = title === "Bluegrass Digital Forge Templates";
  const isDataUrl = !!previewImage && previewImage.startsWith("data:");

  // Prefer curated SEO alt; fallback map; then generated local pattern
  const localAlt =
    imageAlt ||
    demoAltMap[title] ||
    `${category} website demo for Lake Cumberland — ${title}, handcrafted in Monticello KY`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "demo-card shimmer-hover group block min-h-[480px] sm:min-h-[500px] md:min-h-[520px] flex flex-col bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden rounded-[1.35rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--copper)]"
      }
      aria-label={`Open live demo of ${title}`}
    >
      {/*
        Minimal browser chrome: thin top bar with traffic lights and subtle site title.
        NO address bar — keeps focus on the screenshot.
      */}
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

      {/*
        Image area: 16:9 preview, object-contain object-top so screenshots are not cropped.
        Lazy by default (below fold on home); next/image serves AVIF/WebP at correct size.
      */}
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

      <div className="p-4 sm:p-5 flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#050a08] border border-[var(--border-strong)] rounded text-[var(--text-muted)]">
            {category}
          </span>
          {!isTemplateSite && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#2a1c12] border border-[rgba(212,140,74,0.4)] rounded text-[var(--copper-bright)]">
              LIVE DEMO
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
            <span>Open live site</span>
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
    </a>
  );
}

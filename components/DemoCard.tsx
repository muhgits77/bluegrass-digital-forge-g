import Image from "next/image";
import { SITE_TAGLINE } from "@/lib/constants";

interface DemoCardProps {
  title: string;
  subtitle: string;
  category: string;
  href: string;
  color?: string;
  image?: string;
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

export default function DemoCard({
  title,
  subtitle,
  category,
  href,
  image,
  slug,
}: DemoCardProps) {
  const previewImage =
    image || demoImageMap[title] || "/hero-cumberland-golden.jpg";
  const displaySlug =
    slug || href.replace("https://", "").replace("http://", "");

  const isTemplateSite = title === "Bluegrass Digital Forge Templates";
  const isDataUrl = !!previewImage && previewImage.startsWith("data:");

  // Strong local alt text — authentic Lake Cumberland / Kentucky context
  const localAlt = `${title} — live demo website for a ${category.toLowerCase()} business near Lake Cumberland, handcrafted in Monticello, KY`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "demo-card shimmer-hover group block h-[460px] sm:h-[480px] md:h-[500px] lg:h-[520px] flex flex-col bg-[#07100f] border border-[#16201f] overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c17a5a] shadow-lg transition-shadow duration-300 " +
        "hover:shadow-[0_18px_50px_rgba(193,122,90,0.12)]"
      }
      aria-label={`Open live demo of ${title}`}
    >
      {/*
        Minimal browser chrome: thin top bar with traffic lights and subtle site title.
        NO address bar — keeps focus on the screenshot.
      */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#06100f] border-b border-[#14201f]">
        <div className="flex gap-2" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-2 text-[11px] text-[#859497] font-medium truncate">
          {displaySlug}
        </div>
      </div>

      {/*
        Image area: 16:9 preview, object-contain object-top so screenshots are not cropped.
        Lazy by default (below fold on home); next/image serves AVIF/WebP at correct size.
      */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#050708]">
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(at_70%_20%,rgba(193,122,90,0.10)_0%,transparent_55%)] pointer-events-none" />
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#0e1615] border border-[#1b2726] rounded text-[#9fb0ae]">
            {category}
          </span>
          {!isTemplateSite && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#2b1f16] border border-[#463424] rounded text-[#f4a261]">
              LIVE DEMO
            </span>
          )}
        </div>

        <h3 className="font-semibold text-[17px] leading-[1.18] mb-1 group-hover:text-[#f4a261] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[#9aa6ad] text-[14px] leading-relaxed line-clamp-3 sm:line-clamp-4">
          {subtitle}
        </p>

        <p className="mt-3 text-[12px] font-medium tracking-[0.03em] text-[#c17a5a]">
          {SITE_TAGLINE}
        </p>

        <div className="mt-auto pt-4">
          <div className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#f4a261] group-hover:text-[#ffd6b8] transition-colors">
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

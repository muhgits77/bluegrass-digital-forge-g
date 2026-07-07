import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
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
 * MAJOR CHANGE — Demo Gallery Elevation for local authenticity & premium feel
 * Uses the actual per-business demo screenshots in /public/assets/
 * These showcase real Lake Cumberland / Wayne County business styles:
 *  - Steakhouse warmth, BBQ trucks, marinas/guides, farms, auto shops, florists, etc.
 * Also supports base64 images uploaded via the /admin drag-and-drop feature.
 * No more repeated hero fallback. Each card now feels hand-forged for its client type.
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

export default function DemoCard({ title, subtitle, category, href, image, slug }: DemoCardProps) {
  const previewImage = image || demoImageMap[title] || "/hero-cumberland-golden.jpg";
  const displaySlug = slug || href.replace("https://", "").replace("http://", "");

  const isTemplateSite = title === "Bluegrass Digital Forge Templates";
  const isDataUrl = !!previewImage && previewImage.startsWith("data:"); // Support admin-uploaded base64 images

  // Strong local alt text — authentic Lake Cumberland / Kentucky context
  const localAlt = `${title} — live demo website for a ${category.toLowerCase()} business near Lake Cumberland, handcrafted in Monticello, KY`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Add `shimmer-hover` utility class to enable the warm amber sweep on hover.
      className={"demo-card shimmer-hover group block h-[460px] sm:h-[480px] md:h-[500px] lg:h-[520px] flex flex-col bg-[#07100f] border border-[#16201f] overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c17a5a] shadow-lg transition-shadow duration-300 " +
        "hover:shadow-[0_18px_50px_rgba(193,122,90,0.12)]"}
      whileHover={{ y: -10, scale: 1.004 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.8 }}
      aria-label={`Open live demo of ${title}`}
    >
      {/*
        Minimal browser chrome: thin top bar with traffic lights and an optional subtle site title.
        NO address bar, NO visible URL chrome. Keeps focus on the screenshot itself.
      */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#06100f] border-b border-[#14201f]">
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        {/* Optional subtle site title to the right of the dots — keeps chrome minimal */}
        <div className="ml-2 text-[11px] text-[#859497] font-medium truncate">{displaySlug}</div>
      </div>

      {/*
        Image Area: Use a 16:9 (aspect-video) preview and `object-contain object-top` so images
        are never cropped. Background fills with the card color to avoid harsh letterboxing.
      */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#050708]">
        {isDataUrl ? (
          <img
            src={previewImage}
            alt={localAlt}
            className="absolute inset-0 w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <Image
            src={previewImage}
            alt={localAlt}
            fill
            className="object-contain object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* subtle vignette and warm amber highlight on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(at_70%_20%,rgba(193,122,90,0.10)_0%,transparent_55%)] pointer-events-none" />
      </div>

      {/*
        Content area: standardized padding, consistent typography, and clipped description so
        all cards remain uniform height. LIVE DEMO tag is consistent across all cards.
      */}
      <div className="p-4 flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#0e1615] border border-[#1b2726] rounded text-[#9fb0ae]">{category}</span>
          {!isTemplateSite && (
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-[#2b1f16] border border-[#463424] rounded text-[#f4a261]">LIVE DEMO</span>
          )}
        </div>

        <h3 className="font-semibold text-[17px] leading-[1.18] mb-1 group-hover:text-[#f4a261] transition-colors duration-200">{title}</h3>
        <p className="text-[#9aa6ad] text-[14px] leading-relaxed line-clamp-3 sm:line-clamp-4">{subtitle}</p>

        <p className="mt-3 text-[12px] font-medium tracking-[0.03em] text-[#c17a5a]">{SITE_TAGLINE}</p>

        {/* Footer action — visually consistent button-like row */}
        <div className="mt-auto pt-4">
          <div className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#f4a261] hover:text-[#ffd6b8] transition-colors">
            <span>Open live site</span>
            <ArrowUpRight size={16} className="transform transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}
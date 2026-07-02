import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

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
  const previewImage = image || demoImageMap[title] || "/hero-lake-golden.jpg";
  const displaySlug = slug || href.replace("https://", "").replace("http://", "");

  const isTemplateSite = title === "Bluegrass Digital Forge Templates";
  const isDataUrl = !!previewImage && previewImage.startsWith("data:"); // Support admin-uploaded base64 images

  // Strong local alt text per rules — authentic Lake Cumberland / Kentucky region context
  const localAlt = `${title} — live website demo for ${category} business in the Lake Cumberland / Wayne County Kentucky area`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="demo-card group block h-full flex flex-col bg-[#0c1013] border border-[#1a2225] overflow-hidden rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c17a5a]"
      whileHover={{ y: -9, scale: 1.0035 }}
      transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.8 }}
      aria-label={`Open live demo of ${title}`}
    >
      {/* Browser Frame */}
      <div className="relative bg-[#0a0c0f] border-b border-[#1a2225]">
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#0c1013]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 mx-2 text-[10px] text-[#8a9599] font-mono truncate bg-[#050708] border border-[#1f2528] rounded-full px-3 py-1">
            {displaySlug}
          </div>
          {!isTemplateSite && <ExternalLink size={11} className="text-[#7f8c90]" />}
        </div>

        {/* Image Area — authentic local previews */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#050708]">
          {isDataUrl ? (
            <img
              src={previewImage}
              alt={localAlt}
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-[650ms] group-hover:scale-[1.065] group-hover:brightness-[1.03]"
            />
          ) : (
            <Image
              src={previewImage}
              alt={localAlt}
              fill
              className="object-cover object-top transition-all duration-[650ms] group-hover:scale-[1.065] group-hover:brightness-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/75 group-hover:via-black/30 transition-all duration-500" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(at_70%_20%,rgba(193,122,90,0.12)_0%,transparent_55%)]" />
        </div>
      </div>

      {/* Content — refined typography, warmer hover states, premium local feel */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex gap-2 mb-3.5">
          <span className="text-[10px] uppercase tracking-[1.5px] font-semibold px-2.5 py-px bg-[#111518] border border-[#1f2528] rounded text-[#8a9599]">
            {category}
          </span>
          {!isTemplateSite && (
            <span className="text-[10px] uppercase tracking-[1.5px] font-semibold px-2.5 py-px bg-[#2a2118] border border-[#463424] rounded text-[#f4a261]">
              LIVE DEMO
            </span>
          )}
        </div>

        <h3 className="font-semibold text-[17px] leading-[1.2] mb-2 group-hover:text-[#f4a261] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[#9aa6ad] text-[14.5px] leading-snug flex-1 line-clamp-3 pr-1">{subtitle}</p>

        <div className="mt-auto pt-5 text-[#f4a261] font-medium flex items-center gap-2 group-hover:gap-2.5 transition-all text-[14px]">
          Open live site
          <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}
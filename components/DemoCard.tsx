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

// Local screenshot assets for live demo previews (self-contained)
const demoImageMap: Record<string, { image: string; slug: string }> = {
  "Hickory Forge Steakhouse": {
    image: "/assets/demo-hickory-forge.jpg",
    slug: "hickory-forge-steakhouse.lovable.app",
  },
  "Smoky Wheels": {
    image: "/assets/demo-smoky-wheels.jpg",
    slug: "smoky-wheels.lovable.app",
  },
  "Fiesta Taqueria": {
    image: "/assets/demo-fiesta-taqueria.jpg",
    slug: "fiesta-taqueria.lovable.app",
  },
  "Ignite Fitness Company": {
    image: "/assets/demo-ignite-fitness.jpg",
    slug: "ignite-fitness-company.lovable.app",
  },
  "Summit Tire & Auto": {
    image: "/assets/demo-summit-tire.jpg",
    slug: "summit-tire-and-auto.lovable.app",
  },
  "Summit Auto Showcase": {
    image: "/assets/demo-summit-auto.jpg",
    slug: "summit-auto-showcase.lovable.app",
  },
  // Additional local Kentucky business demo screenshots
  "Heritage Home Furniture & Appliances": {
    image: "/assets/demo-heritage-home.png",
    slug: "heritage-home-furniture-and-appliances.lovable.app",
  },
  "Hickory & Bloom": {
    image: "/assets/demo-hickory-bloom.png",
    slug: "bluegrass-bloom-showcase.lovable.app",
  },
  "Anchorline Guide Service": {
    image: "/assets/demo-anchorline.png",
    slug: "lake-cumberland-lines.lovable.app",
  },
  "Sunny Hollow Donut Dash": {
    image: "/assets/demo-sunny-hollow.png",
    slug: "sunny-hollow-donut-dash.lovable.app",
  },
  "Cumberland Forge Steakhouse": {
    image: "/assets/demo-cumberland-forge.png",
    slug: "cumberland-forge-steakhouse.lovable.app",
  },
  "Han River BBQ": {
    image: "/assets/demo-han-river.png",
    slug: "han-river-sizzle.lovable.app",
  },
  "Landing Point Bait & Tackle": {
    image: "/assets/demo-landing-point.jpg",
    slug: "cumberland-landing-demo.lovable.app",
  },
  "Ridge Pasture Care": {
    image: "/assets/demo-ridge-pasture.jpg",
    slug: "ridge-pasture-care.lovable.app",
  },
  "Blade Haven": {
    image: "/assets/demo-blade-haven.jpg",
    slug: "blade-haven-demo.lovable.app",
  },
  "Bluegrass Digital Forge Templates": {
    image: "/assets/demo-bluegrass-templates.jpg",
    slug: "bluegrass-digital-forge-templates.lovable.app",
  },
};

export default function DemoCard({ title, subtitle, category, href, color = "#c17a5a", image, slug }: DemoCardProps) {
  const mapped = demoImageMap[title] || { image: "", slug: slug || href.replace("https://", "") };
  const previewImage = image || mapped.image;
  const displaySlug = slug || mapped.slug;

  // Special treatment for our own live template marketplace — no "Live Demo" badge or text
  const isTemplateSite = title === "Bluegrass Digital Forge Templates";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="demo-card group block rounded-2xl overflow-hidden h-full flex flex-col bg-[#0c1013] border border-[#1a2225] will-change-transform"
      whileHover={{ 
        y: -7, 
        scale: 1.004,
        borderColor: "#33423c",
        boxShadow: "0 28px 65px -18px rgb(0 0 0 / 0.5), 0 12px 14px -7px rgb(0 0 0 / 0.32)" 
      }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
    >
      {/* Premium browser frame */}
      <div className="relative bg-[#0a0c0f] border-b border-[#1a2225]">
        {/* Browser chrome bar — refined */}
        <div className="flex items-center gap-2 px-3 py-[7px] bg-[#0c1013]">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 pl-1">
            <div className="w-[10.5px] h-[10.5px] rounded-full bg-[#ff5f56] ring-1 ring-black/25" />
            <div className="w-[10.5px] h-[10.5px] rounded-full bg-[#ffbd2e] ring-1 ring-black/25" />
            <div className="w-[10.5px] h-[10.5px] rounded-full bg-[#27c93f] ring-1 ring-black/25" />
          </div>

          {/* URL bar */}
          <div className="flex-1 mx-2 flex items-center gap-1.5 rounded-full bg-[#050708] border border-[#1f2528] px-2.5 py-[3px] text-[10px] text-[#8a9599] font-mono tracking-tight">
            <span className="truncate">{displaySlug}</span>
          </div>

          {!isTemplateSite && (
            <div className="hidden sm:flex items-center gap-1 text-[10.5px] text-[#7f8c90] pr-0.5">
              LIVE <ExternalLink size={10} />
            </div>
          )}
        </div>

        {/* Screenshot with premium hover treatment */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050708]">
          {previewImage ? (
            <img
              src={previewImage}
              alt={`${title} live preview`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[620ms] group-hover:scale-[1.022]"
              loading="lazy"
            />
          ) : (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-[#0a0c0f]"
            >
              <div className="text-center px-6">
                <div className="inline-block rounded-full px-3 py-px text-[9px] font-semibold tracking-[1.5px] mb-2.5 bg-[#111518] border border-[#1f2528] text-[#8a9599]">
                  {category.toUpperCase()}
                </div>
                <div className="text-[15.5px] font-semibold tracking-[-0.2px] text-white leading-tight">{title}</div>
                <div className="mt-1 text-[10px] text-[#6f7c82]">Demo preview coming soon</div>
              </div>
            </div>
          )}

          {/* Subtle top gradient + hover lift overlay */}
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/35 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
      </div>

      {/* Meta — richer, better hover states */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="inline-block rounded px-2.5 py-px text-[10px] font-semibold tracking-[1.3px] bg-[#111518] text-[#8a9599] border border-[#1f2528]">
            {category.toUpperCase()}
          </span>
          {!isTemplateSite && (
            <span className="live-badge inline-block rounded px-2 py-px text-[10px] font-semibold tracking-[0.8px] bg-[#2a2118] text-[#f4a261] border border-[#463424]">
              LIVE DEMO
            </span>
          )}
        </div>

        <div className="font-semibold tracking-[-0.3px] text-[16.5px] text-white leading-tight mb-1.5 group-hover:text-[#f4a261] transition-colors duration-200">
          {title}
        </div>

        <p className="text-[14.2px] text-[#9aa6ad] leading-snug line-clamp-2 flex-1">{subtitle}</p>

        <div className="mt-4 flex items-center gap-3 text-[13px]">
          <span className="inline-flex items-center gap-1 font-semibold text-[#f4a261] group-hover:gap-1.5 transition-all">
            {isTemplateSite ? "Browse templates" : "Open live site"} <ArrowUpRight size={13} />
          </span>
          {!isTemplateSite && (
            <span className="text-[#6f7c82] group-hover:text-[#8a9599] transition-colors">See how it was built →</span>
          )}
        </div>
      </div>
    </motion.a>
  );
}

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

// Real screenshot assets from the reference site for authentic previews
const demoImageMap: Record<string, { image: string; slug: string }> = {
  "Hickory Forge Steakhouse": {
    image: "https://bluegrass-digital-forge.lovable.app/assets/demo-hickory-steakhouse-Doo9LGU5.jpg",
    slug: "hickory-forge-steakhouse.lovable.app",
  },
  "Smoky Wheels": {
    image: "https://bluegrass-digital-forge.lovable.app/assets/demo-smoky-wheels-DpOyDjBg.jpg",
    slug: "smoky-wheels.lovable.app",
  },
  "Fiesta Taqueria": {
    image: "https://bluegrass-digital-forge.lovable.app/assets/demo-fiesta-taqueria-x8Ugz7zw.jpg",
    slug: "fiesta-taqueria.lovable.app",
  },
  "Ignite Fitness Company": {
    image: "https://bluegrass-digital-forge.lovable.app/assets/demo-ignite-fitness-C5NdtsoD.jpg",
    slug: "ignite-fitness-company.lovable.app",
  },
  "Summit Tire & Auto": {
    image: "https://bluegrass-digital-forge.lovable.app/assets/demo-summit-tire-B0gFRH6E.jpg",
    slug: "summit-tire-and-auto.lovable.app",
  },
  "Summit Auto Showcase": {
    image: "https://bluegrass-digital-forge.lovable.app/assets/demo-summit-auto-DYxERsAi.jpg",
    slug: "summit-auto-showcase.lovable.app",
  },
};

export default function DemoCard({ title, subtitle, category, href, color = "#c17a5a", image, slug }: DemoCardProps) {
  const mapped = demoImageMap[title] || { image: "", slug: slug || href.replace("https://", "") };
  const previewImage = image || mapped.image;
  const displaySlug = slug || mapped.slug;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="demo-card group block rounded-2xl overflow-hidden h-full flex flex-col bg-[#0c1013] border border-[#1a2225]"
      whileHover={{ 
        y: -6, 
        scale: 1.005,
        borderColor: "#2a3437",
        boxShadow: "0 25px 60px -15px rgb(0 0 0 / 0.45), 0 10px 10px -6px rgb(0 0 0 / 0.3)" 
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {/* Browser frame */}
      <div className="relative bg-[#0a0c0f] border-b border-[#1a2225]">
        {/* Browser chrome bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#0c1013]">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 pl-1">
            <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f56] ring-1 ring-black/20" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e] ring-1 ring-black/20" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#27c93f] ring-1 ring-black/20" />
          </div>

          {/* URL bar */}
          <div className="flex-1 mx-2 flex items-center gap-1.5 rounded-full bg-[#050708] border border-[#1f2528] px-2.5 py-0.5 text-[10px] text-[#7f8c90] font-mono tracking-tight">
            <span className="truncate">{displaySlug}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#6f7c82] pr-1">
            Open live <ExternalLink size={11} />
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050708]">
          {previewImage ? (
            <img
              src={previewImage}
              alt={`${title} live preview`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
              loading="lazy"
            />
          ) : (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `linear-gradient(155deg, #0c1013 0%, #050708 100%)` }}
            >
              <div className="text-center px-6">
                <div className="inline-block rounded-full px-2.5 py-[1px] text-[8.5px] font-semibold tracking-[2px] mb-3 bg-[#1f1814] border border-[#33281f] text-[#c98a6a]">
                  {category.toUpperCase()}
                </div>
                <div className="text-[17px] font-semibold tracking-[-0.3px] text-white leading-tight">{title}</div>
              </div>
            </div>
          )}

          {/* Subtle top gradient for browser polish */}
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Meta content below browser */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block rounded px-2 py-px text-[10px] font-semibold tracking-[1.5px] bg-[#111518] text-[#8a9599] border border-[#1f2528]">
            {category.toUpperCase()}
          </span>
          <span className="live-badge inline-block rounded px-2 py-px text-[10px] font-semibold tracking-[1px] bg-[#2a2118] text-[#f4a261] border border-[#463424]">
            LIVE DEMO
          </span>
        </div>

        <div className="font-semibold tracking-[-0.25px] text-[15.5px] text-white leading-tight mb-1.5 group-hover:text-[#f4a261] transition-colors">
          {title}
        </div>

        <p className="text-sm text-[#8a9599] leading-snug line-clamp-2 flex-1">{subtitle}</p>

        <div className="mt-3.5 flex items-center gap-4 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-[#f4a261] group-hover:gap-1.5 transition-all">
            View Live Demo <ArrowUpRight size={13} />
          </span>
          <span className="text-[#6f7c82] group-hover:text-[#8a9599] transition-colors">View similar projects →</span>
        </div>
      </div>
    </motion.a>
  );
}

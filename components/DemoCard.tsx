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

// Local screenshot assets for live demo previews
const demoImageMap: Record<string, { image: string; slug: string }> = {
  "Hickory Forge Steakhouse": { image: "/assets/demo-hickory-forge.jpg", slug: "hickory-forge-steakhouse.lovable.app" },
  "Smoky Wheels": { image: "/assets/demo-smoky-wheels.jpg", slug: "smoky-wheels.lovable.app" },
  "Fiesta Taqueria": { image: "/assets/demo-fiesta-taqueria.jpg", slug: "fiesta-taqueria.lovable.app" },
  "Ignite Fitness Company": { image: "/assets/demo-ignite-fitness.jpg", slug: "ignite-fitness-company.lovable.app" },
  "Summit Tire & Auto": { image: "/assets/demo-summit-tire.jpg", slug: "summit-tire-and-auto.lovable.app" },
  "Summit Auto Showcase": { image: "/assets/demo-summit-auto.jpg", slug: "summit-auto-showcase.lovable.app" },
  // Add more as needed
};

export default function DemoCard({ title, subtitle, category, href, image, slug }: DemoCardProps) {
  const mapped = demoImageMap[title] || { image: "", slug: slug || href.replace("https://", "") };
  const previewImage = image || mapped.image;
  const displaySlug = slug || mapped.slug;

  const isTemplateSite = title === "Bluegrass Digital Forge Templates";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="demo-card group block rounded-3xl overflow-hidden h-full flex flex-col bg-[#0c1013] border border-[#1a2225] will-change-transform"
      whileHover={{ 
        y: -8, 
        scale: 1.005,
        borderColor: "#33423c",
        boxShadow: "0 30px 70px -20px rgb(0 0 0 / 0.55), 0 15px 16px -8px rgb(0 0 0 / 0.35)" 
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      aria-label={`View live demo: ${title}`}
    >
      {/* Premium Browser Frame */}
      <div className="relative bg-[#0a0c0f] border-b border-[#1a2225]">
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#0c1013]">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 pl-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

          {/* URL Bar */}
          <div className="flex-1 mx-2 flex items-center gap-1.5 rounded-full bg-[#050708] border border-[#1f2528] px-3 py-1 text-[10px] text-[#8a9599] font-mono tracking-tight truncate">
            {displaySlug}
          </div>

          {!isTemplateSite && (
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#7f8c90] pr-1">
              LIVE <ExternalLink size={11} />
            </div>
          )}
        </div>

        {/* Screenshot Area */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050708]">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={`${title} live demo preview`}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0c0f]">
              <div className="text-center px-6">
                <div className="inline-block rounded-full px-3 py-px text-[9px] font-semibold tracking-[1.5px] mb-3 bg-[#111518] border border-[#1f2528] text-[#8a9599]">
                  {category.toUpperCase()}
                </div>
                <div className="text-[16px] font-semibold tracking-tight text-white">{title}</div>
                <div className="mt-1 text-sm text-[#6f7c82]">Demo preview coming soon</div>
              </div>
            </div>
          )}

          {/* Hover overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 opacity-60 group-hover:opacity-40 transition-opacity" />
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block rounded px-2.5 py-px text-[10px] font-semibold tracking-[1.3px] bg-[#111518] text-[#8a9599] border border-[#1f2528]">
            {category.toUpperCase()}
          </span>
          {!isTemplateSite && (
            <span className="live-badge inline-block rounded px-2.5 py-px text-[10px] font-semibold tracking-[0.8px] bg-[#2a2118] text-[#f4a261] border border-[#463424]">
              LIVE DEMO
            </span>
          )}
        </div>

        <div className="font-semibold tracking-[-0.3px] text-[17px] text-white leading-tight mb-2 group-hover:text-[#f4a261] transition-colors">
          {title}
        </div>

        <p className="text-[14.5px] text-[#9aa6ad] leading-snug line-clamp-3 flex-1">{subtitle}</p>

        <div className="mt-5 flex items-center gap-2 text-[#f4a261] font-medium text-sm group-hover:gap-3 transition-all">
          {isTemplateSite ? "Browse templates" : "Open live site"}
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.a>
  );
}
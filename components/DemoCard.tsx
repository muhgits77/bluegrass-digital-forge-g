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

// Fallback images - you can replace these later with real screenshots
const demoImageMap: Record<string, string> = {
  "Hickory Forge Steakhouse": "/hero-lake-boat.jpg", // temporary fallback
  "Smoky Wheels": "/hero-lake-boat.jpg",
  "Fiesta Taqueria": "/hero-lake-boat.jpg",
  "Ignite Fitness Company": "/hero-lake-boat.jpg",
  "Summit Tire & Auto": "/hero-lake-boat.jpg",
  "Summit Auto Showcase": "/hero-lake-boat.jpg",
  // Add more as you upload real screenshots to /public/assets/
};

export default function DemoCard({ title, subtitle, category, href, image, slug }: DemoCardProps) {
  const previewImage = image || demoImageMap[title] || "/hero-lake-boat.jpg";
  const displaySlug = slug || href.replace("https://", "").replace("http://", "");

  const isTemplateSite = title === "Bluegrass Digital Forge Templates";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="demo-card group block rounded-3xl overflow-hidden h-full flex flex-col bg-[#0c1013] border border-[#1a2225]"
      whileHover={{ y: -8, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
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

        {/* Image Area */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#050708]">
          <Image
            src={previewImage}
            alt={`${title} preview`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 group-hover:from-black/20 transition-all" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 bg-[#111518] border border-[#1f2528] rounded text-[#8a9599]">
            {category}
          </span>
          {!isTemplateSite && (
            <span className="text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 bg-[#2a2118] border border-[#463424] rounded text-[#f4a261]">
              LIVE DEMO
            </span>
          )}
        </div>

        <h3 className="font-semibold text-[17px] leading-tight mb-2 group-hover:text-[#f4a261] transition-colors">
          {title}
        </h3>
        <p className="text-[#9aa6ad] text-[14.5px] leading-snug flex-1 line-clamp-3">{subtitle}</p>

        <div className="mt-5 text-[#f4a261] font-medium flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
          Open live site
          <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.a>
  );
}
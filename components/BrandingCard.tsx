import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface BrandingCardProps {
  title: string;
  price: string;
  popular?: boolean;
  description?: string;
}

export default function BrandingCard({ title, price, popular, description }: BrandingCardProps) {
  return (
    <motion.div 
      className={`card rounded-2xl p-5 flex flex-col group ${popular ? "ring-1 ring-[#c5a26e]" : ""}`}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-semibold tracking-[-0.15px] text-[15px] leading-tight group-hover:text-[#f4a261] transition-colors">{title}</h4>
          {description && <p className="text-[12px] text-[#8a9599] mt-1 leading-snug pr-1">{description}</p>}
        </div>
        {popular && <span className="badge-gold text-[9.5px] mt-px whitespace-nowrap">MOST POPULAR</span>}
      </div>
      <div className="mt-auto pt-5">
        <div className="font-semibold text-[25px] tabular-nums tracking-[-1.3px]">{price}</div>
        <p className="text-[10px] text-[#8a9599] -mt-0.5">one-time</p>
      </div>
    </motion.div>
  );
}

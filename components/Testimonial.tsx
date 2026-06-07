import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}

export default function Testimonial({ quote, name, role, photo }: TestimonialProps) {
  return (
    <motion.div 
      className="testimonial group rounded-2xl p-6 md:p-7 flex flex-col border border-[#1a2225] bg-[#0c1013]"
      whileHover={{ y: -4, boxShadow: "0 24px 40px -12px rgb(0 0 0 / 0.4), 0 10px 12px -6px rgb(0 0 0 / 0.25)" }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      {/* Stars + photo row for emotional connection */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-px text-[#f4a261]" aria-hidden>
          {"★★★★★".split("").map((s, i) => <span key={i} className="text-[15px]">{s}</span>)}
        </div>
        {photo && (
          <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/10 shadow-md flex-shrink-0 border border-[#2a3f38]">
            <img 
              src={photo} 
              alt={name} 
              className="w-full h-full object-cover grayscale-[0.15] group-hover:grayscale-0 transition-all duration-300" 
              loading="lazy"
            />
          </div>
        )}
      </div>

      <p className="text-[15px] leading-[1.55] text-[#c8cfd3] flex-1 tracking-[-0.1px]">“{quote}”</p>
      
      <div className="mt-auto pt-5 border-t border-[#1f282b]">
        <div className="font-semibold tracking-[-0.15px] text-[15.5px] text-white">{name}</div>
        <div className="text-[13px] text-[#9aa6ad] mt-0.5 leading-snug">{role}</div>
      </div>
    </motion.div>
  );
}

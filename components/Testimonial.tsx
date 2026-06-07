import { motion } from "framer-motion";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
}

export default function Testimonial({ quote, name, role }: TestimonialProps) {
  return (
    <motion.div 
      className="testimonial rounded-2xl p-6 md:p-7 flex flex-col"
      whileHover={{ y: -3, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.2)" }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <div className="flex gap-px text-[#f4a261] mb-3.5" aria-hidden>
        {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
      </div>
      <p className="text-[15px] leading-[1.5] text-[#c8cfd3] flex-1">“{quote}”</p>
      <div className="mt-auto pt-4 border-t border-[#1a2225]">
        <div className="font-semibold tracking-[-0.1px] text-[15px]">{name}</div>
        <div className="text-[13px] text-[#9aa6ad] mt-px">{role}</div>
      </div>
    </motion.div>
  );
}

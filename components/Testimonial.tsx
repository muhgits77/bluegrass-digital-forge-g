import Image from "next/image";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}

/**
 * CSS hover only — no Framer Motion (saves ~30–50KB JS when testimonials render).
 */
export default function Testimonial({
  quote,
  name,
  role,
  photo,
}: TestimonialProps) {
  return (
    <div className="testimonial group rounded-2xl p-6 md:p-7 flex flex-col border border-[#1a2225] bg-[#0c1013] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_40px_-12px_rgb(0_0_0_/_0.4),0_10px_12px_-6px_rgb(0_0_0_/_0.25)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-px text-[#f4a261]" aria-hidden>
          {"★★★★★".split("").map((s, i) => (
            <span key={i} className="text-[15px]">
              {s}
            </span>
          ))}
        </div>
        {photo && (
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-white/10 shadow-md flex-shrink-0 border border-[#2a3f38]">
            <Image
              src={photo}
              alt={`${name} — local Lake Cumberland business owner testimonial for Monticello KY website designer`}
              fill
              sizes="44px"
              quality={70}
              loading="lazy"
              decoding="async"
              className="object-cover grayscale-[0.15] group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
        )}
      </div>

      <p className="text-[15px] leading-[1.55] text-[#c8cfd3] flex-1 tracking-[-0.1px]">
        “{quote}”
      </p>

      <div className="mt-auto pt-5 border-t border-[#1f282b]">
        <div className="font-semibold tracking-[-0.15px] text-[15.5px] text-white">
          {name}
        </div>
        <div className="text-[13px] text-[#9aa6ad] mt-0.5 leading-snug">
          {role}
        </div>
      </div>
    </div>
  );
}

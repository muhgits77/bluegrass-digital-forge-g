import Link from "next/link";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  href: string;
  popular?: boolean;
  cta?: string;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  href,
  popular = false,
  cta = "Get Started",
}: PricingCardProps) {
  return (
    <div className={`pricing-card rounded-3xl p-7 md:p-8 flex flex-col h-full ${popular ? "popular" : ""}`}>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[22px] md:text-2xl font-semibold tracking-[-0.4px]">{title}</h3>
            {popular && <span className="badge text-[10px] py-px">MOST POPULAR</span>}
          </div>
          <p className="text-[#9aa6ad] mt-1 text-[14.5px] leading-snug">{description}</p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[27px] md:text-[30px] font-semibold tabular-nums tracking-[-1.6px]">{price}</div>
          <div className="text-[11.5px] text-[#9aa6ad] -mt-0.5">one-time</div>
        </div>
      </div>

      <ul className="mt-7 space-y-[8.5px] text-[15px] flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex gap-2.5 text-[#c8cfd3]">
            <Check size={15} className="check mt-[3.5px] shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link href={href} className={`btn mt-7 w-full ${popular ? "btn-primary" : "btn-secondary"}`}>
        {cta} →
      </Link>
    </div>
  );
}

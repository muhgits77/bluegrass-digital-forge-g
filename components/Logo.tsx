import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink pr-1 sm:pr-2 max-w-[calc(100%-2.75rem)] sm:max-w-none"
      aria-label="Bluegrass Digital Forge home"
    >
      <div className="relative shrink-0 h-10 w-10 md:h-11 md:w-11">
        <Image
          src="/logo.jpg"
          alt="Bluegrass Digital Forge — Monticello KY website designer for Lake Cumberland business websites"
          fill
          sizes="44px"
          quality={75}
          // Eager so the nav logo paints with first paint; no fetchPriority so hero remains LCP
          loading="eager"
          decoding="async"
          className="object-contain rounded-sm ring-1 ring-white/10 shadow-sm transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col leading-tight gap-0.5 min-w-0">
        <span className="font-bold tracking-[-0.02em] text-[17px] sm:text-[18px] md:text-[19px] text-white group-hover:text-[var(--gold-light)] transition-colors whitespace-nowrap">
          Bluegrass Digital Forge
        </span>
        <span className="text-[11px] sm:text-[11.5px] md:text-[12px] text-[var(--gold-light)]/90 tracking-[0.04em] sm:tracking-[0.05em] font-medium leading-snug md:whitespace-nowrap">
          Forged for the Lake • Monticello, KY
        </span>
      </div>
    </Link>
  );
}

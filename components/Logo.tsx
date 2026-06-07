import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink pr-1 sm:pr-2 max-w-[calc(100%-2.75rem)] sm:max-w-none" aria-label="Bluegrass Digital Forge home">
      <img
        src="/logo.jpg"
        alt="Bluegrass Digital Forge"
        className="h-10 w-auto object-contain md:h-11 shrink-0 rounded-sm ring-1 ring-white/10 shadow-sm"
        style={{ maxHeight: "46px" }}
      />
      <div className="flex flex-col leading-tight gap-0.5 min-w-0">
        <span className="font-bold tracking-[-0.02em] text-[17px] sm:text-[18px] md:text-[19px] text-white group-hover:text-[#f4a261] transition-colors whitespace-nowrap">
          Bluegrass Digital Forge
        </span>
        <span className="text-[11px] sm:text-[11.5px] md:text-[12px] text-[#f4a261]/92 tracking-[0.04em] sm:tracking-[0.05em] font-medium leading-snug md:whitespace-nowrap">
          Websites for Local Businesses · Monticello, KY
        </span>
      </div>
    </Link>
  );
}

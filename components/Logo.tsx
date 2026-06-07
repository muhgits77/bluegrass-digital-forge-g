import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group" aria-label="Bluegrass Digital Forge home">
      {/* Business logo image — using the correct anvil + blue leaves/circuit logo you provided */}
      <img
        src="/logo.jpg"
        alt="Bluegrass Digital Forge"
        className="h-9 w-auto object-contain md:h-10 shrink-0 rounded-sm ring-1 ring-white/10 shadow-sm"
        style={{ maxHeight: '42px' }}
      />
      <div className="flex flex-col leading-none">
        <span className="font-semibold tracking-[-0.02em] text-[15.5px] md:text-[16px] text-white group-hover:text-[#f4a261] transition-colors">
          Bluegrass Digital Forge
        </span>
        <span className="text-[9.5px] md:text-[10px] text-[#f4a261]/85 -mt-px tracking-[1.15px] font-medium">Websites for Local Businesses · Monticello, KY</span>
      </div>
    </Link>
  );
}

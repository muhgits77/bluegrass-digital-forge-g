import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="flex h-8 w-8 items-center justify-center rounded bg-[#14b8a6] text-white shadow-sm ring-1 ring-white/10">
        {/* Star / anvil style matching Lovable */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.09 6.26L21 9.27l-5.17 3.76L17.82 21 12 17.27 6.18 21l1.99-7.97L3 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-semibold tracking-[-0.02em] text-[15px] text-white group-hover:text-[#f4a261] transition-colors">
          Bluegrass Digital Forge
        </span>
        <span className="text-[9px] text-[#f4a261]/80 -mt-px tracking-[1.2px] font-medium">Websites for Local Businesses · Monticello, KY</span>
      </div>
    </Link>
  );
}

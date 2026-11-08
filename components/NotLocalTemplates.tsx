/**
 * "Not local?" store link for Forge industry pages.
 * Points people outside the Lake Cumberland area to the matching
 * bluegrasstemplates.com category.
 */
export default function NotLocalTemplates({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <div className="mt-12 rounded-2xl border border-[#243530] bg-[#0a0c0f] p-6 md:p-8">
      <div className="label tracking-[1.5px] text-[#f4a261]">NOT LOCAL?</div>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        Get a ready-made template for $129
      </h2>
      <p className="mt-2 text-[15px] text-[#9aa6ad]">
        Outside the Lake Cumberland area? Start from a finished website at the
        template store. One-time price, live demos, no monthly fees.
      </p>
      <a
        href={href}
        className="mt-4 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-[#f4a261] underline hover:text-white"
      >
        {label} →
      </a>
    </div>
  );
}

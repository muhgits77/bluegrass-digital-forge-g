import Link from "next/link";

export default function WorkDemoNotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-20 text-center">
      <div className="label tracking-[1.5px]">PORTFOLIO</div>
      <h1 className="section-title tracking-tight mt-2">
        Example not found
      </h1>
      <p className="mt-3 text-[15px] text-[var(--text-muted)]">
        That portfolio page isn’t available. You can browse the full set of
        examples from the work page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link href="/work" className="btn btn-primary">
          Browse examples
        </Link>
        <Link href="/" className="btn btn-secondary">
          Home
        </Link>
      </div>
    </div>
  );
}

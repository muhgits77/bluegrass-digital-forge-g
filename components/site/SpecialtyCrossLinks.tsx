import Link from "next/link";
import { CopperButton, Eyebrow, GhostButton } from "./ui";

/** Ported from the Lovable SpecialtyPage: relevant demos plus links back to Services & Pricing and every demo. */
export default function SpecialtyCrossLinks({
  demos,
  cta,
}: {
  demos: { slug: string; title: string }[];
  cta: string;
}) {
  return (
    <section className="mt-14 rounded-3xl border border-border bg-card p-7 text-center">
      <Eyebrow>Live examples</Eyebrow>
      <h2 className="mt-3 font-display text-2xl font-bold">See it on real builds</h2>
      <p className="mt-3 text-muted-foreground">
        Compare these with the <Link href="/services" className="text-primary">flat Services &amp; Pricing</Link> or{" "}
        <Link href="/work" className="text-primary">every portfolio demo</Link>.
      </p>
      <ul className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
        {demos.map((d) => (
          <li key={d.slug}>
            <Link href={`/work/${d.slug}`} className="inline-block rounded-full border border-border px-3 py-1.5 text-primary hover:border-primary/50">
              {d.title} demo →
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <CopperButton href="/quote">{cta}</CopperButton>
        <GhostButton href="/services">Services &amp; Pricing</GhostButton>
        <GhostButton href="/work">Browse all demos</GhostButton>
      </div>
    </section>
  );
}

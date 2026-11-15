import Image from "next/image";
import type { ReactNode } from "react";
import { CopperButton, Eyebrow, GhostButton } from "./ui";

/**
 * Full-bleed photo hero mirrored from the Lovable SpecialtyPage.
 * Children carry the page's own intro copy so no live content is lost.
 */
export default function SpecialtyHero({
  eyebrow,
  title,
  image,
  imageAlt,
  cta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  image: string;
  imageAlt: string;
  cta: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:py-28">
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">{title}</h1>
          <div className="mt-5 space-y-4 text-lg text-muted-foreground [&_strong]:text-foreground">{children}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            <CopperButton href="/quote">{cta}</CopperButton>
            <GhostButton href="/services">See pricing</GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}

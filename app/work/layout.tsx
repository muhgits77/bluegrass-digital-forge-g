import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Lake Cumberland Business Website Demos | Monticello KY Website Designer",
  description:
    "Live demos of Lake Cumberland business websites built by the Monticello KY website designer. Food trucks, restaurants, marinas, shops & more. Flat pricing. You own everything.",
  alternates: { canonical: canonicalUrl("/work") },
  openGraph: {
    title:
      "Lake Cumberland Business Website Demos | Monticello KY Website Designer",
    description:
      "Live demos of Lake Cumberland business websites built by the Monticello KY website designer. Food trucks, restaurants, marinas, shops & more. Flat pricing. You own everything.",
    url: canonicalUrl("/work"),
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

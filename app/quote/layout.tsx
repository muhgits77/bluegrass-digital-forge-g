import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Quote | Bluegrass Digital Forge",
  description:
    "Request a flat-price website quote from the Monticello KY website designer for Lake Cumberland and South Carolina Lowcountry businesses. Honest pricing, real responses.",
  alternates: { canonical: canonicalUrl("/quote") },
  openGraph: {
    title: "Get a Quote | Bluegrass Digital Forge",
    url: canonicalUrl("/quote"),
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

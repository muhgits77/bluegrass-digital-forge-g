import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Get a Quote | Monticello KY Website Designer | Lake Cumberland & Lowcountry",
  description:
    "Request a flat-price website quote from the Monticello KY website designer for Lake Cumberland and South Carolina Lowcountry businesses. Honest pricing, real responses.",
  alternates: { canonical: canonicalUrl("/quote") },
  openGraph: { url: canonicalUrl("/quote") },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

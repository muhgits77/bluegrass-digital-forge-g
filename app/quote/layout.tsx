import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Get a Website Quote – Monticello KY & Lake Cumberland",
  description:
    "Request a flat-price website quote for your Monticello, Somerset or Lake Cumberland business. Clear price up front, no monthly lock-in.",
  alternates: { canonical: canonicalUrl("/quote") },
  openGraph: {
    title: "Get a Website Quote – Monticello KY & Lake Cumberland",
    url: canonicalUrl("/quote"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

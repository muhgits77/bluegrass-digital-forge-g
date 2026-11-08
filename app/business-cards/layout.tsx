import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Business Cards & Branding – Monticello KY",
  description:
    "Custom business cards and branding for Lake Cumberland businesses, designed in Monticello KY to match your website.",
  alternates: { canonical: canonicalUrl("/business-cards") },
  openGraph: { url: canonicalUrl("/business-cards"), images: [{ url: "/og-default.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
};

export default function BusinessCardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

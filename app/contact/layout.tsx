import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | Bluegrass Digital Forge",
  description:
    "Contact Brian at Bluegrass Digital Forge in Monticello, KY for Lake Cumberland business websites, food truck sites, and Lowcountry web design. Flat pricing. Real replies.",
  alternates: { canonical: canonicalUrl("/contact") },
  openGraph: {
    title: "Contact | Bluegrass Digital Forge",
    url: canonicalUrl("/contact"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

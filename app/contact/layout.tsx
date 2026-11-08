import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact a Monticello KY Web Designer | Bluegrass Digital Forge",
  description:
    "Contact Brian in Monticello, KY about a website for your Lake Cumberland business. Custom work is also available anywhere by email.",
  alternates: { canonical: canonicalUrl("/contact") },
  openGraph: {
    title: "Contact a Monticello KY Web Designer | Bluegrass Digital Forge",
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

import type { Metadata } from "next";
import LocalLandingPage from "@/components/LocalLandingPage";
import { canonicalUrl } from "@/lib/constants";
import { content } from "./content";

const title = "Somerset KY Web Design – Pulaski County & Lake Cumberland";
const description =
  "Websites for Somerset and Pulaski County businesses by a Monticello KY web designer. Flat pricing from $1,200, mobile-first, and you own the code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/web-design-somerset-ky") },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/web-design-somerset-ky"),
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <LocalLandingPage {...content} />;
}

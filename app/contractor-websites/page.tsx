import type { Metadata } from "next";
import LocalLandingPage from "@/components/LocalLandingPage";
import { canonicalUrl } from "@/lib/constants";
import { content } from "./content";

const title = "Contractor Websites – Lake Cumberland Area, Kentucky";
const description =
  "Websites for plumbers, roofers, HVAC, builders and trades in Wayne, Pulaski, Russell and McCreary counties. Tap-to-call, quote forms, flat pricing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/contractor-websites") },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/contractor-websites"),
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

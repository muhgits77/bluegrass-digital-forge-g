import type { Metadata } from "next";
import LocalLandingPage from "@/components/LocalLandingPage";
import { canonicalUrl } from "@/lib/constants";
import { content } from "./content";

const title = "Russell Springs KY Web Design – Russell County & Lake Cumberland";
const description =
  "Websites for Russell Springs, Jamestown and Russell County businesses near Lake Cumberland. Flat pricing from $1,200. You own the code.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/web-design-russell-springs-ky") },
  openGraph: {
    title,
    description,
    url: canonicalUrl("/web-design-russell-springs-ky"),
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

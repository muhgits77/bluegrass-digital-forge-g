import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title:
    "Lake Cumberland Business Websites Demos | Monticello KY Website Designer | Bluegrass Digital Forge",
  description:
    "See real demos of Lake Cumberland business websites, food truck website Kentucky, and restaurant website Monticello KY built by the Monticello KY website designer. Wayne County web design examples.",
  alternates: { canonical: canonicalUrl("/work") },
  openGraph: { url: canonicalUrl("/work") },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

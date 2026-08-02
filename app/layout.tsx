import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_URL,
  canonicalUrl,
} from "@/lib/constants";
import { Analytics } from "@vercel/analytics/next";

/**
 * Font strategy (LCP / render-blocking):
 * - next/font self-hosts (NO fonts.googleapis.com preconnect — fixes PSI warning)
 * - display: "swap" avoids FOIT
 * - Preload only body font; display + mono load with swap (less render-blocking)
 * - Fewer weights = smaller mobile payload
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  // Preload display for hero h1 (LCP text) without Google network
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Monticello KY Website Designer | Lake Cumberland Business Websites | Bluegrass Digital Forge",
  description:
    "Handcrafted websites for Lake Cumberland businesses by a Monticello KY designer. Flat pricing from $1,200. You own the code. Food trucks, restaurants, marinas & shops. Serving Wayne County + Charleston SC Lowcountry.",
  keywords: [
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "Wayne County web design",
    "food truck website Kentucky",
    "restaurant website Monticello KY",
    "Web Design Charleston SC",
    "Charleston Food Truck Website",
    "Summerville Small Business Website",
    "North Charleston Restaurant Website",
    "Lowcountry Web Design",
  ],
  authors: [{ name: "Brian", url: SITE_URL }],
  openGraph: {
    title:
      "Monticello KY Website Designer | Lake Cumberland Business Websites | Bluegrass Digital Forge",
    description:
      "Handcrafted websites for Lake Cumberland businesses by a Monticello KY designer. Flat pricing from $1,200. You own the code. Food trucks, restaurants, marinas & shops. Serving Wayne County + Charleston SC Lowcountry.",
    url: canonicalUrl("/"),
    images: [
      {
        url: "/hero-lake-cumberland-golden.jpg",
        width: 1280,
        height: 720,
        alt: "Golden hour on Lake Cumberland near Monticello, Kentucky — calm water, rolling forested hills",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Bluegrass Digital Forge",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Monticello KY Website Designer | Lake Cumberland Business Websites | Bluegrass Digital Forge",
    description:
      "Handcrafted websites for Lake Cumberland businesses by a Monticello KY designer. Flat pricing from $1,200. You own the code.",
    images: ["/hero-lake-cumberland-golden.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  // Homepage default; every other public page sets its own self-referencing .com canonical.
  alternates: {
    canonical: canonicalUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020403",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/*
          No fonts.googleapis.com / gstatic preconnect (next/font is self-hosted).
          No raw hero.jpg preload (would bypass AVIF/WebP + sized srcset).
          Hero LCP: <Image priority fetchPriority="high"> on app/page.tsx only.
        */}
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] scroll-smooth selection:bg-[rgba(212,140,74,0.35)] selection:text-white">
        {/* Aggressive LocalBusiness + Organization + WebSite schema for Monticello KY website designer + Lake Cumberland SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#business`,
              name: "Bluegrass Digital Forge",
              description:
                "Monticello KY website designer building authentic Lake Cumberland business websites, food truck websites Kentucky, restaurant website Monticello KY, and Wayne County web design. Flat pricing, full code ownership, local builder serving the lake region.",
              url: SITE_URL,
              email: CONTACT_EMAIL,
              ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
              logo: `${SITE_URL}/logo.jpg`,
              image: `${SITE_URL}/hero-lake-cumberland-golden.jpg`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Monticello, KY 42633",
                addressLocality: "Monticello",
                addressRegion: "KY",
                postalCode: "42633",
                addressCountry: "US",
              },
              areaServed: [
                { "@type": "City", name: "Monticello" },
                { "@type": "City", name: "Albany" },
                { "@type": "City", name: "Jamestown" },
                { "@type": "City", name: "Burnside" },
                { "@type": "City", name: "Somerset" },
                { "@type": "City", name: "Russell Springs" },
                { "@type": "City", name: "Nancy" },
                { "@type": "City", name: "Ferguson" },
                { "@type": "City", name: "Creelsboro" },
                { "@type": "AdministrativeArea", name: "Wayne County" },
                { "@type": "AdministrativeArea", name: "Russell County" },
                { "@type": "AdministrativeArea", name: "Pulaski County" },
                { "@type": "Place", name: "Lake Cumberland" },
                { "@type": "City", name: "Charleston" },
                { "@type": "City", name: "Summerville" },
                { "@type": "City", name: "Walterboro" },
                { "@type": "City", name: "Ladson" },
                { "@type": "City", name: "North Charleston" },
                { "@type": "Place", name: "South Carolina Lowcountry" },
              ],
              serviceArea:
                "All Lake Cumberland boat ramp towns including Monticello, Jamestown, Burnside, Nancy, Creelsboro, Russell Springs, Somerset, Albany, Ferguson, and surrounding Wayne, Russell & Pulaski Counties, Kentucky plus Charleston SC, Summerville, Walterboro, Ladson, North Charleston and the South Carolina Lowcountry",
              priceRange: "$1,200 - $2,500",
              founder: { "@type": "Person", name: "Brian" },
              knowsAbout: [
                "Website Design",
                "Food Truck Websites",
                "Restaurant Website Monticello KY",
                "Local SEO",
                "Branding for Kentucky Businesses",
                "Charleston SC Web Design",
                "Lowcountry Web Design",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Website & Branding Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Starter Sites — Monticello KY Website Designer",
                      description:
                        "Flat $1,200 websites for food trucks and small Lake Cumberland businesses near Conley Bottom and Beaver Creek",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Business Suites for Lake Cumberland Businesses",
                      description:
                        "Premium custom Wayne County web design from $2,500 for marinas, guides, restaurants",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Food Truck Website Kentucky",
                      description:
                        "Specialized fast sites with schedule, menu, and local SEO for Lake Cumberland food trucks",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Restaurant Website Monticello KY",
                      description:
                        "Custom restaurant websites for Lake Cumberland",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Marina & Fishing Guide Websites",
                      description:
                        "Websites for boat ramps, marinas and guides serving Jamestown, Burnside, Nancy, Creelsboro and Lake Cumberland",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Local SEO for Lake Cumberland Towns",
                      description:
                        "Authentic local optimization for businesses in Monticello, Russell Springs, Somerset, Albany, Ferguson and all boat ramp communities",
                    },
                  },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Bluegrass Digital Forge",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.jpg`,
              description:
                "Monticello KY website designer for Lake Cumberland business websites and Wayne County web design.",
              email: CONTACT_EMAIL,
              ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
              address: {
                "@type": "PostalAddress",
                addressLocality: "Monticello",
                addressRegion: "KY",
                postalCode: "42633",
                addressCountry: "US",
              },
              areaServed:
                "Wayne County, KY and Lake Cumberland region; also serving Charleston, Summerville, Walterboro, Ladson, North Charleston and the South Carolina Lowcountry",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bluegrass Digital Forge — Monticello KY & Charleston SC Website Designer",
              url: SITE_URL,
              description:
                "Local website design and Lake Cumberland business websites built in Monticello, Kentucky, now also serving Charleston SC and the South Carolina Lowcountry with handcrafted sites for restaurants, food trucks and small businesses.",
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/work?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

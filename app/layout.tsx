import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  CONTACT_EMAIL,
  GA_MEASUREMENT_ID,
  SITE_URL,
  canonicalUrl,
} from "@/lib/constants";

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
    "Monticello KY Web Design | Lake Cumberland Business Websites",
  description:
    "Custom websites for Lake Cumberland businesses in Monticello, Somerset, Russell Springs, Jamestown & Burnside. Flat pricing from $1,200. You own the code.",
  keywords: [
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "Wayne County web design",
    "food truck website Kentucky",
    "restaurant website Monticello KY",
    "Somerset KY web design",
    "Russell Springs KY web design",
    "McCreary County web design",
  ],
  authors: [{ name: "Brian", url: SITE_URL }],
  openGraph: {
    title:
      "Monticello KY Web Design | Lake Cumberland Business Websites",
    description:
      "Custom websites for Lake Cumberland businesses in Monticello, Somerset, Russell Springs, Jamestown & Burnside. Flat pricing from $1,200. You own the code.",
    url: canonicalUrl("/"),
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Bluegrass Digital Forge — Kentucky web design for small businesses and tourist businesses",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "Bluegrass Digital Forge",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Monticello KY Web Design | Lake Cumberland Business Websites",
    description:
      "Custom websites for Lake Cumberland businesses in Monticello, Somerset, Russell Springs, Jamestown & Burnside. Flat pricing from $1,200. You own the code.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
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
          Hero LCP: loading="eager" + fetchPriority="high" on app/page.tsx only
          (avoid deprecated priority/preload, which can warn as unused).
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
              logo: `${SITE_URL}/logo.jpg`,
              image: `${SITE_URL}/hero-lake-cumberland-golden.jpg`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Monticello",
                addressRegion: "KY",
                postalCode: "42633",
                addressCountry: "US",
              },
              sameAs: ["https://share.google/JKjYBoMEpHxleaFfL"],
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
                { "@type": "City", name: "Whitley City" },
                { "@type": "City", name: "Pine Knot" },
                { "@type": "City", name: "Stearns" },
                { "@type": "AdministrativeArea", name: "Wayne County" },
                { "@type": "AdministrativeArea", name: "Russell County" },
                { "@type": "AdministrativeArea", name: "Pulaski County" },
                { "@type": "AdministrativeArea", name: "McCreary County" },
                { "@type": "Place", name: "Lake Cumberland" },
              ],
              serviceArea:
                "All Lake Cumberland boat ramp towns including Monticello, Jamestown, Burnside, Nancy, Creelsboro, Russell Springs, Somerset, Albany, Ferguson, Whitley City, and surrounding Wayne, Pulaski, Russell & McCreary Counties, Kentucky",
              priceRange: "$1,200 - $2,500",
              founder: { "@type": "Person", name: "Brian" },
              knowsAbout: [
                "Website Design",
                "Food Truck Websites",
                "Restaurant Website Monticello KY",
                "Local SEO",
                "Branding for Kentucky Businesses",
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
              address: {
                "@type": "PostalAddress",
                addressLocality: "Monticello",
                addressRegion: "KY",
                postalCode: "42633",
                addressCountry: "US",
              },
              sameAs: ["https://share.google/JKjYBoMEpHxleaFfL"],
              areaServed:
                "Lake Cumberland region of Kentucky: Wayne, Pulaski, Russell and McCreary Counties",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bluegrass Digital Forge — Monticello KY Website Designer",
              url: SITE_URL,
              description:
                "Local website design and Lake Cumberland business websites built in Monticello, Kentucky, for restaurants, food trucks, marinas, contractors and small businesses across the Lake Cumberland region.",
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
      {/* GA4 via @next/third-parties — loads after hydration; SPA pageviews auto-tracked */}
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}

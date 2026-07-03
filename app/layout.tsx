import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bluegrassdigitalforge.com"),
  title: "Monticello KY Website Designer | Lake Cumberland Business Websites | Bluegrass Digital Forge",
  description: "Handcrafted websites for Lake Cumberland businesses by a local designer in Monticello, KY. Flat pricing. You own the code. Food trucks, restaurants, marinas, and shops.",
  keywords: [
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "Wayne County web design",
    "food truck website Kentucky",
    "restaurant website Monticello KY",
  ],
  authors: [{ name: "Brian", url: "https://bluegrassdigitalforge.com" }],
  openGraph: {
    title: "Monticello KY Website Designer | Lake Cumberland Business Websites",
    description: "Handcrafted websites for Lake Cumberland businesses by a local designer in Monticello, KY. Flat pricing. You own the code.",
    images: [{ url: "/hero-lake-cumberland-golden.jpg", alt: "Golden hour on Lake Cumberland near Monticello, Kentucky — calm water, rolling forested hills" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monticello KY Website Designer | Lake Cumberland Business Websites",
    description: "Handcrafted websites for Lake Cumberland businesses. Local in Monticello, KY. Flat pricing and full ownership.",
    images: ["/hero-lake-cumberland-golden.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://bluegrassdigitalforge.com",
  },
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://bluegrassdigitalforge.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Preload critical hero + logo for fast LCP (Critical Image) */}
        <link rel="preload" href="/hero-lake-cumberland-golden.jpg" as="image" />
        <link rel="preload" href="/logo.jpg" as="image" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050708] text-zinc-200 scroll-smooth">
        {/* Aggressive LocalBusiness + Organization + WebSite schema for Monticello KY website designer + Lake Cumberland SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://bluegrassdigitalforge.com/#business",
            "name": "Bluegrass Digital Forge",
            "description": "Monticello KY website designer building authentic Lake Cumberland business websites, food truck websites Kentucky, restaurant website Monticello KY, and Wayne County web design. Flat pricing, full code ownership, local builder serving the lake region.",
            "url": "https://bluegrassdigitalforge.com",
            "email": "BluegrassDigitalForge@protonmail.com",
            "logo": "https://bluegrassdigitalforge.com/logo.jpg",
            "image": "https://bluegrassdigitalforge.com/hero-lake-cumberland-golden.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Monticello, KY 42633",
              "addressLocality": "Monticello",
              "addressRegion": "KY",
              "postalCode": "42633",
              "addressCountry": "US"
            },
            "areaServed": [
              { "@type": "City", "name": "Monticello" },
              { "@type": "City", "name": "Albany" },
              { "@type": "City", "name": "Jamestown" },
              { "@type": "City", "name": "Burnside" },
              { "@type": "City", "name": "Somerset" },
              { "@type": "City", "name": "Russell Springs" },
              { "@type": "City", "name": "Nancy" },
              { "@type": "City", "name": "Ferguson" },
              { "@type": "City", "name": "Creelsboro" },
              { "@type": "AdministrativeArea", "name": "Wayne County" },
              { "@type": "AdministrativeArea", "name": "Russell County" },
              { "@type": "AdministrativeArea", "name": "Pulaski County" },
              { "@type": "Place", "name": "Lake Cumberland" }
            ],
            "serviceArea": "All Lake Cumberland boat ramp towns including Monticello, Jamestown, Burnside, Nancy, Creelsboro, Russell Springs, Somerset, Albany, Ferguson, and surrounding Wayne, Russell & Pulaski Counties, Kentucky",
            "priceRange": "$1,200 - $2,500",
            "founder": { "@type": "Person", "name": "Brian" },
            "knowsAbout": ["Website Design", "Food Truck Websites", "Restaurant Website Monticello KY", "Local SEO", "Branding for Kentucky Businesses"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Website & Branding Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Starter Sites — Monticello KY Website Designer", "description": "Flat $1,200 websites for food trucks and small Lake Cumberland businesses near Conley Bottom and Beaver Creek" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Suites for Lake Cumberland Businesses", "description": "Premium custom Wayne County web design from $2,500 for marinas, guides, restaurants" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Food Truck Website Kentucky", "description": "Specialized fast sites with schedule, menu, and local SEO for Lake Cumberland food trucks" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Restaurant Website Monticello KY", "description": "Custom restaurant websites for Lake Cumberland" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marina & Fishing Guide Websites", "description": "Websites for boat ramps, marinas and guides serving Jamestown, Burnside, Nancy, Creelsboro and Lake Cumberland" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO for Lake Cumberland Towns", "description": "Authentic local optimization for businesses in Monticello, Russell Springs, Somerset, Albany, Ferguson and all boat ramp communities" } }
              ]
            }
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Bluegrass Digital Forge",
            "url": "https://bluegrassdigitalforge.com",
            "logo": "https://bluegrassdigitalforge.com/logo.jpg",
            "description": "Monticello KY website designer for Lake Cumberland business websites and Wayne County web design.",
            "email": "BluegrassDigitalForge@protonmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Monticello",
              "addressRegion": "KY",
              "postalCode": "42633",
              "addressCountry": "US"
            },
            "areaServed": "Wayne County, KY and Lake Cumberland region"
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Bluegrass Digital Forge — Monticello KY Website Designer",
            "url": "https://bluegrassdigitalforge.com",
            "description": "Local website design and Lake Cumberland business websites built in Monticello, Kentucky.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bluegrassdigitalforge.com/work?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
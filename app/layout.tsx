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
  metadataBase: new URL("https://bluegrass-digital-forge.lovable.app"),
  title: "Monticello KY Website Designer | Lake Cumberland Business Websites | Bluegrass Digital Forge",
  description: "Monticello KY website designer specializing in Lake Cumberland business websites. Custom food truck website Kentucky, restaurant websites, marina sites & Wayne County web design. Flat pricing from $1,200. Local builder in Monticello — you own everything.",
  keywords: [
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "food truck website Kentucky",
    "Wayne County web design",
    "Monticello KY web design",
    "Lake Cumberland web design",
    "Wayne County website designer",
    "food truck websites Kentucky",
    "restaurant website Kentucky",
    "local website designer Monticello",
    "small business websites Kentucky",
    "Lake Cumberland website designer",
    "Monticello KY web designer",
  ],
  authors: [{ name: "Brian", url: "https://bluegrass-digital-forge.lovable.app" }],
  openGraph: {
    title: "Monticello KY Website Designer | Lake Cumberland Business Websites",
    description: "Local Monticello KY website designer building premium Lake Cumberland business websites and food truck websites in Kentucky. Authentic Wayne County web design with flat pricing and full ownership.",
    images: [{ url: "/hero-cumberland-golden.jpg", alt: "Stunning golden hour Lake Cumberland scene with calm water and rolling Kentucky hills near Monticello, KY" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monticello KY Website Designer | Lake Cumberland Business Websites",
    description: "Monticello KY website designer for Lake Cumberland & Wayne County businesses. Food truck websites Kentucky, restaurants, marinas. Flat price, full ownership.",
    images: ["/hero-cumberland-golden.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: "https://bluegrass-digital-forge.lovable.app",
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
        <link rel="canonical" href="https://bluegrass-digital-forge.lovable.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        {/* Preload critical hero + logo for fast LCP */}
        <link rel="preload" href="/hero-cumberland-golden.jpg" as="image" />
        <link rel="preload" href="/logo.jpg" as="image" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050708] text-zinc-200 scroll-smooth">
        {/* Aggressive LocalBusiness + WebSite schema for Monticello KY website designer + Lake Cumberland SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://bluegrass-digital-forge.lovable.app/#business",
            "name": "Bluegrass Digital Forge",
            "description": "Monticello KY website designer building authentic Lake Cumberland business websites, food truck websites Kentucky, and Wayne County web design. Flat pricing, full code ownership, local builder serving the lake region.",
            "url": "https://bluegrass-digital-forge.lovable.app",
            "email": "BluegrassDigitalForge@protonmail.com",
            "logo": "https://bluegrass-digital-forge.lovable.app/logo.jpg",
            "image": "https://bluegrass-digital-forge.lovable.app/hero-cumberland-golden.jpg",
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
              { "@type": "AdministrativeArea", "name": "Wayne County" },
              { "@type": "Place", "name": "Lake Cumberland" },
              { "@type": "City", "name": "Jamestown" },
              { "@type": "City", "name": "Somerset" },
              { "@type": "City", "name": "Albany" },
              { "@type": "City", "name": "Burnside" }
            ],
            "serviceArea": "Lake Cumberland and Wayne County, Kentucky",
            "priceRange": "$1,200 - $2,500",
            "founder": { "@type": "Person", "name": "Brian" },
            "knowsAbout": ["Website Design", "Food Truck Websites", "Restaurant Web Design", "Local SEO", "Branding for Kentucky Businesses"],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Website & Branding Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Starter Sites — Monticello KY Website Designer", "description": "Flat $1,200 websites for food trucks and small Lake Cumberland businesses" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Suites for Lake Cumberland Businesses", "description": "Premium custom Wayne County web design from $2,500" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Food Truck Website Kentucky", "description": "Specialized fast sites with schedule, menu, and local SEO" } }
              ]
            }
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Bluegrass Digital Forge — Monticello KY Website Designer",
            "url": "https://bluegrass-digital-forge.lovable.app",
            "description": "Local website design and Lake Cumberland business websites built in Monticello, Kentucky.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bluegrass-digital-forge.lovable.app/work?q={search_term_string}",
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
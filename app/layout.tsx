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
  preload: false,           // ← Prevents build fetch
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bluegrass-digital-forge.lovable.app"),
  title: "Monticello KY Website Designer | Lake Cumberland Business Websites | Bluegrass Digital Forge",
  description: "Local Monticello KY website designer building fast, authentic websites for Lake Cumberland businesses. Food truck website Kentucky, restaurant sites, small business web design in Wayne County. Flat pricing from $1,200. You own everything.",
  keywords: [
    "Monticello KY website designer",
    "Lake Cumberland business websites",
    "food truck website Kentucky",
    "Monticello KY web design",
    "Wayne County website designer",
    "Lake Cumberland web design",
    "small business websites Kentucky",
    "restaurant website Kentucky",
    "local website designer Monticello",
  ],
  authors: [{ name: "Brian", url: "https://bluegrass-digital-forge.lovable.app" }],
  openGraph: {
    title: "Monticello KY Website Designer | Lake Cumberland Business Websites",
    description: "Handcrafted websites for Lake Cumberland & Wayne County businesses. Authentic local design from a neighbor in Monticello, KY. Flat pricing, fast launch, full ownership.",
    images: [{ url: "/hero-lake-golden.jpg", alt: "Golden hour view of Lake Cumberland shoreline with boats and rolling Kentucky hills near Monticello, KY" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monticello KY Website Designer | Lake Cumberland Business Websites",
    description: "Local web design for Lake Cumberland businesses. Food trucks, restaurants, marinas & shops. Flat price. Real neighbor in Monticello, KY.",
  },
  icons: {
    icon: "/favicon.ico",
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
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-full flex flex-col bg-[#050708] text-zinc-200 scroll-smooth">
        {/* LocalBusiness structured data for aggressive local SEO: Monticello KY website designer + Lake Cumberland */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Bluegrass Digital Forge",
            "description": "Local website designer in Monticello, Kentucky building authentic, fast websites for Lake Cumberland and Wayne County businesses — food truck websites, restaurants, marinas & shops.",
            "url": "https://bluegrass-digital-forge.lovable.app",
            "email": "BluegrassDigitalForge@protonmail.com",
            "address": { "@type": "PostalAddress", "addressLocality": "Monticello", "addressRegion": "KY", "postalCode": "42633", "addressCountry": "US" },
            "areaServed": ["Monticello, KY", "Wayne County, KY", "Lake Cumberland, KY", "Jamestown, KY", "Somerset, KY", "Albany, KY", "Burnside, KY"],
            "serviceType": ["Website Design", "Web Development", "Local SEO", "Branding", "Food Truck Websites", "Restaurant Websites"],
            "image": "https://bluegrass-digital-forge.lovable.app/hero-lake-golden.jpg",
            "priceRange": "$1,200-$2,500",
            "founder": { "@type": "Person", "name": "Brian" }
          }) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
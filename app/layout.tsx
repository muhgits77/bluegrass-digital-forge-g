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
  title: "Bluegrass Digital Forge | Websites Forged for Lake Cumberland",
  description: "Handcrafted websites for Lake Cumberland & Wayne County businesses. Authentic sites from a real neighbor in Monticello, KY. Starter from $1,200. Flat pricing, full ownership, launched fast.",
  keywords: ["Lake Cumberland websites", "Monticello KY web design", "Wayne County web design", "food truck website", "restaurant website Kentucky", "local business website Kentucky"],
  openGraph: {
    title: "Bluegrass Digital Forge — Websites for Lake Cumberland Businesses",
    description: "Forged for the lake. Real results for real local businesses in Monticello, Jamestown, Somerset & Wayne County.",
    images: [{ url: "/hero-lake-golden.jpg" }],  // MAJOR: Authentic golden-hour Lake Cumberland visual (photorealistic marina + rolling hills)
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
      </head>
      <body className="min-h-full flex flex-col bg-[#050708] text-zinc-200 scroll-smooth">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
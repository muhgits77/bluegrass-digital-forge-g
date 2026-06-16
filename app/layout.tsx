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
  title: "Bluegrass Digital Forge | Websites Forged for Lake Cumberland",
  description: "Handcrafted websites for Lake Cumberland businesses. Starter sites from $1,200. Business suites from $2,500. Flat pricing, full ownership, real neighbor service in Monticello, KY.",
  keywords: ["Lake Cumberland websites", "Monticello KY web design", "food truck website", "restaurant website Kentucky", "local business website"],
  openGraph: {
    title: "Bluegrass Digital Forge — Websites for Lake Cumberland Businesses",
    description: "Forged for the lake. Real results for real local businesses.",
    images: [{ url: "/hero-lake-boat.jpg" }],
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
import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Allow Next.js <Image> to optimize demo preview screenshots hosted in
 * Supabase Storage (uploaded via /admin drag-and-drop).
 */
function getRemoteImagePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const storagePublicPath = "/storage/v1/object/public/**";
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    try {
      const { hostname } = new URL(supabaseUrl);
      patterns.push({
        protocol: "https",
        hostname,
        pathname: storagePublicPath,
      });
    } catch {
      // Invalid URL in env — wildcard pattern below still applies at build time.
    }
  }

  patterns.push({
    protocol: "https",
    hostname: "**.supabase.co",
    pathname: storagePublicPath,
  });

  return patterns;
}

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  // Pin Turbopack root to this project (avoids parent package-lock confusion)
  turbopack: {
    root: projectRoot,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Mobile-first — avoid shipping 1920px to phones when not needed
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Must include every quality= used in <Image />
    qualities: [60, 70, 75, 85],
    remotePatterns: getRemoteImagePatterns(),
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|ico|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  experimental: {
    // Critters: inline critical CSS, defer the rest (cuts render-blocking CSS)
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;

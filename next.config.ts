import type { NextConfig } from "next";

/**
 * Allow Next.js <Image> to optimize demo preview screenshots hosted in
 * Supabase Storage (uploaded via /admin drag-and-drop).
 *
 * Paths are restricted to public Storage objects only — not arbitrary
 * Supabase endpoints. Hostname comes from NEXT_PUBLIC_SUPABASE_URL when set,
 * with a wildcard fallback for any *.supabase.co project.
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

  // Covers any Supabase project (e.g. nikppnqnwtwgwzfktzuu.supabase.co) when env is unset
  // or during local builds without .env.local. Pathname keeps this scoped to Storage only.
  patterns.push({
    protocol: "https",
    hostname: "**.supabase.co",
    pathname: storagePublicPath,
  });

  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for public static
    remotePatterns: getRemoteImagePatterns(),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
      {
        // Long cache for images and static assets (speed + SEO)
        source: "/:all*(svg|jpg|png|ico|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  // Optimize package imports for smaller bundles
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
"use client";

import DemoCard from "@/components/DemoCard";
import { useLivePublicDemos } from "@/lib/useLivePublicDemos";

/**
 * Client island for live demo cards only.
 * Keeps the homepage shell as a Server Component so the hero (LCP)
 * can render without waiting on Framer Motion or demo-sync client JS.
 */
export default function FeaturedDemos({ limit = 4 }: { limit?: number }) {
  const demos = useLivePublicDemos(limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {demos.map((d) => (
        <DemoCard key={d.href} {...d} />
      ))}
    </div>
  );
}

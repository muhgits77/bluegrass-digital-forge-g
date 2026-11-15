"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mobile-only floating "Get a free quote" pill (copper, Lovable style).
 * Hides while the footer is on screen so it never covers the credit or legal links,
 * and hides via CSS while the mobile menu is open (html[data-menu-open]).
 */
export default function FloatingQuote() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      href="/quote"
      aria-label="Get a free quote"
      className={`floating-quote bg-copper fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_40px_-8px_oklch(0.74_0.12_60/0.6)] transition-opacity md:hidden ${
        footerVisible ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      Get a free quote →
    </Link>
  );
}

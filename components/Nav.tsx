"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "My Work" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/templates", label: "Templates" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Header mirrored from the Lovable polish: logo + wordmark, text links at xl, copper quote pill, hamburger below xl. */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 xl:flex xl:justify-between">
        <Link href="/" className="flex min-w-0 items-center gap-3 leading-tight" aria-label="Bluegrass Digital Forge home">
          <Image
            src="/logo.jpg"
            alt="Bluegrass Digital Forge — Monticello KY website designer for Lake Cumberland business websites"
            width={44}
            height={44}
            loading="eager"
            className="h-11 w-11 shrink-0 rounded-md object-contain"
          />
          <span className="min-w-0">
            <span className="block font-display text-base font-bold sm:text-lg">Bluegrass Digital Forge</span>
            <span className="block text-xs text-primary">Forged for the Lake • Monticello, KY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-muted-foreground xl:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={isActive(link.href) ? "border-b-2 border-primary pb-1 text-foreground" : "hover:text-foreground"}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/quote" className="bg-copper hidden shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground xl:block">
          Get a free quote →
        </Link>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`max-h-[calc(100dvh-77px)] overflow-y-auto overscroll-contain border-t border-border bg-background xl:hidden ${open ? "block" : "hidden"}`}
      >
        <nav aria-label="Phone navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pb-24 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-3 ${isActive(link.href) ? "bg-accent text-primary" : "text-foreground hover:bg-accent"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="bg-copper mt-4 rounded-full px-5 py-3 text-center font-semibold text-primary-foreground"
          >
            Get a free quote →
          </Link>
        </nav>
      </div>
    </header>
  );
}

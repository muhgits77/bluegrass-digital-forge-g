"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

function IconMenu() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M4 5h16M4 12h16M4 19h16" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "My Work" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/work" && (pathname === "/work" || pathname.startsWith("/work/"))) return true;
    if (href === "/services" && (pathname === "/services" || pathname.startsWith("/services/"))) return true;
    return pathname === href;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/92 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg)]/88 shadow-[0_1px_0_0_rgba(201,122,58,0.06)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 py-3.5 md:py-4 min-h-[68px] md:min-h-[72px]">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link font-medium tracking-[-0.2px] text-sm transition-colors hover:text-white ${isActive(link.href) ? "active text-white" : "text-[var(--text-muted)]"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/quote"
            className="btn btn-primary px-6 py-2.5 text-[14.5px] font-semibold shadow-lg hover:shadow-xl active:scale-[0.985] transition-all"
          >
            Get a Quote →
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-strong)] text-[var(--text-muted)] hover:text-white hover:border-[var(--warm)]/40 transition-all active:scale-[0.97]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden border-t border-[var(--border)] bg-[var(--bg)] ${open ? "block" : "hidden"}`} id="mobile-menu">
        <div className="flex flex-col px-5 py-5 gap-0.5 text-[15.5px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-3.5 px-3 nav-link rounded-2xl transition-colors ${isActive(link.href) ? "bg-[var(--bg-elev)] text-white font-medium border border-[var(--border)]" : "hover:bg-[var(--bg-elev)] text-[var(--text-muted)]"}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 mt-3 border-t border-[var(--border)] flex flex-col gap-3 px-1">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full py-[15px] text-center text-[15.5px] font-semibold active:scale-[0.985]"
            >
              Get a Free Quote →
            </Link>
            <Link
              href="/business-cards"
              onClick={() => setOpen(false)}
              className="btn btn-secondary w-full py-3 text-center"
            >
              Business Cards &amp; Branding
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
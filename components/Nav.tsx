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
  { href: "/templates", label: "Templates" },
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
    <nav className="site-nav">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 py-3.5 md:py-4 min-h-[68px] md:min-h-[74px]">
        <Logo />

        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-[13.5px] tracking-[-0.01em] ${
                isActive(link.href) ? "active text-[var(--cream)]" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/quote"
            className="btn btn-primary px-6 py-2.5 text-[14px] shadow-lg active:scale-[0.985]"
          >
            Get a free quote
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--border-strong)] text-[var(--text-muted)] hover:text-white hover:border-[var(--copper)]/50 transition-all active:scale-[0.97]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div
        className={`md:hidden border-t border-[var(--border)] bg-[var(--bg)] ${
          open ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <div className="flex flex-col px-5 py-5 gap-0.5 text-[15.5px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-3.5 px-3 rounded-2xl transition-colors ${
                isActive(link.href)
                  ? "bg-[var(--bg-elev)] text-[var(--cream)] font-medium border border-[var(--border-copper)]"
                  : "hover:bg-[var(--bg-elev)] text-[var(--text-muted)]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 mt-3 border-t border-[var(--border)] flex flex-col gap-3 px-1">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full py-[15px] text-center text-[15.5px]"
            >
              Get a free quote
              <span aria-hidden="true"> →</span>
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

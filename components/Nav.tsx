"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "My Work" },
  { href: "/services", label: "Services & Pricing" },
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
    <nav className="sticky top-0 z-50 border-b border-[#1a2225] bg-[#050708]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#050708]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 py-4 md:py-5 min-h-[72px]">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link font-medium tracking-[-0.2px] text-sm transition-colors hover:text-white ${isActive(link.href) ? "text-white" : "text-zinc-400"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA — prominent premium conversion (MAJOR polish) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/quote"
            className="btn btn-primary px-6 py-2.5 text-[14.5px] font-semibold shadow-lg hover:shadow-xl active:scale-[0.985] transition-all"
          >
            Get a Quote →
          </Link>
        </div>

        {/* Mobile Hamburger — larger tap target, accessible */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#243530] text-zinc-300 hover:text-white hover:border-[#33423c] transition-all active:scale-[0.97]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile Menu — smoother, better touch, stronger CTA flow */}
      <div className={`md:hidden border-t border-[#1a2225] bg-[#050708] ${open ? "block" : "hidden"}`} id="mobile-menu">
        <div className="flex flex-col px-5 py-5 gap-0.5 text-[15.5px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-3.5 px-3 nav-link rounded-2xl transition-colors ${isActive(link.href) ? "bg-[#1a2225] text-white font-medium" : "hover:bg-[#0f1517] text-zinc-400"}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 mt-3 border-t border-[#1a2225] flex flex-col gap-3 px-1">
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
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
    <nav className="sticky top-0 z-50 border-b border-[#1a2225] bg-[#050708]/95 backdrop-blur supports-[backdrop-filter]:bg-[#050708]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 py-3 min-h-[68px] md:min-h-[72px] md:py-3.5">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link font-medium tracking-[-0.1px] ${isActive(link.href) ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/quote"
            className="btn btn-primary px-5 py-[9.5px] text-[14px]"
          >
            Get a Quote →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1a2225] text-zinc-300 hover:text-white hover:border-[#33423c] transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden border-t border-[#1a2225] bg-[#050708] ${open ? "block" : "hidden"}`}>
        <div className="flex flex-col px-5 py-4 gap-0.5 text-[15px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-3 nav-link ${isActive(link.href) ? "active font-medium" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/business-cards"
            onClick={() => setOpen(false)}
            className="py-2.5 nav-link"
          >
            Business Cards
          </Link>
          <div className="pt-2.5 flex flex-col gap-2">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="btn btn-primary w-full justify-center py-2.5 text-[14px]"
            >
              Get a Quote →
            </Link>
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="btn btn-secondary w-full justify-center py-2.5"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

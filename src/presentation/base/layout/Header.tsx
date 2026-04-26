"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/presentation/lib/utils";

const NAV_LINKS = [
  { label: "Search", href: "#search" },
  { label: "Stories", href: "#scenarios" },
  { label: "Photographers", href: "#photogs" },
  { label: "Journal", href: "#" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100]",
        "flex items-center justify-between px-10",
        "transition-all duration-300",
        scrolled
          ? "py-[14px] bg-[rgba(245,242,236,0.72)] backdrop-blur-[14px] border-b border-line-soft"
          : "py-[22px] mix-blend-multiply"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-[10px] font-serif text-[22px] tracking-[-0.01em] text-ink"
      >
        <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
        Captura
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[13.5px] text-ink transition-opacity hover:opacity-[0.55]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Sign in CTA */}
      <Link
        href="/login"
        className="text-[13.5px] leading-none px-[18px] py-3 rounded-full bg-ink text-bg-soft transition-[transform,background] duration-300 hover:-translate-y-px hover:bg-black"
      >
        Sign in
      </Link>
    </header>
  );
}

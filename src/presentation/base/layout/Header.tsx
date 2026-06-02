"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/presentation/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explorer", href: "/explorer" },
  { label: "Photographers", href: "/photographers" },
  { label: "Heatmap", href: "/hotspot" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

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
      <nav className="hidden md:flex items-center gap-8.5" aria-label="Main navigation">
        {NAV_LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "relative text-[13.5px] text-ink transition-opacity whitespace-nowrap",
                active ? "opacity-100" : "opacity-65 hover:opacity-100"
              )}
            >
              {link.label}
              {active && (
                <span className="absolute left-0 right-0 -bottom-5.5 h-px bg-ink" aria-hidden="true" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign in CTA */}
      <Link
        href="/login"
        className="text-[13px] leading-none px-4 py-2.5 rounded-full bg-ink text-bg-soft transition-[transform,background] duration-300 hover:-translate-y-px hover:bg-black whitespace-nowrap"
      >
        Sign in
      </Link>
    </header>
  );
}

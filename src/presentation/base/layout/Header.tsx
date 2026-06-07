"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AUTH_SESSION_EVENT,
  createAuthRepository,
  createHttpClient,
  createSessionStore,
  type AuthUser,
} from "@/infrastructure";
import { cn } from "@/presentation/lib/utils";
import { apiConfig } from "@/shared";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explorer", href: "/explorer" },
  { label: "Photographers", href: "/photographers" },
  { label: "Heatmap", href: "/hotspot" },
] as const;

const FRIENDLY_NAMES = [
  "Kind User",
  "Awesome User",
  "Bright User",
  "Lovely User",
  "Quiet Explorer",
] as const;

function pickFriendlyName(seed?: string | null): string {
  if (!seed) return FRIENDLY_NAMES[0];

  const index = [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % FRIENDLY_NAMES.length;
  return FRIENDLY_NAMES[index] ?? FRIENDLY_NAMES[0];
}

function getDisplayName(user: AuthUser | null): string {
  const preferredName = user?.name?.trim() || user?.username?.trim();

  if (preferredName) return preferredName;

  const emailName = user?.email?.split("@")[0]?.replace(/[._-]+/g, " ").trim();
  if (emailName) return emailName;

  return pickFriendlyName(user?.id ?? user?.phoneNumber);
}

function getInitial(displayName: string): string {
  return displayName.trim().charAt(0).toUpperCase() || "C";
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const pathname = usePathname();
  const authRepository = useMemo(() => {
    const session = createSessionStore();
    const http = createHttpClient(apiConfig.baseUrl, session);
    return createAuthRepository(http, session);
  }, []);
  const displayName = getDisplayName(user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const refreshAuthState = useCallback(async () => {
    if (!authRepository.isAuthenticated()) {
      setUser(null);
      setIsAuthReady(true);
      return;
    }

    try {
      const profile = await authRepository.getProfile();
      setUser(profile);
    } catch {
      setUser(null);
    } finally {
      setIsAuthReady(true);
    }
  }, [authRepository]);

  useEffect(() => {
    queueMicrotask(() => {
      void refreshAuthState();
    });

    window.addEventListener(AUTH_SESSION_EVENT, refreshAuthState);
    return () => window.removeEventListener(AUTH_SESSION_EVENT, refreshAuthState);
  }, [refreshAuthState]);

  async function handleLogout() {
    await authRepository.logout();
    setUser(null);
  }

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

      {isAuthReady && user ? (
        <div className="group relative">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-line bg-bg-soft/80 py-1.5 pl-1.5 pr-3 text-ink shadow-[0_12px_30px_-24px_rgba(20,19,17,0.45)] transition-[transform,border-color,background] duration-300 hover:-translate-y-px hover:border-ink-soft hover:bg-bg-soft"
            aria-label={`Signed in as ${displayName}`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-[11px] uppercase text-bg-soft">
              {getInitial(displayName)}
            </span>
            <span className="hidden max-w-34 truncate text-[13px] leading-none sm:inline">
              {displayName}
            </span>
          </button>
          <div className="pointer-events-none absolute right-0 top-full pt-2 opacity-0 transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <div className="min-w-48 rounded-xl border border-line bg-bg-soft p-2 shadow-[0_24px_60px_-28px_rgba(20,19,17,0.5)]">
              <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
                Signed in
              </p>
              <Link
                href="/account/profile"
                className="block rounded-lg px-3 py-2 text-[13px] text-ink-soft transition-colors hover:bg-bg hover:text-ink"
              >
                Account profile
              </Link>
              <Link
                href="/account/library"
                className="block rounded-lg px-3 py-2 text-[13px] text-ink-soft transition-colors hover:bg-bg hover:text-ink"
              >
                Purchase library
              </Link>
              <Link
                href="/explorer"
                className="block rounded-lg px-3 py-2 text-[13px] text-ink-soft transition-colors hover:bg-bg hover:text-ink"
              >
                Open explorer
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="block w-full rounded-lg px-3 py-2 text-left text-[13px] text-ink-soft transition-colors hover:bg-bg hover:text-ink"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className={cn(
            "text-[13px] leading-none px-4 py-2.5 rounded-full bg-ink text-bg-soft transition-[transform,background,opacity] duration-300 hover:-translate-y-px hover:bg-black whitespace-nowrap",
            !isAuthReady && "opacity-0"
          )}
        >
          Sign in
        </Link>
      )}
    </header>
  );
}

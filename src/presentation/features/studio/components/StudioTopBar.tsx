"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { PhotographerBalance } from "@/domains/studio";

const NAV_ITEMS = ["Upload", "Earnings", "Portfolio", "Settings"] as const;

interface Props {
  balance: PhotographerBalance;
  avatarUrl: string;
}

export default function StudioTopBar({ balance, avatarUrl }: Props) {
  const [activeNav, setActiveNav] = useState<string>("Upload");

  return (
    <div className="sticky top-0 z-50 bg-bg-soft border-b border-line px-7 py-3.5 flex items-center gap-6">
      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-2.5 font-serif text-[19px] tracking-[-0.01em]"
      >
        <span className="w-1.75 h-1.75 rounded-full bg-accent shrink-0" />
        Captura
        <span className="font-mono text-[9.5px] tracking-widest uppercase text-ink-soft border border-line rounded px-1.75 py-0.75 ml-1">
          Studio
        </span>
      </Link>

      {/* Back to dashboard */}
      <Link
        href="/dashboard/photographer/uploads"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-line text-[12px] text-ink-soft transition-colors duration-200 hover:bg-bg hover:text-ink"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
          <path
            d="M9.5 3 5 8l4.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Uploads
      </Link>

      {/* Nav */}
      <nav className="flex gap-1 ml-3.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            onClick={() => setActiveNav(item)}
            className={`px-3.5 py-2 rounded-lg text-[13px] transition-colors duration-200 ${
              activeNav === item
                ? "bg-ink text-bg-soft"
                : "text-ink-soft hover:bg-bg hover:text-ink"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Balance + avatar */}
      <div className="ml-auto flex items-center gap-3.5">
        <div className="flex flex-col items-end leading-none">
          <span className="font-serif text-[18px] tracking-[-0.01em] whitespace-nowrap">
            {balance.currency}{" "}
            <em className="italic text-accent">{balance.amount}</em>
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-ink-soft mt-0.75">
            {balance.period} · {balance.salesCount} sales
          </span>
        </div>
        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-line shrink-0">
          <Image src={avatarUrl} alt="Photographer avatar" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

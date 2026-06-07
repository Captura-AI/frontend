"use client";

import { useState, useCallback } from "react";
import { type PriceInfo } from "@/domains/explorer";

interface ExplorerDetailPriceCardProps {
  price: PriceInfo;
}

export function ExplorerDetailPriceCard({ price }: ExplorerDetailPriceCardProps) {
  const [activeLicenseId, setActiveLicenseId] = useState(price.defaultLicenseId);

  const activePrice = price.licenses.find((l) => l.id === activeLicenseId)?.priceUsd ?? price.currentUsd;

  const handleBuy = useCallback(() => {
    // TODO: integrate with checkout / Stripe
    console.info("[PriceCard] buy triggered:", activeLicenseId, activePrice);
  }, [activeLicenseId, activePrice]);

  const handleSave = useCallback(() => {
    console.info("[PriceCard] save to board");
  }, []);

  const handleShare = useCallback(() => {
    console.info("[PriceCard] share");
  }, []);

  return (
    <div className="bg-bg-soft border border-line rounded-[14px] p-5.5">
      {/* Price row */}
      <div className="flex justify-between items-baseline mb-3.5">
        <div>
          <div className="font-serif text-[44px] tracking-[-0.02em] leading-none">
            <span className="font-mono text-[14px] tracking-[0.04em] text-ink-soft align-[8px] mr-1.5">USD</span>
            {activePrice}
          </div>
          <span className="block font-mono text-[12px] tracking-[0.04em] text-ink-faint line-through mt-1">
            ${price.wasUsd} &nbsp;·&nbsp; intro pricing
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent text-[#FBFAF6] font-mono text-[10px] tracking-[0.08em] uppercase whitespace-nowrap">
          {price.promoLabel}
        </span>
      </div>

      {/* License options */}
      <div className="flex flex-col gap-2">
        {price.licenses.map((license) => {
          const isActive = activeLicenseId === license.id;
          return (
            <button
              key={license.id}
              onClick={() => setActiveLicenseId(license.id)}
              className={`grid items-center gap-3 p-3.5 border rounded-[10px] text-left transition-[border-color,background] duration-200 ${
                isActive ? "border-ink bg-bg-soft" : "border-line bg-bg hover:border-ink-soft"
              }`}
              style={{ gridTemplateColumns: "22px 1fr auto" }}
            >
              {/* Radio dot */}
              <span className={`w-4.5 h-4.5 rounded-full border-[1.5px] relative transition-[border-color] ${isActive ? "border-ink" : "border-ink-faint"}` }>
                {isActive && <span className="absolute inset-0.75 rounded-full bg-ink" />}
              </span>
              {/* Text */}
              <div>
                <div className="text-[14.5px] font-medium text-ink">{license.title}</div>
                <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft mt-0.75">
                  {license.subtitle}
                </div>
              </div>
              {/* Price */}
              <div className="font-serif text-[22px] tracking-[-0.01em] leading-none text-right">
                <span className="font-mono text-[11px] tracking-[0.04em] text-ink-soft align-[4px] mr-1">USD</span>
                {license.priceUsd}
              </div>
            </button>
          );
        })}
      </div>

      {/* Buy row */}
      <div className="flex gap-2.5 mt-4">
        <button
          onClick={handleBuy}
          className="group flex-1 flex items-center justify-center gap-2.5 bg-ink text-bg-soft rounded-xl text-[14.5px] font-medium transition-[transform,background] duration-200 hover:-translate-y-px hover:bg-black whitespace-nowrap"
          style={{ padding: "16px 22px" }}
        >
          Get this moment
          <svg className="transition-transform duration-250 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={handleSave}
          aria-label="Save to board"
          className="w-13 h-13 border border-line rounded-xl flex items-center justify-center bg-bg-soft text-ink transition-[border-color] hover:border-ink"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 2h10v14l-5-3.5L4 16V2z"/>
          </svg>
        </button>
        <button
          onClick={handleShare}
          aria-label="Share"
          className="w-13 h-13 border border-line rounded-xl flex items-center justify-center bg-bg-soft text-ink transition-[border-color] hover:border-ink"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="4" cy="9" r="2"/><circle cx="14" cy="4" r="2"/><circle cx="14" cy="14" r="2"/>
            <path d="M5.7 8l6.6-3M5.7 10l6.6 3"/>
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-3.5 flex justify-between font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft">
        <span style={{ color: "oklch(0.50 0.08 150)" }}>● Instant download · {price.resolution}</span>
        <span>Secure · Stripe</span>
      </div>
    </div>
  );
}

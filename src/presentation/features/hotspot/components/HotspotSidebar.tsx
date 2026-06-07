"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Hotspot, FeedMoment, ActivePhotographer, RegionStats } from "@/domains/hotspot";

interface Props {
  selectedHotspot: Hotspot;
  feedMoments: FeedMoment[];
  activePhotographers: ActivePhotographer[];
  regionStats: RegionStats;
}

export default function HotspotSidebar({
  selectedHotspot,
  feedMoments,
  activePhotographers,
}: Props) {
  const [notified, setNotified] = useState(false);

  return (
    <aside className="bg-bg-soft border-l border-line flex flex-col overflow-hidden max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:max-h-[55vh] max-[900px]:rounded-[18px_18px_0_0]">
      {/* Mobile sheet handle */}
      <div className="hidden max-[900px]:block w-10 h-1 bg-line rounded-full mx-auto mt-2.5" />

      {/* Header */}
      <div className="px-7 pt-6 pb-5.5 border-b border-line max-[900px]:px-5.5 max-[900px]:pt-1.5 max-[900px]:pb-4.5">
        <span className="font-mono text-[10.5px] tracking-widest uppercase text-ink-soft inline-flex items-center gap-2">
          <span className="w-4 h-px bg-ink-soft" />
          Live feed
          <span className="w-1.75 h-1.75 rounded-full bg-accent ml-1 animate-[livePulse_1.6s_ease-out_infinite]" />
        </span>

        <h1
          className="mt-3.5 font-serif font-normal text-[34px] leading-[1.02] tracking-[-0.02em] max-[900px]:text-[26px]"
          dangerouslySetInnerHTML={{ __html: selectedHotspot.title }}
        />

        <p className="mt-3 text-ink-soft text-[14px] leading-relaxed">
          {selectedHotspot.meta}
        </p>

        <div className="mt-4.5 pt-4.5 border-t border-line-soft grid grid-cols-3 gap-2">
          {[
            { n: selectedHotspot.active, l: "Photographers active here" },
            { n: selectedHotspot.last15, l: "Moments · last 15 min" },
            { n: selectedHotspot.total, l: "Captured today" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-[22px] leading-none tracking-[-0.01em]">
                {s.n}
              </div>
              <div className="mt-1.25 font-mono text-[9.5px] tracking-[0.06em] uppercase text-ink-soft leading-[1.3]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photographer stack */}
      <div className="px-7 py-4 border-b border-line-soft flex items-center gap-3 max-[900px]:px-5.5 max-[900px]:py-3">
        <div className="flex">
          {activePhotographers.map((p, i) => (
            <div
              key={p.id}
              className={`relative w-8 h-8 rounded-full border-2 border-bg-soft overflow-hidden bg-bg shrink-0 ${i !== 0 ? "-ml-2" : ""}`}
            >
              <Image
                src={p.avatarUrl}
                alt={p.name}
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
          ))}
        </div>
        <div className="text-[12.5px] text-ink-soft leading-[1.3]">
          <b className="text-ink font-serif italic font-normal text-[14px]">
            {activePhotographers.map((p) => p.name).join(", ")}
          </b>
          <br />
          are watching this corner now.
        </div>
      </div>

      {/* Feed header */}
      <div className="px-7 pt-4 pb-2.5 flex items-center justify-between max-[900px]:px-5.5 max-[900px]:pt-3 max-[900px]:pb-2">
        <h4 className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft font-normal">
          Last 15 minutes
        </h4>
        <span className="font-mono text-[10.5px] tracking-[0.06em] text-ink">
          {feedMoments.length} moments
        </span>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-7 pb-6 flex flex-col gap-3 max-[900px]:px-5.5 max-[900px]:pb-5.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-full">
        {feedMoments.map((m) => (
          <Link
            key={m.id}
            href="/explorer"
            className="grid grid-cols-[88px_1fr] gap-3.5 p-2.5 border border-line rounded-xl bg-bg cursor-pointer hover:-translate-y-0.5 hover:border-ink-soft transition-all duration-300"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-bg-soft">
              <Image
                src={m.imageUrl}
                alt={m.caption}
                fill
                className="object-cover"
                sizes="88px"
              />
              <span className="absolute bottom-1.25 left-1.25 font-mono text-[9px] tracking-wider uppercase bg-[rgba(20,19,17,0.55)] text-bg-soft px-1.25 py-0.75 rounded-[3px]">
                {m.timeAgo}
              </span>
            </div>
            <div className="flex flex-col justify-between min-w-0">
              <div>
                <div className="font-serif italic text-[14.5px] leading-tight tracking-[-0.005em] text-ink line-clamp-2">
                  {m.caption}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5 text-[12px] text-ink-soft">
                  <span className="text-ink">{m.photographerName}</span>
                  <span className="w-0.75 h-0.75 rounded-full bg-ink-faint" />
                  <span>{m.time}</span>
                </div>
              </div>
              <div className="mt-1.75 flex gap-1.25 flex-wrap">
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] tracking-[0.06em] uppercase text-ink-soft bg-bg-soft border border-line px-1.5 py-0.75 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-7 py-4 border-t border-line flex gap-2.5 max-[900px]:px-5.5 max-[900px]:py-3">
        <Link
          href="/explorer"
          className="flex-1 bg-ink text-bg-soft px-4.5 py-3.25 rounded-[10px] text-[13px] font-medium inline-flex items-center justify-center gap-2 hover:bg-black hover:-translate-y-px transition-all whitespace-nowrap"
        >
          Open in Explorer
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            className="transition-transform hover:translate-x-0.75"
          >
            <path
              d="M1 6.5h10M7 2l4.5 4.5L7 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <button
          onClick={() => setNotified(true)}
          className={`px-4 py-3.25 border rounded-[10px] text-[13px] transition-all whitespace-nowrap ${
            notified
              ? "bg-ink text-bg-soft border-ink"
              : "bg-bg border-line text-ink hover:border-ink"
          }`}
        >
          {notified ? "Notified ✓" : "Notify me"}
        </button>
      </div>
    </aside>
  );
}

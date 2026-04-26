"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type ExplorerMoment, type ExplorerResultsBlock } from "@/domains/explorer";
import { type ViewMode } from "../store/useExplorerStore";

// ─── Single result card ───────────────────────────────────────────────────────

function MomentCard({ moment }: { moment: ExplorerMoment }) {
  return (
    <Link
      href={`/explorer/${moment.id}`}
      className="group relative block bg-bg-soft rounded-[8px] overflow-hidden cursor-pointer transition-transform duration-500 [cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1"
      style={{ aspectRatio: "4/5" }}
    >
      {/* Photo */}
      <Image
        src={moment.imageUrl}
        alt={moment.captionLine1}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
        className="object-cover transition-transform duration-1000 [cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
      />

      {/* City · time badge — top-left */}
      <span
        className="absolute top-[14px] left-[14px] z-20 font-mono text-[10px] tracking-[0.06em] uppercase text-bg-soft rounded-[4px] px-[9px] py-[5px]"
        style={{ background: "rgba(20,19,17,0.32)", backdropFilter: "blur(8px)" }}
      >
        {moment.city} · {moment.time}
      </span>

      {/* Match badge — top-right (only when present) */}
      {moment.match && (
        <span
          className="absolute top-[14px] right-[14px] z-20 font-mono text-[10px] tracking-[0.06em] uppercase text-bg-soft rounded-[4px] px-[9px] py-[5px]"
          style={{
            background:
              moment.match.type === "match"
                ? "var(--color-accent)"
                : "rgba(20,19,17,0.55)",
          }}
        >
          {moment.match.type === "match"
            ? `Match · ${moment.match.score}`
            : moment.match.label}
        </span>
      )}

      {/* Gradient overlay — reveals on hover */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
        style={{ background: "linear-gradient(180deg, rgba(20,19,17,0) 50%, rgba(20,19,17,0.72) 100%)" }}
      />

      {/* Caption — slides up on hover */}
      <div
        className="absolute bottom-[18px] left-[18px] right-[18px] z-20 text-bg-soft opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-[transform,opacity] duration-[450ms]"
      >
        <p className="font-serif italic text-[17px] leading-[1.2] tracking-[-0.01em]">
          {moment.captionLine1}
        </p>
        <p className="mt-[10px] font-mono text-[10px] tracking-[0.08em] uppercase opacity-85">
          {moment.captionLine2}
        </p>
      </div>
    </Link>
  );
}

// ─── Results section ──────────────────────────────────────────────────────────

interface ExplorerResultsGridProps {
  data: ExplorerResultsBlock;
  viewMode: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const VIEW_MODES: ViewMode[] = ["grid", "map", "timeline"];

export function ExplorerResultsGrid({ data, viewMode, onViewChange }: ExplorerResultsGridProps) {
  const [visible, setVisible] = useState(data.moments.length);

  return (
    <section className="pt-[50px] pb-[120px]">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* Results head */}
        <div className="flex items-center justify-between pb-[26px] mb-[36px] border-b border-line-soft">
          <div className="flex items-baseline gap-[18px]">
            <h2 className="font-serif font-normal text-[36px] leading-none tracking-[-0.02em] text-ink">
              {data.headlinePart1}{" "}
              <em className="italic text-accent">{data.headlineEmphasis}</em>
            </h2>
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft">
              {data.count}
            </span>
          </div>
          <div className="flex gap-[22px] font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft">
            {VIEW_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => onViewChange(mode)}
                className={`capitalize transition-colors duration-200 ${viewMode === mode ? "text-ink" : "hover:text-ink"}`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {data.moments.slice(0, visible).map((m) => (
            <MomentCard key={m.id} moment={m} />
          ))}
        </div>

        {/* Load more */}
        {visible < data.moments.length && (
          <div className="mt-[56px] flex justify-center">
            <button
              onClick={() => setVisible((v) => v + 6)}
              className="group flex items-center gap-3 border border-line bg-bg-soft rounded-full transition-[background,color,border-color] duration-[250ms] hover:bg-ink hover:text-bg-soft hover:border-ink"
              style={{ padding: "14px 28px" }}
            >
              <span className="font-serif italic text-[16px]">{data.loadMoreLabel}</span>
              <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase opacity-70">
                {data.loadMoreCount}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

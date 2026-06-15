"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { type ExplorerMoment, type ExplorerResultsBlock } from "@/domains/explorer";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";
import { type ViewMode } from "../store/useExplorerStore";

// ─── Single result card ───────────────────────────────────────────────────────

function MomentCard({
  moment,
  featured,
  revealDelay,
}: {
  moment: ExplorerMoment;
  featured?: boolean;
  revealDelay: number;
}) {
  const [isSaved, setIsSaved] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/explorer/${moment.id}`}
      className={cn(
        "group relative block bg-bg-soft rounded-[8px] overflow-hidden cursor-pointer transition-transform duration-500 [cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 reveal",
        featured && "md:col-span-2",
        isVisible && "is-visible",
      )}
      style={{ aspectRatio: featured ? "16/10" : "4/5", "--reveal-delay": `${revealDelay}ms` } as React.CSSProperties}
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

      {/* Bookmark button — top-right */}
      <button
        type="button"
        aria-label={isSaved ? "Remove from saved moments" : "Save moment"}
        aria-pressed={isSaved}
        onClick={(event) => {
          event.preventDefault();
          setIsSaved((current) => !current);
        }}
        className={`absolute top-[14px] right-[14px] z-30 grid h-9 w-9 place-items-center rounded-full border border-[rgba(251,250,246,0.5)] transition-colors duration-200 hover:border-bg-soft ${
          isSaved ? "text-accent" : "text-bg-soft"
        }`}
        style={{ background: "rgba(20,19,17,0.45)", backdropFilter: "blur(8px)" }}
      >
        {isSaved ? (
          <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor">
            <path d="M4 2h10v14l-5-3.5L4 16V2z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 2h10v14l-5-3.5L4 16V2z" />
          </svg>
        )}
      </button>

      {/* Match badge — below bookmark button (only when present) */}
      {moment.match && (
        <span
          className="absolute top-[58px] right-[14px] z-20 font-mono text-[10px] tracking-[0.06em] uppercase text-bg-soft rounded-[4px] px-[9px] py-[5px]"
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
        {(moment.vehicleType || moment.plateIndicator || moment.sceneTags?.length) && (
          <div className="mb-3 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.08em]">
            {moment.vehicleType && (
              <span className="rounded-[4px] bg-bg-soft/15 px-2 py-1">{moment.vehicleType}</span>
            )}
            {moment.plateIndicator && (
              <span className="rounded-[4px] bg-bg-soft/15 px-2 py-1">{moment.plateIndicator}</span>
            )}
            {moment.sceneTags?.slice(0, 2).map((tag) => (
              <span key={tag} className="rounded-[4px] bg-bg-soft/15 px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}
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
const PAGE_SIZE = 6;

function ExplorerMapView({ moments }: { moments: ExplorerMoment[] }) {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-[8px] border border-line bg-bg-soft">
      <div className="absolute inset-0 opacity-70 search-stage-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_32%,rgba(192,74,43,0.16),transparent_28%),radial-gradient(circle_at_76%_62%,rgba(20,19,17,0.10),transparent_24%)]" />
      <div className="relative z-10 grid min-h-[560px] grid-cols-[1fr_360px]">
        <div className="relative">
          {moments.slice(0, 8).map((moment, index) => {
            const left = [18, 32, 54, 70, 42, 82, 24, 62][index] ?? 50;
            const top = [26, 58, 34, 68, 76, 42, 82, 18][index] ?? 50;

            return (
              <Link
                key={moment.id}
                href={`/explorer/${moment.id}`}
                className="absolute group"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span className="block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg-soft bg-accent shadow-[0_0_0_7px_rgba(192,74,43,0.16)] transition-transform group-hover:scale-125" />
                <span className="pointer-events-none absolute left-4 top-2 w-max max-w-48 rounded-[6px] bg-ink px-3 py-2 text-bg-soft opacity-0 shadow-[0_18px_42px_-22px_rgba(20,19,17,0.5)] transition-opacity group-hover:opacity-100">
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.08em] opacity-70">
                    {moment.city} · {moment.time}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-[1.25]">{moment.captionLine1}</span>
                </span>
              </Link>
            );
          })}
        </div>
        <aside className="border-l border-line bg-bg/80 p-6 backdrop-blur-sm">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft">
            Map matches
          </p>
          <h3 className="mt-3 font-serif text-[30px] leading-none">
            Street traces, grouped by place.
          </h3>
          <div className="mt-7 flex flex-col gap-3">
            {moments.slice(0, 5).map((moment) => (
              <Link
                key={moment.id}
                href={`/explorer/${moment.id}`}
                className="rounded-[6px] border border-line bg-bg-soft p-3 transition-colors hover:border-ink-soft"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
                  {moment.city} · {moment.time}
                </span>
                <p className="mt-2 text-[13px] leading-[1.35] text-ink">{moment.captionLine1}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ExplorerTimelineView({ moments }: { moments: ExplorerMoment[] }) {
  return (
    <div className="border-t border-line">
      {moments.map((moment, index) => (
        <Link
          key={moment.id}
          href={`/explorer/${moment.id}`}
          className="grid grid-cols-[120px_1fr_180px] items-center gap-8 border-b border-line py-5 transition-colors hover:bg-bg-soft"
        >
          <div>
            <p className="font-serif text-[28px] leading-none">{moment.time}</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              Step {String(index + 1).padStart(2, "0")}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft">
              {moment.city}
            </p>
            <p className="mt-2 font-serif text-[22px] italic leading-[1.15]">
              {moment.captionLine1}
            </p>
          </div>
          <div className="relative h-28 overflow-hidden rounded-[6px] bg-bg-soft">
            <Image
              src={moment.imageUrl}
              alt={moment.captionLine1}
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ExplorerResultsGrid({ data, viewMode, onViewChange }: ExplorerResultsGridProps) {
  const [visible, setVisible] = useState(Math.min(PAGE_SIZE, data.moments.length));
  const sentinelRef = useRef<HTMLDivElement>(null);
  const visibleMoments = data.moments.slice(0, visible);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visible >= data.moments.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible((current) => Math.min(current + PAGE_SIZE, data.moments.length));
        }
      },
      { rootMargin: "360px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [data.moments.length, visible]);

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
                aria-pressed={viewMode === mode}
                className={`capitalize transition-colors duration-200 ${viewMode === mode ? "text-ink" : "hover:text-ink"}`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {data.moments.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-line-soft bg-bg-soft py-[100px] text-center">
            <p className="font-serif text-[28px] leading-none text-ink">No moments match yet.</p>
            <p className="max-w-[360px] text-[14px] text-ink-soft">
              Try widening your search — adjust the time, plate, or vehicle filters above.
            </p>
          </div>
        ) : (
          <>
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleMoments.map((m, i) => (
                  <MomentCard
                    key={m.id}
                    moment={m}
                    featured={i % 5 === 0}
                    revealDelay={(i % 6) * 80}
                  />
                ))}
              </div>
            )}

            {viewMode === "map" && <ExplorerMapView moments={visibleMoments} />}

            {viewMode === "timeline" && <ExplorerTimelineView moments={visibleMoments} />}

            <div ref={sentinelRef} className="h-10" />
            <div className="mt-[42px] flex justify-center">
              <p className="rounded-full border border-line bg-bg-soft px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-soft">
                {visible < data.moments.length
                  ? `${data.loadMoreLabel} · loading quietly`
                  : "All quiet matches loaded"}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

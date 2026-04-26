"use client";

import { type HomeSearchSection as HomeSearchSectionData } from "@/domains/home/entities/HomePage";
import { useHomeStore } from "../store/useHomeStore";

interface HomeSearchSectionProps {
  data: HomeSearchSectionData;
}

// ─── SVG icons ───────────────────────────────────────────────────────────────

function IconMapPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 14s5-4.5 5-9A5 5 0 0 0 3 5c0 4.5 5 9 5 9z"/>
      <circle cx="8" cy="5.5" r="1.6"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5"/>
      <path d="M8 4v4l3 2"/>
    </svg>
  );
}
function IconPlate() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="4.5" width="13" height="7" rx="1"/>
      <path d="M4 7.5h1.5M7 7.5h1.5M10 7.5h1.5"/>
    </svg>
  );
}
function IconCar() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 11h12M3 11V8l2-3h6l2 3v3"/>
      <circle cx="5" cy="12" r="1.3"/>
      <circle cx="11" cy="12" r="1.3"/>
    </svg>
  );
}
function IconShirt() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 3l3 2 3-2 3 3-2 2v5H4V8L2 6z"/>
    </svg>
  );
}

const ICON_MAP: Record<string, React.ReactNode> = {
  "map-pin": <IconMapPin />,
  "clock": <IconClock />,
  "credit-card": <IconPlate />,
  "bike": <IconCar />,
  "shirt": <IconShirt />,
};

// Filter absolute positions indexed by icon key
const FILTER_POSITIONS: Record<string, React.CSSProperties> = {
  "map-pin":     { top: "8%",  left: "6%",  animationDelay: "0s" },
  "clock":       { top: "12%", right: "8%", animationDelay: "1s" },
  "credit-card": { bottom: "18%", left: "4%", animationDelay: "2s" },
  "bike":        { bottom: "8%", right: "6%", animationDelay: "0.5s" },
  "shirt":       { top: "50%", right: "2%", transform: "translateY(-50%)", animationDelay: "1.5s" },
};

// ─── Filter chip (absolutely positioned in stage) ────────────────────────────

function FilterChip({ icon, label, value }: { icon: string; label: string; value: string }) {
  const position = FILTER_POSITIONS[icon] ?? { top: "50%", left: "50%" };
  return (
    <div
      className="absolute flex items-center gap-3 rounded-[14px] bg-bg-soft border border-line px-[18px] py-[14px] min-w-[180px] shadow-[0_14px_40px_-14px_rgba(20,19,17,0.15)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]"
      style={{ animation: "float 7s ease-in-out infinite", ...position }}
    >
      <div className="w-9 h-9 flex items-center justify-center rounded-[10px] bg-bg text-ink shrink-0">
        {ICON_MAP[icon]}
      </div>
      <div>
        <span className="block font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft">
          {label}
        </span>
        <span className="text-sm font-medium text-ink">{value}</span>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function HomeSearchSection({ data }: HomeSearchSectionProps) {
  const { searchQuery, setSearchQuery, handleSearch } = useHomeStore();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(searchQuery);
  }

  return (
    <section id="search" className="bg-bg-soft pt-[140px] pb-[160px]">
      <div className="max-w-[1320px] mx-auto px-10">
        {/* Section head: 2-col grid with border-bottom */}
        <div className="grid grid-cols-[1fr_1.2fr] gap-[60px] items-end pb-[60px] border-b border-line mb-[80px]">
          <h2
            className="font-serif font-normal leading-[1] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(40px, 5.5vw, 76px)" }}
          >
            {data.headlinePart1}{" "}
            <em className="italic text-accent">{data.headlineEmphasis}</em>{" "}
            {data.headlinePart2}
          </h2>
          <p className="text-[16.5px] text-ink-soft max-w-[440px] leading-[1.55]">
            {data.description}
          </p>
        </div>

        {/* Search stage */}
        <div className="relative h-[620px] bg-bg rounded-2xl border border-line overflow-hidden flex items-center justify-center">
          {/* Grid backdrop */}
          <div className="search-stage-grid absolute inset-0 pointer-events-none" />

          {/* SVG connector lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
          >
            <g stroke="var(--color-line)" strokeWidth="1" strokeDasharray="3 4" fill="none">
              <path d="M 200 140 Q 400 240 500 300"/>
              <path d="M 820 150 Q 650 230 500 300"/>
              <path d="M 180 470 Q 350 380 500 300"/>
              <path d="M 850 500 Q 680 400 500 300"/>
              <path d="M 950 300 Q 750 300 500 300"/>
            </g>
          </svg>

          {/* Search bar */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex items-center gap-3 bg-bg-soft border border-line rounded-full shadow-[0_20px_60px_-20px_rgba(20,19,17,0.18)]"
            style={{ padding: "14px 14px 14px 28px", width: "min(560px, 90%)" }}
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={data.searchPlaceholder}
              className="flex-1 bg-transparent border-none outline-none font-serif text-[22px] text-ink placeholder:text-ink-faint"
              aria-label="Search photos"
            />
            {!searchQuery && (
              <span
                className="inline-block w-[1.5px] h-[22px] bg-accent align-middle"
                style={{ animation: "blink 1s step-end infinite" }}
                aria-hidden="true"
              />
            )}
            <button
              type="submit"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-ink text-bg-soft shrink-0 transition-transform duration-300 hover:rotate-[-45deg]"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* Floating filter chips */}
          {data.filters.map((f) => (
            <FilterChip key={f.label} icon={f.icon} label={f.label} value={f.value} />
          ))}
        </div>

        {/* Caption */}
        <div className="mt-7 flex items-center justify-between font-mono text-[11.5px] tracking-[0.06em] text-ink-soft uppercase">
          <span>{data.figureLabel}</span>
          <span>{data.figureNote}</span>
        </div>
      </div>
    </section>
  );
}

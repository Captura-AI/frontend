"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { type ExplorerFacet, type ExplorerActiveFilter, type ColorSwatch } from "@/domains/explorer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExplorerFacetBarProps {
  facets: ExplorerFacet[];
  activeFilters: ExplorerActiveFilter[];
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

// ─── Mood slider ──────────────────────────────────────────────────────────────

const MOODS = [
  [0, "deep night"], [10, "predawn"], [22, "dusk"], [34, "golden hour"],
  [50, "morning"], [62, "midday"], [74, "afternoon"], [84, "dusk"],
  [92, "blue hour"], [100, "neon night"],
] as [number, string][];

function moodAt(p: number): string {
  let best: [number, string] = MOODS[0]!;
  for (const m of MOODS) {
    if (Math.abs(m[0] - p) < Math.abs(best[0] - p)) best = m;
  }
  return best[1];
}

function MoodSlider({ initialPct = 40 }: { initialPct?: number }) {
  const [pct, setPct] = useState(initialPct);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPct(p);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) setFromEvent(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [setFromEvent]);

  return (
    <div>
      <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-3">Mood</p>
      <div className="flex items-center gap-[14px]">
        <div
          ref={trackRef}
          className="flex-1 h-7 relative rounded-full border border-line cursor-pointer"
          style={{
            background:
              "linear-gradient(90deg, #1C1C22 0%, #3E3545 12%, #C87A5C 30%, #E8B28A 40%, #F5E6C8 54%, #D8D2C4 70%, #C87A5C 82%, #3E3545 92%, #1C1C22 100%)",
          }}
          onMouseDown={(e) => {
            dragging.current = true;
            setFromEvent(e.clientX);
            e.stopPropagation();
          }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-bg-soft border-2 border-ink shadow-[0_3px_10px_rgba(20,19,17,0.18)]"
            style={{ left: `${pct}%`, transform: "translateX(-50%) translateY(-50%)" }}
          />
        </div>
        <span className="font-serif italic text-[15px] min-w-[90px] text-right">{moodAt(pct)}</span>
      </div>
    </div>
  );
}

// ─── Swatch group (single-select) ────────────────────────────────────────────

function SwatchGroup({ swatches }: { swatches: ColorSwatch[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-3">Outfit color</p>
      <div className="flex flex-wrap gap-[10px]">
        {swatches.map((s, i) => (
          <button
            key={s.hex}
            onClick={() => setActive(i)}
            title={s.label}
            className="relative w-7 h-7 rounded-full border border-[rgba(20,19,17,0.12)] transition-transform hover:scale-110"
            style={{ background: s.hex }}
          >
            {active === i && (
              <span className="absolute inset-[-4px] rounded-full border-[1.5px] border-ink pointer-events-none" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Option group ─────────────────────────────────────────────────────────────

function OptionGroup({
  heading,
  options,
  initialActive,
}: {
  heading: string;
  options: { label: string; value: string }[];
  initialActive?: string[];
}) {
  const [active, setActive] = useState<Set<string>>(new Set(initialActive ?? []));

  function toggle(v: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v); else next.add(v);
      return next;
    });
  }

  return (
    <div>
      <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-3">{heading}</p>
      <div className="flex flex-wrap gap-[6px]">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => toggle(o.value)}
            className={`px-3 py-[7px] rounded-full border text-[13px] transition-all duration-200 ${
              active.has(o.value)
                ? "bg-ink text-bg-soft border-ink"
                : "bg-transparent border-line text-ink hover:border-ink-soft"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Plate input ──────────────────────────────────────────────────────────────

function PlateInput({ initial }: { initial: string }) {
  const [value, setValue] = useState(initial);
  return (
    <div
      className="flex items-center gap-2 bg-ink text-bg-soft rounded-[6px] w-full font-mono text-[13px] tracking-[0.12em]"
      style={{ padding: "9px 12px" }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        placeholder="__ · __ · __"
        className="bg-transparent border-none outline-none text-bg-soft font-mono tracking-[0.12em] flex-1 uppercase placeholder:opacity-40"
        spellCheck={false}
      />
    </div>
  );
}

// ─── Single facet popover ─────────────────────────────────────────────────────

function FacetPopover({ facet, isOpen }: { facet: ExplorerFacet; isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-[calc(100%+12px)] left-0 min-w-[320px] bg-bg-soft border border-line rounded-[14px] z-50"
      style={{ padding: 18, boxShadow: "0 24px 60px -20px rgba(20,19,17,0.18)" }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Mood slider for time facet */}
      {facet.type === "time" && (
        <>
          <MoodSlider initialPct={40} />
          <hr className="border-none border-t border-line-soft my-[14px]" />
        </>
      )}

      {/* Color swatches for person facet */}
      {facet.type === "person" && facet.swatches && (
        <>
          <SwatchGroup swatches={facet.swatches} />
          <hr className="border-none border-t border-line-soft my-[14px]" />
        </>
      )}

      {/* Plate input */}
      {facet.type === "plate" && facet.plateValue && (
        <>
          <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-3">
            Partial plate · soft match
          </p>
          <PlateInput initial={facet.plateValue} />
          <hr className="border-none border-t border-line-soft my-[14px]" />
        </>
      )}

      {/* Option groups */}
      {facet.optionGroups?.map((group, i) => (
        <div key={group.heading}>
          {i > 0 && <hr className="border-none border-t border-line-soft my-[14px]" />}
          <OptionGroup heading={group.heading} options={group.options} />
        </div>
      ))}
    </div>
  );
}

// ─── Caret icon ──────────────────────────────────────────────────────────────

function Caret({ open }: { open: boolean }) {
  return (
    <span
      className="inline-block w-[9px] h-[9px] border-r border-b ml-0.5 transition-transform duration-200"
      style={{
        borderColor: open ? "rgba(251,250,246,0.7)" : "var(--color-ink-soft)",
        transform: open ? "rotate(225deg) translateY(-1px)" : "rotate(45deg) translateY(-2px)",
      }}
    />
  );
}

// ─── Main FacetBar ────────────────────────────────────────────────────────────

export function ExplorerFacetBar({
  facets,
  activeFilters,
  onRemoveFilter,
  onClearAll,
}: ExplorerFacetBarProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  // Close on outside click
  useEffect(() => {
    const close = () => setOpenKey(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function toggleFacet(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <div className="max-w-[1280px] mx-auto px-10">
      {/* Filter pills row */}
      <div className="flex items-center justify-between py-[14px] border-b border-line">
        <div className="flex items-center gap-1 flex-wrap">
          {facets.map((facet, i) => {
            const isOpen = openKey === facet.key;
            return (
              <div key={facet.key} className="flex items-center">
                {i > 0 && <span className="w-px h-[18px] bg-line mx-1" />}
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFacet(facet.key); }}
                    className={`inline-flex items-center gap-2 px-[14px] py-[9px] rounded-full text-[13.5px] transition-[background,color] duration-200 ${
                      isOpen ? "bg-ink text-bg-soft" : "bg-transparent text-ink hover:bg-bg-soft"
                    }`}
                  >
                    <span className={`font-mono text-[10.5px] tracking-[0.08em] uppercase ${isOpen ? "text-[rgba(251,250,246,0.6)]" : "text-ink-soft"}`}>
                      {facet.label}
                    </span>
                    <span className="font-serif italic text-[16px] leading-none whitespace-nowrap">
                      {facet.displayValue}
                    </span>
                    <Caret open={isOpen} />
                  </button>
                  <FacetPopover facet={facet} isOpen={isOpen} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active filter strip */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 py-[14px] border-b border-line overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
          <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft mr-2 shrink-0">
            Now searching
          </span>
          {activeFilters.map((f) => (
            <span
              key={f.key}
              className="inline-flex items-center gap-2 bg-ink text-bg-soft rounded-full text-[12.5px] shrink-0"
              style={{ padding: "5px 6px 5px 11px" }}
            >
              <span className="font-mono text-[9.5px] tracking-[0.08em] uppercase opacity-60 -mr-0.5">
                {f.keyLabel}
              </span>
              {f.value}
              <button
                onClick={() => onRemoveFilter(f.key)}
                className="w-4 h-4 rounded-full inline-flex items-center justify-center text-[9px] transition-[background] hover:bg-[rgba(251,250,246,0.3)]"
                style={{ background: "rgba(251,250,246,0.14)" }}
                aria-label={`Remove ${f.keyLabel} filter`}
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={onClearAll}
            className="ml-auto font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft hover:text-ink shrink-0 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { type ExplorerFacet, type ExplorerActiveFilter, type FacetOption } from "@/domains/explorer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExplorerFacetBarProps {
  facets: ExplorerFacet[];
  activeFilters: ExplorerActiveFilter[];
  onApplyFilter: (filter: ExplorerActiveFilter) => void;
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
          role="slider"
          tabIndex={0}
          aria-label="Mood"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={moodAt(pct)}
          className="flex-1 h-7 relative rounded-full border border-line cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          style={{
            background:
              "linear-gradient(90deg, #1C1C22 0%, #3E3545 12%, #C87A5C 30%, #E8B28A 40%, #F5E6C8 54%, #D8D2C4 70%, #C87A5C 82%, #3E3545 92%, #1C1C22 100%)",
          }}
          onMouseDown={(e) => {
            dragging.current = true;
            setFromEvent(e.clientX);
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
              e.preventDefault();
              setPct((p) => Math.max(2, p - 2));
            } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
              e.preventDefault();
              setPct((p) => Math.min(98, p + 2));
            }
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

// ─── Option group ─────────────────────────────────────────────────────────────

function OptionGroup({
  heading,
  options,
  selectedValue,
  onSelect,
}: {
  heading: string;
  options: FacetOption[];
  selectedValue?: string;
  onSelect: (option: FacetOption) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-3">{heading}</p>
      <div className="flex flex-wrap gap-[6px]">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onSelect(o)}
            className={`px-3 py-[7px] rounded-full border text-[13px] transition-all duration-200 ${
              selectedValue === o.value
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

function PlateInput({ initial, onApply }: { initial: string; onApply: (value: string) => void }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="flex gap-2">
      <div
        className="flex items-center gap-2 bg-ink text-bg-soft rounded-[6px] w-full font-mono text-[13px] tracking-[0.12em]"
        style={{ padding: "9px 12px" }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          onKeyDown={(event) => {
            if (event.key === "Enter") onApply(value);
          }}
          placeholder="__ · __ · __"
          className="bg-transparent border-none outline-none text-bg-soft font-mono tracking-[0.12em] flex-1 uppercase placeholder:opacity-40"
          spellCheck={false}
        />
      </div>
      <button
        type="button"
        onClick={() => onApply(value)}
        className="rounded-[6px] border border-line px-3 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft transition-colors hover:border-ink hover:text-ink"
      >
        Apply
      </button>
    </div>
  );
}

// ─── Single facet popover ─────────────────────────────────────────────────────

function FacetPopover({
  facet,
  isOpen,
  selectedValue,
  onSelect,
}: {
  facet: ExplorerFacet;
  isOpen: boolean;
  selectedValue?: string;
  onSelect: (option: FacetOption) => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label={`${facet.label} options`}
      className="absolute top-[calc(100%+12px)] left-0 min-w-[320px] bg-bg-soft border border-line rounded-[14px] z-50"
      style={{
        padding: 18,
        boxShadow: "0 24px 60px -20px rgba(20,19,17,0.18)",
        animation: "authModeEnter 200ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Mood slider for time facet */}
      {facet.type === "time" && (
        <>
          <MoodSlider initialPct={40} />
          <hr className="border-none border-t border-line-soft my-[14px]" />
        </>
      )}

      {/* Plate input */}
      {facet.type === "plate" && facet.plateValue && (
        <>
          <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-3">
            Partial plate · soft match
          </p>
          <PlateInput
            initial={facet.plateValue}
            onApply={(value) =>
              onSelect({ label: value || facet.plateValue || "Partial plate", value })
            }
          />
          <hr className="border-none border-t border-line-soft my-[14px]" />
        </>
      )}

      {/* Option groups */}
      {facet.optionGroups?.map((group, i) => (
        <div key={group.heading}>
          {i > 0 && <hr className="border-none border-t border-line-soft my-[14px]" />}
          <OptionGroup
            heading={group.heading}
            options={group.options}
            selectedValue={selectedValue}
            onSelect={onSelect}
          />
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
  onApplyFilter,
  onRemoveFilter,
  onClearAll,
}: ExplorerFacetBarProps) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      facets.map((facet) => {
        const firstValue = facet.optionGroups?.[0]?.options[0]?.value ?? facet.plateValue ?? facet.displayValue;
        return [facet.key, firstValue];
      })
    )
  );
  const [facetDisplayValues, setFacetDisplayValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(facets.map((facet) => [facet.key, facet.displayValue]))
  );

  // Close on outside click
  useEffect(() => {
    const close = () => setOpenKey(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function toggleFacet(key: string) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  function selectFacetOption(facet: ExplorerFacet, option: FacetOption) {
    const valueLabel = option.label.trim();
    setSelectedOptions((prev) => ({ ...prev, [facet.key]: option.value }));
    setFacetDisplayValues((prev) => ({ ...prev, [facet.key]: valueLabel }));
    onApplyFilter({
      key: facet.key,
      keyLabel: facet.label.toLowerCase(),
      value: valueLabel,
    });
    setOpenKey(null);
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
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`inline-flex items-center gap-2 px-[14px] py-[9px] rounded-full text-[13.5px] transition-[background,color] duration-200 ${
                      isOpen ? "bg-ink text-bg-soft" : "bg-transparent text-ink hover:bg-bg-soft"
                    }`}
                  >
                    <span className={`font-mono text-[10.5px] tracking-[0.08em] uppercase ${isOpen ? "text-[rgba(251,250,246,0.6)]" : "text-ink-soft"}`}>
                      {facet.label}
                    </span>
                    <span className="font-serif italic text-[16px] leading-none whitespace-nowrap">
                      {facetDisplayValues[facet.key] ?? facet.displayValue}
                    </span>
                    <Caret open={isOpen} />
                  </button>
                  <FacetPopover
                    facet={facet}
                    isOpen={isOpen}
                    selectedValue={selectedOptions[facet.key]}
                    onSelect={(option) => selectFacetOption(facet, option)}
                  />
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

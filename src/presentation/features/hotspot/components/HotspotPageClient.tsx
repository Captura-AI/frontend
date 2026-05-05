"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Map as LeafletMap } from "leaflet";
import type { HotspotPage } from "@/domains/hotspot";
import HotspotSidebar from "./HotspotSidebar";

const HotspotMapLeaflet = dynamic(
  () => import("./HotspotMapLeaflet"),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#2a2622]" /> }
);

type Timeframe = "Today" | "Week" | "Month";
const TIMEFRAMES: Timeframe[] = ["Today", "Week", "Month"];

interface Props {
  data: HotspotPage;
}

export default function HotspotPageClient({ data }: Props) {
  const [selectedId, setSelectedId] = useState(data.defaultHotspotId);
  const [timeframe, setTimeframe] = useState<Timeframe>("Today");
  const mapRef = useRef<LeafletMap | null>(null);

  const selectedHotspot =
    data.hotspots.find((h) => h.id === selectedId) ?? data.hotspots[0];

  const { regionStats } = data;

  return (
    <div className="fixed inset-0 z-200 grid grid-cols-[1fr_420px] max-[900px]:grid-cols-1 max-[900px]:grid-rows-[1fr_auto]">
      {/* ── Left: Map + overlays ── */}
      <div className="hotspot-map-wrap relative overflow-hidden bg-[#2a2622]">
        {/* Leaflet map (SSR-safe dynamic import) */}
        <HotspotMapLeaflet
          hotspots={data.hotspots}
          center={data.center}
          selectedId={selectedId}
          onSelect={setSelectedId}
          mapRef={mapRef}
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-5"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20,19,17,0) 40%, rgba(20,19,17,0.42) 100%), linear-gradient(180deg, rgba(245,242,236,0.10) 0%, rgba(245,242,236,0) 50%, rgba(20,19,17,0.18) 100%)",
          }}
        />

        {/* ── Floating top bar ── */}
        <div className="absolute top-5.5 left-5.5 right-5.5 flex items-center gap-3.5 z-600 max-[900px]:flex-wrap">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 bg-bg-soft border border-line rounded-full px-4 py-2.5 font-serif text-[18px] tracking-[-0.01em] shadow-[0_12px_36px_-16px_rgba(20,19,17,0.45)] whitespace-nowrap"
          >
            <span className="w-1.75 h-1.75 rounded-full bg-accent shrink-0" />
            Captura
          </Link>

          {/* Region pill */}
          <span className="inline-flex items-center gap-2 bg-ink text-bg-soft px-3.5 py-2.25 rounded-full font-mono text-[10.5px] tracking-[0.08em] uppercase shadow-[0_12px_36px_-16px_rgba(20,19,17,0.45)] whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-[livePulse_1.6s_ease-out_infinite]" />
            {data.region} · {data.regionCode}
          </span>

          {/* Search */}
          <div className="flex-1 flex items-center gap-3 bg-bg-soft border border-line rounded-full px-4.5 py-2.25 shadow-[0_12px_36px_-16px_rgba(20,19,17,0.45)] transition-colors focus-within:border-ink max-[900px]:order-4 max-[900px]:basis-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-4.5 h-4.5 text-ink-faint shrink-0"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <input
              type="text"
              placeholder="A street in Bandung, a route through Bogor…"
              className="flex-1 border-none outline-none bg-transparent font-serif text-[17px] tracking-[-0.005em] py-1 placeholder:text-ink-faint placeholder:italic"
            />
            <span className="font-mono text-[10.5px] tracking-[0.06em] text-ink-soft bg-bg border border-line rounded-[5px] px-1.75 py-0.75 whitespace-nowrap">
              ⌘ K
            </span>
          </div>

          {/* Timeframe pills */}
          <div
            className="inline-flex bg-bg-soft border border-line rounded-full p-1 shadow-[0_12px_36px_-16px_rgba(20,19,17,0.45)] max-[900px]:order-3"
            role="tablist"
          >
            {TIMEFRAMES.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={timeframe === t}
                onClick={() => setTimeframe(t)}
                className={`px-3.5 py-2 rounded-full font-mono text-[10.5px] tracking-[0.08em] uppercase transition-all whitespace-nowrap ${
                  timeframe === t
                    ? "bg-ink text-bg-soft"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Layers icon */}
          <button
            className="w-10.5 h-10.5 rounded-full bg-bg-soft border border-line inline-flex items-center justify-center shadow-[0_12px_36px_-16px_rgba(20,19,17,0.45)] hover:bg-ink hover:text-bg-soft transition-colors"
            aria-label="Layers"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 2l7 4-7 4-7-4 7-4z" />
              <path d="M2 10l7 4 7-4" />
              <path d="M2 14l7 4 7-4" />
            </svg>
          </button>
        </div>

        {/* ── Legend (desktop) ── */}
        <div className="absolute top-22 right-5.5 z-500 bg-bg-soft border border-line rounded-xl px-4 py-3.5 shadow-[0_12px_32px_-14px_rgba(20,19,17,0.45)] min-w-52.5 max-[900px]:hidden">
          <h5 className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft font-normal mb-2.5">
            Activity · today · {data.region}
          </h5>
          {[
            { color: "bg-accent", label: "Hot · 30+ moments" },
            { color: "bg-[oklch(0.72_0.10_60)]", label: "Warm · 10–30" },
            { color: "bg-ink-faint", label: "Quiet · < 10" },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-2.5 text-[12.5px] mb-1.75 last:mb-0">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${row.color}`} />
              {row.label}
            </div>
          ))}
        </div>

        {/* ── Stats (bottom-left) ── */}
        <div className="absolute bottom-5.5 left-5.5 z-500 flex gap-2.5 flex-wrap max-w-[calc(100%-280px)] max-[900px]:static max-[900px]:max-w-none max-[900px]:top-19.5 max-[900px]:bottom-auto max-[900px]:left-5.5 max-[900px]:flex-col">
          <div className="bg-[rgba(251,250,246,0.92)] backdrop-blur-[10px] border border-line rounded-xl px-4 py-3 shadow-[0_12px_32px_-14px_rgba(20,19,17,0.45)] flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0 animate-[livePulse_1.6s_ease-out_infinite]" />
            <div>
              <div className="font-serif text-[24px] leading-none tracking-[-0.02em]">
                <em className="italic text-accent">{regionStats.activePhotographers}</em>{" "}
                photographers
              </div>
              <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft mt-1.25 max-w-35 leading-[1.3]">
                Active in {data.region} now
              </div>
            </div>
          </div>
          <div className="bg-[rgba(251,250,246,0.92)] backdrop-blur-[10px] border border-line rounded-xl px-4 py-3 shadow-[0_12px_32px_-14px_rgba(20,19,17,0.45)] flex items-center gap-3">
            <div>
              <div className="font-serif text-[24px] leading-none tracking-[-0.02em]">
                {regionStats.momentsCapturedToday}
              </div>
              <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft mt-1.25 leading-[1.3]">
                Moments captured today
              </div>
            </div>
          </div>
          <div className="bg-[rgba(251,250,246,0.92)] backdrop-blur-[10px] border border-line rounded-xl px-4 py-3 shadow-[0_12px_32px_-14px_rgba(20,19,17,0.45)] flex items-center gap-3">
            <div>
              <div className="font-serif text-[24px] leading-none tracking-[-0.02em]">
                {regionStats.goldenHourTime}
              </div>
              <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft mt-1.25 leading-[1.3]">
                {regionStats.goldenHourLocation} · golden hour
              </div>
            </div>
          </div>
        </div>

        {/* ── Custom zoom controls ── */}
        <div className="absolute bottom-5.5 right-5.5 z-500 flex flex-col gap-1.5 bg-bg-soft border border-line rounded-xl p-1 shadow-[0_12px_32px_-14px_rgba(20,19,17,0.45)] max-[900px]:hidden">
          <button
            onClick={() => mapRef.current?.zoomIn()}
            aria-label="Zoom in"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-ink hover:bg-bg transition-colors font-mono text-[16px]"
          >
            +
          </button>
          <div className="h-px bg-line-soft mx-1" />
          <button
            onClick={() => mapRef.current?.zoomOut()}
            aria-label="Zoom out"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-ink hover:bg-bg transition-colors font-mono text-[16px]"
          >
            −
          </button>
          <div className="h-px bg-line-soft mx-1" />
          <button
            onClick={() =>
              mapRef.current?.flyTo(data.center, 9, { duration: 0.7 })
            }
            aria-label="Recenter"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-ink hover:bg-bg transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="8" r="6" />
              <circle cx="8" cy="8" r="1.6" fill="currentColor" />
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Right: Sidebar ── */}
      <HotspotSidebar
        selectedHotspot={selectedHotspot}
        feedMoments={data.feedMoments}
        activePhotographers={data.activePhotographers}
        regionStats={regionStats}
      />
    </div>
  );
}

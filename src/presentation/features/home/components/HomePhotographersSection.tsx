"use client";

import { useEffect, useRef } from "react";
import {
  type HomePhotographersSection as HomePhotographersSectionData,
  type HomePhotographer,
} from "@/domains/home/entities/HomePage";

interface HomePhotographersSectionProps {
  data: HomePhotographersSectionData;
}

// Gradient per card slot (cycles through 4 options)
const IMG_GRADIENTS = [
  "repeating-linear-gradient(45deg, #DDD6C6 0 2px, #D4CDBD 2px 12px)",
  "repeating-linear-gradient(135deg, #CFC9B9 0 2px, #C4BEAE 2px 12px)",
  "repeating-linear-gradient(90deg, #C9A993 0 2px, #BFA089 2px 12px)",
  "repeating-linear-gradient(60deg, #A8AEB0 0 2px, #9FA6A9 2px 12px)",
];

// ─── Photographer card ────────────────────────────────────────────────────────

function PhotographerCard({ photographer, index }: { photographer: HomePhotographer; index: number }) {
  const gradient = IMG_GRADIENTS[index % IMG_GRADIENTS.length];
  return (
    <div className="flex-none w-[280px] bg-bg border border-line rounded-[10px] overflow-hidden transition-transform duration-[400ms] hover:-translate-y-1">
      {/* Photo image with aspect-ratio 4/5, data-label via CSS ::after */}
      <div
        className="photog-img-label"
        data-label={photographer.locationTime}
        style={{ aspectRatio: "4/5", background: gradient }}
      />
      {/* Info row */}
      <div className="flex items-start justify-between px-[18px] py-4">
        <div>
          <p className="font-serif text-[20px] leading-[1.1] tracking-[-0.01em] text-ink">
            {photographer.name}
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft mt-1">
            {photographer.city}
          </p>
        </div>
        <div className="text-right font-mono text-[11px] text-ink-soft">
          <span className="block font-serif text-[20px] tracking-[-0.02em] text-ink">
            {photographer.photoCount}
          </span>
          photos
        </div>
      </div>
    </div>
  );
}

// ─── Marquee (rAF loop) ───────────────────────────────────────────────────────

function PhotographerMarquee({ photographers }: { photographers: HomePhotographer[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const mx = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId: number;
    function tick() {
      mx.current -= 0.4;
      if (Math.abs(mx.current) >= el!.scrollWidth / 2) mx.current = 0;
      el!.style.transform = `translateX(${mx.current}px)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Duplicate for seamless loop
  const doubled = [...photographers, ...photographers];

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div ref={trackRef} className="flex gap-[22px] py-5 will-change-transform">
        {doubled.map((p, i) => (
          <PhotographerCard key={`${p.id}-${i}`} photographer={p} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar({ stats }: { stats: HomePhotographersSectionData["stats"] }) {
  const items = [
    { value: stats.verifiedPhotographers, label: "Verified photographers" },
    { value: stats.citiesWorldwide,       label: "Cities worldwide" },
    { value: stats.momentsArchived,       label: "Moments archived" },
    { value: stats.humanUploaded,         label: "Human-uploaded" },
  ];
  return (
    <div className="max-w-[1320px] mx-auto px-10 mt-[80px] pt-[40px] border-t border-line grid grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-serif text-[52px] leading-[1] tracking-[-0.03em] text-ink">{item.value}</p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.06em] uppercase text-ink-soft">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function HomePhotographersSection({ data }: HomePhotographersSectionProps) {
  return (
    <section id="photogs" className="bg-bg-soft py-[160px] overflow-hidden">
      {/* Head */}
      <div className="max-w-[1320px] mx-auto px-10 mb-[70px]">
        <div className="grid grid-cols-2 gap-[60px] items-end">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.08em] uppercase text-ink-soft mb-6">
              <span className="block w-[18px] h-px bg-ink-soft" />
              {data.eyebrow}
            </div>
            <h2
              className="font-serif font-normal leading-[1] tracking-[-0.02em] text-ink mt-5"
              style={{ fontSize: "clamp(40px, 5vw, 68px)" }}
            >
              {data.headlinePart1}{" "}
              <span className="block">
                by <em className="italic">{data.headlineEmphasis}</em>.
              </span>
            </h2>
          </div>
          <p className="text-[15.5px] text-ink-soft max-w-[420px] leading-[1.55]">
            {data.description}
          </p>
        </div>
      </div>

      {/* Marquee */}
      <PhotographerMarquee photographers={data.photographers} />

      {/* Stats */}
      <StatsBar stats={data.stats} />
    </section>
  );
}

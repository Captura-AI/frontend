"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  type HomePhotographersSection as HomePhotographersSectionData,
  type HomePhotographer,
} from "@/domains/home/entities/HomePage";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";

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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const items = [
    { value: stats.verifiedPhotographers, label: "Verified photographers" },
    { value: stats.citiesWorldwide,       label: "Cities worldwide" },
    { value: stats.momentsArchived,       label: "Moments archived" },
    { value: stats.humanUploaded,         label: "Human-uploaded" },
  ];
  return (
    <div ref={ref} className="max-w-[1320px] mx-auto px-10 mt-[80px] pt-[40px] border-t border-line grid grid-cols-2 md:grid-cols-4 gap-y-10">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cn("reveal", isVisible && "is-visible")}
          style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
        >
          <p className="font-serif text-[52px] leading-[1] tracking-[-0.03em] text-ink">{item.value}</p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.06em] uppercase text-ink-soft">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Become a photographer CTA ─────────────────────────────────────────────────

function BecomePhotographerCta() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("max-w-[1320px] mx-auto px-10 mt-[60px] reveal-scale", isVisible && "is-visible")}>
      <div className="relative overflow-hidden rounded-[14px] border border-line bg-bg px-10 py-12 grid grid-cols-1 md:grid-cols-[1.4fr_auto] gap-10 items-center">
        <span
          className="pointer-events-none absolute -right-24 -top-24 w-[280px] h-[280px] rounded-full"
          style={{ background: "var(--color-accent-soft)" }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft mb-4">
            <span className="block w-[18px] h-px bg-ink-soft" />
            For street photographers
          </div>
          <h3
            className="font-serif font-normal leading-[1.05] tracking-[-0.02em] text-ink"
            style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}
          >
            Turn your <em className="italic text-accent">street eye</em> into a profile.
          </h3>
          <p className="mt-4 text-[14.5px] leading-[1.6] text-ink-soft max-w-[460px]">
            Set your areas and specialties, let our AI handle plate, vehicle, and tag matching, and
            keep 70% of every sale.
          </p>
        </div>
        <Link
          href="/onboarding/photographer"
          className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full border border-ink bg-ink px-7 py-[14px] text-[13.5px] font-medium text-bg-soft transition-transform duration-200 hover:-translate-y-0.5"
        >
          Become a photographer
        </Link>
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function HomePhotographersSection({ data }: HomePhotographersSectionProps) {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="photogs" className="bg-bg-soft py-[160px] overflow-hidden">
      {/* Head */}
      <div ref={headRef} className={cn("max-w-[1320px] mx-auto px-10 mb-[70px] reveal", headVisible && "is-visible")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-end">
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
                by <em className="italic text-accent">{data.headlineEmphasis}</em>.
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

      {/* Become a photographer CTA */}
      <BecomePhotographerCta />
    </section>
  );
}

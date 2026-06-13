"use client";

import Image from "next/image";
import Link from "next/link";
import { type SimilarMoment } from "@/domains/explorer";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";
import { ExplorerSectionHead } from "./ExplorerSectionHead";

interface ExplorerDetailSimilarProps {
  moments: SimilarMoment[];
  headingContext: string; // e.g. "this corner of Tokyo"
  meta: string;          // e.g. "Same neighborhood · golden hour"
}

function SimilarCard({ moment, delay }: { moment: SimilarMoment; delay: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      href={`/explorer/${moment.id}`}
      className={cn(
        "group relative overflow-hidden rounded-[8px] block transition-transform duration-500 [cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 reveal",
        isVisible && "is-visible",
      )}
      style={{ aspectRatio: "4/5", "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <Image
        src={moment.imageUrl}
        alt={moment.caption}
        fill
        sizes="(max-width: 1080px) 50vw, 25vw"
        className="object-cover transition-transform duration-1000 [cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
      />

      {/* City · time badge */}
      <span
        className="absolute top-3 left-3 z-10 font-mono text-[10px] tracking-[0.06em] uppercase text-bg-soft rounded-[3px] px-2 py-1 whitespace-nowrap"
        style={{ background: "rgba(20,19,17,0.34)", backdropFilter: "blur(6px)" }}
      >
        {moment.city} · {moment.time}
      </span>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,19,17,0.6) 100%)" }}
      />

      {/* Caption */}
      <p className="absolute bottom-[14px] left-[14px] right-[14px] z-10 font-serif italic text-[14px] leading-[1.2] text-bg-soft opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-[350ms]">
        {moment.caption}
      </p>
    </Link>
  );
}

export function ExplorerDetailSimilar({ moments, headingContext, meta }: ExplorerDetailSimilarProps) {
  return (
    <section>
      <ExplorerSectionHead heading="More from" emphasis={headingContext} meta={meta} />

      <div className="grid grid-cols-2 gap-[18px] mt-9 md:grid-cols-4">
        {moments.map((m, i) => (
          <SimilarCard key={m.id} moment={m} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

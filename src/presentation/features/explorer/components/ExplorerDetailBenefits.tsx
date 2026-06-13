"use client";

import Link from "next/link";
import { type BenefitItem, type BenefitIconId } from "@/domains/explorer";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";
import { ExplorerSectionHead } from "./ExplorerSectionHead";

// ─── Icon lookup ──────────────────────────────────────────────────────────────

function BenefitIcon({ id }: { id: BenefitIconId }) {
  const props = {
    className: "w-[30px] h-[30px] text-ink mb-4",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
  } as const;

  switch (id) {
    case "download":
      return <svg {...props}><path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/></svg>;
    case "edition":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>;
    case "split":
      return (
        <svg {...props}>
          <path d="M3 7l9-4 9 4-9 4-9-4z"/>
          <path d="M3 12l9 4 9-4M3 17l9 4 9-4"/>
        </svg>
      );
    case "ownership":
      return (
        <svg {...props}>
          <path d="M12 22s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/>
          <circle cx="12" cy="11" r="2.5"/>
        </svg>
      );
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ExplorerDetailBenefitsProps {
  benefits: BenefitItem[];
}

function BenefitCard({ benefit, delay }: { benefit: BenefitItem; delay: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "p-[22px] border border-line rounded-[12px] bg-bg-soft transition-[transform,border-color] duration-[350ms] [cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-[3px] hover:border-ink-soft reveal",
        isVisible && "is-visible",
      )}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <BenefitIcon id={benefit.iconId} />
      <p className="font-serif text-[21px] tracking-[-0.01em] leading-[1.15]">
        {benefit.titlePrefix}
        <em className="italic text-accent">{benefit.titleEmphasis}</em>
      </p>
      <p className="mt-2 text-[13.5px] text-ink-soft leading-[1.5]">{benefit.description}</p>
    </div>
  );
}

export function ExplorerDetailBenefits({ benefits }: ExplorerDetailBenefitsProps) {
  return (
    <section>
      <ExplorerSectionHead heading="What you receive" meta="Every license" />

      <div className="grid grid-cols-2 gap-[18px] md:grid-cols-4">
        {benefits.map((b, i) => (
          <BenefitCard key={b.iconId} benefit={b} delay={i * 80} />
        ))}
      </div>

      <Link
        href="/licenses"
        className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-ink transition-colors hover:text-accent"
      >
        View full license terms <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

"use client";

import Link from "next/link";
import { type HomeCta } from "@/domains/home/entities/HomePage";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";

interface HomeCtaSectionProps {
  cta: HomeCta;
}

// ─── Decorative floating photo frame ─────────────────────────────────────────

function Frame({
  label,
  style,
  gradient,
  delay,
  visible,
}: {
  label: string;
  style: React.CSSProperties;
  gradient: string;
  delay: number;
  visible: boolean;
}) {
  return (
    <div
      className={cn("absolute overflow-hidden rounded-[6px] border border-line reveal-scale hidden md:block", visible && "is-visible")}
      style={{
        boxShadow: "0 20px 50px -20px rgba(20,19,17,0.18)",
        background: "#E8E2D5",
        "--reveal-delay": `${delay}ms`,
        ...style,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0" style={{ background: gradient }} />
      <div
        className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.06em] uppercase text-ink rounded-[3px] px-[6px] py-[3px]"
        style={{ background: "rgba(251,250,246,0.85)" }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function HomeCtaSection({ cta }: HomeCtaSectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden text-center pt-[220px] pb-[180px]">
      {/* Radial gradient background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(183,101,61,0.08), transparent 70%), radial-gradient(ellipse 40% 30% at 50% 30%, rgba(183,101,61,0.05), transparent 70%)",
        }}
      />

      {/* f1: top:15% left:6% rotate(-7deg) 180x220 */}
      <Frame
        label="Tokyo · 17:04"
        gradient="repeating-linear-gradient(45deg, #CFC9B9 0 2px, #C4BEAE 2px 12px)"
        style={{ top: "15%", left: "6%", width: 180, height: 220, transform: "rotate(-7deg)" }}
        delay={0}
        visible={isVisible}
      />
      {/* f2: top:10% right:8% rotate(5deg) 160x200 */}
      <Frame
        label="Lisbon · 19:22"
        gradient="repeating-linear-gradient(135deg, #C9A993 0 2px, #BFA089 2px 12px)"
        style={{ top: "10%", right: "8%", width: 160, height: 200, transform: "rotate(5deg)" }}
        delay={90}
        visible={isVisible}
      />
      {/* f3: bottom:15% left:12% rotate(4deg) 150x190 */}
      <Frame
        label="NYC · 14:48"
        gradient="repeating-linear-gradient(90deg, #A8AEB0 0 2px, #9FA6A9 2px 12px)"
        style={{ bottom: "15%", left: "12%", width: 150, height: 190, transform: "rotate(4deg)" }}
        delay={180}
        visible={isVisible}
      />
      {/* f4: bottom:18% right:7% rotate(-5deg) 170x210 */}
      <Frame
        label="Paris · 09:30"
        gradient="repeating-linear-gradient(60deg, #D8D2C4 0 2px, #CFC9BB 2px 12px)"
        style={{ bottom: "18%", right: "7%", width: 170, height: 210, transform: "rotate(-5deg)" }}
        delay={270}
        visible={isVisible}
      />

      {/* Centre content */}
      <div ref={ref} className={cn("relative z-10 max-w-[1320px] mx-auto px-10 reveal", isVisible && "is-visible")}>
        <div className="inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.08em] uppercase text-ink-soft mb-[40px]">
          <span className="block w-[18px] h-px bg-ink-soft" />
          {cta.eyebrow}
        </div>

        <h2
          className="font-serif font-normal leading-[0.95] tracking-[-0.03em] text-ink mx-auto mb-[48px]"
          style={{ fontSize: "clamp(56px, 8vw, 100px)", maxWidth: "16ch" }}
        >
          {cta.headlinePart1}{" "}
          <span className="block">
            {cta.headlinePart2}{" "}
            <em className="italic text-accent">{cta.headlineEmphasis}</em>.
          </span>
        </h2>

        <div className="inline-flex items-center gap-[14px]">
          <Link
            href={cta.primaryCtaHref}
            className="inline-flex items-center gap-[10px] rounded-full bg-ink text-bg-soft px-7 py-[15px] text-[14.5px] font-medium transition-[transform,background] duration-300 hover:-translate-y-0.5 hover:bg-black"
          >
            {cta.primaryCtaLabel}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href={cta.secondaryCtaHref}
            className="inline-flex items-center rounded-full border border-line text-ink px-7 py-[15px] text-[14.5px] font-medium transition-[background,color,border-color] duration-300 hover:bg-ink hover:text-bg-soft hover:border-ink"
          >
            {cta.secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

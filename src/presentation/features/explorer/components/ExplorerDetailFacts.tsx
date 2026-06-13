"use client";

import { type DetailFact } from "@/domains/explorer";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";

interface ExplorerDetailFactsProps {
  facts: DetailFact[];
}

export function ExplorerDetailFacts({ facts }: ExplorerDetailFactsProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 reveal", isVisible && "is-visible")}
    >
      {facts.map((fact) => (
        <div key={fact.key} className="p-5.5 border border-line rounded-xl bg-bg-soft">
          <div className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft mb-2.5">
            {fact.key}
          </div>
          <div className="font-serif text-[22px] tracking-[-0.01em] leading-[1.15]">
            {fact.value}
            <small className="block font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft mt-1 font-normal not-italic">
              {fact.sub}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

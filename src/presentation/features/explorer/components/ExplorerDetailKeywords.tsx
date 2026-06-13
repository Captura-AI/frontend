"use client";

import Link from "next/link";
import { type Keyword } from "@/domains/explorer";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";
import { ExplorerSectionHead } from "./ExplorerSectionHead";

interface ExplorerDetailKeywordsProps {
  keywords: Keyword[];
}

export function ExplorerDetailKeywords({ keywords }: ExplorerDetailKeywordsProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section>
      <ExplorerSectionHead heading="Keywords" meta="Browse similar" />

      <div ref={ref} className={cn("flex flex-wrap gap-2 reveal", isVisible && "is-visible")}>
        {keywords.map((kw) => (
          <Link
            key={`${kw.category}-${kw.label}`}
            href={`/explorer?${kw.category}=${encodeURIComponent(kw.label.toLowerCase())}`}
            className="group inline-flex items-center px-[13px] py-[7px] rounded-full border border-line bg-bg-soft text-[13px] text-ink transition-all duration-200 hover:bg-ink hover:text-bg-soft hover:border-ink cursor-pointer"
          >
            <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft mr-[6px] group-hover:text-[rgba(251,250,246,0.6)] transition-colors">
              {kw.category}
            </span>
            {kw.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

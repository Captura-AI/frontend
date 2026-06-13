"use client";

import Link from "next/link";
import { type HomeStoriesSection as HomeStoriesSectionData, type HomeStory } from "@/domains/home/entities/HomePage";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { cn } from "@/presentation/lib/utils";

interface HomeStoriesSectionProps {
  data: HomeStoriesSectionData;
}

const CARD_GRADIENTS = [
  "repeating-linear-gradient(135deg, #CFC9B9 0 2px, #C4BEAE 2px 14px)",
  "repeating-linear-gradient(45deg, #C9A993 0 2px, #BFA089 2px 14px)",
  "repeating-linear-gradient(90deg, #A8AEB0 0 2px, #9FA6A9 2px 14px)",
];

// First story is featured (spans 2 columns, taller) to break the uniform grid
const FEATURED_ASPECT = "16/11";
const STANDARD_ASPECT = "3/4";

function StoryCard({ story, index, featured }: { story: HomeStory; index: number; featured?: boolean }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[10px] bg-bg-soft cursor-pointer transition-transform duration-500 hover:-translate-y-[6px]",
        featured && "md:col-span-2",
      )}
      style={{ aspectRatio: featured ? FEATURED_ASPECT : STANDARD_ASPECT }}
    >
      {/* Photo layer with stripe gradient and overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.06]"
          style={{ background: gradient }}
        />
        {/* Gradient overlay bottom shadow */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)" }}
        />
      </div>

      {/* Timestamp badge top-left */}
      <div className="absolute top-[18px] left-[18px] z-10 font-mono text-[10.5px] tracking-[0.06em] uppercase text-[#F5F2EC] rounded-[4px] px-[10px] py-[6px]"
        style={{ background: "rgba(20,19,17,0.35)", backdropFilter: "blur(8px)" }}
      >
        {story.timestamp}
      </div>

      {/* Arrow badge top-right — shows on hover */}
      <div className="absolute top-[22px] right-[22px] z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
        style={{ background: "rgba(245,242,236,0.9)" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 11L11 3M5 3h6v6" stroke="#141311" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Card body — absolute bottom */}
      <div className="absolute bottom-[22px] left-[22px] right-[22px] z-10 text-[#F5F2EC]">
        <p
          className="font-serif leading-[1.05] tracking-[-0.01em]"
          style={{ fontSize: featured ? "clamp(30px, 3.4vw, 44px)" : "30px" }}
        >
          {story.titleLine1}<br />{story.titleLine2}
        </p>
        <p className="mt-1.5 text-[13px] opacity-80">
          {story.photoCount} photos · {story.photographerCount} photographers
        </p>
      </div>
    </article>
  );
}

export function HomeStoriesSection({ data }: HomeStoriesSectionProps) {
  const { ref: headRef, isVisible: headVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="scenarios" className="bg-bg py-[160px]">
      <div className="max-w-[1320px] mx-auto px-10">
        {/* Eyebrow + quote */}
        <div ref={headRef} className={cn("reveal", headVisible && "is-visible")}>
          <div className="inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.08em] uppercase text-ink-soft mb-6">
            <span className="block w-[18px] h-px bg-ink-soft" />
            {data.eyebrow}
          </div>
          <p
            className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-ink mb-[90px] max-w-[900px]"
            style={{ fontSize: "clamp(36px, 4.2vw, 56px)" }}
          >
            {data.bodyPart1}{" "}
            <em className="italic text-accent">{data.bodyEmphasis}</em>
            {data.bodyPart2}
          </p>
        </div>

        {/* Bento story grid — first story is featured (2-col span) */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.stories.map((story, i) => (
            <Link
              key={story.id}
              href={`/stories/${story.id}`}
              className={cn(
                "block reveal",
                gridVisible && "is-visible",
                i === 0 && "md:col-span-2",
              )}
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <StoryCard story={story} index={i} featured={i === 0} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

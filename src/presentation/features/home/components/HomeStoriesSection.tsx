import Link from "next/link";
import { type HomeStoriesSection as HomeStoriesSectionData, type HomeStory } from "@/domains/home/entities/HomePage";

interface HomeStoriesSectionProps {
  data: HomeStoriesSectionData;
}

const CARD_GRADIENTS = [
  "repeating-linear-gradient(135deg, #CFC9B9 0 2px, #C4BEAE 2px 14px)",
  "repeating-linear-gradient(45deg, #C9A993 0 2px, #BFA089 2px 14px)",
  "repeating-linear-gradient(90deg, #A8AEB0 0 2px, #9FA6A9 2px 14px)",
];

function StoryCard({ story, index }: { story: HomeStory; index: number }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  return (
    <article className="group relative overflow-hidden rounded-[10px] bg-bg-soft cursor-pointer transition-transform duration-500 hover:-translate-y-[6px]" style={{ aspectRatio: "3/4" }}>
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
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M5 3h6v6" stroke="#141311" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Card body — absolute bottom */}
      <div className="absolute bottom-[22px] left-[22px] right-[22px] z-10 text-[#F5F2EC]">
        <p className="font-serif text-[30px] leading-[1.05] tracking-[-0.01em]">
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
  return (
    <section id="scenarios" className="bg-bg py-[160px]">
      <div className="max-w-[1320px] mx-auto px-10">
        {/* Eyebrow + quote */}
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

        {/* 3-col story grid */}
        <div className="grid grid-cols-3 gap-6">
          {data.stories.map((story, i) => (
            <Link key={story.id} href={`/stories/${story.id}`} className="block">
              <StoryCard story={story} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

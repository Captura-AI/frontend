import { type DetectedItem } from "@/domains/explorer";
import { ExplorerSectionHead } from "./ExplorerSectionHead";

interface ExplorerDetailStoryProps {
  paragraphs: string[];
  detectedItems: DetectedItem[];
}

export function ExplorerDetailStory({ paragraphs, detectedItems }: ExplorerDetailStoryProps) {
  return (
    <section>
      <ExplorerSectionHead heading="The story" emphasis="behind the frame" meta="By the photographer" />

      <div className="grid gap-15 mt-7" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
        {/* Story text */}
        <div>
          {paragraphs.map((p, i) => (
            <p key={i} className={`text-[16.5px] leading-[1.65] text-ink max-w-[60ch] ${i > 0 ? "mt-4" : ""}`}>
              {p}
            </p>
          ))}
        </div>

        {/* Detected data aside */}
        <div className="border-l border-line pl-7.5">
          <p className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft mb-3.5">
            Detected, gently
          </p>
          <ul>
            {detectedItems.map((item, i) => (
              <li
                key={item.key}
                className={`flex justify-between gap-3 text-[14px] py-2.5 ${i < detectedItems.length - 1 ? "border-b border-line-soft" : ""}`}
              >
                <span className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft">
                  {item.key}
                </span>
                <span className="font-serif italic text-[16px] text-right">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

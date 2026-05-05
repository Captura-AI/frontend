import type { StudioHeaderStats } from "@/domains/studio";

interface Props {
  stats: StudioHeaderStats;
}

const STAT_ITEMS = (stats: StudioHeaderStats) => [
  { value: stats.inQueue, label: "In queue" },
  { value: stats.aiParsed, label: "AI parsed" },
  { value: stats.needReview, label: "Need review" },
];

export default function StudioPageHeader({ stats }: Props) {
  return (
    <div className="px-7 pt-9.5 pb-4.5 flex items-end justify-between gap-6 flex-wrap">
      <div className="min-w-0 flex-1">
        <h1
          className="font-serif font-normal text-[40px] leading-[1.08] tracking-[-0.02em] max-w-160 text-pretty"
        >
          Upload your roll.{" "}
          <em className="italic text-accent">The AI handles the metadata</em>.
        </h1>
        <p className="mt-2.5 text-ink-soft text-[14.5px] max-w-140">
          Drag in tonight&apos;s frames. Captura reads each license plate,
          classifies the vehicle, drops the GPS pin, and writes a first-draft
          caption — you just polish and price.
        </p>
      </div>

      <div className="flex gap-5.5 pb-1.5">
        {STAT_ITEMS(stats).map((s) => (
          <div key={s.label} className="whitespace-nowrap">
            <div className="font-serif text-[26px] tracking-[-0.02em] leading-none">
              {s.value}
            </div>
            <div className="font-mono text-[9.5px] tracking-[0.08em] uppercase text-ink-soft mt-1.25">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

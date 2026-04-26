import { type ExplorerTitleBlock } from "@/domains/explorer";

interface ExplorerTitleSectionProps {
  data: ExplorerTitleBlock;
}

export function ExplorerTitleSection({ data }: ExplorerTitleSectionProps) {
  return (
    <section className="pt-[110px] pb-[70px]">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* 2-col grid: 1.4fr 1fr aligned to bottom */}
        <div className="grid gap-[80px] items-end" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-ink-soft before:content-[''] before:w-[18px] before:h-px before:bg-ink-soft">
              {data.eyebrow}
            </span>
            <h1
              className="font-serif font-normal leading-[0.95] tracking-[-0.03em] text-ink mt-[28px]"
              style={{ fontSize: "clamp(56px, 7.4vw, 104px)" }}
            >
              {data.headlinePart1}{" "}
              <em className="italic text-accent">{data.headlineEmphasis}</em>.<br />
              {data.headlinePart2}
            </h1>
          </div>
          <p className="text-[16px] text-ink-soft max-w-[380px] leading-[1.55]">
            {data.description}
          </p>
        </div>

        {/* Stats foot */}
        <div className="mt-[60px] pt-6 border-t border-line flex items-center justify-between font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft">
          <span>
            {data.totalMoments} moments · {data.totalCities} cities · updated {data.lastUpdated}
          </span>
          <div className="flex gap-9">
            <span>
              Today{" "}
              <b className="font-serif text-[16px] tracking-[-0.01em] normal-case font-normal text-ink">
                {data.todayAdded}
              </b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

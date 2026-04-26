import { type DetailFact } from "@/domains/explorer";

interface ExplorerDetailFactsProps {
  facts: DetailFact[];
}

export function ExplorerDetailFacts({ facts }: ExplorerDetailFactsProps) {
  return (
    <div
      className="grid border border-line rounded-xl overflow-hidden bg-bg-soft"
      style={{ gridTemplateColumns: `repeat(${facts.length}, 1fr)` }}
    >
      {facts.map((fact, i) => (
        <div
          key={fact.key}
          className="p-5.5"
          style={{ borderRight: i < facts.length - 1 ? "1px solid var(--color-line-soft)" : "none" }}
        >
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

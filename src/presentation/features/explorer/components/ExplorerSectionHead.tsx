// Shared section heading used across the detail page
interface ExplorerSectionHeadProps {
  heading: string;
  emphasis?: string;
  meta: string;
}

export function ExplorerSectionHead({ heading, emphasis, meta }: ExplorerSectionHeadProps) {
  return (
    <div className="flex items-end justify-between pt-[60px] pb-[22px] mb-7 border-b border-line-soft">
      <h3 className="font-serif font-normal text-[30px] leading-none tracking-[-0.02em]">
        {heading}
        {emphasis && (
          <> <em className="italic text-accent">{emphasis}</em></>
        )}
      </h3>
      <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft">{meta}</span>
    </div>
  );
}

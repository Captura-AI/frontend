import { cn } from "@/presentation/lib/utils";

interface SectionLabelProps {
  text: string;
  className?: string;
}

/**
 * Renders the "—— SECTION NAME" eyebrow label used across multiple sections.
 */
export function SectionLabel({ text, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink-muted",
        className
      )}
    >
      <span className="h-px w-6 bg-ink-muted" aria-hidden="true" />
      {text}
    </div>
  );
}

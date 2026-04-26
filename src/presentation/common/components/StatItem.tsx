import { cn } from "@/presentation/lib/utils";

interface StatItemProps {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

/**
 * Displays a single statistic: a prominent value with a smaller label beneath.
 * Used in both the Hero stats row and the Photographers stats bar.
 */
export function StatItem({
  value,
  label,
  className,
  valueClassName,
  labelClassName,
}: StatItemProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span
        className={cn(
          "font-serif text-4xl font-normal tracking-tight text-ink",
          valueClassName
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "font-mono text-xs uppercase tracking-widest text-ink-muted",
          labelClassName
        )}
      >
        {label}
      </span>
    </div>
  );
}

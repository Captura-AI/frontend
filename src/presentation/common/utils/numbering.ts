/**
 * Formats a raw numeric string or number for display.
 * Preserves hand-crafted display strings (e.g. "2.4M", "1.2k", "100%").
 *
 * @example
 *   formatDisplayNumber(2400000)  → "2.4M"
 *   formatDisplayNumber(1200)     → "1.2k"
 *   formatDisplayNumber(148)      → "148"
 *   formatDisplayNumber("3,200+") → "3,200+"  (returned as-is)
 */
export function formatDisplayNumber(value: number | string): string {
  if (typeof value === "string") return value;

  if (value >= 1_000_000) {
    const rounded = Math.round((value / 1_000_000) * 10) / 10;
    return `${rounded}M`;
  }
  if (value >= 1_000) {
    const rounded = Math.round((value / 1_000) * 10) / 10;
    return `${rounded}k`;
  }
  return String(value);
}

/**
 * Formats a number with locale-aware comma grouping.
 * @example  formatLocale(3247) → "3,247"
 */
export function formatLocale(value: number): string {
  return value.toLocaleString("en-US");
}

/**
 * Appends a "+" suffix to a formatted number string.
 * @example  formatWithPlus(3200) → "3,200+"
 */
export function formatWithPlus(value: number): string {
  return `${formatLocale(value)}+`;
}

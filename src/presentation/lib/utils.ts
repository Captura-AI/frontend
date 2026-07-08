import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Semantic status tones shared across photographer dashboard badges. */
export type BadgeTone = "neutral" | "accent" | "warning" | "success" | "danger";

/** Formats a numeric value as a plain Rupiah price label, e.g. `Rp 150.000`. */
export function formatPrice(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

/**
 * Resolves the CSS-module class for a badge tone. Takes the component's own CSS
 * module `styles` object so each surface keeps its own class definitions — when
 * a module does not define `badgeDanger` (e.g. the moments page), the lookup
 * falls back to an empty string, matching the original per-component behavior.
 */
export function badgeClass(tone: BadgeTone, styles: Readonly<Record<string, string>>): string {
  switch (tone) {
    case "accent":
      return styles.badgeAccent ?? "";
    case "warning":
      return styles.badgeWarning ?? "";
    case "success":
      return styles.badgeSuccess ?? "";
    case "danger":
      return styles.badgeDanger ?? "";
    case "neutral":
      return "";
  }
}

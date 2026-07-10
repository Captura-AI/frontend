/** Formats a numeric amount as a localized currency string (Indonesian locale). */
export function formatPrice(value: number, currency: string): string {
  return new Intl.NumberFormat("id-ID", {
    currency,
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

/**
 * Canonical Indonesian Rupiah formatter for buyer- and photographer-facing
 * amounts, e.g. `Rp 150.000`.
 */
export function formatIdr(amount: number): string {
  return formatPrice(amount, "IDR");
}

/** Formats an integer count with Indonesian thousands separators. */
export function formatCount(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

/** Renders a star string for an average rating, or `New` when unrated. */
export function ratingStars(averageRating: number | null): string {
  if (averageRating === null) {
    return "New";
  }

  return "★".repeat(Math.max(1, Math.round(averageRating)));
}

/** Splits a location string into trimmed, non-empty parts, defaulting to Indonesia. */
export function locationParts(location: string | null): string[] {
  if (!location) {
    return ["Indonesia"];
  }

  return location.split(/[·,]/).map((part) => part.trim()).filter(Boolean);
}

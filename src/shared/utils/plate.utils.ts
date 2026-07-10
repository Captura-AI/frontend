/**
 * Masks a license plate for public display, keeping the region prefix and the
 * first two characters of the first segment while hiding the rest.
 */
export function maskPlate(plate: string): string {
  const parts = plate.trim().split(/\s+/);

  if (parts.length < 2) {
    return `${plate.slice(0, 2)}** ***`;
  }

  const [prefix, ...rest] = parts;
  const masked = rest.map((part, i) => (i === 0 ? `${part.slice(0, 2)}**` : "***"));

  return `${prefix} ${masked.join(" ")}`;
}

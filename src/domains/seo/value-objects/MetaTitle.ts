const MIN_LENGTH = 10;
const MAX_LENGTH = 70;

export function validateMetaTitle(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length < MIN_LENGTH) {
    throw new Error(
      `MetaTitle must be at least ${MIN_LENGTH} characters. Got: "${trimmed}"`
    );
  }
  if (trimmed.length > MAX_LENGTH) {
    throw new Error(
      `MetaTitle must not exceed ${MAX_LENGTH} characters. Got: ${trimmed.length}`
    );
  }
  return trimmed;
}

const MIN_LENGTH = 50;
const MAX_LENGTH = 160;

export function validateMetaDescription(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length < MIN_LENGTH) {
    throw new Error(
      `MetaDescription must be at least ${MIN_LENGTH} characters. Got: ${trimmed.length}`
    );
  }
  if (trimmed.length > MAX_LENGTH) {
    throw new Error(
      `MetaDescription must not exceed ${MAX_LENGTH} characters. Got: ${trimmed.length}`
    );
  }
  return trimmed;
}

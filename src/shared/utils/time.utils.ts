const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86_400;

/** Current unix timestamp in whole seconds. */
export function nowInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

/** Relative "x ago" label derived from a unix-second timestamp. */
export function formatTimeAgo(seconds: number): string {
  const elapsed = Math.max(0, nowInSeconds() - seconds);

  if (elapsed < SECONDS_PER_MINUTE) {
    return "just now";
  }

  if (elapsed < SECONDS_PER_HOUR) {
    const minutes = Math.floor(elapsed / SECONDS_PER_MINUTE);

    return `${minutes} min ago`;
  }

  if (elapsed < SECONDS_PER_DAY) {
    const hours = Math.floor(elapsed / SECONDS_PER_HOUR);

    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(elapsed / SECONDS_PER_DAY);

  return `${days} day${days > 1 ? "s" : ""} ago`;
}

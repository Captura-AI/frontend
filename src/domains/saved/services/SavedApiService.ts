import { serverApiRequest } from "@/shared/api/serverApi";

import type { ExplorerActiveFilter } from "@/domains/explorer";
import type {
  AccountSavedPage,
  AccountSavedSearchesPage,
  SavedMoment,
  SavedSearch,
} from "../entities/SavedPage";

interface BackendSavedMoment {
  id: string;
  momentId: string;
  imageUrl: string | null;
  title: string;
  photographerName: string;
  city: string | null;
  capturedAt: number | null;
  savedAt: number;
  priceUsd: number | null;
  momentSlug: string | null;
}

interface BackendSavedSearch {
  id: string;
  label: string;
  summary: string | null;
  query: string | null;
  filters: ExplorerActiveFilter[];
  resultCount: number;
  createdAt: number;
}

const IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f1eee8'/%3E%3Cpath d='M112 276h376L386 146l-76 92-48-54-150 92Z' fill='%23cbc3b4'/%3E%3Ccircle cx='188' cy='132' r='34' fill='%23d8d1c5'/%3E%3C/svg%3E";

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86_400;

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "Asia/Jakarta",
});

function nowInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

/** "17:42 · Apr 12" style capture label, or empty when unknown. */
function formatCaptureLabel(seconds: number | null): string {
  if (seconds === null) {
    return "";
  }

  const date = new Date(seconds * 1000);

  return `${clockFormatter.format(date)} · ${dateFormatter.format(date)}`;
}

function formatTimeAgo(seconds: number): string {
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

function mapSavedMoment(moment: BackendSavedMoment): SavedMoment {
  return {
    city: moment.city ?? "",
    id: moment.momentId,
    imageUrl: moment.imageUrl ?? IMAGE_PLACEHOLDER,
    momentHref: `/explorer/${moment.momentSlug ?? moment.momentId}`,
    photographerName: moment.photographerName,
    priceUsd: moment.priceUsd ?? 0,
    savedAt: formatTimeAgo(moment.savedAt),
    time: formatCaptureLabel(moment.capturedAt),
    title: moment.title,
  };
}

function mapSavedSearch(search: BackendSavedSearch): SavedSearch {
  return {
    createdAt: formatTimeAgo(search.createdAt),
    filters: search.filters,
    id: search.id,
    label: search.label,
    query: search.query ?? "",
    resultCount: search.resultCount,
    summary: search.summary ?? "",
  };
}

function distinctCityCount(items: SavedMoment[]): number {
  return new Set(items.map((item) => item.city).filter(Boolean)).size;
}

function averagePrice(items: SavedMoment[]): number {
  const priced = items.filter((item) => item.priceUsd > 0);

  if (priced.length === 0) {
    return 0;
  }

  const total = priced.reduce((sum, item) => sum + item.priceUsd, 0);

  return Math.round(total / priced.length);
}

function buildStats(items: SavedMoment[]): AccountSavedPage["stats"] {
  const newest = items[0];
  const cities = distinctCityCount(items);
  const avg = averagePrice(items);

  return [
    {
      label: "Saved moments",
      value: String(items.length),
      helper: cities > 0 ? `Across ${cities} ${cities === 1 ? "city" : "cities"}` : "Across Indonesia",
    },
    {
      label: "Newest save",
      value: newest ? newest.savedAt : "—",
      helper: newest?.city || "Nothing saved yet",
    },
    {
      label: "Avg. price",
      value: avg > 0 ? `$${avg}` : "—",
      helper: "Personal license tier",
    },
  ];
}

export async function getAccountSavedPageContent(): Promise<AccountSavedPage> {
  const response = await serverApiRequest<BackendSavedMoment[]>("/saved/moments", {
    auth: true,
    revalidate: false,
  });
  const items = response.map(mapSavedMoment);

  return {
    emptyState: {
      title: "Nothing saved yet.",
      description:
        "Tap the bookmark icon on any Explorer result or moment detail page to keep it here for later.",
      ctaLabel: "Open Explorer",
      ctaHref: "/explorer",
    },
    header: {
      title: "Moments you wanted to",
      emphasis: "remember",
      description:
        "Frames you flagged from Explorer or a moment detail page, kept here until you're ready to license or revisit them.",
    },
    items,
    stats: buildStats(items),
  };
}

export async function getAccountSavedSearchesPageContent(): Promise<AccountSavedSearchesPage> {
  const response = await serverApiRequest<BackendSavedSearch[]>("/saved/searches", {
    auth: true,
    revalidate: false,
  });

  return {
    emptyState: {
      title: "No saved searches yet.",
      description:
        "Save a search from Explorer to keep its location, time, vehicle, plate, and visual filters ready for next time.",
      ctaLabel: "Open Explorer",
      ctaHref: "/explorer",
    },
    header: {
      title: "Searches worth",
      emphasis: "running again",
      description:
        "Saved parameters — location, time window, vehicle, plate partial, and visual description — ready to rerun the moment new frames come in.",
    },
    items: response.map(mapSavedSearch),
  };
}

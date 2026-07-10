import { serverApiRequest } from "@/shared/api/serverApi";
import { ApiError } from "@/shared/api/envelope";
import { JAKARTA_TIME_ZONE } from "@/shared/config/datetime.config";
import { formatTimeAgo } from "@/shared/utils/time.utils";

import type {
  ActivePhotographer,
  FeedMoment,
  Hotspot,
  HotspotLevel,
  HotspotPage,
} from "../entities/HotspotPage";
import type { HotspotDetail } from "../entities/HotspotDetail";

interface BackendFeedMoment {
  id: string;
  imageUrl: string | null;
  caption: string;
  photographerName: string;
  capturedAt: number | null;
  createdAt: number;
  tags: string[];
}

interface BackendActivePhotographer {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface BackendHotspotStats {
  active: number;
  last15: number;
  total: number;
}

interface BackendHotspotSummary {
  id: string;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  level: HotspotLevel;
  title: string;
  meta: string;
  count: number;
  active: number;
  last15: number;
  total: number;
}

interface BackendRegionStats {
  activePhotographers: number;
  momentsCapturedToday: number;
  goldenHourTime: string;
  goldenHourLocation: string;
}

interface BackendHotspotPage {
  region: string;
  regionCode: string;
  center: [number, number];
  defaultHotspotId: string;
  hotspots: BackendHotspotSummary[];
  feedMoments: BackendFeedMoment[];
  activePhotographers: BackendActivePhotographer[];
  regionStats: BackendRegionStats;
}

interface BackendHotspotDetail {
  id: string;
  slug: string;
  name: string;
  region: string;
  level: HotspotLevel;
  title: string;
  meta: string;
  description: string;
  heroImageUrl: string | null;
  stats: BackendHotspotStats;
  bestTimeLabel: string;
  bestTimeWindow: string;
  popularTags: string[];
  activePhotographers: BackendActivePhotographer[];
  latestMoments: BackendFeedMoment[];
}

const IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f1eee8'/%3E%3Cpath d='M112 276h376L386 146l-76 92-48-54-150 92Z' fill='%23cbc3b4'/%3E%3Ccircle cx='188' cy='132' r='34' fill='%23d8d1c5'/%3E%3C/svg%3E";

const AVATAR_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23e7e2d8'/%3E%3Ccircle cx='60' cy='46' r='22' fill='%23c9c1b2'/%3E%3Cpath d='M20 110a40 40 0 0 1 80 0Z' fill='%23c9c1b2'/%3E%3C/svg%3E";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  timeZone: JAKARTA_TIME_ZONE,
});

/** Wall-clock label (HH:MM, Jakarta time) for a captured/created moment. */
function formatClock(seconds: number): string {
  return timeFormatter.format(new Date(seconds * 1000));
}

function mapFeedMoment(moment: BackendFeedMoment): FeedMoment {
  const timestamp = moment.capturedAt ?? moment.createdAt;

  return {
    caption: moment.caption,
    id: moment.id,
    imageUrl: moment.imageUrl ?? IMAGE_PLACEHOLDER,
    photographerName: moment.photographerName,
    tags: moment.tags,
    time: formatClock(timestamp),
    timeAgo: formatTimeAgo(moment.createdAt),
  };
}

function mapActivePhotographer(photographer: BackendActivePhotographer): ActivePhotographer {
  return {
    avatarUrl: photographer.avatarUrl ?? AVATAR_PLACEHOLDER,
    id: photographer.id,
    name: photographer.name,
  };
}

function mapHotspot(summary: BackendHotspotSummary): Hotspot {
  return {
    active: summary.active,
    count: summary.count,
    id: summary.id,
    last15: summary.last15,
    lat: summary.latitude,
    level: summary.level,
    lng: summary.longitude,
    meta: summary.meta,
    name: summary.name,
    title: summary.title,
    total: summary.total,
  };
}

export async function getHotspotPageContent(): Promise<HotspotPage> {
  const response = await serverApiRequest<BackendHotspotPage>("/hotspots", {
    revalidate: false,
  });

  return {
    activePhotographers: response.activePhotographers.map(mapActivePhotographer),
    center: response.center,
    defaultHotspotId: response.defaultHotspotId,
    feedMoments: response.feedMoments.map(mapFeedMoment),
    hotspots: response.hotspots.map(mapHotspot),
    region: response.region,
    regionCode: response.regionCode,
    regionStats: response.regionStats,
  };
}

export async function getHotspotDetailBySlug(slug: string): Promise<HotspotDetail | null> {
  try {
    const detail = await serverApiRequest<BackendHotspotDetail>(
      `/hotspots/${encodeURIComponent(slug)}`,
      { revalidate: false },
    );

    return {
      activePhotographers: detail.activePhotographers.map(mapActivePhotographer),
      bestTimeLabel: detail.bestTimeLabel,
      bestTimeWindow: detail.bestTimeWindow,
      description: detail.description,
      heroImageUrl: detail.heroImageUrl ?? IMAGE_PLACEHOLDER,
      id: detail.id,
      latestMoments: detail.latestMoments.map(mapFeedMoment),
      level: detail.level,
      meta: detail.meta,
      name: detail.name,
      popularTags: detail.popularTags,
      region: detail.region,
      stats: detail.stats,
      title: detail.title,
    };
  } catch (error) {
    if (isNotFound(error)) {
      return null;
    }

    throw error;
  }
}

function isNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}

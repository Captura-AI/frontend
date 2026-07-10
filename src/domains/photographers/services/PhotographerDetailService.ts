import { ApiError } from "@/shared/api/envelope";
import { serverApiRequest } from "@/shared/api/serverApi";
import { JAKARTA_TIME_ZONE } from "@/shared/config/datetime.config";
import { formatCount, formatPrice, locationParts, ratingStars } from "@/shared/utils/format.utils";

import {
  type PhotographerDetail,
  type PhotographerHotspot,
  type PhotographerLatestMoment,
  type PhotographerPackage,
  type PhotographerPortfolioItem,
  type PhotographerReview,
  type PhotographerStat,
} from "../entities/PhotographersPage";

interface BackendPhotographerMoment {
  capturedAt: number | null;
  category: string;
  city: string | null;
  district: string | null;
  id: string;
  imageUrl: string | null;
  licensePlate: string | null;
  slug: string | null;
  tags: string[];
  title: string;
  vehicleType: string | null;
}

interface BackendPhotographerPackage {
  currency: string;
  description: string | null;
  duration: string;
  id: string;
  includes: string[];
  name: string;
  price: number;
}

interface BackendPhotographerReview {
  authorName: string;
  context: string | null;
  id: string;
  quote: string;
  rating: number;
}

interface BackendPhotographerStats {
  averageRating: number | null;
  momentsCount: number;
  packagesCount: number;
  reviewsCount: number;
}

interface BackendPhotographerDetail {
  avatarUrl: string | null;
  bio: string | null;
  id: string;
  isApproved: boolean;
  latestMoments: BackendPhotographerMoment[];
  location: string | null;
  name: string;
  packages: BackendPhotographerPackage[];
  portfolio: BackendPhotographerMoment[];
  reviews: BackendPhotographerReview[];
  slug: string;
  stats: BackendPhotographerStats;
}

const IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23f1eee8'/%3E%3Cpath d='M154 418h592L590 202l-110 136-78-84-248 164Z' fill='%23cbc3b4'/%3E%3Ccircle cx='282' cy='204' r='54' fill='%23d8d1c5'/%3E%3C/svg%3E";

function formatTime(timestamp: number | null): string {
  if (!timestamp) {
    return "Time pending";
  }

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: JAKARTA_TIME_ZONE,
  }).format(new Date(timestamp * 1000));
}

function mapPortfolioItem(moment: BackendPhotographerMoment): PhotographerPortfolioItem {
  const location = [moment.district, moment.city].filter(Boolean).join(" · ") || "Location pending";

  return {
    category: moment.category,
    id: moment.id,
    imageUrl: moment.imageUrl ?? IMAGE_PLACEHOLDER,
    location,
    momentHref: `/explorer/${moment.id}`,
    time: formatTime(moment.capturedAt),
    title: moment.title,
  };
}

function mapLatestMoment(moment: BackendPhotographerMoment): PhotographerLatestMoment {
  const location = [moment.district, moment.city].filter(Boolean).join(" · ") || "Location pending";

  return {
    href: `/explorer/${moment.id}`,
    id: moment.id,
    imageUrl: moment.imageUrl ?? IMAGE_PLACEHOLDER,
    meta: `${location} · ${formatTime(moment.capturedAt)}`,
    title: moment.title,
  };
}

function mapPackage(item: BackendPhotographerPackage): PhotographerPackage {
  return {
    description: item.description ?? "The photographer has not added a package description yet.",
    duration: item.duration,
    includes: item.includes,
    name: item.name,
    price: formatPrice(item.price, item.currency),
  };
}

function mapReview(item: BackendPhotographerReview): PhotographerReview {
  return {
    author: item.authorName,
    context: item.context ?? `${item.rating}/5 session rating`,
    quote: item.quote,
  };
}

function mapStats(detail: BackendPhotographerDetail): PhotographerStat[] {
  const averageRating = detail.stats.averageRating;

  return [
    {
      emphasized: true,
      label: "Moments captured",
      value: formatCount(detail.stats.momentsCount),
    },
    { label: "Packages", value: formatCount(detail.stats.packagesCount) },
    { label: "Reviews", value: formatCount(detail.stats.reviewsCount) },
    { label: "Average rating", value: averageRating === null ? "New" : averageRating.toFixed(1) },
  ];
}

function mapHotspots(detail: BackendPhotographerDetail): PhotographerHotspot[] {
  const districts = new Map<string, number>();

  detail.portfolio.forEach((moment) => {
    const key = moment.district ?? moment.city;

    if (key) {
      districts.set(key, (districts.get(key) ?? 0) + 1);
    }
  });

  return Array.from(districts.entries()).map(([area, count]) => ({
    area,
    bestTime: "Based on latest uploaded moments",
    cadence: `${formatCount(count)} indexed moments`,
    name: `${area} activity`,
  }));
}

function mapDetail(detail: BackendPhotographerDetail): PhotographerDetail {
  const parts = locationParts(detail.location);
  const city = parts[0] ?? "Indonesia";
  const area = parts.slice(1).join(" · ") || city;
  const heroImageUrl = detail.portfolio[0]?.imageUrl ?? IMAGE_PLACEHOLDER;
  const averageRating = detail.stats.averageRating;

  return {
    area,
    avatarUrl: detail.avatarUrl ?? IMAGE_PLACEHOLDER,
    bio: detail.bio ?? "This approved photographer has not added a public bio yet.",
    bookingAnchor: "#booking",
    city,
    headline: `Capturing ${area} with real Captura moments.`,
    heroImageUrl,
    hotspots: mapHotspots(detail),
    latestMoments: detail.latestMoments.map(mapLatestMoment),
    name: detail.name,
    packages: detail.packages.map(mapPackage),
    philosophy:
      detail.bio ?? "Portfolio, package, and review details are synced from the Captura API.",
    portfolio: detail.portfolio.map(mapPortfolioItem),
    rating: ratingStars(averageRating),
    ratingMeta:
      averageRating === null
        ? `No reviews yet · ${detail.stats.reviewsCount}`
        : `${averageRating.toFixed(1)} · ${detail.stats.reviewsCount}`,
    reviews: detail.reviews.map(mapReview),
    searchHref: `/explorer?photographer=${detail.slug}`,
    slug: detail.slug,
    specialties: Array.from(new Set(detail.portfolio.flatMap((moment) => moment.tags))).slice(0, 4),
    stats: mapStats(detail),
  };
}

export async function getPhotographerDetail(slug: string): Promise<PhotographerDetail | null> {
  try {
    const detail = await serverApiRequest<BackendPhotographerDetail>(
      `/photographers/slug/${encodeURIComponent(slug)}`,
      { revalidate: false }
    );

    return mapDetail(detail);
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

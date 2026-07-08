import { serverApiRequest } from "@/shared/api/serverApi";
import { formatCount, formatPrice, locationParts, ratingStars } from "@/shared/utils/format.utils";

import { type PhotographerProfile, type PhotographersPage } from "../entities/PhotographersPage";

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

interface BackendPhotographerStats {
  averageRating: number | null;
  momentsCount: number;
  packagesCount: number;
  reviewsCount: number;
}

interface BackendPhotographerDirectoryItem {
  avatarUrl: string | null;
  bio: string | null;
  id: string;
  isApproved: boolean;
  latestMoments: BackendPhotographerMoment[];
  location: string | null;
  name: string;
  packages: BackendPhotographerPackage[];
  slug: string;
  stats: BackendPhotographerStats;
}

interface BackendPhotographersResponse {
  data: BackendPhotographerDirectoryItem[];
  limit: number;
  offset: number;
  total: number;
}

const IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f1eee8'/%3E%3Cpath d='M112 276h376L386 146l-76 92-48-54-150 92Z' fill='%23cbc3b4'/%3E%3Ccircle cx='188' cy='132' r='34' fill='%23d8d1c5'/%3E%3C/svg%3E";

function mapPhotographer(profile: BackendPhotographerDirectoryItem): PhotographerProfile {
  const parts = locationParts(profile.location);
  const firstPackage = profile.packages[0];
  const latestImages = profile.latestMoments
    .map((moment) => moment.imageUrl)
    .filter((imageUrl): imageUrl is string => Boolean(imageUrl));
  const averageRating = profile.stats.averageRating;
  const ratingMeta =
    averageRating === null
      ? `No reviews yet · ${profile.stats.reviewsCount}`
      : `${averageRating.toFixed(1)} · ${profile.stats.reviewsCount}`;

  return {
    avatarUrl: profile.avatarUrl ?? IMAGE_PLACEHOLDER,
    hourlyRate: firstPackage ? formatPrice(firstPackage.price, firstPackage.currency) : "Rates pending",
    isLive: profile.latestMoments.length > 0,
    momentsCaptured: formatCount(profile.stats.momentsCount),
    mutedStars: averageRating === null ? undefined : "★".repeat(Math.max(0, 5 - Math.round(averageRating))),
    name: profile.name,
    quote: profile.bio ?? "Portfolio details are being prepared by this photographer.",
    ratingMeta,
    ratingStars: ratingStars(averageRating),
    sessionsBooked: formatCount(profile.stats.reviewsCount),
    slug: profile.slug,
    spec: parts.join(" · "),
    tags: profile.latestMoments.flatMap((moment) => moment.tags).slice(0, 3),
    thumbnails:
      latestImages.length > 0
        ? latestImages
        : [IMAGE_PLACEHOLDER, IMAGE_PLACEHOLDER, IMAGE_PLACEHOLDER],
  };
}

function buildFilters(profiles: BackendPhotographerDirectoryItem[], total: number) {
  const counts = profiles.reduce<Map<string, number>>((acc, profile) => {
    const city = locationParts(profile.location)[0] ?? "Indonesia";

    acc.set(city, (acc.get(city) ?? 0) + 1);

    return acc;
  }, new Map<string, number>());

  return [
    { label: "All", count: formatCount(total) },
    ...Array.from(counts.entries()).map(([label, count]) => ({
      count: formatCount(count),
      label,
    })),
  ];
}

export async function getPhotographersPageContent(): Promise<PhotographersPage> {
  const response = await serverApiRequest<BackendPhotographersResponse>(
    "/photographers?limit=24&offset=1",
    { revalidate: false }
  );
  const photographers = response.data.map(mapPhotographer);

  return {
    booking: {
      brief:
        "Tell the photographer what you want to remember, which street matters, and whether any vehicle or plate privacy constraints need attention.",
      description:
        "Choose a photographer, a window of light, and a stretch of city. Booking requests will route into the photographer workflow as the supply-side module matures.",
      eyebrow: "Private booking · request-first",
      headline: "Book a session.",
      headlineEmphasis: "Walk a street.",
      locations: ["Pick from the photographer profile", "Share a custom route"],
      quote: "Reviews and booking stories will appear as photographers receive real sessions.",
      quoteBy: "Captura sessions",
      sessionTypes: ["Personal", "Family", "Vehicle", "Event"],
      timeSlots: [
        { label: "06:30 dawn" },
        { label: "09:00 morning" },
        { label: "17:00 golden hour" },
        { label: "18:30 dusk" },
      ],
    },
    filters: buildFilters(response.data, response.total),
    hero: {
      description:
        "Independent street photographers with approved Captura profiles. Browse real portfolios, packages, reviews, and recently indexed moments from the API.",
      eyebrow: `The directory · ${formatCount(response.total)} photographers · Indonesia`,
      headline: "Meet the eyes",
      headlineEmphasis: "behind the lens",
      stats: [
        { emphasized: true, label: "Approved photographers", value: formatCount(response.total) },
        { label: "Profiles on this page", value: formatCount(photographers.length) },
        { label: "Avg session rating", value: "API-backed" },
      ],
    },
    photographers,
    sortLabel: "Newest approved profiles",
    visibleCountLabel: `Showing ${formatCount(photographers.length)} of ${formatCount(response.total)}`,
  };
}

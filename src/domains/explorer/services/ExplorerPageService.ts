import { serverApiRequest } from "@/shared/api/serverApi";
import { type ExplorerActiveFilter, type ExplorerMoment, type ExplorerPage } from "../entities/ExplorerPage";

type SearchParamsValue = string | string[] | undefined;

export type ExplorerSearchParams = Record<string, SearchParamsValue>;

interface BackendPaginate<T> {
  content: T[];
  meta?: {
    hasNextPage?: boolean;
    page?: number;
    size?: number;
    totalData?: number;
  };
}

interface BackendMoment {
  id: string;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  capturedAt?: number | null;
  caption?: string | null;
  city?: string | null;
  district?: string | null;
  description?: string | null;
  licensePlate?: string | null;
  tags?: string[] | null;
  vehicleType?: string | null;
  photographer?: {
    firstName?: string | null;
    lastName?: string | null;
  } | null;
}

interface BackendMomentSearchMatch {
  isPlateMatch: boolean;
  isSemanticMatch: boolean;
  label: "semantic" | "plate-exact" | "plate-partial" | "text" | "recent";
  score: number;
}

interface BackendMomentSearchResult {
  match: BackendMomentSearchMatch;
  moment: BackendMoment;
}

interface BackendSearchBody {
  licensePlate?: string;
  limit: number;
  location?: {
    city?: string;
    district?: string;
  };
  offset: number;
  query?: string;
  vehicleTypes?: string[];
}

const PARAM_LABELS: Record<string, string> = {
  area: "area",
  location: "where",
  photographer: "photographer",
  plate: "plate",
  q: "query",
  time: "when",
  vehicleType: "vehicle",
};

function firstParam(value: SearchParamsValue): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function cleanParam(value: SearchParamsValue): string | undefined {
  const rawValue = firstParam(value)?.trim();

  return rawValue ? rawValue : undefined;
}

function parsePositiveInt(value: SearchParamsValue, fallback: number): number {
  const parsed = Number(cleanParam(value));

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function formatCapturedTime(capturedAt?: number | null): string {
  if (!capturedAt) {
    return "Time TBA";
  }

  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(new Date(capturedAt * 1000));
}

function formatScore(score: number): string {
  return `${Math.round(Math.min(Math.max(score, 0), 1) * 100)}%`;
}

function photographerName(moment: BackendMoment): string {
  const names = [moment.photographer?.firstName, moment.photographer?.lastName].filter(
    (name): name is string => Boolean(name)
  );

  return names.length > 0 ? names.join(" ") : "Captura photographer";
}

function toBackendSearchBody(searchParams: ExplorerSearchParams): BackendSearchBody {
  const query = cleanParam(searchParams["q"]);
  const location = cleanParam(searchParams["location"]);
  const plate = cleanParam(searchParams["plate"]);
  const vehicleType = cleanParam(searchParams["vehicleType"]);
  const page = parsePositiveInt(searchParams["page"], 1);
  const limit = Math.min(parsePositiveInt(searchParams["limit"], 12), 100);

  return {
    ...(query ? { query } : {}),
    ...(location ? { location: { city: location } } : {}),
    ...(plate ? { licensePlate: plate } : {}),
    ...(vehicleType ? { vehicleTypes: [vehicleType] } : {}),
    limit,
    offset: page,
  };
}

function buildActiveFilters(searchParams: ExplorerSearchParams): ExplorerActiveFilter[] {
  return Object.entries(PARAM_LABELS).flatMap(([key, keyLabel]) => {
    const value = cleanParam(searchParams[key]);

    return value ? [{ key, keyLabel, value }] : [];
  });
}

function toExplorerMoment(result: BackendMomentSearchResult): ExplorerMoment {
  const { match, moment } = result;
  const city = [moment.city, moment.district].filter(Boolean).join(" · ") || "Location TBA";
  const sceneTags = moment.tags?.slice(0, 3) ?? [];

  return {
    id: moment.id,
    imageUrl: moment.thumbnailUrl ?? moment.imageUrl ?? "/window.svg",
    city,
    time: formatCapturedTime(moment.capturedAt),
    match:
      match.label === "plate-partial"
        ? { type: "partial", label: "Plate · partial" }
        : { type: "match", score: formatScore(match.score) },
    plateIndicator: match.isPlateMatch ? moment.licensePlate ?? "Plate match" : undefined,
    sceneTags,
    vehicleType: moment.vehicleType ?? undefined,
    captionLine1: moment.caption ?? moment.description ?? "A searchable Captura moment.",
    captionLine2: `By ${photographerName(moment)}`,
  };
}

/**
 * Returns static mock content for the Explorer page.
 *
 * TODO: When the backend is ready, replace with a call to ExplorerRepository:
 *   import { createExplorerRepository } from "@/infrastructure/repositories/ExplorerRepository";
 *   const repo = createExplorerRepository(httpClient);
 *   return repo.getExplorerPageContent(filters);
 */
function getStaticExplorerPageContent(): ExplorerPage {
  return {
    title: {
      eyebrow: "Explorer · a quiet search",
      headlinePart1: "Explore",
      headlineEmphasis: "moments",
      headlinePart2: "Not metadata.",
      description:
        "Trace the outline of a day. A color, a street corner, a motorcycle that passed at dusk. Captura remembers what cameras saw — softly, and only when asked.",
      totalMoments: "2,418,602",
      totalCities: 148,
      lastUpdated: "04:02 UTC",
      todayAdded: "+4,210",
    },

    searchPlaceholder: "A red jacket, Shibuya crossing, just before the rain…",

    facets: [
      {
        key: "location",
        label: "Where",
        displayValue: "Shibuya",
        type: "options",
        optionGroups: [
          {
            heading: "City or district",
            options: [
              { label: "Shibuya, Tokyo", value: "shibuya" },
              { label: "Lisbon", value: "lisbon" },
              { label: "Paris", value: "paris" },
              { label: "Brooklyn", value: "brooklyn" },
              { label: "Berlin", value: "berlin" },
              { label: "Seoul", value: "seoul" },
            ],
          },
          {
            heading: "Context",
            options: [
              { label: "Crosswalk", value: "crosswalk" },
              { label: "Café", value: "cafe" },
              { label: "Subway", value: "subway" },
              { label: "Alley", value: "alley" },
              { label: "Plaza", value: "plaza" },
            ],
          },
        ],
      },
      {
        key: "time",
        label: "When",
        displayValue: "golden hour",
        type: "time",
        optionGroups: [
          {
            heading: "Mood",
            options: [
              { label: "Quiet morning", value: "morning" },
              { label: "Golden hour", value: "golden" },
              { label: "Blue hour", value: "blue" },
              { label: "Rainy evening", value: "rain" },
              { label: "Neon night", value: "neon" },
            ],
          },
        ],
      },
      {
        key: "vehicle",
        label: "Vehicle",
        displayValue: "Motorcycle",
        type: "options",
        optionGroups: [
          {
            heading: "Vehicle",
            options: [
              { label: "Motorcycle", value: "motorcycle" },
              { label: "Bicycle", value: "bicycle" },
              { label: "Car", value: "car" },
              { label: "Tram", value: "tram" },
              { label: "Scooter", value: "scooter" },
              { label: "On foot", value: "walking" },
            ],
          },
        ],
      },
      {
        key: "vehicleType",
        label: "Type",
        displayValue: "Café racer",
        type: "options",
        optionGroups: [
          {
            heading: "Motorcycle type",
            options: [
              { label: "Café racer", value: "cafe-racer" },
              { label: "Sport bike", value: "sport-bike" },
              { label: "Scooter", value: "scooter-type" },
              { label: "Cruiser", value: "cruiser" },
              { label: "Trail bike", value: "trail-bike" },
              { label: "Moped", value: "moped" },
            ],
          },
          {
            heading: "Car type",
            options: [
              { label: "Sedan", value: "sedan" },
              { label: "SUV", value: "suv" },
              { label: "Hatchback", value: "hatchback" },
              { label: "Van", value: "van" },
            ],
          },
        ],
      },
      {
        key: "plate",
        label: "Plate",
        displayValue: "63 · BH · N_",
        type: "plate",
        plateValue: "63 · BH · N_",
        optionGroups: [
          {
            heading: "Match mode",
            options: [
              { label: "Allow partials", value: "partial" },
              { label: "Fuzzy read", value: "fuzzy" },
              { label: "Exact plate", value: "exact" },
              { label: "Region code only", value: "region" },
            ],
          },
        ],
      },
    ],

    activeFilters: [
      { key: "location", keyLabel: "where",   value: "Shibuya · crosswalk" },
      { key: "time",     keyLabel: "when",     value: "Golden hour" },
      { key: "vehicle",  keyLabel: "vehicle",  value: "Motorcycle" },
      { key: "vehicleType", keyLabel: "type",  value: "Café racer" },
      { key: "plate",    keyLabel: "plate",    value: "63 · BH · N_" },
    ],

    results: {
      headlinePart1: "Moments that look",
      headlineEmphasis: "a lot like yours",
      count: "482 quiet matches",
      loadMoreLabel: "A few more moments",
      loadMoreCount: "+ 470",
      moments: [
        {
          id: "m-1",
          imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=900&q=80&auto=format&fit=crop",
          city: "Shibuya", time: "18:04",
          match: { type: "match", score: "96%" },
          captionLine1: "Seen near Shibuya, just before dusk.",
          captionLine2: "By Ayaka Mori",
        },
        {
          id: "m-2",
          imageUrl: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900&q=80&auto=format&fit=crop",
          city: "Lisbon", time: "19:22",
          match: null,
          captionLine1: "A silver café racer pulled to the curb.",
          captionLine2: "By Tomás Vieira",
        },
        {
          id: "m-3",
          imageUrl: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=900&q=80&auto=format&fit=crop",
          city: "Amsterdam", time: "08:12",
          match: null,
          captionLine1: "Quiet commuters, a bell ringing.",
          captionLine2: "By Rens de Boer",
        },
        {
          id: "m-4",
          imageUrl: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?w=900&q=80&auto=format&fit=crop",
          city: "Paris", time: "09:48",
          match: null,
          captionLine1: "Marais on a Tuesday, walking as if no one was looking.",
          captionLine2: "By Léa Béranger",
        },
        {
          id: "m-5",
          imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=900&q=80&auto=format&fit=crop",
          city: "Tokyo", time: "21:30",
          match: { type: "match", score: "88%" },
          captionLine1: "A red umbrella threaded through the neon.",
          captionLine2: "By Kenji Aoki",
        },
        {
          id: "m-6",
          imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80&auto=format&fit=crop",
          city: "Porto", time: "17:51",
          match: { type: "partial", label: "Plate · partial" },
          captionLine1: "A familiar motorcycle, parked where the light was kindest.",
          captionLine2: "By Inês Ribeiro",
        },
        {
          id: "m-7",
          imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&q=80&auto=format&fit=crop",
          city: "Hong Kong", time: "20:14",
          match: null,
          captionLine1: "Central in a slow drizzle — the street seemed to be breathing.",
          captionLine2: "By Mei Tsang",
        },
        {
          id: "m-8",
          imageUrl: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=900&q=80&auto=format&fit=crop",
          city: "Brooklyn", time: "14:48",
          match: null,
          captionLine1: "Someone passed this street the same way you did.",
          captionLine2: "By Naomi Hall",
        },
        {
          id: "m-9",
          imageUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=900&q=80&auto=format&fit=crop",
          city: "Kyoto", time: "19:02",
          match: null,
          captionLine1: "A rainy evening in Gion — umbrellas, lanterns, no one in a hurry.",
          captionLine2: "By Hana Ueda",
        },
        {
          id: "m-10",
          imageUrl: "https://images.unsplash.com/photo-1441015401724-70d16b783f5c?w=900&q=80&auto=format&fit=crop",
          city: "Copenhagen", time: "07:58",
          match: null,
          captionLine1: "A commute you probably take too — just, a Tuesday ago.",
          captionLine2: "By Mikkel Sørensen",
        },
        {
          id: "m-11",
          imageUrl: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=900&q=80&auto=format&fit=crop",
          city: "Seoul", time: "18:36",
          match: { type: "match", score: "92%" },
          captionLine1: "Hapjeong, right when the signs began to warm.",
          captionLine2: "By Jiho Park",
        },
        {
          id: "m-12",
          imageUrl: "https://images.unsplash.com/photo-1551913902-c92207136625?w=900&q=80&auto=format&fit=crop",
          city: "Berlin", time: "11:02",
          match: null,
          captionLine1: "Kreuzberg — long hair, red coat, a steady stride.",
          captionLine2: "By Jonas Krieger",
        },
      ],
    },
  };
}

export async function getExplorerPageContent(
  searchParams: ExplorerSearchParams = {}
): Promise<ExplorerPage> {
  const fallback = getStaticExplorerPageContent();
  const activeFilters = buildActiveFilters(searchParams);
  const hasSearchParams = activeFilters.length > 0;

  if (!hasSearchParams) {
    return fallback;
  }

  try {
    const response = await serverApiRequest<BackendPaginate<BackendMomentSearchResult>>(
      "/moments/search",
      {
        body: toBackendSearchBody(searchParams),
        method: "POST",
        revalidate: false,
      }
    );
    const moments = response.content.map(toExplorerMoment);
    const totalData = response.meta?.totalData ?? moments.length;
    const hasNextPage = response.meta?.hasNextPage ?? false;

    return {
      ...fallback,
      activeFilters,
      results: {
        ...fallback.results,
        count: `${totalData.toLocaleString("en")} ranked matches`,
        loadMoreCount: hasNextPage ? "More available" : "End of matches",
        moments,
      },
    };
  } catch {
    return {
      ...fallback,
      activeFilters,
      results: {
        ...fallback.results,
        count: "Backend unavailable · showing reference moments",
      },
    };
  }
}

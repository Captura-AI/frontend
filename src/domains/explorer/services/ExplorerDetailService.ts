import { serverApiRequest } from "@/shared/api/serverApi";
import {
  type DetailFact,
  type DetectedItem,
  type ExplorerDetail,
  type Keyword,
  type LicenseOption,
  type SimilarMoment,
} from "../entities/ExplorerDetail";

/**
 * Presentational template used when the backend is unreachable or a moment is
 * missing fields the rich detail UI expects (edition, ratings, benefit copy).
 *
 * Real backend fields override this template in `toExplorerDetail`; template
 * values are never presented as if they were real moment data.
 */
const FALLBACK_DETAIL: ExplorerDetail = {
  id: "m-1",
  breadcrumb: [
    { label: "Explorer", href: "/explorer" },
    { label: "Tokyo · Shibuya", href: "/explorer?where=shibuya" },
    { label: "Golden hour", href: "/explorer?when=golden" },
    { label: "Seen near Shibuya, just before dusk" },
  ],
  image: {
    urls: [
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
      "https://images.unsplash.com/photo-1516382799247-87df95d790b7",
    ],
    badge: "Shibuya · 18:04 · Apr 12, 2026",
    matchBadge: "Match · 96%",
    detection: {
      label: "red jacket · 96%",
      top: "44%",
      left: "40%",
      width: "18%",
      height: "32%",
    },
  },
  photographer: {
    name: "Ayaka Mori",
    city: "Tokyo",
    momentsCount: 412,
    since: "2022",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70&auto=format&fit=crop",
  },
  frameNumber: "№ 01428",
  editionOf: 25,
  titlePrefix: "Seen near Shibuya, ",
  titleEmphasis: "just before dusk",
  description:
    "A red jacket waiting at the scramble crossing — one of those quiet, almost-empty seconds before the lights changed and the city moved again.",
  price: {
    currentUsd: 48,
    wasUsd: 72,
    promoLabel: "−33% · this week",
    defaultLicenseId: "personal",
    licenses: [
      {
        id: "personal",
        title: "Personal print",
        subtitle: "Up to A2 · single use · forever",
        priceUsd: 48,
      },
      {
        id: "editorial",
        title: "Editorial license",
        subtitle: "Web, magazines · credit required",
        priceUsd: 120,
      },
      {
        id: "commercial",
        title: "Commercial",
        subtitle: "Worldwide · 1 year · unlimited",
        priceUsd: 340,
      },
    ],
    resolution: "6720 × 8400",
  },
  facts: [
    { key: "When",    value: "17:42",    sub: "Apr 12, 2026 · Sat" },
    { key: "Where",   value: "Shibuya",  sub: "Scramble crossing · Tokyo" },
    { key: "Camera",  value: "Leica Q2", sub: "35mm · ƒ/2 · 1/200s" },
    { key: "Mood",    value: "Golden hour", sub: "4 min before sunset" },
    { key: "Edition", value: "№ 1 / 25", sub: "Numbered · signed" },
  ],
  storyParagraphs: [
    "I was waiting for the second wave of pedestrians, the one that always feels softer. The light had just touched the curve of the building behind, and a woman in a red jacket stopped a half step before the crossing — like she'd remembered something that didn't need rushing.",
    "Shibuya is famously loud, but the photographs I keep tend to be quiet ones. This is one of those. Not the city, exactly — the small breath the city takes between green lights.",
  ],
  detectedItems: [
    { key: "Subject",   value: "Pedestrian, red jacket" },
    { key: "Vehicle",   value: "None in frame" },
    { key: "Light",     value: "West-facing, soft" },
    { key: "Weather",   value: "Clear, 18°C" },
    { key: "Crowd",     value: "Light · 9 figures" },
    { key: "Plate read", value: "— not in frame —" },
  ],
  keywords: [
    { category: "where",   label: "Shibuya" },
    { category: "where",   label: "Tokyo" },
    { category: "where",   label: "Crosswalk" },
    { category: "when",    label: "Golden hour" },
    { category: "when",    label: "Saturday" },
    { category: "color",   label: "Red" },
    { category: "subject", label: "Pedestrian" },
    { category: "subject", label: "Long hair" },
    { category: "style",   label: "Candid" },
    { category: "style",   label: "Editorial" },
    { category: "camera",  label: "35mm" },
    { category: "mood",    label: "Quiet" },
    { category: "mood",    label: "Reflective" },
  ],
  benefits: [
    {
      iconId: "download",
      titlePrefix: "Instant ",
      titleEmphasis: "download",
      description: "Full-resolution 6720 × 8400 TIFF and web JPG. Yours the moment you check out.",
    },
    {
      iconId: "edition",
      titlePrefix: "Numbered ",
      titleEmphasis: "edition",
      description: "Capped at 25 prints. Each one signed by Ayaka, with a quiet certificate of authenticity.",
    },
    {
      iconId: "split",
      titlePrefix: "Fair ",
      titleEmphasis: "split",
      description: "70% of every sale goes directly to the photographer. No middlemen, no obscure cuts.",
    },
    {
      iconId: "ownership",
      titlePrefix: "Quiet ",
      titleEmphasis: "ownership",
      description: "If it's a moment of you, request the file as a personal keepsake — free, no questions asked.",
    },
  ],
  photographerBlock: {
    name: "Ayaka Mori",
    city: "Tokyo",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&q=80&auto=format&fit=crop",
    quotePrefix: "I photograph the ",
    quoteEmphasis: "half-second before",
    quoteSuffix: " something happens. Cities are loudest right before they go quiet — that's the frame I keep.",
    since: "2022",
    moments: 412,
    editionsSold: 38,
    rating: "4.92",
    reviewCount: 84,
  },
  similar: [
    {
      id: "m-2",
      imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=700&q=80&auto=format&fit=crop",
      city: "Tokyo",
      time: "17:44",
      caption: "The crossing, two frames later.",
    },
    {
      id: "m-5",
      imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=700&q=80&auto=format&fit=crop",
      city: "Shinjuku",
      time: "21:30",
      caption: "A red umbrella in the neon.",
    },
    {
      id: "m-9",
      imageUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=700&q=80&auto=format&fit=crop",
      city: "Kyoto",
      time: "19:02",
      caption: "A rainy evening in Gion.",
    },
    {
      id: "m-7",
      imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=700&q=80&auto=format&fit=crop",
      city: "Hong Kong",
      time: "20:14",
      caption: "Central, slow drizzle.",
    },
  ],
};

// ─── Backend contracts ──────────────────────────────────────────────────────
// Shapes mirror the public NestJS responses. `GET /moments/:id` already masks
// the plate (`licensePlate: "AB***CD"`); full plate is never sent to the client.

interface BackendPhotographerSummary {
  id: string;
  artistName: string;
  bio: string | null;
  location: string | null;
  avatar: string | null;
  totalMoments: number;
}

interface BackendMomentDetail {
  id: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  capturedAt: number | null; // Unix seconds
  caption: string | null;
  description: string | null;
  story: string | null;
  tags: string[] | null;
  cameraInfo: string | null;
  city: string | null;
  district: string | null;
  vehicleType: string | null;
  licensePlate: string | null; // masked at the API layer
  photographerSummary: BackendPhotographerSummary | null;
}

interface BackendMomentLicense {
  id: string;
  licenseTypeId: string | null;
  price: number;
  currency: string;
  isActive: boolean;
}

interface BackendSimilarMoment {
  id: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  capturedAt: number | null;
  caption: string | null;
  city: string | null;
  district: string | null;
}

// ─── Formatting helpers ─────────────────────────────────────────────────────

const JAKARTA_TIME_ZONE = "Asia/Jakarta";
const DETAIL_REVALIDATE_SECONDS = 300;

function formatClockTime(capturedAt: number | null): string {
  if (!capturedAt) {
    return "Time TBA";
  }

  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: JAKARTA_TIME_ZONE,
  }).format(new Date(capturedAt * 1000));
}

function formatCalendarDate(capturedAt: number | null): string {
  if (!capturedAt) {
    return "Date TBA";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: JAKARTA_TIME_ZONE,
  }).format(new Date(capturedAt * 1000));
}

function joinLocation(city: string | null, district: string | null): string {
  const parts = [city, district].filter((part): part is string => Boolean(part));

  return parts.length > 0 ? parts.join(" · ") : "Location TBA";
}

// ─── Field mappers (small, single-responsibility) ───────────────────────────

function toDetailImage(detail: BackendMomentDetail): ExplorerDetail["image"] {
  const primaryUrl = detail.imageUrl ?? detail.thumbnailUrl;
  const badge = `${joinLocation(detail.city, detail.district)} · ${formatClockTime(
    detail.capturedAt
  )} · ${formatCalendarDate(detail.capturedAt)}`;

  return {
    urls: primaryUrl ? [primaryUrl] : FALLBACK_DETAIL.image.urls,
    badge,
    matchBadge: "Captura · original",
  };
}

function toPhotographerInfo(
  summary: BackendPhotographerSummary | null
): ExplorerDetail["photographer"] {
  if (!summary) {
    return FALLBACK_DETAIL.photographer;
  }

  return {
    name: summary.artistName,
    city: summary.location ?? FALLBACK_DETAIL.photographer.city,
    momentsCount: summary.totalMoments,
    since: FALLBACK_DETAIL.photographer.since,
    avatarUrl: summary.avatar ?? FALLBACK_DETAIL.photographer.avatarUrl,
  };
}

function toPhotographerBlock(
  summary: BackendPhotographerSummary | null
): ExplorerDetail["photographerBlock"] {
  if (!summary) {
    return FALLBACK_DETAIL.photographerBlock;
  }

  return {
    ...FALLBACK_DETAIL.photographerBlock,
    name: summary.artistName,
    city: summary.location ?? FALLBACK_DETAIL.photographerBlock.city,
    avatarUrl: summary.avatar ?? FALLBACK_DETAIL.photographerBlock.avatarUrl,
    moments: summary.totalMoments,
  };
}

function toFacts(detail: BackendMomentDetail): DetailFact[] {
  const facts: DetailFact[] = [
    {
      key: "When",
      value: formatClockTime(detail.capturedAt),
      sub: formatCalendarDate(detail.capturedAt),
    },
    {
      key: "Where",
      value: detail.city ?? "Location TBA",
      sub: detail.district ?? "—",
    },
  ];

  if (detail.cameraInfo) {
    facts.push({ key: "Camera", value: detail.cameraInfo, sub: "Capture details" });
  }

  return facts;
}

function toDetectedItems(detail: BackendMomentDetail): DetectedItem[] {
  const items: DetectedItem[] = [];

  if (detail.vehicleType) {
    items.push({ key: "Vehicle", value: detail.vehicleType });
  }

  items.push({ key: "Plate read", value: detail.licensePlate ?? "— not in frame —" });

  const sceneTags = detail.tags?.filter(Boolean) ?? [];

  if (sceneTags.length > 0) {
    items.push({ key: "Scene", value: sceneTags.slice(0, 4).join(", ") });
  }

  return items;
}

function toKeywords(tags: string[] | null): Keyword[] {
  if (!tags || tags.length === 0) {
    return FALLBACK_DETAIL.keywords;
  }

  return tags.slice(0, 12).map((label) => ({ category: "subject", label }));
}

function toStoryParagraphs(story: string | null): string[] {
  if (!story) {
    return FALLBACK_DETAIL.storyParagraphs;
  }

  const paragraphs = story
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length > 0 ? paragraphs : [story.trim()];
}

function toLicenseOption(license: BackendMomentLicense, index: number): LicenseOption {
  return {
    id: license.licenseTypeId ?? license.id,
    title: `License option ${index + 1}`,
    subtitle: license.currency,
    priceUsd: license.price,
  };
}

function toPrice(licenses: BackendMomentLicense[]): ExplorerDetail["price"] {
  const activeLicenses = licenses.filter((license) => license.isActive);

  if (activeLicenses.length === 0) {
    return FALLBACK_DETAIL.price;
  }

  const options = activeLicenses.map(toLicenseOption);
  const lowestPrice = Math.min(...activeLicenses.map((license) => license.price));

  return {
    ...FALLBACK_DETAIL.price,
    currentUsd: lowestPrice,
    wasUsd: lowestPrice,
    promoLabel: "",
    defaultLicenseId: options[0]?.id ?? FALLBACK_DETAIL.price.defaultLicenseId,
    licenses: options,
  };
}

function toSimilarMoment(moment: BackendSimilarMoment): SimilarMoment {
  return {
    id: moment.id,
    imageUrl: moment.thumbnailUrl ?? moment.imageUrl ?? "/window.svg",
    city: joinLocation(moment.city, moment.district),
    time: formatClockTime(moment.capturedAt),
    caption: moment.caption ?? "A searchable Captura moment.",
  };
}

function toBreadcrumb(detail: BackendMomentDetail): ExplorerDetail["breadcrumb"] {
  const title = detail.caption ?? detail.description ?? "Moment detail";

  return [
    { label: "Explorer", href: "/explorer" },
    {
      label: joinLocation(detail.city, detail.district),
      href: `/explorer?location=${encodeURIComponent(detail.city ?? "")}`,
    },
    { label: title },
  ];
}

/**
 * Merges real backend data onto the presentational template. Only fields the
 * backend actually provides are overridden; the rest keep neutral template
 * values so the rich detail UI renders without fabricating moment-specific data.
 */
function toExplorerDetail(
  detail: BackendMomentDetail,
  licenses: BackendMomentLicense[],
  similar: BackendSimilarMoment[]
): ExplorerDetail {
  const headline = detail.caption ?? detail.description ?? FALLBACK_DETAIL.titleEmphasis;
  const similarMoments =
    similar.length > 0 ? similar.map(toSimilarMoment) : FALLBACK_DETAIL.similar;

  return {
    ...FALLBACK_DETAIL,
    id: detail.id,
    breadcrumb: toBreadcrumb(detail),
    image: toDetailImage(detail),
    photographer: toPhotographerInfo(detail.photographerSummary),
    titlePrefix: "",
    titleEmphasis: headline,
    description: detail.description ?? detail.caption ?? FALLBACK_DETAIL.description,
    price: toPrice(licenses),
    facts: toFacts(detail),
    storyParagraphs: toStoryParagraphs(detail.story),
    detectedItems: toDetectedItems(detail),
    keywords: toKeywords(detail.tags),
    photographerBlock: toPhotographerBlock(detail.photographerSummary),
    similar: similarMoments,
  };
}

// ─── Resilient sub-fetches ──────────────────────────────────────────────────
// A missing license list or similar feed must not blank out the real detail,
// so these degrade to empty arrays independently of the primary detail fetch.

async function fetchLicenses(id: string): Promise<BackendMomentLicense[]> {
  try {
    return await serverApiRequest<BackendMomentLicense[]>(`/moments/${id}/licenses`, {
      revalidate: DETAIL_REVALIDATE_SECONDS,
    });
  } catch {
    return [];
  }
}

async function fetchSimilar(id: string): Promise<BackendSimilarMoment[]> {
  try {
    return await serverApiRequest<BackendSimilarMoment[]>(`/moments/${id}/similar`, {
      revalidate: DETAIL_REVALIDATE_SECONDS,
    });
  } catch {
    return [];
  }
}

/**
 * Loads a single moment's detail from the backend, composing the detail,
 * license, and similar endpoints. Falls back to the presentational template if
 * the moment cannot be reached (e.g. backend offline).
 */
export async function getExplorerDetail(id: string): Promise<ExplorerDetail> {
  try {
    const detail = await serverApiRequest<BackendMomentDetail>(`/moments/${id}`, {
      revalidate: DETAIL_REVALIDATE_SECONDS,
    });

    const [licenses, similar] = await Promise.all([fetchLicenses(id), fetchSimilar(id)]);

    return toExplorerDetail(detail, licenses, similar);
  } catch {
    return { ...FALLBACK_DETAIL, id };
  }
}

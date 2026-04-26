import { type ExplorerDetail } from "../entities/ExplorerDetail";

const SHIBUYA_DETAIL: ExplorerDetail = {
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

/**
 * Returns the detail data for a single moment by ID.
 *
 * TODO: When backend is ready, call ExplorerRepository.getMomentDetail(id)
 */
export function getExplorerDetail(id: string): ExplorerDetail {
  // For now, return the Shibuya mock for any id, using the requested id as the record id
  return { ...SHIBUYA_DETAIL, id };
}

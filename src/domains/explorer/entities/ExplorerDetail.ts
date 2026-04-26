// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string; // undefined = current page (no link)
}

export interface DetectionBox {
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

export interface DetailImage {
  urls: string[];       // index 0 = primary; rest = additional thumbs
  badge: string;        // "Shibuya · 18:04 · Apr 12, 2026"
  matchBadge: string;   // "Match · 96%"
  detection?: DetectionBox;
}

export interface DetailPhotographerInfo {
  name: string;
  city: string;
  momentsCount: number;
  since: string;
  avatarUrl: string;
}

export interface LicenseOption {
  id: string;
  title: string;
  subtitle: string;
  priceUsd: number;
}

export interface PriceInfo {
  currentUsd: number;
  wasUsd: number;
  promoLabel: string;
  defaultLicenseId: string;
  licenses: LicenseOption[];
  resolution: string; // "6720 × 8400"
}

export interface DetailFact {
  key: string;
  value: string;
  sub: string;
}

export interface DetectedItem {
  key: string;
  value: string;
}

export interface Keyword {
  category: string; // 'where' | 'when' | 'color' | 'subject' | 'style' | 'camera' | 'mood'
  label: string;
}

export type BenefitIconId = "download" | "edition" | "split" | "ownership";

export interface BenefitItem {
  iconId: BenefitIconId;
  titlePrefix: string;
  titleEmphasis: string;
  description: string;
}

export interface DetailPhotographerBlock {
  name: string;
  city: string;
  avatarUrl: string;
  quotePrefix: string;
  quoteEmphasis: string;
  quoteSuffix: string;
  since: string;
  moments: number;
  editionsSold: number;
  rating: string;
  reviewCount: number;
}

export interface SimilarMoment {
  id: string;
  imageUrl: string;
  city: string;
  time: string;
  caption: string;
}

// ─── Full page entity ─────────────────────────────────────────────────────────

export interface ExplorerDetail {
  id: string;
  breadcrumb: BreadcrumbItem[];
  image: DetailImage;
  photographer: DetailPhotographerInfo;
  frameNumber: string;    // "№ 01428"
  editionOf: number;      // 25
  titlePrefix: string;    // "Seen near Shibuya, "
  titleEmphasis: string;  // "just before dusk"
  description: string;
  price: PriceInfo;
  facts: DetailFact[];
  storyParagraphs: string[];
  detectedItems: DetectedItem[];
  keywords: Keyword[];
  benefits: BenefitItem[];
  photographerBlock: DetailPhotographerBlock;
  similar: SimilarMoment[];
}

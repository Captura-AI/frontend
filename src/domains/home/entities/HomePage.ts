// ─── Shared primitives ────────────────────────────────────────────────────────

export interface HomeStat {
  value: string;
  label: string;
}

export interface HomeSearchFilter {
  icon: string;
  label: string;
  value: string;
}

// ─── Hero section ─────────────────────────────────────────────────────────────

export interface HomeHero {
  eyebrow: string;
  headlinePart1: string;
  headlineEmphasis: string;
  headlineSuffix: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stats: HomeStat[];
}

// ─── Search section ───────────────────────────────────────────────────────────

export interface HomeSearchSection {
  headlinePart1: string;
  headlineEmphasis: string;
  headlinePart2: string;
  description: string;
  searchPlaceholder: string;
  filters: HomeSearchFilter[];
  figureLabel: string;
  figureNote: string;
}

// ─── Stories section ──────────────────────────────────────────────────────────

export interface HomeStory {
  id: string;
  timestamp: string;
  titleLine1: string;
  titleLine2: string;
  photoCount: number;
  photographerCount: number;
  imageUrl?: string;
}

export interface HomeStoriesSection {
  eyebrow: string;
  bodyPart1: string;
  bodyEmphasis: string;
  bodyPart2: string;
  stories: HomeStory[];
}

// ─── Photographers section ────────────────────────────────────────────────────

export interface HomePhotographer {
  id: string;
  name: string;
  city: string;
  locationTime: string;
  photoCount: string;
  imageUrl?: string;
}

export interface HomePhotographerStats {
  verifiedPhotographers: string;
  citiesWorldwide: string;
  momentsArchived: string;
  humanUploaded: string;
}

export interface HomePhotographersSection {
  eyebrow: string;
  headlinePart1: string;
  headlineEmphasis: string;
  description: string;
  photographers: HomePhotographer[];
  stats: HomePhotographerStats;
}

// ─── CTA section ──────────────────────────────────────────────────────────────

export interface HomeCta {
  eyebrow: string;
  headlinePart1: string;
  headlinePart2: string;
  headlineEmphasis: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

// ─── Aggregate ────────────────────────────────────────────────────────────────

export interface HomePage {
  hero: HomeHero;
  search: HomeSearchSection;
  stories: HomeStoriesSection;
  photographers: HomePhotographersSection;
  cta: HomeCta;
}

// ─── Legacy (kept for backward compatibility) ─────────────────────────────────

/** @deprecated Use the section-specific types above. */
export interface HomeFeature {
  icon: string;
  title: string;
  description: string;
}

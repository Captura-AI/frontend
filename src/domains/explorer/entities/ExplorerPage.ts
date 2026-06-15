// ─── Facet / filter types ─────────────────────────────────────────────────────

export type FacetType = "options" | "plate" | "time";

export interface FacetOption {
  label: string;
  value: string;
}

export interface ColorSwatch {
  hex: string;
  label: string;
}

export interface ExplorerFacet {
  key: string;           // 'location' | 'time' | 'vehicle' | 'vehicleType' | 'plate'
  label: string;         // 'Where' | 'When' | etc.
  displayValue: string;  // shown in collapsed pill
  type: FacetType;
  optionGroups?: { heading: string; options: FacetOption[] }[];
  swatches?: ColorSwatch[];
  plateValue?: string;
}

// ─── Active filters (displayed in strip) ─────────────────────────────────────

export interface ExplorerActiveFilter {
  key: string;
  keyLabel: string;   // 'where', 'when', etc.
  value: string;      // display text
}

// ─── Title / hero block ───────────────────────────────────────────────────────

export interface ExplorerTitleBlock {
  eyebrow: string;
  headlinePart1: string;
  headlineEmphasis: string;
  headlinePart2: string;
  description: string;
  totalMoments: string;
  totalCities: number;
  lastUpdated: string;
  todayAdded: string;
}

// ─── Results ─────────────────────────────────────────────────────────────────

export type MatchBadge =
  | { type: "match"; score: string }
  | { type: "partial"; label: string }
  | null;

export interface ExplorerMoment {
  id: string;
  imageUrl: string;
  city: string;
  time: string;
  match: MatchBadge;
  plateIndicator?: string;
  sceneTags?: string[];
  vehicleType?: string;
  captionLine1: string;
  captionLine2: string;
}

export interface ExplorerResultsBlock {
  headlinePart1: string;
  headlineEmphasis: string;
  count: string;
  moments: ExplorerMoment[];
  loadMoreLabel: string;
  loadMoreCount: string;
}

// ─── Full page ────────────────────────────────────────────────────────────────

export interface ExplorerPage {
  title: ExplorerTitleBlock;
  searchPlaceholder: string;
  facets: ExplorerFacet[];
  activeFilters: ExplorerActiveFilter[];
  results: ExplorerResultsBlock;
}

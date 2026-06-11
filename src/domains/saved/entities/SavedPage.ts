import type { ExplorerActiveFilter } from "@/domains/explorer";

export interface SavedMoment {
  id: string;
  imageUrl: string;
  title: string;
  photographerName: string;
  city: string;
  time: string;
  savedAt: string;
  priceUsd: number;
  momentHref: string;
}

export interface SavedSearch {
  id: string;
  label: string;
  summary: string;
  createdAt: string;
  resultCount: number;
  query: string;
  filters: ExplorerActiveFilter[];
}

export interface AccountSavedPage {
  header: {
    title: string;
    emphasis: string;
    description: string;
  };
  stats: Array<{
    label: string;
    value: string;
    helper: string;
  }>;
  items: SavedMoment[];
  emptyState: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export interface AccountSavedSearchesPage {
  header: {
    title: string;
    emphasis: string;
    description: string;
  };
  items: SavedSearch[];
  emptyState: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

import type { HotspotLevel, FeedMoment, ActivePhotographer } from "./HotspotPage";

export interface HotspotDetailStats {
  active: number;
  last15: number;
  total: number;
}

export interface HotspotDetail {
  id: string;
  name: string;
  region: string;
  level: HotspotLevel;
  /** HTML string — may contain <em> */
  title: string;
  meta: string;
  description: string;
  heroImageUrl: string;
  stats: HotspotDetailStats;
  bestTimeLabel: string;
  bestTimeWindow: string;
  popularTags: string[];
  activePhotographers: ActivePhotographer[];
  latestMoments: FeedMoment[];
}

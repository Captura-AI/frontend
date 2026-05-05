export type HotspotLevel = "hot" | "warm" | "quiet";

export interface Hotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  count: number;
  level: HotspotLevel;
  /** HTML string — may contain <em> */
  title: string;
  meta: string;
  active: number;
  last15: number;
  total: number;
}

export interface FeedMoment {
  id: string;
  imageUrl: string;
  timeAgo: string;
  caption: string;
  photographerName: string;
  time: string;
  tags: string[];
}

export interface ActivePhotographer {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface RegionStats {
  activePhotographers: number;
  momentsCapturedToday: number;
  goldenHourTime: string;
  goldenHourLocation: string;
}

export interface HotspotPage {
  region: string;
  regionCode: string;
  /** [lat, lng] */
  center: [number, number];
  hotspots: Hotspot[];
  feedMoments: FeedMoment[];
  activePhotographers: ActivePhotographer[];
  regionStats: RegionStats;
  defaultHotspotId: string;
}

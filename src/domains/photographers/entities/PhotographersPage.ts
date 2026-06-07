export interface PhotographerFilter {
  label: string;
  count: string;
}

export interface PhotographerStat {
  value: string;
  label: string;
  emphasized?: boolean;
}

export interface PhotographerProfile {
  slug: string;
  name: string;
  spec: string;
  avatarUrl: string;
  isLive?: boolean;
  ratingStars: string;
  mutedStars?: string;
  ratingMeta: string;
  quote: string;
  thumbnails: string[];
  tags: string[];
  momentsCaptured: string;
  sessionsBooked: string;
  hourlyRate: string;
}

export interface PhotographerPortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  time: string;
  category: string;
  momentHref: string;
}

export interface PhotographerHotspot {
  name: string;
  area: string;
  cadence: string;
  bestTime: string;
}

export interface PhotographerPackage {
  name: string;
  price: string;
  duration: string;
  description: string;
  includes: string[];
}

export interface PhotographerReview {
  quote: string;
  author: string;
  context: string;
}

export interface PhotographerLatestMoment {
  id: string;
  title: string;
  imageUrl: string;
  meta: string;
  href: string;
}

export interface PhotographerDetail {
  slug: string;
  name: string;
  city: string;
  area: string;
  avatarUrl: string;
  heroImageUrl: string;
  rating: string;
  ratingMeta: string;
  specialties: string[];
  headline: string;
  bio: string;
  philosophy: string;
  searchHref: string;
  bookingAnchor: string;
  stats: PhotographerStat[];
  portfolio: PhotographerPortfolioItem[];
  hotspots: PhotographerHotspot[];
  packages: PhotographerPackage[];
  reviews: PhotographerReview[];
  latestMoments: PhotographerLatestMoment[];
}

export interface BookingOption {
  label: string;
  disabled?: boolean;
}

export interface PhotographersPage {
  hero: {
    eyebrow: string;
    headline: string;
    headlineEmphasis: string;
    description: string;
    stats: PhotographerStat[];
  };
  filters: PhotographerFilter[];
  visibleCountLabel: string;
  sortLabel: string;
  photographers: PhotographerProfile[];
  booking: {
    eyebrow: string;
    headline: string;
    headlineEmphasis: string;
    description: string;
    quote: string;
    quoteBy: string;
    sessionTypes: string[];
    timeSlots: BookingOption[];
    locations: string[];
    brief: string;
  };
}

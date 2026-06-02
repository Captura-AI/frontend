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

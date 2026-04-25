export interface HomeFeature {
  icon: string;
  title: string;
  description: string;
}

export interface HomeHero {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface HomePage {
  hero: HomeHero;
  features: HomeFeature[];
}

export type LicenseTierId = "personal" | "editorial" | "commercial";

export interface LicenseTier {
  id: LicenseTierId;
  name: string;
  tagline: string;
  priceLabel: string;
  bestFor: string;
  usageRights: string[];
  restrictions: string[];
  includedFiles: string[];
  creditRequired: boolean;
  creditNote: string;
  refundPolicy: string;
  highlighted?: boolean;
}

export interface LicenseComparisonRow {
  label: string;
  values: [string, string, string];
}

export interface LicenseFaqItem {
  question: string;
  answer: string;
}

export interface LicensesPage {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleEmphasis: string;
    lede: string;
  };
  tiers: LicenseTier[];
  comparisonRows: LicenseComparisonRow[];
  faqs: LicenseFaqItem[];
  upgrade: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

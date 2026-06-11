export type SupportCategoryId =
  | "payment"
  | "download"
  | "license"
  | "refund"
  | "account"
  | "privacy";

export interface SupportCategory {
  id: SupportCategoryId;
  label: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

export interface SupportFaqItem {
  category: SupportCategoryId;
  question: string;
  answer: string;
}

export interface SupportContactChannel {
  label: string;
  description: string;
  actionLabel: string;
  href: string;
}

export interface SupportPage {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleEmphasis: string;
    lede: string;
  };
  categories: SupportCategory[];
  faqs: SupportFaqItem[];
  contact: {
    sectionTitle: string;
    sectionMeta: string;
    channels: SupportContactChannel[];
  };
}

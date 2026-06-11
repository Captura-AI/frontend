export type RemovalRequestTypeId =
  | "remove-photo"
  | "hide-plate"
  | "correct-metadata"
  | "copyright";

export interface RemovalRequestTypeOption {
  id: RemovalRequestTypeId;
  label: string;
  description: string;
}

export interface RemovalProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface RemovalRelatedLink {
  label: string;
  href: string;
  description: string;
}

export interface PrivacyRemovalPage {
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleEmphasis: string;
    lede: string;
  };
  requestTypes: RemovalRequestTypeOption[];
  form: {
    sectionTitle: string;
    sectionMeta: string;
  };
  processSteps: RemovalProcessStep[];
  confirmation: {
    title: string;
    description: string;
    nextSteps: string[];
  };
  relatedLinks: RemovalRelatedLink[];
}

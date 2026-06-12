export type OnboardingStepId = "profile" | "area" | "portfolio" | "pricing" | "review";

export interface OnboardingHero {
  eyebrow: string;
  titlePrefix: string;
  titleEmphasis: string;
  lede: string;
}

export interface OnboardingStepMeta {
  id: OnboardingStepId;
  label: string;
  title: string;
  description: string;
}

export interface OnboardingAreaOption {
  id: string;
  label: string;
  city: string;
}

export interface OnboardingSpecialtyOption {
  id: string;
  label: string;
  description: string;
}

export interface OnboardingAiWorkflowPoint {
  title: string;
  description: string;
}

export interface OnboardingPackageBaseline {
  id: string;
  label: string;
  description: string;
  placeholder: string;
}

export interface OnboardingPayoutChecklistItem {
  id: string;
  label: string;
  description: string;
  status: "pending" | "optional";
}

export interface OnboardingRevenueSplit {
  photographerShare: string;
  platformShare: string;
  description: string;
}

export interface OnboardingCompletion {
  title: string;
  description: string;
  nextSteps: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface OnboardingPhotographerPage {
  hero: OnboardingHero;
  steps: OnboardingStepMeta[];
  areaOptions: OnboardingAreaOption[];
  specialtyOptions: OnboardingSpecialtyOption[];
  aiWorkflow: OnboardingAiWorkflowPoint[];
  packageBaselines: OnboardingPackageBaseline[];
  payoutChecklist: OnboardingPayoutChecklistItem[];
  revenueSplit: OnboardingRevenueSplit;
  completion: OnboardingCompletion;
}

// ─── Form state (wizard input shape, mirrors future onboarding submission payload) ──

export interface OnboardingFormState {
  profile: {
    name: string;
    city: string;
    bio: string;
  };
  areaIds: string[];
  specialtyIds: string[];
  aiWorkflowAcknowledged: boolean;
  packagePrices: Record<string, string>;
  payoutAcknowledged: boolean;
}

export function createInitialOnboardingFormState(): OnboardingFormState {
  return {
    profile: { name: "", city: "", bio: "" },
    areaIds: [],
    specialtyIds: [],
    aiWorkflowAcknowledged: false,
    packagePrices: {},
    payoutAcknowledged: false,
  };
}

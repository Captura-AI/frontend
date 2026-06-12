import { type Metadata } from "next";
import { getOnboardingPhotographerPageContent } from "@/domains/onboarding-photographer";
import { OnboardingPhotographerPageView } from "@/presentation/features/onboarding-photographer";

export const metadata: Metadata = {
  title: "Become a photographer — Captura",
  description:
    "Set up your Captura photographer profile: pick your areas and specialties, preview the AI upload workflow, and get payout-ready.",
};

export default function OnboardingPhotographerPage() {
  const content = getOnboardingPhotographerPageContent();
  return <OnboardingPhotographerPageView content={content} />;
}

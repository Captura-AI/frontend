"use client";

import { useState } from "react";
import {
  createInitialOnboardingFormState,
  type OnboardingFormState,
  type OnboardingPhotographerPage,
} from "@/domains/onboarding-photographer";
import { OnboardingStepper } from "./components/OnboardingStepper";
import { CompletionScreen } from "./components/CompletionScreen";
import { ProfileStep } from "./components/steps/ProfileStep";
import { AreaSpecialtyStep } from "./components/steps/AreaSpecialtyStep";
import { PortfolioStep } from "./components/steps/PortfolioStep";
import { PricingPayoutStep } from "./components/steps/PricingPayoutStep";
import { ReviewStep } from "./components/steps/ReviewStep";
import styles from "./OnboardingPhotographerPage.module.css";

interface OnboardingPhotographerPageViewProps {
  content: OnboardingPhotographerPage;
}

function isStepValid(stepId: string, formState: OnboardingFormState): boolean {
  switch (stepId) {
    case "profile":
      return formState.profile.name.trim().length > 0 && formState.profile.city.trim().length > 0;
    case "area":
      return formState.areaIds.length > 0 && formState.specialtyIds.length > 0;
    case "portfolio":
      return formState.aiWorkflowAcknowledged;
    case "pricing":
      return Object.values(formState.packagePrices).some((value) => value.trim().length > 0);
    default:
      return true;
  }
}

export function OnboardingPhotographerPageView({ content }: OnboardingPhotographerPageViewProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formState, setFormState] = useState<OnboardingFormState>(createInitialOnboardingFormState());
  const [completed, setCompleted] = useState(false);

  const currentStep = content.steps[stepIndex] ?? content.steps[0];

  if (!currentStep) {
    return null;
  }

  const isLastStep = stepIndex === content.steps.length - 1;
  const canContinue = isStepValid(currentStep.id, formState);

  function toggleId(list: string[], id: string): string[] {
    return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
  }

  function handleBack() {
    setStepIndex((index) => Math.max(0, index - 1));
  }

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    if (isLastStep) {
      setCompleted(true);
      return;
    }

    setStepIndex((index) => Math.min(content.steps.length - 1, index + 1));
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
          <h1>
            {content.hero.titlePrefix}
            <em>{content.hero.titleEmphasis}</em> into a profile.
          </h1>
          <p className={styles.lede}>{content.hero.lede}</p>
        </section>

        {completed ? (
          <div className={styles.completionWrap}>
            <CompletionScreen completion={content.completion} />
          </div>
        ) : (
          <div className={styles.layout}>
            <OnboardingStepper currentStepIndex={stepIndex} steps={content.steps} />

            <div className={styles.card}>
              <span className={styles.cardMeta}>
                Step {stepIndex + 1} of {content.steps.length}
              </span>
              <h2 className={styles.cardTitle}>{currentStep.title}</h2>
              <p className={styles.cardDescription}>{currentStep.description}</p>

              <div className={styles.cardBody}>
                {currentStep.id === "profile" ? (
                  <ProfileStep
                    onChange={(profile) => setFormState((state) => ({ ...state, profile }))}
                    profile={formState.profile}
                  />
                ) : null}

                {currentStep.id === "area" ? (
                  <AreaSpecialtyStep
                    areaIds={formState.areaIds}
                    areaOptions={content.areaOptions}
                    onToggleArea={(id) =>
                      setFormState((state) => ({ ...state, areaIds: toggleId(state.areaIds, id) }))
                    }
                    onToggleSpecialty={(id) =>
                      setFormState((state) => ({
                        ...state,
                        specialtyIds: toggleId(state.specialtyIds, id),
                      }))
                    }
                    specialtyIds={formState.specialtyIds}
                    specialtyOptions={content.specialtyOptions}
                  />
                ) : null}

                {currentStep.id === "portfolio" ? (
                  <PortfolioStep
                    acknowledged={formState.aiWorkflowAcknowledged}
                    aiWorkflow={content.aiWorkflow}
                    onToggleAcknowledged={() =>
                      setFormState((state) => ({
                        ...state,
                        aiWorkflowAcknowledged: !state.aiWorkflowAcknowledged,
                      }))
                    }
                  />
                ) : null}

                {currentStep.id === "pricing" ? (
                  <PricingPayoutStep
                    onChangePrice={(id, value) =>
                      setFormState((state) => ({
                        ...state,
                        packagePrices: { ...state.packagePrices, [id]: value },
                      }))
                    }
                    packageBaselines={content.packageBaselines}
                    packagePrices={formState.packagePrices}
                    payoutChecklist={content.payoutChecklist}
                  />
                ) : null}

                {currentStep.id === "review" ? (
                  <ReviewStep content={content} formState={formState} />
                ) : null}
              </div>

              <div className={styles.footerNav}>
                <button
                  className={styles.ghostButton}
                  disabled={stepIndex === 0}
                  onClick={handleBack}
                  type="button"
                >
                  Back
                </button>
                <button
                  className={styles.primaryButton}
                  disabled={!canContinue}
                  onClick={handleContinue}
                  type="button"
                >
                  {isLastStep ? "Complete setup" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

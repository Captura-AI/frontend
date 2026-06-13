import { type OnboardingStepMeta } from "@/domains/onboarding-photographer";
import styles from "../OnboardingPhotographerPage.module.css";

interface OnboardingStepperProps {
  steps: OnboardingStepMeta[];
  currentStepIndex: number;
}

export function OnboardingStepper({ steps, currentStepIndex }: OnboardingStepperProps) {
  const progress = Math.round((currentStepIndex / (steps.length - 1)) * 100);

  return (
    <nav aria-label="Onboarding progress" className={styles.stepper}>
      <div className={styles.stepperProgress}>
        <span className={styles.stepperProgressLabel}>
          Step {currentStepIndex + 1} of {steps.length}
        </span>
        <div
          className={styles.stepperProgressTrack}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Onboarding completion"
        >
          <div className={styles.stepperProgressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ol className={styles.stepperList}>
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isDone = index < currentStepIndex;

          return (
            <li
              className={`${styles.stepperItem} ${isActive ? styles.stepperItemActive : ""} ${
                isDone ? styles.stepperItemDone : ""
              }`}
              key={step.id}
            >
              <span className={styles.stepperDot} aria-hidden="true">
                {isDone ? "✓" : index + 1}
              </span>
              <span className={styles.stepperLabel}>
                <strong>{step.label}</strong>
                <span>{step.description}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

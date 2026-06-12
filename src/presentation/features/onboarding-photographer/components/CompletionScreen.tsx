import Link from "next/link";
import { type OnboardingCompletion } from "@/domains/onboarding-photographer";
import styles from "../OnboardingPhotographerPage.module.css";

interface CompletionScreenProps {
  completion: OnboardingCompletion;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CompletionScreen({ completion }: CompletionScreenProps) {
  return (
    <div className={styles.completionCard}>
      <span className={styles.completionIcon}>
        <CheckIcon />
      </span>
      <h2>{completion.title}</h2>
      <p>{completion.description}</p>
      <ul className={styles.nextStepsList}>
        {completion.nextSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <div className={styles.completionActions}>
        <Link className={styles.primaryButton} href={completion.primaryCtaHref}>
          {completion.primaryCtaLabel}
        </Link>
        <Link className={styles.secondaryButton} href={completion.secondaryCtaHref}>
          {completion.secondaryCtaLabel}
        </Link>
      </div>
    </div>
  );
}

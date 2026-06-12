import {
  type OnboardingFormState,
  type OnboardingPhotographerPage,
} from "@/domains/onboarding-photographer";
import styles from "../../OnboardingPhotographerPage.module.css";

interface ReviewStepProps {
  content: OnboardingPhotographerPage;
  formState: OnboardingFormState;
}

export function ReviewStep({ content, formState }: ReviewStepProps) {
  const areaLabels = content.areaOptions
    .filter((area) => formState.areaIds.includes(area.id))
    .map((area) => area.label);

  const specialtyLabels = content.specialtyOptions
    .filter((specialty) => formState.specialtyIds.includes(specialty.id))
    .map((specialty) => specialty.label);

  const priceLines = content.packageBaselines
    .filter((baseline) => formState.packagePrices[baseline.id])
    .map((baseline) => `${baseline.label}: ${formState.packagePrices[baseline.id]}`);

  return (
    <>
      <div className={styles.reviewList}>
        <div className={styles.reviewItem}>
          <h3>Profile</h3>
          <p>
            {formState.profile.name || "—"} · {formState.profile.city || "—"}
          </p>
          {formState.profile.bio ? <p>{formState.profile.bio}</p> : null}
        </div>

        <div className={styles.reviewItem}>
          <h3>Areas</h3>
          <p>{areaLabels.length > 0 ? areaLabels.join(", ") : "—"}</p>
        </div>

        <div className={styles.reviewItem}>
          <h3>Specialties</h3>
          <p>{specialtyLabels.length > 0 ? specialtyLabels.join(", ") : "—"}</p>
        </div>

        <div className={styles.reviewItem}>
          <h3>Starting prices</h3>
          <p>{priceLines.length > 0 ? priceLines.join(" · ") : "—"}</p>
        </div>
      </div>

      <div className={styles.revenueSplit}>
        <div className={styles.revenueSplitFigure}>
          {content.revenueSplit.photographerShare}
          <span> for you</span>
        </div>
        <p>{content.revenueSplit.description}</p>
      </div>
    </>
  );
}

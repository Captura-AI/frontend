import {
  type OnboardingPackageBaseline,
  type OnboardingPayoutChecklistItem,
} from "@/domains/onboarding-photographer";
import styles from "../../OnboardingPhotographerPage.module.css";

interface PricingPayoutStepProps {
  packageBaselines: OnboardingPackageBaseline[];
  packagePrices: Record<string, string>;
  onChangePrice: (id: string, value: string) => void;
  payoutChecklist: OnboardingPayoutChecklistItem[];
}

export function PricingPayoutStep({
  packageBaselines,
  packagePrices,
  onChangePrice,
  payoutChecklist,
}: PricingPayoutStepProps) {
  return (
    <>
      <div>
        <span className={styles.fieldsetLabel}>
          Starting prices <span>— set at least one, you can change these later</span>
        </span>
        <div className={styles.packageGrid}>
          {packageBaselines.map((baseline) => (
            <div className={styles.packageCard} key={baseline.id}>
              <strong>{baseline.label}</strong>
              <p>{baseline.description}</p>
              <div className={styles.field}>
                <label htmlFor={`price-${baseline.id}`}>Starting price</label>
                <input
                  id={`price-${baseline.id}`}
                  inputMode="numeric"
                  onChange={(event) => onChangePrice(baseline.id, event.target.value)}
                  placeholder={baseline.placeholder}
                  type="text"
                  value={packagePrices[baseline.id] ?? ""}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className={styles.fieldsetLabel}>Payout readiness</span>
        <ul className={styles.checklist}>
          {payoutChecklist.map((item) => (
            <li className={styles.checklistItem} key={item.id}>
              <div>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
              </div>
              <span
                className={`${styles.checklistStatus} ${
                  item.status === "optional" ? styles.checklistStatusOptional : ""
                }`}
              >
                {item.status === "optional" ? "Optional" : "After approval"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

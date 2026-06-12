import {
  type OnboardingAreaOption,
  type OnboardingSpecialtyOption,
} from "@/domains/onboarding-photographer";
import styles from "../../OnboardingPhotographerPage.module.css";

interface AreaSpecialtyStepProps {
  areaOptions: OnboardingAreaOption[];
  specialtyOptions: OnboardingSpecialtyOption[];
  areaIds: string[];
  specialtyIds: string[];
  onToggleArea: (id: string) => void;
  onToggleSpecialty: (id: string) => void;
}

export function AreaSpecialtyStep({
  areaOptions,
  specialtyOptions,
  areaIds,
  specialtyIds,
  onToggleArea,
  onToggleSpecialty,
}: AreaSpecialtyStepProps) {
  return (
    <>
      <fieldset className={styles.chipGrid}>
        <legend className={styles.fieldsetLabel}>
          Areas you cover <span>— pick at least one</span>
        </legend>
        {areaOptions.map((area) => {
          const checked = areaIds.includes(area.id);

          return (
            <label
              className={`${styles.chipCard} ${checked ? styles.chipCardActive : ""}`}
              key={area.id}
            >
              <input
                checked={checked}
                onChange={() => onToggleArea(area.id)}
                type="checkbox"
                value={area.id}
              />
              <strong>{area.label}</strong>
              <p>{area.city}</p>
            </label>
          );
        })}
      </fieldset>

      <fieldset className={styles.chipGrid}>
        <legend className={styles.fieldsetLabel}>
          Specialties <span>— pick at least one</span>
        </legend>
        {specialtyOptions.map((specialty) => {
          const checked = specialtyIds.includes(specialty.id);

          return (
            <label
              className={`${styles.chipCard} ${checked ? styles.chipCardActive : ""}`}
              key={specialty.id}
            >
              <input
                checked={checked}
                onChange={() => onToggleSpecialty(specialty.id)}
                type="checkbox"
                value={specialty.id}
              />
              <strong>{specialty.label}</strong>
              <p>{specialty.description}</p>
            </label>
          );
        })}
      </fieldset>
    </>
  );
}

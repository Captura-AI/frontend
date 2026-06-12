import { type OnboardingFormState } from "@/domains/onboarding-photographer";
import styles from "../../OnboardingPhotographerPage.module.css";

interface ProfileStepProps {
  profile: OnboardingFormState["profile"];
  onChange: (profile: OnboardingFormState["profile"]) => void;
}

export function ProfileStep({ profile, onChange }: ProfileStepProps) {
  return (
    <div className={styles.fieldGrid}>
      <div className={styles.field}>
        <label htmlFor="onboarding-name">Full name</label>
        <input
          id="onboarding-name"
          name="name"
          onChange={(event) => onChange({ ...profile, name: event.target.value })}
          placeholder="e.g. Raka Pratama"
          type="text"
          value={profile.name}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="onboarding-city">
          Home city <span>— where you shoot most often</span>
        </label>
        <input
          id="onboarding-city"
          name="city"
          onChange={(event) => onChange({ ...profile, city: event.target.value })}
          placeholder="e.g. Bandung"
          type="text"
          value={profile.city}
        />
      </div>

      <div className={`${styles.field} ${styles.full}`}>
        <label htmlFor="onboarding-bio">
          Short bio <span>— optional, shown on your public profile</span>
        </label>
        <textarea
          id="onboarding-bio"
          name="bio"
          onChange={(event) => onChange({ ...profile, bio: event.target.value })}
          placeholder="Tell buyers what you shoot and what makes your frames stand out."
          value={profile.bio}
        />
      </div>
    </div>
  );
}

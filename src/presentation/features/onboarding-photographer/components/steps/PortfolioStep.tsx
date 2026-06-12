import { type OnboardingAiWorkflowPoint } from "@/domains/onboarding-photographer";
import styles from "../../OnboardingPhotographerPage.module.css";

interface PortfolioStepProps {
  aiWorkflow: OnboardingAiWorkflowPoint[];
  acknowledged: boolean;
  onToggleAcknowledged: () => void;
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 16V4m0 0L7 9m5-5l5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PortfolioStep({ aiWorkflow, acknowledged, onToggleAcknowledged }: PortfolioStepProps) {
  return (
    <>
      <div className={styles.dropzone}>
        <span className={styles.dropzoneIcon}>
          <UploadIcon />
        </span>
        <strong>Sample portfolio upload</strong>
        <p>
          Drag a few of your best frames here once your profile is approved. For now, this is just a
          preview of your future uploads workflow.
        </p>
      </div>

      <div>
        <span className={styles.fieldsetLabel}>How AI prepares your uploads</span>
        <ol className={styles.aiWorkflowList}>
          {aiWorkflow.map((point, index) => (
            <li className={styles.aiWorkflowItem} key={point.title}>
              <span className={styles.aiWorkflowIcon} aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <strong>{point.title}</strong>
                <p>{point.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <label className={styles.acknowledge}>
        <input checked={acknowledged} onChange={onToggleAcknowledged} type="checkbox" />
        <span>
          <strong>I understand how the AI upload workflow works</strong>
          <p>My uploads will be auto-tagged, masked for privacy, and queued for my review before going live.</p>
        </span>
      </label>
    </>
  );
}

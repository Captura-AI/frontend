"use client";

import { useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  function handleDropzoneClick() {
    inputRef.current?.click();
  }

  function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setSelectedFiles(files);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        style={{ display: "none" }}
        onChange={handleFilesChange}
      />

      <div
        className={styles.dropzone}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        aria-label="Pilih foto sample portfolio"
        onClick={handleDropzoneClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleDropzoneClick();
          }
        }}
      >
        <span className={styles.dropzoneIcon}>
          <UploadIcon />
        </span>
        <strong>Sample portfolio upload</strong>

        {selectedFiles.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, textAlign: "left", width: "100%" }}>
            {selectedFiles.map((file) => (
              <li
                key={file.name}
                style={{
                  fontSize: "12.5px",
                  color: "var(--color-ink)",
                  padding: "4px 8px",
                  background: "var(--color-bg)",
                  borderRadius: "6px",
                  marginTop: "4px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </span>
                <span style={{ color: "var(--color-ink-soft)", flexShrink: 0 }}>
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Drag a few of your best frames here once your profile is approved. For now, this is just a
            preview of your future uploads workflow.
          </p>
        )}
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

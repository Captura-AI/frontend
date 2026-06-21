import Image from "next/image";
import Link from "next/link";
import {
  type AiReviewSummary,
  type PhotographerUploadsPage,
  type UploadBatch,
  type UploadFrame,
  type UploadQueueStatus,
  type VehicleType,
} from "@/domains/photographer-uploads";
import { DashboardShell } from "@/presentation/features/dashboard-shell/DashboardShell";
import { UploadDropzone } from "./components/UploadDropzone";
import styles from "./PhotographerUploadsPage.module.css";

interface PhotographerUploadsPageViewProps {
  content: PhotographerUploadsPage;
}

type BadgeTone = "neutral" | "accent" | "warning" | "success" | "danger";

const statusLabels: Record<UploadQueueStatus, string> = {
  uploaded: "Uploaded",
  analyzing: "Analyzing",
  "needs-review": "Needs review",
  ready: "Ready",
  failed: "Failed",
};

const statusTone: Record<UploadQueueStatus, BadgeTone> = {
  uploaded: "neutral",
  analyzing: "accent",
  "needs-review": "warning",
  ready: "success",
  failed: "danger",
};

const vehicleLabels: Record<VehicleType, string> = {
  bicycle: "Bicycle",
  bus: "Bus",
  car: "Car",
  motorcycle: "Motorcycle",
  truck: "Truck",
  other: "Other",
};

function badgeClass(tone: BadgeTone): string {
  switch (tone) {
    case "accent":
      return styles.badgeAccent ?? "";
    case "warning":
      return styles.badgeWarning ?? "";
    case "danger":
      return styles.badgeDanger ?? "";
    case "success":
      return styles.badgeSuccess ?? "";
    case "neutral":
      return "";
  }
}

export function PhotographerUploadsPageView({ content }: PhotographerUploadsPageViewProps) {
  return (
    <DashboardShell
      photographer={content.photographer}
      nav={content.nav}
      activeHref="/dashboard/photographer/uploads"
    >
      <header
        className={`${styles.topbar} opacity-0`}
        style={{ animation: "fadeIn 0.6s ease forwards" }}
      >
        <div>
          <span className={styles.eyebrow}>Batch manager</span>
          <h1>
            Review AI results before <em>publishing</em>.
          </h1>
        </div>
        <div className={styles.topbarActions}>
          <Link className={styles.secondaryButton} href={content.studioHref}>
            Open AI Studio
          </Link>
        </div>
      </header>

      <section className={styles.summaryGrid} aria-label="Upload queue summary">
        <SummaryCard label="Queued" value={content.summary.totalQueued} tone="neutral" />
        <SummaryCard label="Analyzing" value={content.summary.analyzing} tone="accent" />
        <SummaryCard label="Needs review" value={content.summary.needsReview} tone="warning" />
        <SummaryCard label="Ready" value={content.summary.ready} tone="success" />
        <SummaryCard label="Failed" value={content.summary.failed} tone="danger" />
      </section>

      <section className={styles.uploadSection}>
        <SectionHead title="New upload" meta="Drag & drop or browse" />
        <UploadDropzone
          helperText={content.uploadPanel.helperText}
          acceptedFormats={content.uploadPanel.acceptedFormats}
          maxFileSizeMb={content.uploadPanel.maxFileSizeMb}
          maxBatchSize={content.uploadPanel.maxBatchSize}
        />
      </section>

      <section className={styles.batchSection}>
        <SectionHead title="Processing queue" meta={`${content.batches.length} batches`} />
        <div className={styles.batchList}>
          {content.batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} studioHref={content.studioHref} />
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

function SectionHead({ title, meta }: { title: string; meta: string }) {
  return (
    <div className={styles.sectionHead}>
      <h2>{title}</h2>
      <span>{meta}</span>
    </div>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: number; tone: BadgeTone }) {
  return (
    <article className={styles.summaryCard}>
      <span className={`${styles.badge} ${badgeClass(tone)}`}>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function BatchCard({ batch, studioHref }: { batch: UploadBatch; studioHref: string }) {
  const remainingFrames = batch.totalFrames - batch.frames.length;

  return (
    <article className={styles.batchCard}>
      <header className={styles.batchHeader}>
        <div>
          <span className={`${styles.badge} ${badgeClass(statusTone[batch.status])}`}>{statusLabels[batch.status]}</span>
          <h2>{batch.name}</h2>
          <p>
            {batch.location} · {batch.createdAt}
          </p>
        </div>
        <div className={styles.batchMeta}>
          <strong>
            {batch.processedFrames}/{batch.totalFrames} frames processed
          </strong>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={`${batch.name} processing progress`}
            aria-valuenow={batch.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${batch.progress}%` }} />
          </div>
        </div>
      </header>

      <div className={styles.frameList}>
        {batch.frames.map((frame) => (
          <FrameRow key={frame.id} frame={frame} />
        ))}
        {remainingFrames > 0 ? (
          <p className={styles.moreFrames}>
            +{remainingFrames} more frame{remainingFrames === 1 ? "" : "s"} in this batch
          </p>
        ) : null}
      </div>

      <footer className={styles.batchActions}>
        <BatchActions status={batch.status} studioHref={studioHref} />
      </footer>
    </article>
  );
}

function FrameRow({ frame }: { frame: UploadFrame }) {
  return (
    <div className={styles.frameRow}>
      <div className={styles.frameThumb}>
        <Image src={frame.thumbnailUrl} alt={frame.fileName} fill sizes="64px" className={styles.frameThumbImg} />
      </div>
      <div className={styles.frameBody}>
        <div className={styles.frameTop}>
          <strong>{frame.fileName}</strong>
          <span className={`${styles.badge} ${badgeClass(statusTone[frame.status])}`}>{statusLabels[frame.status]}</span>
        </div>

        {frame.status === "analyzing" ? (
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={`${frame.fileName} analysis progress`}
            aria-valuenow={frame.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${frame.progress}%` }} />
          </div>
        ) : null}

        {frame.status === "uploaded" ? <p className={styles.helperNote}>Queued for AI analysis.</p> : null}

        {frame.errorMessage ? <p className={styles.errorText}>{frame.errorMessage}</p> : null}

        {frame.ai ? <AiSummary ai={frame.ai} /> : null}
      </div>
    </div>
  );
}

function AiSummary({ ai }: { ai: AiReviewSummary }) {
  const hasPlate = ai.plate.full !== "—";

  return (
    <div className={styles.aiSummary}>
      <dl className={styles.aiGrid}>
        <div>
          <dt>Vehicle</dt>
          <dd>{vehicleLabels[ai.vehicleType]}</dd>
        </div>
        <div>
          <dt>Plate</dt>
          <dd className={styles.plateValue}>{ai.plate.masked}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>
            {ai.location.district}, {ai.location.city}
          </dd>
        </div>
        <div>
          <dt>Captured</dt>
          <dd>{ai.location.capturedAt}</dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>{ai.confidence}%</dd>
        </div>
      </dl>

      {hasPlate ? (
        <p className={styles.platePrivate}>
          Full plate (private to you): <code>{ai.plate.full}</code>
        </p>
      ) : null}

      {ai.tags.length > 0 ? (
        <div className={styles.tagRow}>
          {ai.tags.map((tag) => (
            <span key={tag.id} className={tag.isAi ? `${styles.tag} ${styles.tagAi}` : styles.tag}>
              {tag.label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BatchActions({ status, studioHref }: { status: UploadQueueStatus; studioHref: string }) {
  switch (status) {
    case "uploaded":
      return (
        <>
          <button type="button" className={styles.primaryButton}>
            Start AI analysis
          </button>
          <button type="button" className={styles.textButton}>
            Remove batch
          </button>
        </>
      );
    case "analyzing":
      return (
        <>
          <button type="button" className={styles.secondaryButton} disabled>
            Analyzing…
          </button>
          <Link className={styles.textButton} href={studioHref}>
            Track in AI Studio
          </Link>
        </>
      );
    case "needs-review":
      return (
        <>
          <Link className={styles.primaryButton} href={studioHref}>
            Review flagged frames
          </Link>
          <button type="button" className={styles.secondaryButton}>
            Save as draft
          </button>
        </>
      );
    case "ready":
      return (
        <>
          <button type="button" className={styles.primaryButton}>
            Publish batch
          </button>
          <button type="button" className={styles.secondaryButton}>
            Save as draft
          </button>
          <Link className={styles.textButton} href={studioHref}>
            Open in AI Studio
          </Link>
        </>
      );
    case "failed":
      return (
        <>
          <button type="button" className={styles.primaryButton}>
            Retry failed frames
          </button>
          <Link className={styles.secondaryButton} href={studioHref}>
            Edit metadata in Studio
          </Link>
        </>
      );
  }
}

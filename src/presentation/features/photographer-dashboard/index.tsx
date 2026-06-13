import Link from "next/link";
import {
  type BookingStatus,
  type DashboardTone,
  type PhotographerDashboardPage,
  type UploadQueueStatus,
} from "@/domains/photographer-dashboard";
import { DashboardShell } from "@/presentation/features/dashboard-shell/DashboardShell";
import styles from "./PhotographerDashboardPage.module.css";

interface PhotographerDashboardPageViewProps {
  content: PhotographerDashboardPage;
}

const uploadStatusLabels: Record<UploadQueueStatus, string> = {
  uploaded: "Uploaded",
  analyzing: "Analyzing",
  "needs-review": "Needs review",
  ready: "Ready",
  failed: "Failed",
};

const bookingStatusLabels: Record<BookingStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  completed: "Completed",
};

export function PhotographerDashboardPageView({ content }: PhotographerDashboardPageViewProps) {
  return (
    <DashboardShell
      photographer={content.photographer}
      nav={content.nav}
      activeHref="/dashboard/photographer"
    >
        <header
          className={`${styles.topbar} opacity-0`}
          style={{ animation: "fadeIn 0.6s ease forwards" }}
        >
          <div>
            <span className={styles.eyebrow}>Photographer dashboard</span>
            <h1>
              Command center for <em>{content.photographer.area}</em>.
            </h1>
          </div>
          <div className={styles.topbarActions}>
            <Link className={styles.secondaryButton} href="/photographers/sari-pradipta">
              Public profile
            </Link>
            <Link className={styles.primaryButton} href="/dashboard/photographer/uploads">
              Upload batch
            </Link>
          </div>
        </header>

        <section className={styles.heroGrid}>
          <div className={styles.heroPanel}>
            <div className={styles.heroMeta}>
              <span>{content.periodLabel}</span>
              <strong>{content.photographer.availability}</strong>
            </div>
            <div className={styles.statGrid}>
              {content.stats.map((stat) => (
                <article className={`${styles.statCard} ${getToneClass(stat.tone)}`} key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.helper}</p>
                  <small>{stat.trend}</small>
                </article>
              ))}
            </div>
          </div>

          <aside className={styles.profilePanel}>
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.eyebrow}>Profile readiness</span>
                <h2>{content.profileCompletion.percentage}% complete</h2>
              </div>
              <Link href={content.profileCompletion.actionHref}>Tune profile</Link>
            </div>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="Profile completion"
              aria-valuenow={content.profileCompletion.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span style={{ width: `${content.profileCompletion.percentage}%` }} />
            </div>
            <p>{content.profileCompletion.summary}</p>
            <div className={styles.checkList}>
              {content.profileCompletion.items.map((item) => (
                <div className={item.done ? styles.checkDone : ""} key={item.label}>
                  <span aria-hidden="true" />
                  <strong>{item.label}</strong>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className={styles.alertGrid} aria-label="Dashboard alerts">
          {content.alerts.map((alert) => (
            <article className={`${styles.alertCard} ${getToneClass(alert.tone)}`} key={alert.title}>
              <div>
                <span className={styles.eyebrow}>Attention</span>
                <h2>{alert.title}</h2>
                <p>{alert.description}</p>
              </div>
              <Link className={styles.textButton} href={alert.actionHref}>
                {alert.actionLabel}
              </Link>
            </article>
          ))}
        </section>

        <section className={styles.quickSection}>
          <SectionHead title="Quick actions" meta="Operational shortcuts" />
          <div className={styles.actionGrid}>
            {content.quickActions.map((action) => (
              <Link className={`${styles.actionCard} ${getToneClass(action.tone)}`} href={action.href} key={action.label}>
                <span>{action.meta}</span>
                <strong>{action.label}</strong>
                <p>{action.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.boardGrid}>
          <div className={styles.panel}>
            <SectionHead title="Recent orders" meta="Sales activity" />
            <div className={styles.orderList}>
              {content.recentOrders.map((order) => (
                <article className={styles.orderRow} key={order.id}>
                  <div>
                    <span>{order.id}</span>
                    <strong>{order.title}</strong>
                    <p>{order.buyer} · {order.license}</p>
                  </div>
                  <div>
                    <strong>{order.amount}</strong>
                    <small>{order.status}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <SectionHead title="Upload queue" meta="AI pipeline" />
            <div className={styles.queueList}>
              {content.uploadQueue.map((item) => (
                <article className={styles.queueRow} key={item.id}>
                  <div className={styles.queueTop}>
                    <div>
                      <span>{uploadStatusLabels[item.status]}</span>
                      <strong>{item.batchName}</strong>
                    </div>
                    <small>{item.frames}</small>
                  </div>
                  <div
                    className={styles.progressTrack}
                    role="progressbar"
                    aria-label={`${item.batchName} processing progress`}
                    aria-valuenow={item.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${item.progress}%` }} />
                  </div>
                  <p>{item.helper}</p>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <SectionHead title="Bookings" meta="Session requests" />
            <div className={styles.bookingList}>
              {content.bookings.map((booking) => (
                <article className={styles.bookingRow} key={booking.id}>
                  <div>
                    <span>{booking.id} · {bookingStatusLabels[booking.status]}</span>
                    <strong>{booking.client}</strong>
                    <p>{booking.packageName} · {booking.location}</p>
                  </div>
                  <time>{booking.schedule}</time>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <SectionHead title="Recent activity" meta="Last 4 hours" />
            <div className={styles.activityList}>
              {content.recentActivity.map((activity) => (
                <article className={styles.activityRow} key={activity.id}>
                  <span className={styles.activityMark}>{activity.kind}</span>
                  <div>
                    <strong>{activity.label}</strong>
                    <p>{activity.description}</p>
                  </div>
                  <time>{activity.time}</time>
                </article>
              ))}
            </div>
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

function getToneClass(tone: DashboardTone): string {
  switch (tone) {
    case "accent":
      return styles.toneAccent ?? "";
    case "success":
      return styles.toneSuccess ?? "";
    case "warning":
      return styles.toneWarning ?? "";
    case "danger":
      return styles.toneDanger ?? "";
    case "neutral":
      return styles.toneNeutral ?? "";
  }
}

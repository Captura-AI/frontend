import { type ScheduleDay } from "@/domains/photographer-bookings";
import { type BadgeTone, scheduleStatusLabels, statusTone } from "../lib/booking-helpers";
import styles from "../PhotographerBookingsPage.module.css";

function badgeClass(tone: BadgeTone): string {
  switch (tone) {
    case "accent":
      return styles.badgeAccent ?? "";
    case "warning":
      return styles.badgeWarning ?? "";
    case "success":
      return styles.badgeSuccess ?? "";
    case "danger":
      return styles.badgeDanger ?? "";
    default:
      return "";
  }
}

interface ScheduleAgendaProps {
  schedule: ScheduleDay[];
}

export function ScheduleAgenda({ schedule }: ScheduleAgendaProps) {
  if (schedule.length === 0) {
    return <p className={styles.scheduleEmpty}>No upcoming sessions scheduled yet.</p>;
  }

  return (
    <>
      {schedule.map((day) => (
        <div key={day.dateLabel} className={styles.scheduleDay}>
          <span className={styles.scheduleDayLabel}>{day.dateLabel}</span>
          {day.items.map((item) => (
            <div key={item.id} className={styles.scheduleItem}>
              <span className={styles.scheduleTime}>{item.time}</span>
              <div className={styles.scheduleBody}>
                <strong>{item.client}</strong>
                <p>
                  {item.packageName} · {item.location}
                </p>
                <span className={`${styles.badge} ${badgeClass(statusTone[item.status])}`}>
                  {scheduleStatusLabels[item.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

import { type EarningsOrder } from "@/domains/photographer-earnings";
import { type BadgeTone, formatPrice, orderStatusLabels, orderStatusTone } from "../lib/earnings-helpers";
import styles from "../PhotographerEarningsPage.module.css";

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

interface OrderRowProps {
  order: EarningsOrder;
}

export function OrderRow({ order }: OrderRowProps) {
  return (
    <div className={styles.orderRow}>
      <div className={styles.orderTitle}>
        <strong>{order.title}</strong>
        <span>{order.buyer}</span>
      </div>
      <span className={styles.orderLicense}>{order.license}</span>
      <span className={styles.orderDate}>{order.date}</span>
      <span className={styles.orderAmount}>{formatPrice(order.amount)}</span>
      <span className={`${styles.badge} ${badgeClass(orderStatusTone[order.status])}`}>
        {orderStatusLabels[order.status]}
      </span>
    </div>
  );
}

import { type EarningsPayout } from "@/domains/photographer-earnings";
import { badgeClass } from "@/presentation/lib/utils";
import { formatPrice, payoutStatusLabels, payoutStatusTone } from "../lib/earnings-helpers";
import styles from "../PhotographerEarningsPage.module.css";

interface PayoutCardProps {
  payout: EarningsPayout;
}

export function PayoutCard({ payout }: PayoutCardProps) {
  return (
    <section className={styles.sidebarCard} aria-label="Payout status">
      <div className={styles.sidebarHead}>
        <h2>Payout</h2>
        <span className={`${styles.badge} ${badgeClass(payoutStatusTone[payout.status], styles)}`}>
          {payoutStatusLabels[payout.status]}
        </span>
      </div>
      <div className={styles.payoutAmount}>{formatPrice(payout.amount)}</div>
      <div className={styles.payoutMeta}>
        <span>Scheduled date</span>
        <span>{payout.scheduledDate}</span>
      </div>
      <div className={styles.payoutMeta}>
        <span>Method</span>
        <span>{payout.method}</span>
      </div>
    </section>
  );
}

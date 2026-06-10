"use client";

import { useMemo, useState } from "react";
import { type PhotographerEarningsPage } from "@/domains/photographer-earnings";
import { DashboardShell } from "@/presentation/features/dashboard-shell/DashboardShell";
import { OrderRow } from "./components/OrderRow";
import { PayoutCard } from "./components/PayoutCard";
import { formatPrice } from "./lib/earnings-helpers";
import styles from "./PhotographerEarningsPage.module.css";

interface PhotographerEarningsPageViewProps {
  content: PhotographerEarningsPage;
}

export function PhotographerEarningsPageView({ content }: PhotographerEarningsPageViewProps) {
  const [activePeriodId, setActivePeriodId] = useState(content.defaultPeriodId);

  const activePeriod = useMemo(() => {
    return content.periods.find((period) => period.id === activePeriodId) ?? content.periods[0];
  }, [content.periods, activePeriodId]);

  if (!activePeriod) return null;

  return (
    <DashboardShell
      photographer={content.photographer}
      nav={content.nav}
      activeHref="/dashboard/photographer/earnings"
    >
      <header className={styles.topbar}>
        <span className={styles.eyebrow}>Earnings</span>
        <h1>
          Track your <em>payouts</em> and order history.
        </h1>
      </header>

      <div className={styles.periodRow} role="tablist" aria-label="Select earnings period">
        {content.periods.map((period) => (
          <button
            key={period.id}
            type="button"
            role="tab"
            aria-selected={activePeriodId === period.id}
            className={
              activePeriodId === period.id ? `${styles.periodTab} ${styles.periodTabActive}` : styles.periodTab
            }
            onClick={() => setActivePeriodId(period.id)}
          >
            {period.label}
          </button>
        ))}
      </div>

      <section className={styles.summaryGrid} aria-label="Revenue summary">
        <div className={styles.summaryCard}>
          <span>Gross sales</span>
          <strong>{formatPrice(activePeriod.grossSales)}</strong>
          <p>{activePeriod.salesCount} sales this period</p>
        </div>
        <div className={styles.summaryCard}>
          <span>Your earnings (70%)</span>
          <strong>{formatPrice(activePeriod.photographerShare)}</strong>
          <p>{activePeriod.trend}</p>
        </div>
        <div className={styles.summaryCard}>
          <span>Platform fee (30%)</span>
          <strong>{formatPrice(activePeriod.platformFee)}</strong>
          <p>Processing, payments, and support</p>
        </div>
        <div className={styles.summaryCard}>
          <span>Pending payout</span>
          <strong>{formatPrice(activePeriod.pendingBalance)}</strong>
          <p>{activePeriod.pendingBalance > 0 ? "Awaiting next payout cycle" : "Fully settled"}</p>
        </div>
      </section>

      <p className={styles.splitBanner}>
        <strong>70 / 30 revenue split.</strong> {content.splitNote}
      </p>

      <div className={styles.layout}>
        <section className={styles.orderSection} aria-label="Order history">
          <div className={styles.orderHead}>
            <h2>Order history</h2>
            <span className={styles.orderMeta}>
              {activePeriod.orders.length} shown of {activePeriod.salesCount} sales
            </span>
          </div>
          {activePeriod.orders.length > 0 ? (
            <div className={styles.orderList}>
              {activePeriod.orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>No orders recorded for this period yet.</div>
          )}
        </section>

        <aside className={styles.sidebar}>
          <PayoutCard payout={activePeriod.payout} />
        </aside>
      </div>
    </DashboardShell>
  );
}

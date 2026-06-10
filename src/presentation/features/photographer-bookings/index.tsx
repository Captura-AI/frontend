"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  type BookingFilterId,
  type BookingRequest,
  type BookingRequestStatus,
  type PhotographerBookingsPage,
} from "@/domains/photographer-bookings";
import { DashboardShell } from "@/presentation/features/dashboard-shell/DashboardShell";
import { BookingRequestCard } from "./components/BookingRequestCard";
import { ScheduleAgenda } from "./components/ScheduleAgenda";
import { type BadgeTone, formatPrice, statusTone } from "./lib/booking-helpers";
import styles from "./PhotographerBookingsPage.module.css";

interface PhotographerBookingsPageViewProps {
  content: PhotographerBookingsPage;
}

const EMPTY_STATUS_COUNTS: Record<BookingRequestStatus, number> = {
  pending: 0,
  accepted: 0,
  declined: 0,
  completed: 0,
  cancelled: 0,
};

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

export function PhotographerBookingsPageView({ content }: PhotographerBookingsPageViewProps) {
  const [requests, setRequests] = useState<BookingRequest[]>(content.requests);
  const [activeFilter, setActiveFilter] = useState<BookingFilterId>("all");

  const statusCounts = useMemo(() => {
    return requests.reduce<Record<BookingRequestStatus, number>>((acc, request) => {
      acc[request.status] += 1;
      return acc;
    }, { ...EMPTY_STATUS_COUNTS });
  }, [requests]);

  const filterCounts = useMemo<Record<BookingFilterId, number>>(() => {
    return { all: requests.length, ...statusCounts };
  }, [requests, statusCounts]);

  const filteredRequests = useMemo(() => {
    if (activeFilter === "all") return requests;
    return requests.filter((request) => request.status === activeFilter);
  }, [requests, activeFilter]);

  function updateStatus(id: string, status: BookingRequestStatus) {
    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status } : request)));
  }

  return (
    <DashboardShell
      photographer={content.photographer}
      nav={content.nav}
      activeHref="/dashboard/photographer/bookings"
    >
      <header className={styles.topbar}>
        <div>
          <span className={styles.eyebrow}>Bookings</span>
          <h1>
            Review requests and keep your <em>schedule</em> tight.
          </h1>
        </div>
        <Link className={styles.secondaryButton} href={content.profileBookingHref}>
          View public profile
        </Link>
      </header>

      <section className={styles.summaryGrid} aria-label="Booking status summary">
        {content.summary.map((stat) => (
          <article key={stat.id} className={styles.summaryCard}>
            <span className={`${styles.badge} ${badgeClass(statusTone[stat.id])}`}>{stat.label}</span>
            <strong>{statusCounts[stat.id]}</strong>
            <p>{stat.helper}</p>
          </article>
        ))}
      </section>

      <div className={styles.filterRow} role="tablist" aria-label="Filter bookings by status">
        {content.filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.id}
            className={activeFilter === filter.id ? `${styles.filterTab} ${styles.filterTabActive}` : styles.filterTab}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
            <span>{filterCounts[filter.id]}</span>
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        <section className={styles.requestList} aria-label="Booking requests">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <BookingRequestCard
                key={request.id}
                request={request}
                onAccept={(id) => updateStatus(id, "accepted")}
                onDecline={(id) => updateStatus(id, "declined")}
              />
            ))
          ) : (
            <div className={styles.emptyState}>No bookings match this filter yet.</div>
          )}
        </section>

        <aside className={styles.sidebar}>
          <section className={styles.sidebarCard} aria-label="Upcoming schedule">
            <div className={styles.sidebarHead}>
              <h2>Upcoming schedule</h2>
            </div>
            <ScheduleAgenda schedule={content.schedule} />
          </section>

          <section className={styles.sidebarCard} aria-label="Packages and rates">
            <div className={styles.sidebarHead}>
              <h2>Packages</h2>
              <Link className={styles.textButton} href={content.profileBookingHref}>
                Manage rates
              </Link>
            </div>
            <div className={styles.packageList}>
              {content.packages.map((pkg) => (
                <div key={pkg.id} className={styles.packageCard}>
                  <div className={styles.packageHead}>
                    <strong>{pkg.name}</strong>
                    <span>{formatPrice(pkg.price)}</span>
                  </div>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                  <p className={styles.packageMeta}>{pkg.bookingsCount} bookings to date</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </DashboardShell>
  );
}

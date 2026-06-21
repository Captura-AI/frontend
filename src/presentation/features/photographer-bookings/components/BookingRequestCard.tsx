"use client";

import { useMemo, useState } from "react";
import { type BookingRequest } from "@/domains/photographer-bookings";
import { createHttpClient, createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";
import { type BadgeTone, formatPrice, statusLabels, statusTone } from "../lib/booking-helpers";
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

interface BookingRequestCardProps {
  request: BookingRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function BookingRequestCard({ request, onAccept, onDecline }: BookingRequestCardProps) {
  const [isProposing, setIsProposing] = useState(false);
  const [proposalDate, setProposalDate] = useState(request.scheduleDate);
  const [proposalTime, setProposalTime] = useState(request.scheduleTime);
  const [sentProposal, setSentProposal] = useState<{ date: string; time: string } | null>(null);
  const [isActing, setIsActing] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const http = useMemo(() => {
    const session = createSessionStore();
    return createHttpClient(apiConfig.baseUrl, session);
  }, []);

  const isPending = request.status === "pending";
  const canProposeNewTime = request.status === "pending" || request.status === "accepted";

  async function handleAccept() {
    setIsActing(true);
    setActionError(null);

    try {
      await http.patch(`/bookings/${request.id}/accept`);
      onAccept(request.id);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal menerima booking. Coba lagi.");
    } finally {
      setIsActing(false);
    }
  }

  async function handleDecline() {
    setIsActing(true);
    setActionError(null);

    try {
      await http.patch(`/bookings/${request.id}/decline`);
      onDecline(request.id);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal menolak booking. Coba lagi.");
    } finally {
      setIsActing(false);
    }
  }

  async function handleSendProposal() {
    setIsActing(true);
    setActionError(null);

    try {
      const counterProposedDate = Math.floor(new Date(`${proposalDate}T${proposalTime}`).getTime() / 1000);
      await http.patch(`/bookings/${request.id}/propose-time`, { counterProposedDate });
      setSentProposal({ date: proposalDate, time: proposalTime });
      setIsProposing(false);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Gagal mengirim proposal waktu. Coba lagi.");
    } finally {
      setIsActing(false);
    }
  }

  return (
    <article className={styles.requestCard}>
      <div className={styles.requestHead}>
        <div className={styles.requestHeadInfo}>
          <span className={`${styles.badge} ${badgeClass(statusTone[request.status])}`}>
            {statusLabels[request.status]}
          </span>
          <span className={styles.requestId}>{request.id}</span>
        </div>
        <span className={styles.requestedAgo}>{request.requestedAgo}</span>
      </div>

      <div className={styles.requestBody}>
        <h3>{request.client}</h3>
        <div className={styles.requestMeta}>
          <span>{request.packageName}</span>
          <span>{request.duration}</span>
          <span>{request.location}</span>
          <span>{request.scheduleLabel}</span>
        </div>
      </div>

      <p className={styles.requestNotes}>{request.notes}</p>

      <div className={styles.requestFooter}>
        <div className={styles.requestPrice}>
          <strong>{formatPrice(request.price)}</strong>
          <span>Estimated total</span>
        </div>
        <div className={styles.requestActions}>
          {isPending ? (
            <>
              <button
                type="button"
                className={styles.primaryButton}
                disabled={isActing}
                onClick={handleAccept}
              >
                {isActing ? "Memproses…" : "Accept"}
              </button>
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={isActing}
                onClick={handleDecline}
              >
                Decline
              </button>
            </>
          ) : null}
          {canProposeNewTime ? (
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={isActing}
              onClick={() => setIsProposing((prev) => !prev)}
            >
              {isProposing ? "Cancel proposal" : "Propose new time"}
            </button>
          ) : null}
          <button type="button" className={styles.secondaryButton} disabled>
            Message (coming soon)
          </button>
        </div>

        {actionError ? (
          <p role="alert" style={{ color: "var(--color-danger, #ef4444)", fontSize: "0.875rem", marginTop: "0.5rem" }}>
            {actionError}
          </p>
        ) : null}
      </div>

      {isProposing ? (
        <div className={styles.proposeForm}>
          <div className={styles.proposeRow}>
            <div className={styles.proposeField}>
              <label htmlFor={`${request.id}-propose-date`}>New date</label>
              <input
                id={`${request.id}-propose-date`}
                type="date"
                value={proposalDate}
                onChange={(event) => setProposalDate(event.target.value)}
              />
            </div>
            <div className={styles.proposeField}>
              <label htmlFor={`${request.id}-propose-time`}>New time</label>
              <input
                id={`${request.id}-propose-time`}
                type="time"
                value={proposalTime}
                onChange={(event) => setProposalTime(event.target.value)}
              />
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              disabled={isActing}
              onClick={handleSendProposal}
            >
              {isActing ? "Mengirim…" : "Send proposal"}
            </button>
          </div>
        </div>
      ) : null}

      {sentProposal ? (
        <p className={styles.proposalNote}>
          Proposal sent for {sentProposal.date} · {sentProposal.time}
        </p>
      ) : null}
    </article>
  );
}

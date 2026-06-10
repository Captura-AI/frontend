"use client";

import { useState } from "react";
import { type BookingRequest } from "@/domains/photographer-bookings";
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

  const isPending = request.status === "pending";
  const canProposeNewTime = request.status === "pending" || request.status === "accepted";

  function handleSendProposal() {
    setSentProposal({ date: proposalDate, time: proposalTime });
    setIsProposing(false);
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
              <button type="button" className={styles.primaryButton} onClick={() => onAccept(request.id)}>
                Accept
              </button>
              <button type="button" className={styles.secondaryButton} onClick={() => onDecline(request.id)}>
                Decline
              </button>
            </>
          ) : null}
          {canProposeNewTime ? (
            <button type="button" className={styles.secondaryButton} onClick={() => setIsProposing((prev) => !prev)}>
              {isProposing ? "Cancel proposal" : "Propose new time"}
            </button>
          ) : null}
          <button type="button" className={styles.secondaryButton} disabled>
            Message (coming soon)
          </button>
        </div>
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
            <button type="button" className={styles.primaryButton} onClick={handleSendProposal}>
              Send proposal
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

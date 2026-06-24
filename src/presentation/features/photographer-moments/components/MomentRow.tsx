"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Moment } from "@/domains/photographer-moments";
import { type BadgeTone, formatPrice, statusLabels, statusTone, vehicleLabels } from "../lib/moment-helpers";
import styles from "../PhotographerMomentsPage.module.css";

interface MomentRowProps {
  moment: Moment;
  isSelected: boolean;
  onToggleSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
  explorerBaseHref: string;
}

type DeleteState = "idle" | "confirm" | "pending";

function badgeClass(tone: BadgeTone): string {
  switch (tone) {
    case "accent":
      return styles.badgeAccent ?? "";
    case "warning":
      return styles.badgeWarning ?? "";
    case "success":
      return styles.badgeSuccess ?? "";
    case "danger":
    case "neutral":
      return "";
  }
}

export function MomentRow({ moment, isSelected, onToggleSelect, onEdit, onDelete, explorerBaseHref }: MomentRowProps) {
  const [deleteState, setDeleteState] = useState<DeleteState>("idle");

  function handleDeleteClick() {
    setDeleteState("confirm");
  }

  function handleDeleteCancel() {
    setDeleteState("idle");
  }

  async function handleDeleteConfirm() {
    setDeleteState("pending");
    onDelete();
  }

  return (
    <article className={styles.momentRow}>
      <label className={styles.rowCheckbox}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          aria-label={`Select ${moment.title}`}
        />
      </label>

      <div className={styles.rowThumb}>
        <Image src={moment.thumbnailUrl} alt="" fill sizes="84px" className={styles.rowThumbImg} />
      </div>

      <div className={styles.rowBody}>
        <div className={styles.rowTop}>
          <span className={`${styles.badge} ${badgeClass(statusTone[moment.status])}`}>
            {statusLabels[moment.status]}
          </span>
          <span className={styles.rowMeta}>
            {vehicleLabels[moment.vehicleType]} · {moment.dateLabel}
          </span>
        </div>
        <h3>{moment.title}</h3>
        <p>{moment.location}</p>
        {moment.tags.length > 0 ? (
          <div className={styles.tagRow}>
            {moment.tags.map((tag) => (
              <span className={styles.tag} key={tag}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.rowPrice}>
        <strong>{formatPrice(moment.price)}</strong>
        <span className={styles.licenseTag}>{moment.license}</span>
      </div>

      <div className={styles.rowActions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onEdit}
          disabled={deleteState === "pending"}
        >
          Edit metadata
        </button>

        {deleteState === "confirm" ? (
          <span className={styles.deleteConfirm}>
            <span className={styles.deleteConfirmText}>Delete?</span>
            <button
              type="button"
              className={styles.deleteDangerButton}
              onClick={handleDeleteConfirm}
            >
              Confirm
            </button>
            <button type="button" className={styles.textButton} onClick={handleDeleteCancel}>
              Cancel
            </button>
          </span>
        ) : (
          <button
            type="button"
            className={styles.textButton}
            onClick={handleDeleteClick}
            disabled={deleteState === "pending"}
            style={{ color: "var(--color-ink-soft)" }}
          >
            {deleteState === "pending" ? "Deleting…" : "Delete"}
          </button>
        )}

        <Link className={styles.textButton} href={`${explorerBaseHref}/${moment.id}`}>
          Preview
        </Link>
      </div>
    </article>
  );
}

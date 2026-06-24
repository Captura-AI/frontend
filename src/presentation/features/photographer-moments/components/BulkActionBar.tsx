"use client";

import { useState } from "react";
import { type LicenseType } from "@/domains/photographer-moments";
import { LICENSE_OPTIONS } from "../lib/moment-helpers";
import styles from "../PhotographerMomentsPage.module.css";

interface BulkActionBarProps {
  selectedCount: number;
  bulkLicense: LicenseType;
  bulkPrice: string;
  isMutating: boolean;
  onLicenseChange: (license: LicenseType) => void;
  onPriceChange: (value: string) => void;
  onApplyLicense: () => void;
  onApplyPrice: () => void;
  onPublish: () => void;
  onHide: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export function BulkActionBar({
  selectedCount,
  bulkLicense,
  bulkPrice,
  isMutating,
  onLicenseChange,
  onPriceChange,
  onApplyLicense,
  onApplyPrice,
  onPublish,
  onHide,
  onDelete,
  onClear,
}: BulkActionBarProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  function handleDeleteClick() {
    setIsConfirmingDelete(true);
  }

  function handleDeleteCancel() {
    setIsConfirmingDelete(false);
  }

  function handleDeleteConfirm() {
    setIsConfirmingDelete(false);
    onDelete();
  }

  return (
    <section className={styles.bulkBar} aria-label="Bulk actions">
      <strong>{selectedCount} selected</strong>

      <div className={styles.bulkDivider} />

      <div className={styles.bulkGroup}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onPublish}
          disabled={isMutating}
        >
          Publish
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onHide}
          disabled={isMutating}
        >
          Hide
        </button>
      </div>

      <div className={styles.bulkDivider} />

      <div className={styles.bulkGroup}>
        <select
          className={styles.bulkSelect}
          value={bulkLicense}
          onChange={(event) => onLicenseChange(event.target.value as LicenseType)}
          aria-label="Bulk license type"
          disabled={isMutating}
        >
          {LICENSE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onApplyLicense}
          disabled={isMutating}
        >
          Apply license
        </button>
      </div>

      <div className={styles.bulkGroup}>
        <input
          type="text"
          inputMode="numeric"
          className={styles.bulkInput}
          placeholder="Rp price"
          value={bulkPrice}
          onChange={(event) => onPriceChange(event.target.value)}
          aria-label="Bulk price in Rupiah"
          disabled={isMutating}
        />
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onApplyPrice}
          disabled={!bulkPrice || isMutating}
        >
          Apply price
        </button>
      </div>

      <div className={styles.bulkDivider} />

      {isConfirmingDelete ? (
        <div className={styles.bulkGroup}>
          <span className={styles.deleteConfirmText}>
            Delete {selectedCount} moment{selectedCount > 1 ? "s" : ""}?
          </span>
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
        </div>
      ) : (
        <button
          type="button"
          className={styles.textButton}
          onClick={handleDeleteClick}
          disabled={isMutating}
          style={{ textDecoration: "none", opacity: 0.7 }}
        >
          Delete selected
        </button>
      )}

      <div className={styles.bulkSpacer} />

      <button type="button" className={styles.textButton} onClick={onClear} disabled={isMutating}>
        Clear selection
      </button>
    </section>
  );
}

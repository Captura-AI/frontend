import { type LicenseType } from "@/domains/photographer-moments";
import { LICENSE_OPTIONS } from "../lib/moment-helpers";
import styles from "../PhotographerMomentsPage.module.css";

interface BulkActionBarProps {
  selectedCount: number;
  bulkLicense: LicenseType;
  bulkPrice: string;
  onLicenseChange: (license: LicenseType) => void;
  onPriceChange: (value: string) => void;
  onApplyLicense: () => void;
  onApplyPrice: () => void;
  onPublish: () => void;
  onHide: () => void;
  onClear: () => void;
}

export function BulkActionBar({
  selectedCount,
  bulkLicense,
  bulkPrice,
  onLicenseChange,
  onPriceChange,
  onApplyLicense,
  onApplyPrice,
  onPublish,
  onHide,
  onClear,
}: BulkActionBarProps) {
  return (
    <section className={styles.bulkBar} aria-label="Bulk actions">
      <strong>{selectedCount} selected</strong>

      <div className={styles.bulkDivider} />

      <div className={styles.bulkGroup}>
        <button type="button" className={styles.primaryButton} onClick={onPublish}>
          Publish
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onHide}>
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
        >
          {LICENSE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type="button" className={styles.secondaryButton} onClick={onApplyLicense}>
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
        />
        <button type="button" className={styles.secondaryButton} onClick={onApplyPrice} disabled={!bulkPrice}>
          Apply price
        </button>
      </div>

      <div className={styles.bulkSpacer} />

      <button type="button" className={styles.textButton} onClick={onClear}>
        Clear selection
      </button>
    </section>
  );
}

import Link from "next/link";
import { type LicenseTier } from "@/domains/licenses";
import styles from "../LicensesPage.module.css";
import { ArrowIcon, CheckIcon, CrossIcon } from "./LicenseIcons";

interface LicenseTierCardProps {
  tier: LicenseTier;
}

export function LicenseTierCard({ tier }: LicenseTierCardProps) {
  return (
    <article
      className={`${styles.tierCard} ${tier.highlighted ? styles.tierCardHighlighted : ""}`}
    >
      {tier.highlighted ? <span className={styles.tierBadge}>Most popular</span> : null}

      <h2 className={styles.tierName}>{tier.name}</h2>
      <p className={styles.tierTagline}>{tier.tagline}</p>

      <div className={styles.tierPrice}>
        Price
        <strong>{tier.priceLabel}</strong>
      </div>

      <p className={styles.tierBestFor}>{tier.bestFor}</p>

      <div className={styles.tierSection}>
        <span className={styles.tierSectionLabel}>What you can do</span>
        <ul className={styles.tierList}>
          {tier.usageRights.map((right) => (
            <li key={right}>
              <CheckIcon className={`${styles.tierIcon} ${styles.tierIconCheck}`} />
              <span>{right}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.tierSection}>
        <span className={styles.tierSectionLabel}>What&apos;s not included</span>
        <ul className={`${styles.tierList} ${styles.tierListRestricted}`}>
          {tier.restrictions.map((restriction) => (
            <li key={restriction}>
              <CrossIcon className={`${styles.tierIcon} ${styles.tierIconCross}`} />
              <span>{restriction}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.tierSection}>
        <span className={styles.tierSectionLabel}>Included in download</span>
        <div className={styles.tierIncluded}>
          {tier.includedFiles.map((file) => (
            <span className={styles.tierChip} key={file}>
              {file}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.tierFoot}>
        <p className={styles.tierCreditNote}>{tier.creditNote}</p>
        <p className={styles.tierRefundNote}>{tier.refundPolicy}</p>
        <Link className={styles.tierLink} href="/explorer">
          Browse moments to license
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

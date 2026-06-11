import Link from "next/link";
import { type LicensesPage } from "@/domains/licenses";
import { LicenseComparisonTable } from "./components/LicenseComparisonTable";
import { LicenseFaqList } from "./components/LicenseFaqList";
import { LicenseTierCard } from "./components/LicenseTierCard";
import styles from "./LicensesPage.module.css";

interface LicensesPageViewProps {
  content: LicensesPage;
}

export function LicensesPageView({ content }: LicensesPageViewProps) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
          <h1>
            {content.hero.titlePrefix}
            <em>{content.hero.titleEmphasis}</em>
          </h1>
          <p className={styles.lede}>{content.hero.lede}</p>
        </section>

        <div className={styles.tierGrid}>
          {content.tiers.map((tier) => (
            <LicenseTierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <section className={styles.comparisonSection}>
          <h2 className={styles.sectionLabel}>Compare licenses side by side</h2>
          <LicenseComparisonTable content={content} />
        </section>

        <section className={styles.faqSection}>
          <h2 className={styles.sectionLabel}>Frequently asked questions</h2>
          <LicenseFaqList faqs={content.faqs} />
        </section>

        <section className={styles.upgradeBanner}>
          <div>
            <span className={styles.eyebrow}>{content.upgrade.eyebrow}</span>
            <h2>{content.upgrade.title}</h2>
            <p>{content.upgrade.description}</p>
          </div>
          <Link className={styles.primaryButton} href={content.upgrade.ctaHref}>
            {content.upgrade.ctaLabel}
          </Link>
        </section>
      </div>
    </div>
  );
}

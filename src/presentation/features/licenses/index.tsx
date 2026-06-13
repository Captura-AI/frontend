"use client";

import Link from "next/link";
import { type LicensesPage } from "@/domains/licenses";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { LicenseComparisonTable } from "./components/LicenseComparisonTable";
import { LicenseFaqList } from "./components/LicenseFaqList";
import { LicenseTierCard } from "./components/LicenseTierCard";
import styles from "./LicensesPage.module.css";

interface LicensesPageViewProps {
  content: LicensesPage;
}

export function LicensesPageView({ content }: LicensesPageViewProps) {
  const { ref: tierRef, isVisible: tierVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: comparisonRef, isVisible: comparisonVisible } = useScrollReveal<HTMLElement>();
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal<HTMLElement>();
  const { ref: upgradeRef, isVisible: upgradeVisible } = useScrollReveal<HTMLElement>();

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section
          className={`${styles.hero} opacity-0`}
          style={{ animation: "fadeIn 0.8s ease forwards" }}
        >
          <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
          <h1>
            {content.hero.titlePrefix}
            <em>{content.hero.titleEmphasis}</em>
          </h1>
          <p className={styles.lede}>{content.hero.lede}</p>
        </section>

        <div
          ref={tierRef}
          className={`${styles.tierGrid} reveal ${tierVisible ? "is-visible" : ""}`}
        >
          {content.tiers.map((tier) => (
            <LicenseTierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <section
          ref={comparisonRef}
          className={`${styles.comparisonSection} reveal ${comparisonVisible ? "is-visible" : ""}`}
        >
          <h2 className={styles.sectionLabel}>Compare licenses side by side</h2>
          <LicenseComparisonTable content={content} />
        </section>

        <section
          ref={faqRef}
          className={`${styles.faqSection} reveal ${faqVisible ? "is-visible" : ""}`}
        >
          <h2 className={styles.sectionLabel}>Frequently asked questions</h2>
          <LicenseFaqList faqs={content.faqs} />
        </section>

        <section
          ref={upgradeRef}
          className={`${styles.upgradeBanner} reveal-scale ${upgradeVisible ? "is-visible" : ""}`}
        >
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

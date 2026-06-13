"use client";

import { type SupportPage } from "@/domains/support";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { SupportCategoryGrid } from "./components/SupportCategoryGrid";
import { SupportContactSection } from "./components/SupportContactSection";
import { SupportFaqGroups } from "./components/SupportFaqGroups";
import styles from "./SupportPage.module.css";

interface SupportPageViewProps {
  content: SupportPage;
}

export function SupportPageView({ content }: SupportPageViewProps) {
  const { ref: categoryRef, isVisible: categoryVisible } = useScrollReveal<HTMLElement>();
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal<HTMLElement>();
  const { ref: contactRef, isVisible: contactVisible } = useScrollReveal<HTMLDivElement>();

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
            <em>{content.hero.titleEmphasis}</em>?
          </h1>
          <p className={styles.lede}>{content.hero.lede}</p>
        </section>

        <section
          ref={categoryRef}
          className={`${styles.categorySection} reveal ${categoryVisible ? "is-visible" : ""}`}
        >
          <h2 className={styles.sectionLabel}>Browse by topic</h2>
          <SupportCategoryGrid categories={content.categories} />
        </section>

        <section
          ref={faqRef}
          className={`${styles.faqSection} reveal ${faqVisible ? "is-visible" : ""}`}
        >
          <h2 className={styles.sectionLabel}>Frequently asked questions</h2>
          <SupportFaqGroups categories={content.categories} faqs={content.faqs} />
        </section>

        <div ref={contactRef} className={`reveal ${contactVisible ? "is-visible" : ""}`}>
          <SupportContactSection contact={content.contact} />
        </div>
      </div>
    </div>
  );
}

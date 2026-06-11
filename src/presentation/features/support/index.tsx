import { type SupportPage } from "@/domains/support";
import { SupportCategoryGrid } from "./components/SupportCategoryGrid";
import { SupportContactSection } from "./components/SupportContactSection";
import { SupportFaqGroups } from "./components/SupportFaqGroups";
import styles from "./SupportPage.module.css";

interface SupportPageViewProps {
  content: SupportPage;
}

export function SupportPageView({ content }: SupportPageViewProps) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
          <h1>
            {content.hero.titlePrefix}
            <em>{content.hero.titleEmphasis}</em>?
          </h1>
          <p className={styles.lede}>{content.hero.lede}</p>
        </section>

        <section className={styles.categorySection}>
          <h2 className={styles.sectionLabel}>Browse by topic</h2>
          <SupportCategoryGrid categories={content.categories} />
        </section>

        <section className={styles.faqSection}>
          <h2 className={styles.sectionLabel}>Frequently asked questions</h2>
          <SupportFaqGroups categories={content.categories} faqs={content.faqs} />
        </section>

        <SupportContactSection contact={content.contact} />
      </div>
    </div>
  );
}

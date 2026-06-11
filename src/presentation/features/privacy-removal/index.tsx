import Link from "next/link";
import { type PrivacyRemovalPage } from "@/domains/privacy-removal";
import { RemovalRequestForm } from "./components/RemovalRequestForm";
import styles from "./PrivacyRemovalPage.module.css";

interface PrivacyRemovalPageViewProps {
  content: PrivacyRemovalPage;
}

export function PrivacyRemovalPageView({ content }: PrivacyRemovalPageViewProps) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
          <h1>
            {content.hero.titlePrefix}
            <em>{content.hero.titleEmphasis}</em> a moment.
          </h1>
          <p className={styles.lede}>{content.hero.lede}</p>
        </section>

        <div className={styles.layout}>
          <div className={styles.main}>
            <RemovalRequestForm content={content} />
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.panel}>
              <div className={styles.sectionTitle}>
                <h2>How review works</h2>
                <span>No face recognition</span>
              </div>
              <ol className={styles.processSteps}>
                {content.processSteps.map((step) => (
                  <li className={styles.step} key={step.step}>
                    <span className={styles.stepNumber}>{step.step}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.panel}>
              <div className={styles.sectionTitle}>
                <h2>Related</h2>
                <span>Keep exploring</span>
              </div>
              <div className={styles.relatedList}>
                {content.relatedLinks.map((link) => (
                  <Link className={styles.relatedLink} href={link.href} key={link.label}>
                    <strong>{link.label}</strong>
                    <p>{link.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

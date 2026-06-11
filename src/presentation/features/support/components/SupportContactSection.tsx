import { type SupportPage } from "@/domains/support";
import styles from "../SupportPage.module.css";

interface SupportContactSectionProps {
  contact: SupportPage["contact"];
}

export function SupportContactSection({ contact }: SupportContactSectionProps) {
  return (
    <section className={styles.contactSection}>
      <div className={styles.sectionLabelRow}>
        <h2 className={styles.sectionLabel}>{contact.sectionTitle}</h2>
        <span className={styles.sectionMeta}>{contact.sectionMeta}</span>
      </div>

      <div className={styles.contactGrid}>
        {contact.channels.map((channel) => (
          <article className={styles.contactCard} key={channel.label}>
            <h3>{channel.label}</h3>
            <p>{channel.description}</p>
            <a className={styles.contactAction} href={channel.href}>
              {channel.actionLabel}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

import { type LicenseFaqItem } from "@/domains/licenses";
import styles from "../LicensesPage.module.css";
import { PlusIcon } from "./LicenseIcons";

interface LicenseFaqListProps {
  faqs: LicenseFaqItem[];
}

export function LicenseFaqList({ faqs }: LicenseFaqListProps) {
  return (
    <div className={styles.faqList}>
      {faqs.map((faq) => (
        <details className={styles.faqItem} key={faq.question}>
          <summary>
            {faq.question}
            <PlusIcon />
          </summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

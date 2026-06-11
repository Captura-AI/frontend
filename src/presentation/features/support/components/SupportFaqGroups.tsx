import { type SupportCategory, type SupportFaqItem } from "@/domains/support";
import styles from "../SupportPage.module.css";
import { PlusIcon } from "./SupportIcons";

interface SupportFaqGroupsProps {
  categories: SupportCategory[];
  faqs: SupportFaqItem[];
}

export function SupportFaqGroups({ categories, faqs }: SupportFaqGroupsProps) {
  return (
    <div className={styles.faqGroups}>
      {categories.map((category) => {
        const items = faqs.filter((faq) => faq.category === category.id);

        if (items.length === 0) {
          return null;
        }

        return (
          <div className={styles.faqGroup} key={category.id}>
            <span className={styles.faqGroupHeading}>{category.label}</span>
            {items.map((item) => (
              <details className={styles.faqItem} key={item.question}>
                <summary>
                  {item.question}
                  <PlusIcon />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        );
      })}
    </div>
  );
}

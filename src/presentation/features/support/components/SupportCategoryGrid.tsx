import Link from "next/link";
import { type SupportCategory } from "@/domains/support";
import styles from "../SupportPage.module.css";
import { SupportCategoryIcon } from "./SupportCategoryIcon";

interface SupportCategoryGridProps {
  categories: SupportCategory[];
}

function ArrowIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SupportCategoryGrid({ categories }: SupportCategoryGridProps) {
  return (
    <div className={styles.categoryGrid}>
      {categories.map((category) => (
        <article className={styles.categoryCard} key={category.id}>
          <span className={styles.categoryIcon}>
            <SupportCategoryIcon id={category.id} />
          </span>
          <h3>{category.label}</h3>
          <p>{category.description}</p>
          {category.href ? (
            <Link className={styles.categoryLink} href={category.href}>
              {category.linkLabel ?? "Learn more"}
              <ArrowIcon />
            </Link>
          ) : null}
        </article>
      ))}
    </div>
  );
}

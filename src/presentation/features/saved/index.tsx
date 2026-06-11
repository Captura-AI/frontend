"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  type AccountSavedPage,
  type AccountSavedSearchesPage,
  type SavedMoment,
  type SavedSearch,
} from "@/domains/saved";
import { AccountNav } from "@/presentation/features/account/components/AccountNav";
import { buildExplorerSearchHref } from "./lib/saved-search-helpers";
import accountStyles from "@/presentation/features/account/AccountPage.module.css";
import styles from "./SavedPage.module.css";

interface AccountSavedPageViewProps {
  content: AccountSavedPage;
}

interface AccountSavedSearchesPageViewProps {
  content: AccountSavedSearchesPage;
}

export function AccountSavedPageView({ content }: AccountSavedPageViewProps) {
  const [items, setItems] = useState<SavedMoment[]>(content.items);

  const handleRemove = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className={accountStyles.page}>
      <div className={accountStyles.wrap}>
        <AccountNav />
        <section className={accountStyles.libraryHero}>
          <div>
            <span className={accountStyles.eyebrow}>Saved moments</span>
            <h1>
              {content.header.title} <em>{content.header.emphasis}</em>.
            </h1>
            <p className={accountStyles.lede}>{content.header.description}</p>
          </div>
          <div className={accountStyles.libraryStats}>
            {content.stats.map((stat) => (
              <div className={accountStyles.stat} key={stat.label}>
                <span className={accountStyles.miniLabel}>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.helper}</p>
              </div>
            ))}
          </div>
        </section>

        {items.length > 0 ? (
          <section className={styles.savedGrid} aria-label="Saved moments">
            {items.map((item) => (
              <SavedMomentCard item={item} key={item.id} onRemove={handleRemove} />
            ))}
          </section>
        ) : (
          <div className={accountStyles.emptyState}>
            <h2>{content.emptyState.title}</h2>
            <p>{content.emptyState.description}</p>
            <div className={accountStyles.itemActions}>
              <Link className={accountStyles.primaryButton} href={content.emptyState.ctaHref}>
                {content.emptyState.ctaLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function AccountSavedSearchesPageView({ content }: AccountSavedSearchesPageViewProps) {
  const [items, setItems] = useState<SavedSearch[]>(content.items);

  const handleRemove = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className={accountStyles.page}>
      <div className={accountStyles.wrap}>
        <AccountNav />
        <section className={accountStyles.libraryHero}>
          <div>
            <span className={accountStyles.eyebrow}>Saved searches</span>
            <h1>
              {content.header.title} <em>{content.header.emphasis}</em>.
            </h1>
            <p className={accountStyles.lede}>{content.header.description}</p>
          </div>
        </section>

        {items.length > 0 ? (
          <section className={styles.searchList} aria-label="Saved searches">
            {items.map((item) => (
              <SavedSearchItem item={item} key={item.id} onRemove={handleRemove} />
            ))}
          </section>
        ) : (
          <div className={accountStyles.emptyState}>
            <h2>{content.emptyState.title}</h2>
            <p>{content.emptyState.description}</p>
            <div className={accountStyles.itemActions}>
              <Link className={accountStyles.primaryButton} href={content.emptyState.ctaHref}>
                {content.emptyState.ctaLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SavedMomentCard({
  item,
  onRemove,
}: {
  item: SavedMoment;
  onRemove: (id: string) => void;
}) {
  return (
    <article className={styles.savedCard}>
      <div className={styles.savedThumb}>
        <Link href={item.momentHref} className={styles.thumbLink} aria-label={item.title}>
          <Image
            src={item.imageUrl}
            alt=""
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw"
            className={styles.image}
          />
        </Link>
        <button
          type="button"
          className={`${styles.bookmarkButton} ${styles.bookmarkButtonActive}`}
          aria-label="Remove from saved moments"
          aria-pressed="true"
          onClick={() => onRemove(item.id)}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor">
            <path d="M4 2h10v14l-5-3.5L4 16V2z" />
          </svg>
        </button>
      </div>
      <div className={styles.savedBody}>
        <span className={accountStyles.miniLabel}>
          {item.city} · {item.time}
        </span>
        <h2>
          <Link href={item.momentHref}>{item.title}</Link>
        </h2>
        <div className={styles.savedMeta}>
          <span>{item.photographerName}</span>
        </div>
        <div className={styles.savedFooter}>
          <div>
            <div className={styles.savedPrice}>
              <span>USD</span>
              {item.priceUsd}
            </div>
            <div className={styles.savedAt}>Saved {item.savedAt}</div>
          </div>
          <Link className={accountStyles.secondaryButton} href={item.momentHref}>
            View moment
          </Link>
        </div>
      </div>
    </article>
  );
}

function SavedSearchItem({
  item,
  onRemove,
}: {
  item: SavedSearch;
  onRemove: (id: string) => void;
}) {
  return (
    <article className={styles.searchItem}>
      <div>
        <h2>{item.label}</h2>
        <p className={styles.searchSummary}>{item.summary}</p>
        <div className={styles.searchMeta}>
          <span>Saved {item.createdAt}</span>
          <span>{item.resultCount} results</span>
        </div>
        <div className={styles.searchFilters}>
          {item.filters.map((filter) => (
            <span key={filter.key}>
              <em>{filter.keyLabel}</em> {filter.value}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.searchActions}>
        <Link className={accountStyles.primaryButton} href={buildExplorerSearchHref(item)}>
          Rerun search
        </Link>
        <button
          type="button"
          className={accountStyles.secondaryButton}
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

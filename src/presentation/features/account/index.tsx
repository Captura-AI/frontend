"use client";

import Link from "next/link";
import Image from "next/image";
import {
  type AccountLibraryPage,
  type AccountProfilePage,
  type DownloadStatus,
  type LibraryItem,
} from "@/domains/account";
import { type CheckoutResultPage } from "@/domains/checkout";
import { useScrollReveal } from "@/presentation/lib/useScrollReveal";
import { AccountNav } from "./components/AccountNav";
import styles from "./AccountPage.module.css";

interface AccountProfilePageViewProps {
  content: AccountProfilePage;
}

interface AccountLibraryPageViewProps {
  content: AccountLibraryPage;
}

interface CheckoutResultPageViewProps {
  content: CheckoutResultPage;
}

const downloadStatusLabels: Record<DownloadStatus, string> = {
  ready: "Ready to download",
  processing: "Preparing files",
  pending: "Waiting payment",
  failed: "Payment failed",
  refunded: "Refunded",
};

export function AccountProfilePageView({ content }: AccountProfilePageViewProps) {
  const { ref: preferencesRef, isVisible: preferencesVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: shortcutsRef, isVisible: shortcutsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: privacyRef, isVisible: privacyVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: linkedRef, isVisible: linkedVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <AccountNav />
        <section
          className={`${styles.hero} opacity-0`}
          style={{ animation: "fadeIn 0.8s ease forwards" }}
        >
          <div>
            <span className={styles.eyebrow}>Account profile</span>
            <h1>
              Keep your search life <em>quietly organized</em>.
            </h1>
            <p className={styles.lede}>
              Manage identity, local search preferences, privacy defaults, and support shortcuts for every Captura moment you buy or request.
            </p>
          </div>

          <aside
            className={`${styles.identityCard} opacity-0`}
            style={{ animation: "fadeIn 0.8s ease 0.15s forwards" }}
          >
            <div className={styles.avatar}>{content.user.avatarInitials}</div>
            <h2>{content.user.name}</h2>
            <div className={styles.identityMeta}>
              <div><span>Email</span><strong>{content.user.email}</strong></div>
              <div><span>Phone</span><strong>{content.user.phone}</strong></div>
              <div><span>City</span><strong>{content.user.city}</strong></div>
              <div><span>Member since</span><strong>{content.user.memberSince}</strong></div>
            </div>
            <div className={styles.statusPill}><span />{content.user.verification}</div>
          </aside>
        </section>

        <div className={styles.grid}>
          <div
            ref={preferencesRef}
            className={`${styles.panel} reveal ${preferencesVisible ? "is-visible" : ""}`}
          >
            <SectionTitle title="Preferences" meta="Search defaults" />
            <div className={styles.preferenceList}>
              {content.preferences.map((preference) => (
                <div className={styles.row} key={preference.label}>
                  <span className={styles.label}>{preference.label}</span>
                  <div>
                    <strong>{preference.value}</strong>
                    <p>{preference.helper}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={shortcutsRef}
            className={`${styles.panel} reveal ${shortcutsVisible ? "is-visible" : ""}`}
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            <SectionTitle title="Shortcuts" meta="Account routes" />
            <div className={styles.shortcutList}>
              {content.shortcuts.map((shortcut) => (
                <Link className={styles.shortcut} href={shortcut.href} key={shortcut.label}>
                  <strong>{shortcut.label}</strong>
                  <p>{shortcut.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div
            ref={privacyRef}
            className={`${styles.panel} reveal ${privacyVisible ? "is-visible" : ""}`}
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            <SectionTitle title="Privacy" emphasis="settings" meta="Sensitive metadata" />
            <div className={styles.privacyList}>
              {content.privacy.map((item) => (
                <div className={styles.privacyRow} key={item.label}>
                  <span
                    className={`${styles.toggle} ${item.enabled ? styles.toggleOn : ""}`}
                    role="switch"
                    aria-checked={item.enabled}
                    aria-label={item.label}
                  />
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={linkedRef}
            className={`${styles.panel} reveal ${linkedVisible ? "is-visible" : ""}`}
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            <SectionTitle title="Linked accounts" meta="Sign-in and alerts" />
            <div className={styles.linkedList}>
              {content.linkedAccounts.map((account) => (
                <div className={styles.linkedRow} key={account.provider}>
                  <div>
                    <strong>{account.provider}</strong>
                    <p>{account.value}</p>
                  </div>
                  <span>{account.status}</span>
                </div>
              ))}
            </div>
            <div className={styles.emptyState}>
              <h2>{content.emptyState.title}</h2>
              <p>{content.emptyState.description}</p>
              <div className={styles.itemActions}>
                <Link className={styles.primaryButton} href={content.emptyState.ctaHref}>
                  {content.emptyState.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AccountLibraryPageView({ content }: AccountLibraryPageViewProps) {
  const { ref: libraryListRef, isVisible: libraryListVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: emptyStateRef, isVisible: emptyStateVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <AccountNav />
        <section
          className={`${styles.libraryHero} opacity-0`}
          style={{ animation: "fadeIn 0.8s ease forwards" }}
        >
          <div>
            <span className={styles.eyebrow}>Purchase library</span>
            <h1>
              {content.header.title} <em>{content.header.emphasis}</em>.
            </h1>
            <p className={styles.lede}>{content.header.description}</p>
          </div>
          <div className={styles.libraryStats}>
            {content.stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <span className={styles.miniLabel}>{stat.label}</span>
                <strong>{stat.value}</strong>
                <p>{stat.helper}</p>
              </div>
            ))}
          </div>
        </section>

        {content.items.length > 0 ? (
          <section
            ref={libraryListRef}
            className={`${styles.libraryList} reveal ${libraryListVisible ? "is-visible" : ""}`}
            aria-label="Purchased moments"
          >
            {content.items.map((item, i) => (
              <LibraryItemCard item={item} key={item.id} delay={i * 80} />
            ))}
          </section>
        ) : (
          <div
            ref={emptyStateRef}
            className={`${styles.emptyState} reveal-scale ${emptyStateVisible ? "is-visible" : ""}`}
          >
            <h2>{content.emptyState.title}</h2>
            <p>{content.emptyState.description}</p>
            <div className={styles.itemActions}>
              <Link className={styles.primaryButton} href={content.emptyState.ctaHref}>
                {content.emptyState.ctaLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CheckoutResultPageView({ content }: CheckoutResultPageViewProps) {
  const state = content.states[content.status];
  const { ref: nextStepsRef, isVisible: nextStepsVisible } = useScrollReveal<HTMLElement>();
  const { ref: supportRef, isVisible: supportVisible } = useScrollReveal<HTMLElement>();

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section
          className={`${styles.resultHero} opacity-0`}
          style={{ animation: "fadeIn 0.8s ease forwards" }}
        >
          <div>
            <span className={styles.eyebrow}>{state.eyebrow}</span>
            <h1>
              {state.title} <em>{state.emphasis}</em>.
            </h1>
            <p className={styles.lede}>{state.description}</p>
            <div className={styles.resultActions}>
              <Link className={styles.primaryButton} href={state.primaryHref}>
                {state.primaryLabel}
              </Link>
              <Link className={styles.secondaryButton} href={state.secondaryHref}>
                {state.secondaryLabel}
              </Link>
            </div>
          </div>

          <aside
            className={`${styles.orderCard} opacity-0`}
            style={{ animation: "fadeIn 0.8s ease 0.15s forwards" }}
          >
            <div className={styles.orderThumb}>
              <Image
                src={content.order.imageUrl}
                alt={content.order.title}
                fill
                sizes="(max-width: 980px) 100vw, 430px"
                className={styles.image}
              />
            </div>
            <div className={styles.orderBody}>
              <span className={styles.miniLabel}>{content.order.id}</span>
              <h2>{content.order.title}</h2>
              <div className={styles.orderMeta}>
                <span>{content.order.photographer}</span>
                <span>{content.order.license}</span>
              </div>
              <div className={styles.orderLines}>
                <div className={styles.orderLine}><span>Total</span><strong>{content.order.total}</strong></div>
                <div className={styles.orderLine}><span>Receipt</span><strong>{content.order.email}</strong></div>
                <div className={styles.orderLine}><span>Availability</span><strong>{content.order.estimatedAvailability}</strong></div>
              </div>
            </div>
          </aside>
        </section>

        <div className={styles.confirmationGrid}>
          <section
            ref={nextStepsRef}
            className={`${styles.panel} reveal ${nextStepsVisible ? "is-visible" : ""}`}
          >
            <SectionTitle title="Next" emphasis="steps" meta="Order handoff" />
            <div className={styles.nextSteps}>
              {content.nextSteps.map((step) => (
                <div className={styles.step} key={step.label}>
                  <strong>{step.label}</strong>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            ref={supportRef}
            className={`${styles.panel} reveal ${supportVisible ? "is-visible" : ""}`}
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            <SectionTitle title="Trust" emphasis="support" meta="Not a dead end" />
            <div className={styles.supportBox}>
              <strong>{content.support.label}</strong>
              <p>{content.support.description}</p>
              <div className={styles.itemActions}>
                <Link className={styles.secondaryButton} href={content.support.href}>
                  Open support
                </Link>
                <Link className={styles.textButton} href="/account/profile">
                  Privacy settings
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function LibraryItemCard({ item, delay }: { item: LibraryItem; delay: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`${styles.libraryItem} reveal ${isVisible ? "is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <Link className={styles.thumb} href={item.momentHref}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 680px) 100vw, 168px"
          className={styles.image}
        />
      </Link>
      <div>
        <span className={styles.miniLabel}>{item.id}</span>
        <h2>{item.title}</h2>
        <div className={styles.itemMeta}>
          <span>{item.photographer}</span>
          <span>{item.purchaseDate}</span>
          <span>{item.fileType}</span>
        </div>
        <div className={styles.itemActions}>
          <Link className={styles.secondaryButton} href={item.momentHref}>
            View moment
          </Link>
          <Link className={styles.textButton} href={item.supportHref}>
            Support
          </Link>
        </div>
      </div>
      <aside className={styles.sideBox}>
        <span className={getDownloadStatusClass(item.downloadStatus)}>
          {downloadStatusLabels[item.downloadStatus]}
        </span>
        <div className={styles.licenseLine}><span>Order</span><strong>{item.orderStatus}</strong></div>
        <div className={styles.licenseLine}><span>License</span><strong>{item.license}</strong></div>
        <div className={styles.licenseLine}><span>Total paid</span><strong>{item.totalPaid}</strong></div>
        <div className={styles.itemActions}>
          <Link
            className={item.downloadStatus === "ready" ? styles.primaryButton : styles.secondaryButton}
            href={item.downloadStatus === "ready" ? `/downloads/${item.id}` : item.supportHref}
          >
            {item.downloadStatus === "ready" ? "Download" : "Get help"}
          </Link>
          <Link className={styles.textButton} href={item.invoiceHref}>
            Invoice
          </Link>
        </div>
      </aside>
    </article>
  );
}

function SectionTitle({
  title,
  emphasis,
  meta,
}: {
  title: string;
  emphasis?: string;
  meta: string;
}) {
  return (
    <div className={styles.sectionTitle}>
      <h2>{title} {emphasis && <em>{emphasis}</em>}</h2>
      <span>{meta}</span>
    </div>
  );
}

function getDownloadStatusClass(status: DownloadStatus) {
  switch (status) {
    case "ready":
      return styles.downloadReady;
    case "processing":
      return styles.downloadProcessing;
    case "pending":
      return styles.downloadPending;
    case "failed":
      return styles.downloadFailed;
    case "refunded":
      return styles.downloadRefunded;
  }
}

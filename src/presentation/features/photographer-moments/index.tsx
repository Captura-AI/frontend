"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type LicenseType,
  type Moment,
  type MomentFilterId,
  type MomentStatus,
  type PhotographerMomentsPage,
} from "@/domains/photographer-moments";
import { DashboardShell } from "@/presentation/features/dashboard-shell/DashboardShell";
import { bulkDeleteMoments, bulkPublishMoments, bulkSaveDraftMoments, deleteMoment } from "./lib/momentsApi";
import { BulkActionBar } from "./components/BulkActionBar";
import { EditMomentDrawer } from "./components/EditMomentDrawer";
import { MomentRow } from "./components/MomentRow";
import { type BadgeTone, statusTone } from "./lib/moment-helpers";
import styles from "./PhotographerMomentsPage.module.css";

interface PhotographerMomentsPageViewProps {
  content: PhotographerMomentsPage;
}

const EMPTY_STATUS_COUNTS: Record<MomentStatus, number> = {
  draft: 0,
  published: 0,
  hidden: 0,
  sold: 0,
  "needs-metadata": 0,
};

function badgeClass(tone: BadgeTone): string {
  switch (tone) {
    case "accent":
      return styles.badgeAccent ?? "";
    case "warning":
      return styles.badgeWarning ?? "";
    case "success":
      return styles.badgeSuccess ?? "";
    case "danger":
    case "neutral":
      return "";
  }
}

export function PhotographerMomentsPageView({ content }: PhotographerMomentsPageViewProps) {
  const router = useRouter();
  const [moments, setMoments] = useState<Moment[]>(content.moments);
  const [activeFilter, setActiveFilter] = useState<MomentFilterId>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [bulkLicense, setBulkLicense] = useState<LicenseType>("Editorial");
  const [bulkPrice, setBulkPrice] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const statusCounts = useMemo(() => {
    return moments.reduce<Record<MomentStatus, number>>((acc, moment) => {
      acc[moment.status] += 1;
      return acc;
    }, { ...EMPTY_STATUS_COUNTS });
  }, [moments]);

  const filterCounts = useMemo<Record<MomentFilterId, number>>(() => {
    return { all: moments.length, ...statusCounts };
  }, [moments, statusCounts]);

  const filteredMoments = useMemo(() => {
    if (activeFilter === "all") return moments;
    return moments.filter((moment) => moment.status === activeFilter);
  }, [moments, activeFilter]);

  const editingMoment = useMemo(() => {
    return moments.find((moment) => moment.id === editingId) ?? null;
  }, [moments, editingId]);

  const allVisibleSelected =
    filteredMoments.length > 0 && filteredMoments.every((moment) => selectedIds.includes(moment.id));

  function toggleSelection(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  function toggleSelectAll() {
    setSelectedIds((prev) => {
      if (filteredMoments.length > 0 && filteredMoments.every((moment) => prev.includes(moment.id))) {
        return prev.filter((id) => !filteredMoments.some((moment) => moment.id === id));
      }
      const visibleIds = filteredMoments.map((moment) => moment.id);
      return Array.from(new Set([...prev, ...visibleIds]));
    });
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  async function handleBulkPublish() {
    if (isMutating || selectedIds.length === 0) return;

    setIsMutating(true);
    setMoments((prev) =>
      prev.map((m) => (selectedIds.includes(m.id) ? { ...m, status: "published" as MomentStatus } : m)),
    );

    try {
      await bulkPublishMoments(selectedIds);
      clearSelection();
      router.refresh();
    } catch {
      router.refresh();
    } finally {
      setIsMutating(false);
    }
  }

  async function handleBulkHide() {
    if (isMutating || selectedIds.length === 0) return;

    setIsMutating(true);
    setMoments((prev) =>
      prev.map((m) => (selectedIds.includes(m.id) ? { ...m, status: "hidden" as MomentStatus } : m)),
    );

    try {
      await bulkSaveDraftMoments(selectedIds);
      clearSelection();
      router.refresh();
    } catch {
      router.refresh();
    } finally {
      setIsMutating(false);
    }
  }

  async function handleBulkDelete() {
    if (isMutating || selectedIds.length === 0) return;

    setIsMutating(true);
    const idsToDelete = [...selectedIds];
    setMoments((prev) => prev.filter((m) => !idsToDelete.includes(m.id)));
    clearSelection();

    try {
      await bulkDeleteMoments(idsToDelete);
      router.refresh();
    } catch {
      router.refresh();
    } finally {
      setIsMutating(false);
    }
  }

  async function handleDeleteMoment(momentId: string) {
    setMoments((prev) => prev.filter((m) => m.id !== momentId));
    setSelectedIds((prev) => prev.filter((id) => id !== momentId));

    try {
      await deleteMoment(momentId);
      router.refresh();
    } catch {
      router.refresh();
    }
  }

  function applyLicenseToSelection() {
    setMoments((prev) =>
      prev.map((moment) => (selectedIds.includes(moment.id) ? { ...moment, license: bulkLicense } : moment)),
    );
  }

  function applyPriceToSelection() {
    const value = Number(bulkPrice);
    if (!Number.isFinite(value) || value <= 0) return;
    setMoments((prev) => prev.map((moment) => (selectedIds.includes(moment.id) ? { ...moment, price: value } : moment)));
    setBulkPrice("");
  }

  function handleMomentSaved(momentId: string, updates: Partial<Moment>) {
    setMoments((prev) =>
      prev.map((m) => (m.id === momentId ? { ...m, ...updates } : m)),
    );
    router.refresh();
  }

  return (
    <DashboardShell
      photographer={content.photographer}
      nav={content.nav}
      activeHref="/dashboard/photographer/moments"
    >
      <header
        className={`${styles.topbar} opacity-0`}
        style={{ animation: "fadeIn 0.6s ease forwards" }}
      >
        <div>
          <span className={styles.eyebrow}>Moment manager</span>
          <h1>
            Curate, price, and <em>publish</em> your catalog.
          </h1>
        </div>
        <Link className={styles.secondaryButton} href={content.explorerBaseHref}>
          View public catalog
        </Link>
      </header>

      <section className={styles.summaryGrid} aria-label="Catalog status summary">
        {content.summary.map((stat) => (
          <article key={stat.id} className={styles.summaryCard}>
            <span className={`${styles.badge} ${badgeClass(statusTone[stat.id])}`}>{stat.label}</span>
            <strong>{statusCounts[stat.id]}</strong>
            <p>{stat.helper}</p>
          </article>
        ))}
      </section>

      <div className={styles.filterRow} role="tablist" aria-label="Filter moments by status">
        {content.filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.id}
            className={activeFilter === filter.id ? `${styles.filterTab} ${styles.filterTabActive}` : styles.filterTab}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
            <span>{filterCounts[filter.id]}</span>
          </button>
        ))}
      </div>

      {selectedIds.length > 0 ? (
        <BulkActionBar
          selectedCount={selectedIds.length}
          bulkLicense={bulkLicense}
          bulkPrice={bulkPrice}
          isMutating={isMutating}
          onLicenseChange={setBulkLicense}
          onPriceChange={setBulkPrice}
          onApplyLicense={applyLicenseToSelection}
          onApplyPrice={applyPriceToSelection}
          onPublish={handleBulkPublish}
          onHide={handleBulkHide}
          onDelete={handleBulkDelete}
          onClear={clearSelection}
        />
      ) : null}

      <section className={styles.listSection}>
        <div className={styles.listHead}>
          <label className={styles.selectAll}>
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleSelectAll}
              aria-label="Select all visible moments"
            />
            Select all visible
          </label>
          <span className={styles.listMeta}>
            {filteredMoments.length} loaded · {content.catalogTotal} total in catalog
          </span>
        </div>

        {filteredMoments.length > 0 ? (
          <div className={styles.momentList}>
            {filteredMoments.map((moment) => (
              <MomentRow
                key={moment.id}
                moment={moment}
                isSelected={selectedIds.includes(moment.id)}
                onToggleSelect={() => toggleSelection(moment.id)}
                onEdit={() => setEditingId(moment.id)}
                onDelete={() => handleDeleteMoment(moment.id)}
                explorerBaseHref={content.explorerBaseHref}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No moments match this filter yet.</div>
        )}

        <div className={styles.loadMore}>
          <button type="button" className={styles.secondaryButton} disabled>
            Load more from catalog (coming soon)
          </button>
        </div>
      </section>

      {editingMoment ? (
        <EditMomentDrawer
          moment={editingMoment}
          onClose={() => setEditingId(null)}
          onSaved={handleMomentSaved}
        />
      ) : null}
    </DashboardShell>
  );
}

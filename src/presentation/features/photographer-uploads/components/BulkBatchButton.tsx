"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";
import styles from "../PhotographerUploadsPage.module.css";

type BatchAction = "publish" | "draft";

interface BulkBatchButtonProps {
  momentIds: string[];
  action: BatchAction;
  label: string;
  pendingLabel: string;
  className: string;
}

async function bulkSetPublished(
  momentIds: string[],
  action: BatchAction,
): Promise<void> {
  const token = createSessionStore().getAccessToken();
  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const endpoint = action === "publish"
    ? `${apiConfig.baseUrl}/photographers/moments/bulk-publish`
    : `${apiConfig.baseUrl}/photographers/moments/bulk-save-draft`;

  const response = await fetch(endpoint, {
    method: "PATCH",
    headers,
    credentials: "include",
    body: JSON.stringify({ momentIds }),
  });

  if (!response.ok) {
    throw new Error(`Bulk ${action} failed: ${response.status}`);
  }
}

function BulkBatchButton({ momentIds, action, label, pendingLabel, className }: BulkBatchButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleClick() {
    if (momentIds.length === 0 || isPending) return;

    setIsPending(true);

    try {
      await bulkSetPublished(momentIds, action);
      router.refresh();
    } catch {
      // TODO: surface error toast in future iteration
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={isPending || momentIds.length === 0}
    >
      {isPending ? pendingLabel : label}
    </button>
  );
}

interface PublishBatchButtonProps {
  momentIds: string[];
}

export function PublishBatchButton({ momentIds }: PublishBatchButtonProps) {
  return (
    <BulkBatchButton
      momentIds={momentIds}
      action="publish"
      label="Publish batch"
      pendingLabel="Publishing…"
      className={styles.primaryButton ?? ""}
    />
  );
}

interface SaveDraftButtonProps {
  momentIds: string[];
}

export function SaveDraftButton({ momentIds }: SaveDraftButtonProps) {
  return (
    <BulkBatchButton
      momentIds={momentIds}
      action="draft"
      label="Save as draft"
      pendingLabel="Saving…"
      className={styles.secondaryButton ?? ""}
    />
  );
}

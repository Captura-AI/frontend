"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";
import styles from "../PhotographerUploadsPage.module.css";

interface RetryBatchButtonProps {
  failedFrameIds: string[];
}

export function RetryBatchButton({ failedFrameIds }: RetryBatchButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleRetry() {
    setIsPending(true);

    const token = createSessionStore().getAccessToken();
    const headers: HeadersInit = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      await Promise.all(
        failedFrameIds.map((id) =>
          fetch(`${apiConfig.baseUrl}/photographers/moments/${id}/retry-analysis`, {
            method: "POST",
            headers,
            credentials: "include",
          })
        )
      );

      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.primaryButton}
      onClick={handleRetry}
      disabled={isPending || failedFrameIds.length === 0}
    >
      {isPending ? "Retrying…" : "Retry failed frames"}
    </button>
  );
}

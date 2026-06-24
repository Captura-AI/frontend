"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";

interface ReanalyzeButtonProps {
  momentId: string;
}

type ReanalyzeState = "idle" | "pending" | "queued";

export function ReanalyzeButton({ momentId }: ReanalyzeButtonProps) {
  const [status, setStatus] = useState<ReanalyzeState>("idle");
  const router = useRouter();

  async function handleClick() {
    if (!momentId || status !== "idle") return;

    setStatus("pending");

    const token = createSessionStore().getAccessToken();
    const headers: HeadersInit = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(
        `${apiConfig.baseUrl}/photographers/moments/${momentId}/retry-analysis`,
        { method: "POST", headers, credentials: "include" },
      );

      if (response.ok) {
        setStatus("queued");
        router.refresh();

        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  }

  const label =
    status === "pending" ? "Queuing…" :
    status === "queued"  ? "Re-analysis queued" :
    "Re-analyze";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status !== "idle" || !momentId}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "1px solid var(--color-line)",
        background: status === "queued" ? "var(--color-ok)" : "transparent",
        color: status === "queued" ? "var(--color-bg-soft)" : "var(--color-ink)",
        fontSize: "13px",
        fontWeight: 500,
        cursor: status !== "idle" ? "not-allowed" : "pointer",
        opacity: status !== "idle" ? 0.7 : 1,
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {status === "pending" ? (
        <span className="inline-flex items-center gap-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="animate-spin"
          >
            <path d="M6 1v2M6 9v2M1 6h2M9 6h2M2.5 2.5l1.4 1.4M8.1 8.1l1.4 1.4M2.5 9.5l1.4-1.4M8.1 3.9l1.4-1.4" />
          </svg>
          Queuing…
        </span>
      ) : label}
    </button>
  );
}

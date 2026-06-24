"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";

interface DeleteMomentButtonProps {
  momentId: string;
}

type DeleteState = "idle" | "confirm" | "pending";

export function DeleteMomentButton({ momentId }: DeleteMomentButtonProps) {
  const [status, setStatus] = useState<DeleteState>("idle");
  const router = useRouter();

  function handleClick() {
    if (status === "idle") {
      setStatus("confirm");
      return;
    }
  }

  function handleCancel() {
    setStatus("idle");
  }

  async function handleConfirm() {
    if (!momentId || status !== "confirm") return;

    setStatus("pending");

    const token = createSessionStore().getAccessToken();
    const headers: HeadersInit = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(
        `${apiConfig.baseUrl}/photographers/moments/${momentId}`,
        { method: "DELETE", headers, credentials: "include" },
      );

      if (response.ok) {
        router.push("/dashboard/photographer/uploads");
        router.refresh();
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  }

  if (status === "confirm") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-[12.5px] text-ink-soft">Delete this frame?</span>
        <button
          type="button"
          onClick={handleConfirm}
          className="px-3 py-2 rounded-lg text-[12.5px] font-medium bg-[oklch(0.4_0.15_25)] text-white hover:bg-[oklch(0.35_0.15_25)] transition-colors"
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-3 py-2 rounded-lg text-[12.5px] font-medium border border-line text-ink hover:border-ink transition-colors"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "pending" || !momentId}
      className="px-4 py-2.5 rounded-lg text-[13px] font-medium border border-line text-ink-soft hover:border-[oklch(0.4_0.15_25)] hover:text-[oklch(0.4_0.15_25)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {status === "pending" ? "Deleting…" : "Delete"}
    </button>
  );
}

"use client";

import { useEffect } from "react";

export type ToastVariant = "success" | "error" | "warning";

export interface ToastData {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const BG: Record<ToastVariant, string> = {
  success: "#14532d",
  warning: "#78350f",
  error: "#7f1d1d",
};

const ICON: Record<ToastVariant, string> = {
  success: "✓",
  warning: "⚠",
  error: "✕",
};

export function Toast({ toast, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        width: "min(24rem, calc(100vw - 3rem))",
        padding: "1rem 1.25rem",
        borderRadius: "0.875rem",
        background: BG[toast.variant],
        color: "#fff",
        fontSize: "0.875rem",
        lineHeight: 1.5,
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
      }}
    >
      <span style={{ fontWeight: 600, fontSize: "1rem", lineHeight: 1.4, flexShrink: 0 }}>
        {ICON[toast.variant]}
      </span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Tutup notifikasi"
        style={{
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.7)",
          cursor: "pointer",
          padding: 0,
          lineHeight: 1,
          fontSize: "1rem",
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}

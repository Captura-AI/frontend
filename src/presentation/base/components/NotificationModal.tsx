"use client";

import { useEffect, useRef } from "react";

export type ModalVariant = "success" | "error" | "warning";

export interface ModalConfig {
  variant: ModalVariant;
  title: string;
  message: string;
  /** Primary CTA label. Defaults to "OK" */
  confirmLabel?: string;
  onConfirm?: () => void;
  /** Secondary dismiss button label. Omit to show only confirm. */
  dismissLabel?: string;
  onDismiss?: () => void;
}

// ─── Icon SVGs ────────────────────────────────────────────────────────────────

function SuccessIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 26, height: 26 }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// ─── Token map ────────────────────────────────────────────────────────────────

const ICON_BG: Record<ModalVariant, string> = {
  success: "oklch(0.62 0.10 145 / 0.12)",
  warning: "oklch(0.62 0.13 48 / 0.12)",
  error:   "oklch(0.55 0.18 25 / 0.12)",
};

const ICON_COLOR: Record<ModalVariant, string> = {
  success: "oklch(0.55 0.14 145)",
  warning: "oklch(0.56 0.16 48)",
  error:   "oklch(0.50 0.20 25)",
};

const ICON_COMPONENT: Record<ModalVariant, () => React.ReactElement> = {
  success: SuccessIcon,
  warning: WarningIcon,
  error:   ErrorIcon,
};

// ─── Component ────────────────────────────────────────────────────────────────

interface NotificationModalProps {
  config: ModalConfig;
  onClose: () => void;
}

export function NotificationModal({ config, onClose }: NotificationModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const IconComp = ICON_COMPONENT[config.variant];

  const handleConfirm = () => {
    config.onConfirm?.();
    onClose();
  };

  const handleDismiss = () => {
    config.onDismiss?.();
    onClose();
  };

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus the panel on mount
  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <div
      role="presentation"
      aria-hidden="false"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: "rgba(20, 19, 17, 0.48)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        animation: "modalBackdropIn 0.22s ease forwards",
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-bg-soft, #FBFAF6)",
          border: "1.5px solid var(--color-line, #E6E1D7)",
          borderRadius: "24px",
          padding: "2.5rem 2rem 2rem",
          maxWidth: "27rem",
          width: "100%",
          textAlign: "center",
          outline: "none",
          animation: "modalPanelIn 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          boxShadow: "0 24px 64px rgba(20, 19, 17, 0.16), 0 4px 16px rgba(20, 19, 17, 0.06)",
        }}
      >
        {/* Icon */}
        <div
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: ICON_BG[config.variant],
            color: ICON_COLOR[config.variant],
            marginBottom: "1.25rem",
          }}
        >
          <IconComp />
        </div>

        {/* Title */}
        <h2
          id="modal-title"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.25rem",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "var(--color-ink, #141311)",
            margin: "0 0 0.625rem",
          }}
        >
          {config.title}
        </h2>

        {/* Body */}
        <p
          id="modal-body"
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "var(--color-ink-soft, #6B6660)",
            margin: "0 0 2rem",
          }}
        >
          {config.message}
        </p>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.625rem",
          }}
        >
          <button
            type="button"
            onClick={handleConfirm}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              minHeight: 46,
              padding: "0 22px",
              borderRadius: 999,
              fontSize: "13.5px",
              fontWeight: 500,
              cursor: "pointer",
              border: "1px solid var(--color-ink, #141311)",
              background: "var(--color-ink, #141311)",
              color: "var(--color-bg-soft, #FBFAF6)",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {config.confirmLabel ?? "OK"}
          </button>

          {config.dismissLabel ? (
            <button
              type="button"
              onClick={handleDismiss}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: 46,
                padding: "0 22px",
                borderRadius: 999,
                fontSize: "13.5px",
                fontWeight: 500,
                cursor: "pointer",
                border: "1px solid transparent",
                background: "transparent",
                color: "var(--color-ink-soft, #6B6660)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {config.dismissLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

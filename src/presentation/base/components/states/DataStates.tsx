"use client";

import { type ReactNode } from "react";

/**
 * Reusable async-state primitives for API-backed surfaces (Phase 11+).
 *
 * Keeps loading / error / empty presentation consistent and on-brand as domains
 * migrate from static mock to real data. Editorial tone, accessible roles.
 */

interface LoadingStateProps {
  label?: string;
  /** Number of skeleton rows to render. */
  rows?: number;
}

export function LoadingState({ label = "Loading quietly…", rows = 3 }: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite" className="w-full">
      <span className="sr-only">{label}</span>
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="h-4 w-full animate-pulse rounded-sm bg-ink/5"
            style={{ width: `${100 - index * 12}%` }}
          />
        ))}
      </div>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Something interrupted the view",
  message = "We could not load this just now. Please try again in a moment.",
  onRetry,
  retryLabel = "Try again",
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-sm border border-ink/10 bg-ink/[0.02] px-5 py-6"
    >
      <p className="font-mono text-xs uppercase tracking-wide text-ink/50">{title}</p>
      <p className="max-w-prose text-sm text-ink/70">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-sm border border-ink/20 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  hint?: string;
  action?: ReactNode;
}

export function EmptyState({ title, hint, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-sm border border-dashed border-ink/15 px-5 py-8">
      <p className="font-serif text-lg text-ink">{title}</p>
      {hint ? <p className="max-w-prose text-sm text-ink/60">{hint}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

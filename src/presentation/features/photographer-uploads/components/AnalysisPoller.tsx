"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AnalysisPollerProps {
  isActive: boolean;
}

const POLL_INTERVAL_MS = 3000;

/**
 * Invisible client component that auto-refreshes the page while AI analysis is running.
 * Stops polling once isActive becomes false (no more frames in "analyzing" state).
 */
export function AnalysisPoller({ isActive }: AnalysisPollerProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isActive) return;

    const id = setInterval(() => router.refresh(), POLL_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isActive, router]);

  return null;
}

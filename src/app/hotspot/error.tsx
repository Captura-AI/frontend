"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

export default function HotspotError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <ErrorState
        message={error.message}
        onRetry={reset}
        retryLabel="Try again"
        title="The hotspot map could not be loaded."
      />
    </main>
  );
}

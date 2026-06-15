"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface ExplorerDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ExplorerDetailError({ reset }: ExplorerDetailErrorProps) {
  return (
    <div className="mx-auto max-w-[1320px] px-10 pt-[60px]">
      <ErrorState
        title="This moment could not be loaded"
        message="It may have been removed, or the connection slipped. Try again in a moment."
        onRetry={reset}
        retryLabel="Reload moment"
      />
    </div>
  );
}

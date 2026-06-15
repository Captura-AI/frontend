"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface AccountLibraryErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AccountLibraryError({ reset }: AccountLibraryErrorProps) {
  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-16">
      <ErrorState
        title="Your library could not be loaded"
        message="We could not reach your purchases just now. Please try again in a moment."
        onRetry={reset}
        retryLabel="Reload library"
      />
    </div>
  );
}

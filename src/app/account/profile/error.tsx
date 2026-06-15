"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface AccountProfileErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AccountProfileError({ reset }: AccountProfileErrorProps) {
  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-16">
      <ErrorState
        title="Your profile could not be loaded"
        message="We could not reach your account just now. Please try again in a moment."
        onRetry={reset}
        retryLabel="Reload profile"
      />
    </div>
  );
}

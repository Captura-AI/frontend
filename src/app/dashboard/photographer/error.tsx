"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface PhotographerDashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PhotographerDashboardError({ reset }: PhotographerDashboardErrorProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-16">
      <ErrorState
        title="Dashboard tidak bisa dimuat"
        message="Kami tidak bisa menjangkau akunmu saat ini. Coba lagi dalam beberapa saat."
        onRetry={reset}
        retryLabel="Muat ulang dashboard"
      />
    </div>
  );
}

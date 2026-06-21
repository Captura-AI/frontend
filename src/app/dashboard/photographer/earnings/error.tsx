"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface PhotographerEarningsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PhotographerEarningsError({ reset }: PhotographerEarningsErrorProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-16">
      <ErrorState
        title="Earnings tidak bisa dimuat"
        message="Kami tidak bisa mengambil data pendapatanmu saat ini. Coba lagi dalam beberapa saat."
        onRetry={reset}
        retryLabel="Muat ulang earnings"
      />
    </div>
  );
}

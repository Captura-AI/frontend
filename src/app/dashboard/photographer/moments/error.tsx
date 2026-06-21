"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface PhotographerMomentsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PhotographerMomentsError({ reset }: PhotographerMomentsErrorProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-16">
      <ErrorState
        title="Moments tidak bisa dimuat"
        message="Kami tidak bisa mengambil katalog momentmu saat ini. Coba lagi dalam beberapa saat."
        onRetry={reset}
        retryLabel="Muat ulang moments"
      />
    </div>
  );
}

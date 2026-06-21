"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface PhotographerUploadsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PhotographerUploadsError({ reset }: PhotographerUploadsErrorProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-16">
      <ErrorState
        title="Upload queue tidak bisa dimuat"
        message="Kami tidak bisa mengambil daftar uploadmu saat ini. Coba lagi dalam beberapa saat."
        onRetry={reset}
        retryLabel="Muat ulang uploads"
      />
    </div>
  );
}

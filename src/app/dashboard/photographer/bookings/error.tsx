"use client";

import { ErrorState } from "@/presentation/base/components/states/DataStates";

interface PhotographerBookingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PhotographerBookingsError({ reset }: PhotographerBookingsErrorProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-16">
      <ErrorState
        title="Bookings tidak bisa dimuat"
        message="Kami tidak bisa mengambil daftar booking saat ini. Coba lagi dalam beberapa saat."
        onRetry={reset}
        retryLabel="Muat ulang bookings"
      />
    </div>
  );
}

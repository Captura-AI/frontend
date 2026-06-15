import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function LoadingPhotographerDetailPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <LoadingState label="Loading photographer profile…" rows={6} />
    </main>
  );
}

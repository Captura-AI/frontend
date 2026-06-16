import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function LoadingHotspotDetailPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <LoadingState label="Loading hotspot…" rows={5} />
    </main>
  );
}

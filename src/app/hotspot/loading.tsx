import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function LoadingHotspotPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <LoadingState label="Loading the hotspot map…" rows={6} />
    </main>
  );
}

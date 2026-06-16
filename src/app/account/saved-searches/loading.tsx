import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function LoadingSavedSearchesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <LoadingState label="Loading your saved searches…" rows={4} />
    </main>
  );
}

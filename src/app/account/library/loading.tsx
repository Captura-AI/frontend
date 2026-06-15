import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function AccountLibraryLoading() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-16">
      <LoadingState label="Loading your library…" rows={5} />
    </div>
  );
}

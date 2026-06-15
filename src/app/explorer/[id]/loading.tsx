import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function ExplorerDetailLoading() {
  return (
    <div className="mx-auto max-w-[1320px] px-10 pt-[60px]">
      <LoadingState label="Loading this moment…" rows={6} />
    </div>
  );
}

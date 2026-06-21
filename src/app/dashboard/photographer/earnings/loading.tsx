import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function PhotographerEarningsLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-16">
      <LoadingState label="Memuat data earnings…" rows={5} />
    </div>
  );
}

import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function PhotographerUploadsLoading() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 pt-16">
      <LoadingState label="Memuat upload queue…" rows={5} />
    </div>
  );
}

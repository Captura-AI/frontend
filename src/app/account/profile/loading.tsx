import { LoadingState } from "@/presentation/base/components/states/DataStates";

export default function AccountProfileLoading() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-16">
      <LoadingState label="Loading your profile…" rows={5} />
    </div>
  );
}

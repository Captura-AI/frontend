import type { StudioPage } from "@/domains/studio";
import StudioTopBar from "./components/StudioTopBar";
import StudioPageHeader from "./components/StudioPageHeader";
import StudioUploadPanel from "./components/StudioUploadPanel";
import StudioEditorPanel from "./components/StudioEditorPanel";

interface Props {
  data: StudioPage;
}

export default function StudioView({ data }: Props) {
  return (
    <div className="fixed inset-0 z-200 bg-bg overflow-y-auto flex flex-col">
      <StudioTopBar balance={data.balance} avatarUrl={data.avatarUrl} />
      <StudioPageHeader stats={data.stats} />
      <div className="px-7 pt-3.5 pb-15">
        <div className="grid grid-cols-[360px_1fr] gap-5.5 items-start max-[1100px]:grid-cols-1">
          <StudioUploadPanel batch={data.batch} queue={data.queue} />
          <StudioEditorPanel frame={data.currentFrame} />
        </div>
      </div>
    </div>
  );
}

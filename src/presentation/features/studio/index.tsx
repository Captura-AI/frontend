"use client";

import { useState } from "react";
import type { StudioPage } from "@/domains/studio";
import StudioTopBar from "./components/StudioTopBar";
import StudioPageHeader from "./components/StudioPageHeader";
import StudioUploadPanel from "./components/StudioUploadPanel";
import StudioEditorPanel from "./components/StudioEditorPanel";

const EMPTY_FRAME_ID = "";

interface Props {
  data: StudioPage;
}

export default function StudioView({ data }: Props) {
  const firstFrameId = data.queue[0]?.id ?? EMPTY_FRAME_ID;
  const [activeId, setActiveId] = useState<string>(firstFrameId);

  const activeIndex = data.queue.findIndex((q) => q.id === activeId);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;
  const currentFrame = data.frames[safeIndex] ?? null;

  const handlePrev = () => {
    const prevIndex = Math.max(0, safeIndex - 1);
    const prevId = data.queue[prevIndex]?.id;

    if (prevId) setActiveId(prevId);
  };

  const handleNext = () => {
    const nextIndex = Math.min(data.queue.length - 1, safeIndex + 1);
    const nextId = data.queue[nextIndex]?.id;

    if (nextId) setActiveId(nextId);
  };

  return (
    <div className="fixed inset-0 z-200 bg-bg overflow-y-auto flex flex-col">
      <StudioTopBar balance={data.balance} avatarUrl={data.avatarUrl} />
      <StudioPageHeader stats={data.stats} />
      <div className="px-7 pt-3.5 pb-15">
        <div className="grid grid-cols-[360px_1fr] gap-5.5 items-start max-[1100px]:grid-cols-1">
          <StudioUploadPanel
            batch={data.batch}
            queue={data.queue}
            activeId={activeId}
            onSelect={setActiveId}
          />
          <StudioEditorPanel
            key={activeId}
            frame={currentFrame}
            hasPrev={safeIndex > 0}
            hasNext={safeIndex < data.queue.length - 1}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

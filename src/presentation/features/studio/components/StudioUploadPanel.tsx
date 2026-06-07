"use client";

import { useState } from "react";
import Image from "next/image";
import type { BatchStats, QueueItem } from "@/domains/studio";

interface Props {
  batch: BatchStats;
  queue: QueueItem[];
}

export default function StudioUploadPanel({ batch, queue }: Props) {
  const initialActive = queue.find((q) => q.status === "active")?.id ?? queue[0]?.id ?? "";
  const [activeId, setActiveId] = useState<string>(initialActive);

  const progressPct = batch.total > 0 ? Math.round((batch.processed / batch.total) * 100) : 0;

  const batchRows = [
    { label: "Plates parsed", value: batch.platesParsed },
    { label: "Locations resolved", value: batch.locationsResolved },
    { label: "Avg. time / frame", value: batch.avgTimePerFrame },
  ];

  return (
    <aside className="bg-bg-soft border border-line rounded-2xl p-4.5">
      <h3 className="font-mono text-[10px] tracking-widest uppercase text-ink-soft font-normal mb-3.5">
        Upload batch
      </h3>

      {/* Dropzone */}
      <div className="border-[1.5px] border-dashed border-ink-faint rounded-xl px-5 py-9.5 text-center [background:repeating-linear-gradient(45deg,transparent_0,transparent_12px,rgba(192,74,43,0.025)_12px,rgba(192,74,43,0.025)_24px)] hover:border-ink transition-colors cursor-pointer">
        <div className="w-11 h-11 mx-auto mb-3 rounded-full border border-line bg-bg-soft flex items-center justify-center text-ink">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="font-serif text-[22px] tracking-[-0.01em]">
          Drop <em className="italic text-accent">up to 500</em> frames here
        </div>
        <p className="mt-1.5 text-ink-soft text-[13px]">
          JPEG · RAW · HEIC · max 40 MB each
        </p>
        <span className="inline-block mt-3.5 px-4 py-2.25 bg-ink text-bg-soft rounded-full text-[12.5px] whitespace-nowrap">
          Browse files
        </span>
      </div>

      <div className="mt-3.5 flex justify-between font-mono text-[9.5px] tracking-[0.06em] uppercase text-ink-soft">
        <span>EXIF · GPS read</span>
        <span>AI · auto-tag</span>
      </div>

      {/* Batch progress */}
      <div className="mt-4.5 pt-4 border-t border-line-soft">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft">
            {batch.name}
          </span>
          <span className="font-mono text-[13px]">
            {batch.processed} / {batch.total}
          </span>
        </div>
        <div className="h-1.5 bg-bg rounded-full overflow-hidden border border-line">
          <div
            className="h-full rounded-full animate-[progressShimmer_2.4s_linear_infinite] bg-size-[200%_100%]"
            style={{
              width: `${progressPct}%`,
              background:
                "linear-gradient(90deg, var(--color-accent), oklch(0.7 0.13 55))",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
        {batchRows.map((row) => (
          <div key={row.label} className="flex items-center justify-between mt-2">
            <span className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft">
              {row.label}
            </span>
            <span className="font-mono text-[13px]">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Queue thumbnails */}
      <div className="mt-4.5 grid grid-cols-3 gap-2">
        {queue.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`relative aspect-square rounded-lg overflow-hidden bg-bg border border-line cursor-pointer transition-all ${
              activeId === item.id
                ? "outline outline-ink outline-offset-1"
                : ""
            } ${item.status === "scanning" ? "studio-scanning-thumb" : ""}`}
          >
            <Image src={item.imageUrl} alt="" fill className="object-cover" sizes="80px" />
            {/* AI badge */}
            {item.badge === "ai" && (
              <span className="absolute top-1.25 left-1.25 bg-ink text-bg-soft font-mono text-[7.5px] tracking-[0.08em] h-3.5 px-1.25 rounded-[7px] flex items-center">
                AI
              </span>
            )}
            {/* Scanning badge */}
            {item.badge === "scanning" && (
              <span className="absolute top-1.25 left-1.25 bg-ink text-bg-soft font-mono text-[7.5px] tracking-[0.08em] h-3.5 px-1.25 rounded-[7px] flex items-center">
                ···
              </span>
            )}
            {/* OK badge */}
            {item.badge === "ok" && (
              <span className="absolute top-1.25 left-1.25 w-3.5 h-3.5 rounded-full bg-bg-soft flex items-center justify-center font-mono text-[7px] text-ink">
                ✓
              </span>
            )}
          </div>
        ))}
      </div>

      {/* AI credit */}
      <div className="mt-4 pt-3.5 border-t border-line-soft flex items-center gap-2.5 text-[12px] text-ink-soft leading-[1.35]">
        <span className="w-2 h-2 rounded-full bg-accent shrink-0 animate-[livePulse_1.6s_ease-out_infinite]" />
        <span>
          <b className="text-ink font-medium">Captura Vision v3.2</b> · running
          locally on your batch
        </span>
      </div>
    </aside>
  );
}

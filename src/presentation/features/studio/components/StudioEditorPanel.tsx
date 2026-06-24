"use client";

import { useState } from "react";
import Image from "next/image";
import type { FrameData, VehicleType, FrameTag, PriceTier, LicenseType } from "@/domains/studio";
import { ReanalyzeButton } from "./ReanalyzeButton";

/* ─── Vehicle type definitions ─────────────────────────────── */
type VehicleOption = { type: VehicleType; label: string; paths: React.ReactNode };

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    type: "bicycle",
    label: "Bicycle",
    paths: (
      <>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="M6 17l4-9h6l2 9M10 8h4" />
      </>
    ),
  },
  {
    type: "bus",
    label: "Bus",
    paths: (
      <>
        <rect x="3" y="6" width="18" height="11" rx="2" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
        <path d="M3 10h18" />
      </>
    ),
  },
  {
    type: "car",
    label: "Car",
    paths: (
      <>
        <path d="M3 14l2-5h14l2 5v4H3z" />
        <circle cx="7" cy="18" r="1.5" />
        <circle cx="17" cy="18" r="1.5" />
      </>
    ),
  },
  {
    type: "motorcycle",
    label: "Moto",
    paths: (
      <>
        <circle cx="5.5" cy="17" r="3" />
        <circle cx="18.5" cy="17" r="3" />
        <path d="M5.5 17l4-7h4l3 7M13 6h3M9.5 10h4l1.5 3" />
      </>
    ),
  },
  {
    type: "truck",
    label: "Truck",
    paths: (
      <>
        <rect x="3" y="9" width="11" height="9" />
        <path d="M14 12h5l2 3v3h-7" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="17" cy="19" r="1.5" />
      </>
    ),
  },
  {
    type: "other",
    label: "Other",
    paths: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 10c0-1.5 1.5-3 3-3s3 1.5 3 3-3 2-3 4M12 17v.5" />
      </>
    ),
  },
];

const LICENSE_OPTIONS: LicenseType[] = [
  "Personal use",
  "Editorial",
  "Commercial",
  "Exclusive",
];

/* ─── Sub-components ─────────────────────────────────────────── */

function LabelRow({
  label,
  required,
  pill,
}: {
  label: string;
  required?: boolean;
  pill: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-1.5 gap-2">
      <span className="font-mono text-[9.5px] tracking-widest uppercase text-ink-soft whitespace-nowrap">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </span>
      {pill}
    </div>
  );
}

function AiPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded bg-[rgba(192,74,43,0.10)] text-accent border border-[rgba(192,74,43,0.25)] whitespace-nowrap shrink-0">
      <span className="w-1.25 h-1.25 rounded-full bg-current animate-[livePulse_1.6s_ease-out_infinite]" />
      {label}
    </span>
  );
}

function GpsPill({ label, pulse }: { label: string; pulse?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded text-ink-soft bg-[rgba(20,19,17,0.06)] border border-line whitespace-nowrap shrink-0">
      {pulse && (
        <span className="w-1.25 h-1.25 rounded-full bg-current animate-[livePulse_1.6s_ease-out_infinite]" />
      )}
      {label}
    </span>
  );
}

function ThinkingPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.06em] uppercase px-1.5 py-0.5 rounded text-ink-soft bg-bg border border-line whitespace-nowrap shrink-0">
      {label}
    </span>
  );
}

const FIELD_BASE =
  "w-full px-[13px] py-[11px] bg-bg border border-line rounded-lg text-[13.5px] outline-none transition-colors focus:border-ink focus:bg-bg-soft placeholder:text-ink-faint placeholder:italic";
const FIELD_AI =
  "w-full px-[13px] py-[11px] bg-[rgba(192,74,43,0.04)] border border-[rgba(192,74,43,0.35)] rounded-lg text-[13.5px] font-mono tracking-[0.02em] outline-none transition-colors focus:border-ink focus:bg-bg-soft";

/* ─── Main component ──────────────────────────────────────────── */

interface Props {
  frame: FrameData | null;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export default function StudioEditorPanel({ frame, hasPrev, hasNext, onPrev, onNext }: Props) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>(
    frame?.vehicleType ?? "other",
  );
  const [isAiSelection, setIsAiSelection] = useState(true);
  const [tags, setTags] = useState<FrameTag[]>(frame?.tags ?? []);
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>(frame?.priceTiers ?? []);

  const handleVehicleSelect = (v: VehicleType) => {
    setSelectedVehicle(v);
    setIsAiSelection(false);
  };

  const removeTag = (id: string) =>
    setTags((prev) => prev.filter((t) => t.id !== id));

  const removePriceTier = (id: string) =>
    setPriceTiers((prev) => prev.filter((p) => p.id !== id));

  const addPriceTier = () =>
    setPriceTiers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        licenseType: "Personal use",
        description: "",
        currency: "IDR",
        amount: "",
      },
    ]);

  const frameNum = frame ? String(frame.frameNumber).padStart(3, "0") : "000";
  const totalFrames = frame?.totalFrames ?? 0;
  const fileName = frame?.fileName ?? "Tidak ada foto";
  const fileSizeMb = frame?.fileSizeMb ?? 0;

  return (
    <section className="bg-bg-soft border border-line rounded-2xl overflow-hidden flex flex-col">
      {/* ── Editor head ── */}
      <header className="px-5.5 py-4 border-b border-line-soft flex items-center gap-3.5 flex-wrap">
        <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft">
          Frame{" "}
          <b className="text-ink font-medium">
            {frameNum} / {totalFrames}
          </b>{" "}
          ·{" "}
          <b className="text-ink font-medium">{fileName}</b> ·{" "}
          {fileSizeMb} MB
        </span>
        <div className="flex items-center gap-1 ml-auto shrink-0">
          <span className="font-mono text-[11px] px-1.5 whitespace-nowrap">
            {frameNum} / {totalFrames}
          </span>
          <button
            className="w-7 h-7 border border-line rounded-md inline-flex items-center justify-center text-ink hover:bg-ink hover:text-bg-soft hover:border-ink transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous"
            onClick={onPrev}
            disabled={!hasPrev}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M7.5 2L3.5 6l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="w-7 h-7 border border-line rounded-md inline-flex items-center justify-center text-ink hover:bg-ink hover:text-bg-soft hover:border-ink transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next"
            onClick={onNext}
            disabled={!hasNext}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M4.5 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ── Editor body ── */}
      <div className="grid grid-cols-[minmax(280px,1.05fr)_1.1fr] max-[920px]:grid-cols-1 flex-1">
        {/* Photo panel */}
        <div className="relative bg-[#1a1815] aspect-4/5 overflow-hidden border-r border-line-soft max-[920px]:border-r-0 max-[920px]:border-b max-[920px]:border-line-soft">
          {frame ? (
            <Image
              src={frame.imageUrl}
              alt={frame.caption}
              fill
              className="object-cover"
              sizes="(max-width: 920px) 100vw, 45vw"
            />
          ) : null}

          {/* Big scan line */}
          <div className="studio-photo-scanline absolute left-0 right-0 h-0.75 z-30" />

          {/* Bounding box: vehicle */}
          <div
            className="studio-bbox-vehicle absolute border-[1.5px] border-[oklch(0.72_0.10_60)] rounded-[3px] z-20"
            style={{ top: "30%", left: "18%", width: "56%", height: "50%" }}
          >
            <span className="absolute -left-px bottom-full bg-[oklch(0.72_0.10_60)] text-bg-soft font-mono text-[9px] tracking-[0.06em] px-1.5 py-0.5 rounded-tl-[3px] rounded-tr-[3px] rounded-br-[3px] mb-px whitespace-nowrap">
              VEHICLE · MOTORCYCLE · 0.97
            </span>
          </div>

          {/* Bounding box: plate */}
          <div
            className="studio-bbox-plate absolute border-[1.5px] border-accent rounded-[3px] z-20"
            style={{ top: "58%", left: "32%", width: "22%", height: "9%" }}
          >
            <span className="absolute -left-px bottom-full bg-accent text-bg-soft font-mono text-[9px] tracking-[0.06em] px-1.5 py-0.5 rounded-tl-[3px] rounded-tr-[3px] rounded-br-[3px] mb-px whitespace-nowrap">
              PLATE · D 1428 NA · 0.94
            </span>
          </div>

          {/* AI log chips */}
          {frame ? (
            <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-40">
              {frame.aiLogChips.map((chip) => (
                <div
                  key={chip.id}
                  className="inline-flex items-center gap-2 bg-[rgba(20,19,17,0.78)] backdrop-blur-sm text-bg-soft px-2.5 py-1.5 rounded-md font-mono text-[10.5px] tracking-[0.04em] border border-[rgba(255,255,255,0.08)] whitespace-nowrap w-fit"
                >
                  <span
                    className={`text-[8.5px] tracking-widest uppercase px-1.25 py-0.5 rounded-[3px] ${
                      chip.status === "thinking"
                        ? "bg-ink-faint text-ink"
                        : chip.type === "GPS"
                          ? "bg-ink text-bg-soft"
                          : "bg-ok text-bg-soft"
                    }`}
                  >
                    {chip.type}
                  </span>
                  {chip.content}
                  {chip.status === "thinking" && (
                    <span className="inline-block animate-[aiDots_1.4s_steps(4,end)_infinite] overflow-hidden align-bottom w-4.5">
                      ···
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          {/* Photo meta */}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3.5 bg-linear-to-t from-[rgba(20,19,17,0.72)] to-transparent text-bg-soft flex justify-between items-end z-30 font-mono text-[10px] tracking-[0.06em] uppercase">
            <span>{frame?.cameraMeta ?? "—"}</span>
            <span>
              <b className="font-medium">{frame?.shootTime ?? "—"}</b> ·{" "}
              {frame?.shootDate ?? "—"}
            </span>
          </div>
        </div>

        {/* Form panel */}
        <div className="px-6 py-5.5 overflow-y-auto max-h-190 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-line [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Caption */}
          <div className="mb-4.5">
            <LabelRow
              label="Caption"
              required
              pill={<AiPill label="AI · drafted" />}
            />
            <input
              className={FIELD_AI}
              type="text"
              defaultValue={frame?.caption ?? ""}
            />
          </div>

          {/* Story */}
          <div className="mb-4.5">
            <LabelRow
              label="Story · optional"
              pill={<ThinkingPill label="AI · suggesting" />}
            />
            <textarea
              className={`${FIELD_BASE} min-h-19 resize-y leading-[1.45]`}
              defaultValue={frame?.story ?? ""}
            />
          </div>

          {/* Captured at + Camera */}
          <div className="mb-4.5 grid grid-cols-2 gap-3.5 max-[540px]:grid-cols-1">
            <div>
              <LabelRow
                label="Captured at"
                required
                pill={<GpsPill label="EXIF" />}
              />
              <input
                className={FIELD_AI}
                type="text"
                defaultValue={frame?.capturedAt ?? ""}
              />
            </div>
            <div>
              <LabelRow label="Camera" pill={<GpsPill label="EXIF" />} />
              <input
                className={FIELD_AI}
                type="text"
                defaultValue={frame?.camera ?? ""}
              />
            </div>
          </div>

          {/* City + District */}
          <div className="mb-4.5 grid grid-cols-2 gap-3.5 max-[540px]:grid-cols-1">
            <div>
              <LabelRow
                label="City"
                required
                pill={<GpsPill label="GPS" pulse />}
              />
              <input
                className={FIELD_AI}
                type="text"
                defaultValue={frame?.city ?? ""}
              />
            </div>
            <div>
              <LabelRow label="District" pill={<GpsPill label="GPS" pulse />} />
              <input
                className={FIELD_AI}
                type="text"
                defaultValue={frame?.district ?? ""}
              />
            </div>
          </div>

          {/* Vehicle type */}
          <div className="mb-4.5">
            <LabelRow
              label="Vehicle type"
              pill={<AiPill label="AI · 97%" />}
            />
            <div className="grid grid-cols-6 gap-1 bg-bg border border-line rounded-lg p-1">
              {VEHICLE_OPTIONS.map((v) => {
                const isActive = selectedVehicle === v.type;
                const isAi = isActive && isAiSelection;
                return (
                  <button
                    key={v.type}
                    onClick={() => handleVehicleSelect(v.type)}
                    className={`py-2 px-1 rounded-md flex flex-col items-center gap-1 font-mono text-[8.5px] tracking-[0.06em] uppercase transition-all cursor-pointer ${
                      isAi
                        ? "bg-accent text-bg-soft"
                        : isActive
                          ? "bg-ink text-bg-soft"
                          : "text-ink-soft hover:bg-bg-soft"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-4.5 h-4.5 opacity-80"
                    >
                      {v.paths}
                    </svg>
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* License plate */}
          <div className="mb-4.5">
            <LabelRow
              label="License plate"
              pill={<AiPill label="AI · OCR · 94%" />}
            />
            <div className="flex items-stretch gap-2">
              <input
                className="flex-1 px-3.5 py-2.5 bg-ink text-[#FFF7DC] border-[1.5px] border-ink rounded-lg font-mono text-[18px] tracking-[0.08em] text-center font-medium outline-none focus:border-accent transition-colors"
                type="text"
                defaultValue={frame?.licensePlate ?? ""}
              />
              <div className="shrink-0 bg-bg border border-line rounded-lg px-2.5 py-1.5 flex flex-col items-center justify-center min-w-16">
                <span className="font-serif text-[18px] leading-none tracking-[-0.01em]">
                  {frame?.plateConfidence ?? 0}%
                </span>
                <span className="font-mono text-[8.5px] tracking-[0.08em] uppercase text-ink-soft mt-0.5">
                  conf.
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4.5">
            <LabelRow
              label="Tags"
              pill={<AiPill label={`AI · ${tags.filter((t) => t.isAi).length} suggested`} />}
            />
            <div className="flex flex-wrap gap-1.5 p-2 bg-bg border border-line rounded-lg min-h-11">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] border ${
                    tag.isAi
                      ? "border-[rgba(192,74,43,0.3)] bg-[rgba(192,74,43,0.05)] text-accent"
                      : "bg-bg-soft border-line"
                  }`}
                >
                  {tag.label}
                  <button
                    onClick={() => removeTag(tag.id)}
                    className="text-ink-faint hover:text-ink transition-colors leading-none"
                    aria-label={`Remove tag ${tag.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                className="bg-transparent border-none outline-none text-ink-faint italic text-[12.5px] flex-1 min-w-25 placeholder:text-ink-faint"
                placeholder="Add a tag…"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-0">
            <LabelRow
              label="License pricing"
              pill={<ThinkingPill label="AI · suggested" />}
            />
            <div className="flex flex-col gap-2">
              {priceTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="grid grid-cols-[130px_1fr_110px_28px] gap-2 items-center"
                >
                  <select
                    className={`${FIELD_BASE} py-2.25 px-2.75 text-[13px]`}
                    defaultValue={tier.licenseType}
                  >
                    {LICENSE_OPTIONS.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <input
                    className={`${FIELD_BASE} py-2.25 px-2.75 text-[13px]`}
                    type="text"
                    defaultValue={tier.description}
                  />
                  <div className="flex items-center gap-1.5 bg-bg border border-line rounded-lg px-2.75">
                    <span className="font-mono text-[11px] text-ink-soft tracking-[0.06em] shrink-0">
                      {tier.currency}
                    </span>
                    <input
                      className="border-none outline-none bg-transparent py-2.25 flex-1 font-mono text-[13.5px] tracking-[0.02em] min-w-0"
                      type="text"
                      defaultValue={tier.amount}
                    />
                  </div>
                  <button
                    onClick={() => removePriceTier(tier.id)}
                    className="w-7 h-7 rounded-md text-ink-faint inline-flex items-center justify-center hover:bg-bg hover:text-ink transition-colors"
                    aria-label="Remove pricing tier"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 3l8 8M11 3l-8 8" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={addPriceTier}
                className="mt-1 self-start inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.08em] uppercase text-ink-soft px-2.5 py-1.5 border border-dashed border-line rounded-md hover:text-ink hover:border-ink transition-colors"
              >
                + Add license tier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Editor footer ── */}
      <footer className="border-t border-line-soft px-5.5 py-3.5 flex items-center gap-2.5 bg-bg-soft sticky bottom-0 flex-wrap">
        <div className="flex items-center gap-2.5 text-ink-soft text-[12.5px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ok shrink-0"
          >
            <circle cx="8" cy="8" r="6.5" />
            <path d="M5 8l2 2 4-4" strokeLinecap="round" />
          </svg>
          <span>
            <b className="text-ink font-medium">Auto-saved</b> · 2 seconds ago
            · 8 of 9 fields filled by AI
          </span>
        </div>
        <div className="ml-auto flex gap-2.5">
          {frame?.momentId ? <ReanalyzeButton momentId={frame.momentId} /> : null}
          <button className="px-4 py-2.5 rounded-lg text-[13px] font-medium border border-line text-ink hover:border-ink transition-colors">
            Skip
          </button>
          <button className="px-4 py-2.5 rounded-lg text-[13px] font-medium border border-line text-ink hover:border-ink transition-colors">
            Save draft
          </button>
          <button className="px-4 py-2.5 rounded-lg text-[13px] font-medium bg-ink text-bg-soft inline-flex items-center gap-1.75 hover:bg-black hover:-translate-y-px transition-all">
            Approve &amp; next
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              className="transition-transform group-hover:translate-x-0.75"
            >
              <path
                d="M1 6.5h10M7 2l4.5 4.5L7 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </footer>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { type DetailImage } from "@/domains/explorer";

interface ExplorerDetailImageGalleryProps {
  image: DetailImage;
  title: string;
}

export function ExplorerDetailImageGallery({ image, title }: ExplorerDetailImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fading, setFading] = useState(false);

  function switchTo(idx: number) {
    if (idx === activeIdx) return;
    setFading(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setFading(false);
    }, 220);
  }

  const mainUrl = `${image.urls[activeIdx]}?w=1600&q=85&auto=format&fit=crop`;

  return (
    <div>
      {/* Main frame */}
      <div className="relative rounded-[10px] overflow-hidden bg-bg-soft border border-line" style={{ aspectRatio: "4/5" }}>
        <Image
          src={mainUrl}
          alt={title}
          fill
          sizes="(max-width: 1080px) 100vw, 60vw"
          className="object-cover"
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.25s ease" }}
          priority
        />

        {/* City · time badge — top-left */}
        <span
          className="absolute top-4.5 left-4.5 z-10 font-mono text-[10.5px] tracking-[0.06em] uppercase text-bg-soft rounded-sm px-2.5 py-1.5 whitespace-nowrap"
          style={{ background: "rgba(20,19,17,0.34)", backdropFilter: "blur(8px)" }}
        >
          {image.badge}
        </span>

        {/* Match badge — top-right */}
        <span className="absolute top-4.5 right-4.5 z-10 font-mono text-[10.5px] tracking-[0.06em] uppercase text-bg-soft bg-accent rounded-sm px-2.5 py-1.5 whitespace-nowrap">
          {image.matchBadge}
        </span>

        {/* Detection annotation box */}
        {image.detection && (
          <div
            className="absolute border-[1.5px] border-accent rounded-sm pointer-events-none z-10"
            style={{
              top: image.detection.top,
              left: image.detection.left,
              width: image.detection.width,
              height: image.detection.height,
            }}
          >
            <span className="absolute -top-5.5 -left-px font-mono text-[9.5px] tracking-wider text-[#FBFAF6] bg-accent rounded-[3px] whitespace-nowrap" style={{ padding: "3px 6px" }}>
              {image.detection.label}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="mt-3.5 grid grid-cols-5 gap-2.5">
        {image.urls.map((url, i) => (
          <button
            key={url}
            onClick={() => switchTo(i)}
            className={`relative rounded-md overflow-hidden border transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 ${
              activeIdx === i
                ? "border-ink shadow-[0_0_0_2px_var(--color-bg),0_0_0_3px_var(--color-ink)]"
                : "border-line"
            }`}
            style={{ aspectRatio: "1/1" }}
            aria-label={`View thumbnail ${i + 1}`}
          >
            <Image
              src={`${url}?w=300&q=70&auto=format&fit=crop`}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

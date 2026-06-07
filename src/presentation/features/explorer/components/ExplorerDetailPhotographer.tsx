import Image from "next/image";
import { type DetailPhotographerBlock } from "@/domains/explorer";
import { ExplorerSectionHead } from "./ExplorerSectionHead";

interface ExplorerDetailPhotographerProps {
  block: DetailPhotographerBlock;
}

export function ExplorerDetailPhotographer({ block }: ExplorerDetailPhotographerProps) {
  return (
    <section>
      <ExplorerSectionHead
        heading="About"
        emphasis="the photographer"
        meta={`${block.name} · ${block.city}`}
      />

      <div
        className="grid gap-12 p-8 border border-line rounded-[14px] bg-bg-soft items-center mt-[40px]"
        style={{ gridTemplateColumns: "1fr 1.4fr" }}
      >
        {/* Portrait */}
        <div className="rounded-[10px] overflow-hidden bg-bg relative" style={{ aspectRatio: "4/5" }}>
          <Image
            src={block.avatarUrl}
            alt={block.name}
            fill
            sizes="(max-width: 1080px) 40vw, 25vw"
            className="object-cover"
          />
        </div>

        {/* Bio */}
        <div>
          <blockquote className="font-serif text-[26px] leading-[1.2] tracking-[-0.01em]">
            &ldquo;{block.quotePrefix}
            <em className="italic text-accent">{block.quoteEmphasis}</em>
            {block.quoteSuffix}&rdquo;
          </blockquote>
          <p className="mt-[18px] font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft">
            — {block.name}, contributor since {block.since}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 pt-[22px] mt-6 border-t border-line">
            <div>
              <p className="font-serif text-[26px] tracking-[-0.02em] leading-none">{block.moments}</p>
              <p className="mt-[6px] font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft">Moments</p>
            </div>
            <div>
              <p className="font-serif text-[26px] tracking-[-0.02em] leading-none">{block.editionsSold}</p>
              <p className="mt-[6px] font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft">Editions sold</p>
            </div>
            <div>
              <p className="font-serif text-[26px] tracking-[-0.02em] leading-none">{block.rating}</p>
              <p className="mt-[6px] font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft">
                Avg · {block.reviewCount} reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

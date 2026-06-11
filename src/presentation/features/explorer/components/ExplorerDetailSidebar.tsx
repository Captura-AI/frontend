import Image from "next/image";
import Link from "next/link";
import { type DetailPhotographerInfo, type PriceInfo } from "@/domains/explorer";
import { ExplorerDetailPriceCard } from "./ExplorerDetailPriceCard";

interface ExplorerDetailSidebarProps {
  photographer: DetailPhotographerInfo;
  frameNumber: string;
  editionOf: number;
  titlePrefix: string;
  titleEmphasis: string;
  description: string;
  price: PriceInfo;
}

export function ExplorerDetailSidebar({
  photographer,
  frameNumber,
  editionOf,
  titlePrefix,
  titleEmphasis,
  description,
  price,
}: ExplorerDetailSidebarProps) {
  return (
    <aside className="sticky top-22.5 flex flex-col gap-7">
      {/* Photographer row */}
      <div className="flex items-center gap-3.5 pb-6 border-b border-line">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-bg-soft border border-line shrink-0 relative">
          <Image
            src={photographer.avatarUrl}
            alt={photographer.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-serif text-[22px] tracking-[-0.01em] leading-[1.1]">{photographer.name}</p>
          <p className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-soft mt-1">
            {photographer.city} · {photographer.momentsCount} moments · since {photographer.since}
          </p>
        </div>
        <button className="px-3.5 py-2 border border-line rounded-full text-[12.5px] whitespace-nowrap transition-[background,color,border-color] duration-200 hover:bg-ink hover:text-bg-soft hover:border-ink">
          Follow
        </button>
      </div>

      {/* Title block */}
      <div>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-ink-soft before:content-[''] before:w-4.5 before:h-px before:bg-ink-soft">
          Frame {frameNumber} · edition of {editionOf}
        </span>
        <h1
          className="font-serif font-normal leading-[1.02] tracking-[-0.02em] text-ink mt-4.5"
          style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
        >
          {titlePrefix}
          <em className="italic text-accent">{titleEmphasis}</em>.
        </h1>
        <p className="mt-3.5 text-ink-soft text-[15.5px] leading-[1.6]">{description}</p>
      </div>

      {/* Price card (client component) */}
      <ExplorerDetailPriceCard price={price} />

      <Link
        href="/privacy/removal"
        className="font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-faint text-center transition-colors hover:text-accent"
      >
        Report a problem with this photo
      </Link>
    </aside>
  );
}

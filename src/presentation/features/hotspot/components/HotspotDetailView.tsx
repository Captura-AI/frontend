import Image from "next/image";
import Link from "next/link";
import type { HotspotDetail } from "@/domains/hotspot";
import { ExplorerSectionHead } from "@/presentation/features/explorer/components/ExplorerSectionHead";

interface HotspotDetailViewProps {
  detail: HotspotDetail;
}

const LEVEL_LABELS: Record<HotspotDetail["level"], string> = {
  hot: "Hot · 30+ moments",
  warm: "Warm · 10–30 moments",
  quiet: "Quiet · under 10 moments",
};

const LEVEL_DOT_CLASSES: Record<HotspotDetail["level"], string> = {
  hot: "bg-accent",
  warm: "bg-[oklch(0.72_0.10_60)]",
  quiet: "bg-ink-faint",
};

export function HotspotDetailView({ detail }: HotspotDetailViewProps) {
  const searchHref = `/explorer?location=${encodeURIComponent(`${detail.name}, ${detail.region}`)}`;

  return (
    <main className="pt-[60px]">
      <div className="max-w-[1320px] mx-auto px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-[10px] pt-7 pb-2 font-mono text-[11px] tracking-[0.06em] uppercase text-ink-soft"
        >
          <Link href="/" className="hover:text-ink transition-colors duration-200">
            Home
          </Link>
          <span className="text-ink-faint">/</span>
          <Link href="/hotspot" className="hover:text-ink transition-colors duration-200">
            Hotspots
          </Link>
          <span className="text-ink-faint">/</span>
          <span className="text-ink">{detail.name}</span>
        </nav>

        {/* Hero */}
        <section
          className="grid gap-14 items-start pt-[26px] pb-[64px] max-[980px]:grid-cols-1 max-[980px]:gap-8"
          style={{ gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)" }}
        >
          <div className="relative rounded-xl overflow-hidden bg-ink" style={{ aspectRatio: "16 / 10" }}>
            <Image
              src={detail.heroImageUrl}
              alt={detail.name}
              fill
              priority
              sizes="(max-width: 980px) 100vw, 60vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(180deg, rgba(20,19,17,0) 45%, rgba(20,19,17,0.65) 100%)" }}
            />
            <span
              className="absolute top-4 left-4 inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.08em] uppercase text-bg-soft rounded-full px-3 py-1.5"
              style={{ background: "rgba(20,19,17,0.45)", backdropFilter: "blur(6px)" }}
            >
              <span className={`w-1.75 h-1.75 rounded-full ${LEVEL_DOT_CLASSES[detail.level]}`} />
              {LEVEL_LABELS[detail.level]}
            </span>
            <h1
              className="absolute bottom-5 left-5 right-5 font-serif font-normal text-[40px] leading-[1.05] tracking-[-0.02em] text-bg-soft max-[680px]:text-[30px]"
              dangerouslySetInnerHTML={{ __html: detail.title }}
            />
          </div>

          <aside className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft">
                {detail.region}
              </span>
              <p className="mt-2 text-ink-soft text-[14px] leading-relaxed">{detail.meta}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 border-y border-line-soft py-5">
              {[
                { value: detail.stats.active, label: "Photographers active here" },
                { value: detail.stats.last15, label: "Moments · last 15 min" },
                { value: detail.stats.total, label: "Captured today" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-[26px] leading-none tracking-[-0.01em]">{stat.value}</div>
                  <div className="mt-1.5 font-mono text-[9.5px] tracking-[0.06em] uppercase text-ink-soft leading-[1.3]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft">
                Best time to shoot
              </span>
              <div className="mt-2 font-serif text-[24px] tracking-[-0.01em] leading-none">
                {detail.bestTimeLabel}
                <span className="block font-mono text-[11px] tracking-[0.06em] uppercase text-ink-soft mt-1.5 not-italic">
                  {detail.bestTimeWindow}
                </span>
              </div>
            </div>

            {detail.popularTags.length > 0 && (
              <div>
                <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft">
                  Popular right now
                </span>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {detail.popularTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft bg-bg-soft border border-line px-2.5 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2.5 mt-2">
              <Link
                href={searchHref}
                className="group flex items-center justify-center gap-2.5 bg-ink text-bg-soft rounded-xl text-[14.5px] font-medium transition-[transform,background] duration-200 hover:-translate-y-px hover:bg-black"
                style={{ padding: "16px 22px" }}
              >
                Search this area in Explorer
                <svg className="transition-transform duration-250 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/photographers"
                className="flex items-center justify-center bg-bg-soft border border-line rounded-xl text-[14.5px] font-medium text-ink transition-colors duration-200 hover:border-ink"
                style={{ padding: "16px 22px" }}
              >
                View photographers in this area
              </Link>
            </div>
          </aside>
        </section>

        {/* Description */}
        <section className="max-w-[760px] pb-[60px]">
          <p className="text-ink-soft text-[16px] leading-[1.7]">{detail.description}</p>
        </section>

        {/* Active photographers */}
        {detail.activePhotographers.length > 0 && (
          <section>
            <ExplorerSectionHead heading="Active" emphasis="photographers" meta="Watching this corner now" />
            <div className="flex flex-wrap gap-4 pb-[60px]">
              {detail.activePhotographers.map((photographer) => (
                <div
                  key={photographer.id}
                  className="flex items-center gap-3 border border-line rounded-full pl-2 pr-4 py-2 bg-bg-soft"
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-bg shrink-0">
                    <Image src={photographer.avatarUrl} alt={photographer.name} fill sizes="36px" className="object-cover" />
                  </div>
                  <span className="font-serif italic text-[15px] leading-none">{photographer.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Latest moments */}
        <section>
          <ExplorerSectionHead heading="Latest" emphasis="moments" meta={`From ${detail.name}`} />
          <div className="grid grid-cols-3 gap-[18px] mt-9 pb-[80px] max-[980px]:grid-cols-2 max-[680px]:grid-cols-1">
            {detail.latestMoments.map((moment) => (
              <Link
                key={moment.id}
                href="/explorer"
                className="group relative overflow-hidden rounded-[8px] block transition-transform duration-500 [cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={moment.imageUrl}
                  alt={moment.caption}
                  fill
                  sizes="(max-width: 980px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 [cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
                />
                <span
                  className="absolute top-3 left-3 z-10 font-mono text-[10px] tracking-[0.06em] uppercase text-bg-soft rounded-[3px] px-2 py-1 whitespace-nowrap"
                  style={{ background: "rgba(20,19,17,0.34)", backdropFilter: "blur(6px)" }}
                >
                  {moment.timeAgo}
                </span>
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms]"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,19,17,0.6) 100%)" }}
                />
                <p className="absolute bottom-[14px] left-[14px] right-[14px] z-10 font-serif italic text-[14px] leading-[1.2] text-bg-soft opacity-0 translate-y-[6px] group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-[350ms]">
                  {moment.caption}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Back to map */}
        <div className="pb-[80px]">
          <Link href="/hotspot" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft hover:text-ink transition-colors duration-200">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M12 6.5H2M6 2L1.5 6.5L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to live map
          </Link>
        </div>
      </div>
    </main>
  );
}

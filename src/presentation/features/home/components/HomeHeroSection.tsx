import Link from "next/link";
import { type HomeHero } from "@/domains/home/entities/HomePage";

interface HomeHeroSectionProps {
  hero: HomeHero;
}

// ─── SVG icons ───────────────────────────────────────────────────────────────

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5"/>
      <path d="M8 4v4l3 2"/>
    </svg>
  );
}
function IconPlate() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="4.5" width="13" height="7" rx="1"/>
      <path d="M4 7.5h1.5M7 7.5h1.5M10 7.5h1.5"/>
    </svg>
  );
}
function IconShirt() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 3l3 2 3-2 3 3-2 2v5H4V8L2 6z"/>
    </svg>
  );
}

// ─── Annotation chip ─────────────────────────────────────────────────────────

function Chip({
  icon,
  keyLabel,
  value,
  style,
}: {
  icon: React.ReactNode;
  keyLabel: string;
  value: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute flex items-center gap-[10px] rounded-xl bg-bg-soft border border-line px-[13px] py-[10px] text-[12.5px] shadow-[0_10px_30px_-10px_rgba(20,19,17,0.18)]"
      style={{ animation: "float 6s ease-in-out infinite", ...style }}
    >
      <span className="text-ink-soft">{icon}</span>
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.04em] text-ink-soft">
          {keyLabel}
        </p>
        <p className="font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

// ─── Hero scene ───────────────────────────────────────────────────────────────

function HeroScene() {
  return (
    <div className="relative" style={{ aspectRatio: "4/5" }}>
      <div
        className="absolute inset-0 overflow-hidden rounded-[8px] bg-[#E8E2D5]"
        style={{
          boxShadow: "0 30px 80px -30px rgba(20,19,17,0.25), 0 2px 8px -2px rgba(20,19,17,0.08)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(20,19,17,0.08) 0%,rgba(20,19,17,0) 50%,rgba(20,19,17,0.18) 100%), repeating-linear-gradient(135deg,#D8D2C4 0 2px,#CFC9BB 2px 14px)",
          }}
        />
        <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYEnd meet" className="absolute inset-0 h-full w-full">
          <line x1="0" y1="340" x2="400" y2="340" stroke="rgba(20,19,17,0.15)" strokeWidth="1" />
          <line x1="130" y1="500" x2="180" y2="340" stroke="rgba(20,19,17,0.08)" strokeWidth="1" />
          <line x1="270" y1="500" x2="220" y2="340" stroke="rgba(20,19,17,0.08)" strokeWidth="1" />
          <rect x="170" y="260" width="50" height="110" rx="4" fill="rgba(20,19,17,0.55)" />
          <circle cx="195" cy="245" r="14" fill="rgba(20,19,17,0.55)" />
          <rect x="175" y="370" width="18" height="40" fill="rgba(20,19,17,0.45)" />
          <rect x="200" y="370" width="18" height="40" fill="rgba(20,19,17,0.45)" />
        </svg>
        <div
          className="outline-box absolute rounded-[4px] border-[1.5px] border-dashed border-accent"
          style={{ top: "32%", left: "38%", width: "24%", height: "42%", animation: "pulseBox 3s ease-in-out infinite" }}
        />
        <div className="absolute bottom-3.5 left-3.5 rounded-[4px] bg-[rgba(251,250,246,0.85)] px-[10px] py-[6px] font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink backdrop-blur-[6px]">
          Placeholder · street scene 4:5 · runner at dusk
        </div>
      </div>
      <Chip
        icon={<span className="inline-block w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(183,101,61,0.15)]" />}
        keyLabel="Location" value="Shibuya, JP"
        style={{ top: "8%", left: "-8%", animationDelay: "0s" }}
      />
      <Chip icon={<IconClock />} keyLabel="Captured" value="17:42 · Apr 12"
        style={{ top: "30%", right: "-6%", animationDelay: "1.2s" }}
      />
      <Chip icon={<IconPlate />} keyLabel="Plate match" value="SHIB · 441"
        style={{ top: "58%", left: "-10%", animationDelay: "2.4s" }}
      />
      <Chip icon={<IconShirt />} keyLabel="Outfit" value="Red jacket"
        style={{ bottom: "10%", right: "-4%", animationDelay: "3.6s" }}
      />
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function HomeHeroSection({ hero }: HomeHeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center pt-[140px] pb-[80px]">
      <div className="max-w-[1320px] mx-auto px-10 w-full">
        <div className="grid grid-cols-[1.05fr_0.95fr] gap-[60px] items-center">
          {/* Left: copy */}
          <div>
            <div
              className="inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.08em] uppercase text-ink-soft opacity-0"
              style={{ animation: "fadeIn 0.8s ease 0.3s forwards" }}
            >
              <span className="block w-[18px] h-px bg-ink-soft" />
              {hero.eyebrow}
            </div>
            <h1
              className="mt-7 font-serif font-normal leading-[0.95] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(56px, 7vw, 100px)" }}
            >
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line-span">{hero.headlinePart1}</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line-span" style={{ animationDelay: "0.12s" }}>
                  {hero.headlineSuffix}{" "}
                  <em className="italic text-accent">{hero.headlineEmphasis}</em>.
                </span>
              </span>
            </h1>
            <p
              className="mt-[34px] max-w-[440px] text-[17px] leading-[1.5] text-ink-soft opacity-0"
              style={{ animation: "fadeIn 0.8s ease 0.6s forwards" }}
            >
              {hero.description}
            </p>
            <div
              className="flex gap-[14px] mt-[38px] opacity-0"
              style={{ animation: "fadeIn 0.8s ease 0.75s forwards" }}
            >
              <Link
                href={hero.primaryCtaHref}
                className="inline-flex items-center gap-[10px] rounded-full bg-ink text-bg-soft px-[26px] py-[15px] text-[14.5px] font-medium transition-[transform,background] duration-300 hover:-translate-y-0.5 hover:bg-black"
              >
                {hero.primaryCtaLabel}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href={hero.secondaryCtaHref}
                className="inline-flex items-center rounded-full border border-line text-ink px-[26px] py-[15px] text-[14.5px] font-medium transition-[background,color,border-color] duration-300 hover:bg-ink hover:text-bg-soft hover:border-ink"
              >
                {hero.secondaryCtaLabel}
              </Link>
            </div>
            <div
              className="mt-[72px] flex gap-[48px] font-mono text-[11.5px] tracking-[0.04em] text-ink-soft opacity-0"
              style={{ animation: "fadeIn 0.8s ease 0.9s forwards" }}
            >
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-serif text-[28px] tracking-[-0.02em] text-ink">{stat.value}</span>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
          {/* Right: scene */}
          <HeroScene />
        </div>
      </div>
      <div className="absolute bottom-9 left-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] uppercase text-ink-soft">
        <div
          className="w-px h-7 bg-ink-soft"
          style={{ animation: "scrollLine 2s ease-in-out infinite", transformOrigin: "top" }}
        />
        Scroll to explore
      </div>
    </section>
  );
}

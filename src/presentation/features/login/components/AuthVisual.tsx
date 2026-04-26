import Image from "next/image";
import Link from "next/link";

export function AuthVisual() {
  return (
    <aside className="relative bg-bg-soft overflow-hidden p-9 flex flex-col justify-between border-r border-line">
      {/* Brand */}
      <Link
        href="/"
        className="relative z-3 inline-flex items-center gap-2.5 font-serif text-[24px] tracking-[-0.01em] text-ink"
      >
        <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
        Captura
      </Link>

      {/* Photo — absolutely fills space between brand and quote */}
      <div className="group absolute top-20 left-9 right-9 bottom-50 rounded-xl overflow-hidden bg-[#2a2622]">
        <Image
          src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1400&q=80&auto=format&fit=crop"
          alt="Street moment, Shibuya at dusk"
          fill
          sizes="50vw"
          priority
          className="object-cover scale-[1.04] group-hover:scale-100 transition-transform duration-8000 ease-linear"
        />
        {/* Bottom gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,19,17,0.45) 100%)" }}
        />
      </div>

      {/* Floating chip 1 — location */}
      <div
        className="absolute z-4 bg-bg-soft border border-line rounded-xl px-3.25 py-2.25 flex items-center gap-2.5 shadow-[0_14px_40px_-14px_rgba(20,19,17,0.25)]"
        style={{ top: "22%", left: "8%", animation: "float 7s ease-in-out infinite" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
        <div>
          <span className="block font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft whitespace-nowrap">
            Location
          </span>
          <span className="block text-[13px] font-medium text-ink whitespace-nowrap">Shibuya, JP</span>
        </div>
      </div>

      {/* Floating chip 2 — time */}
      <div
        className="absolute z-4 bg-bg-soft border border-line rounded-xl px-3.25 py-2.25 flex items-center gap-2.5 shadow-[0_14px_40px_-14px_rgba(20,19,17,0.25)]"
        style={{ top: "46%", right: "6%", animation: "float 7s ease-in-out infinite 1.6s" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="shrink-0 text-ink-soft"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="6.5" />
          <path d="M8 4v4l3 2" />
        </svg>
        <div>
          <span className="block font-mono text-[10px] tracking-[0.06em] uppercase text-ink-soft whitespace-nowrap">
            Captured
          </span>
          <span className="block text-[13px] font-medium text-ink whitespace-nowrap">17:42 · Apr 12</span>
        </div>
      </div>

      {/* Quote — sits at the bottom of the panel */}
      <div className="relative z-3 max-w-120">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-ink-soft mb-3.5 before:content-[''] before:w-4.5 before:h-px before:bg-ink-soft">
          A quiet welcome
        </span>
        <blockquote
          className="font-serif leading-[1.15] tracking-[-0.01em]"
          style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
        >
          Somewhere out there,{" "}
          <em className="italic text-accent">your moment is already taken</em>. Sign in to find
          it.
        </blockquote>
        <p className="mt-3 font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft">
          — Captura · 2.4M moments archived
        </p>
      </div>
    </aside>
  );
}

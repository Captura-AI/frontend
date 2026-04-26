"use client";

import { useState, useCallback } from "react";
import type { AuthMode } from "../interfaces/login.interface";

// ─── Content by mode ────────────────────────────────────────────────────────

const TITLE: Record<AuthMode, { prefix: string; em: string }> = {
  signin: { prefix: "Welcome ", em: "back" },
  signup: { prefix: "Find your ", em: "moments" },
};

const SUB: Record<AuthMode, string> = {
  signin:
    "No passwords, no codes to memorize. Continue with a service you already trust, or your phone.",
  signup:
    "Just a phone or a service you trust. No long forms, no passwords — your account, in under thirty seconds.",
};

const CTA_LABEL: Record<AuthMode, string> = {
  signin: "Sign in with phone",
  signup: "Create my account",
};

const SWITCH: Record<AuthMode, { prompt: string; link: string }> = {
  signin: { prompt: "New to Captura?", link: "Create an account →" },
  signup: { prompt: "Already with us?", link: "Sign in instead →" },
};

const TOP: Record<AuthMode, { label: string; link: string }> = {
  signin: { label: "New here?", link: "Create account" },
  signup: { label: "Returning?", link: "Sign in" },
};

// ─── Small arrow SVG ────────────────────────────────────────────────────────

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 7h12M8 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── SSO Button ─────────────────────────────────────────────────────────────

function SsoButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 w-full px-4.5 py-3.25 bg-bg-soft border border-line rounded-xl text-[14.5px] text-ink transition-all duration-200 text-left hover:border-ink hover:-translate-y-px"
    >
      <span className="w-5 h-5 shrink-0 flex items-center justify-center">{icon}</span>
      <span className="flex-1">{label}</span>
      <ArrowIcon className="text-ink-faint transition-[transform,color] duration-200 group-hover:translate-x-0.75 group-hover:text-ink" />
    </button>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function toggleMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
  }

  const handleContinue = useCallback(async () => {
    setIsLoading(true);
    // TODO: integrate phone OTP auth
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
  }, [phone]);

  function handleSso(provider: string) {
    // TODO: integrate OAuth provider
    console.info("[Auth] SSO provider:", provider);
  }

  return (
    <main className="relative flex flex-col justify-center px-20 pt-15 pb-24 overflow-y-auto">
      {/* Top-right corner link */}
      <div className="absolute top-9 right-20 flex items-center gap-2.5 text-[13.5px] text-ink-soft">
        {TOP[mode].label}{" "}
        <button
          type="button"
          onClick={toggleMode}
          className="text-ink px-3.5 py-2 rounded-full border border-line whitespace-nowrap transition-[background] duration-200 hover:bg-bg-soft"
        >
          {TOP[mode].link}
        </button>
      </div>

      {/* Auth content — max 420px centered */}
      <div className="w-full max-w-105 mx-auto">
        {/* Mode tabs */}
        <div
          className="inline-flex bg-bg-soft border border-line rounded-full p-1 mb-9"
          role="tablist"
          aria-label="Authentication mode"
        >
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-250 ${
                mode === m ? "bg-ink text-bg-soft" : "text-ink-soft hover:text-ink"
              }`}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        {/* Title */}
        <h1
          className="font-serif font-normal leading-none tracking-[-0.02em]"
          style={{ fontSize: "clamp(40px, 4.6vw, 56px)" }}
        >
          {TITLE[mode].prefix}
          <em className="italic text-accent">{TITLE[mode].em}</em>.
        </h1>
        <p className="mt-3.5 text-ink-soft text-[15px] leading-[1.55] max-w-95">
          {SUB[mode]}
        </p>

        {/* SSO buttons */}
        <div className="mt-8 flex flex-col gap-2.5">
          <SsoButton
            label="Continue with Google"
            onClick={() => handleSso("google")}
            icon={
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.05l3.01-2.33z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
                />
              </svg>
            }
          />
          <SsoButton
            label="Continue with Apple"
            onClick={() => handleSso("apple")}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#141311" aria-hidden="true">
                <path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-4zM14 4.8c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
              </svg>
            }
          />
          <SsoButton
            label="Continue with email link"
            onClick={() => handleSso("email")}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#141311"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="2" y="4.5" width="16" height="11" rx="2" />
                <path d="M2.5 5.5l7.5 5 7.5-5" />
              </svg>
            }
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3.5 mt-7 mb-5 font-mono text-[10.5px] tracking-widest uppercase text-ink-faint before:content-[''] before:flex-1 before:h-px before:bg-line after:content-[''] after:flex-1 after:h-px after:bg-line">
          or with your phone
        </div>

        {/* Phone input */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft">
            Phone number
          </span>
          <div className="flex items-center bg-bg-soft border border-line rounded-xl p-1 pr-1.5 transition-[border-color] duration-250 focus-within:border-ink">
            {/* Country selector */}
            <button
              type="button"
              aria-label="Select country code"
              className="flex items-center gap-2 px-3 py-2.5 bg-bg rounded-[10px] text-[14px] border border-transparent transition-[border-color] hover:border-line"
            >
              {/* Indonesia flag */}
              <span
                className="w-5.5 h-4 rounded-xs shrink-0"
                style={{ background: "linear-gradient(to bottom, #DA291C 50%, #FFFFFF 50%)" }}
                aria-hidden="true"
              />
              <span className="font-mono text-[13px] text-ink">+62</span>
              {/* Caret */}
              <span
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "7px",
                  height: "7px",
                  borderRight: "1.2px solid #A29D95",
                  borderBottom: "1.2px solid #A29D95",
                  transform: "rotate(45deg) translateY(-2px)",
                  marginLeft: "2px",
                }}
              />
            </button>

            {/* Number input */}
            <input
              type="tel"
              placeholder="812 3456 7890"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none font-serif text-[22px] tracking-[-0.005em] px-3 py-1.5 text-ink placeholder:text-ink-faint placeholder:italic"
            />
          </div>
        </div>

        {/* Continue button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={isLoading}
          className="group mt-4.5 w-full flex items-center justify-center gap-2.5 bg-ink text-bg-soft rounded-xl text-[14.5px] font-medium transition-[transform,background] duration-200 hover:-translate-y-px hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          style={{ padding: "16px 22px" }}
        >
          {isLoading ? "One moment…" : CTA_LABEL[mode]}
          {!isLoading && (
            <ArrowIcon className="transition-transform duration-250 group-hover:translate-x-1" />
          )}
        </button>

        {/* Reassurance */}
        <div className="mt-4.5 flex items-center gap-3.5 text-[12.5px] text-ink-soft">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.25 bg-bg-soft border border-line rounded-full font-mono text-[10px] tracking-[0.06em] uppercase text-ink whitespace-nowrap">
            <span
              className="w-1.25 h-1.25 rounded-full shrink-0"
              style={{ background: "oklch(0.62 0.12 150)" }}
              aria-hidden="true"
            />
            Passwordless
          </span>
          <span>One tap. We'll send a quiet confirmation.</span>
        </div>

        {/* Legal */}
        <p className="mt-7 text-[12px] leading-[1.55] text-ink-faint max-w-95">
          By continuing, you agree to Captura's{" "}
          <a
            href="#"
            className="text-ink-soft underline underline-offset-2 decoration-1 hover:text-ink"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-ink-soft underline underline-offset-2 decoration-1 hover:text-ink"
          >
            Privacy Notice
          </a>
          . We'll only contact you about your account — never about your moments.
        </p>

        {/* Switch mode row */}
        <div className="mt-8 pt-6 border-t border-line-soft flex justify-between items-center text-[13.5px] text-ink-soft">
          <span>{SWITCH[mode].prompt}</span>
          <button
            type="button"
            onClick={toggleMode}
            className="font-serif italic text-[16px] text-ink hover:text-accent transition-colors"
          >
            {SWITCH[mode].link}
          </button>
        </div>
      </div>

      {/* Panel footer — pinned to bottom */}
      <div className="absolute bottom-7 left-20 right-20 flex justify-between font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-faint">
        <span>© 2026 Captura Studio</span>
        <a href="#" className="hover:text-ink transition-colors">
          Need help signing in?
        </a>
      </div>
    </main>
  );
}

"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createAuthRepository, createHttpClient, createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";
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

const COUNTRY_OPTIONS = [
  { code: "ID", country: "Indonesia", dialCode: "+62" },
  { code: "US", country: "United States", dialCode: "+1" },
  { code: "GB", country: "United Kingdom", dialCode: "+44" },
  { code: "SG", country: "Singapore", dialCode: "+65" },
  { code: "MY", country: "Malaysia", dialCode: "+60" },
  { code: "JP", country: "Japan", dialCode: "+81" },
  { code: "AU", country: "Australia", dialCode: "+61" },
  { code: "NL", country: "Netherlands", dialCode: "+31" },
] as const;

type CountryOption = (typeof COUNTRY_OPTIONS)[number];

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
  disabled = false,
  label,
  icon,
  onClick,
}: {
  disabled?: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex items-center gap-3 w-full px-4.5 py-3.25 bg-bg-soft border border-line rounded-xl text-[14.5px] text-ink transition-all duration-200 text-left hover:border-ink hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:border-line"
    >
      <span className="w-5 h-5 shrink-0 flex items-center justify-center">{icon}</span>
      <span className="flex-1">{label}</span>
      <ArrowIcon className="text-ink-faint transition-[transform,color] duration-200 group-hover:translate-x-0.75 group-hover:text-ink" />
    </button>
  );
}

function CountryMark({ country }: { country: CountryOption }) {
  if (country.code === "ID") {
    return (
      <span
        className="h-4 w-5.5 shrink-0 rounded-xs"
        style={{ background: "linear-gradient(to bottom, #DA291C 50%, #FFFFFF 50%)" }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span className="grid h-5 w-7 shrink-0 place-items-center rounded-[5px] border border-line bg-bg font-mono text-[9px] text-ink-soft">
      {country.code}
    </span>
  );
}

function AuthInput({
  autoComplete,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  autoComplete?: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-bg-soft border border-line rounded-xl outline-none text-[15px] px-4 py-3.5 text-ink placeholder:text-ink-faint focus:border-ink"
      />
    </label>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [authMethod, setAuthMethod] = useState<"phone" | "password" | "magic">("phone");
  const [oauthLoading, setOauthLoading] = useState<"google" | "apple" | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRY_OPTIONS[0]);
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const authRepository = useMemo(() => {
    const session = createSessionStore();
    const http = createHttpClient(apiConfig.baseUrl, session);
    return createAuthRepository(http, session);
  }, []);

  const setAuthMode = useCallback((nextMode: AuthMode) => {
    setMode(nextMode);
    setError(null);
    setNotice(null);
    setIsOtpSent(false);
    setOtp("");
  }, []);

  function toggleMode() {
    setAuthMode(mode === "signin" ? "signup" : "signin");
  }

  const handleContinue = useCallback(async () => {
    setError(null);
    setNotice(null);
    setIsLoading(true);
    try {
      if (authMethod === "password") {
        if (mode === "signup") {
          await authRepository.register({
            email,
            password,
            username: username.trim(),
          });
        } else {
          await authRepository.login({
            password,
            username: username.trim(),
          });
        }
        router.push("/explorer");
        return;
      }

      if (authMethod === "magic") {
        const message = await authRepository.initMagicLink({ email });
        setNotice(message);
        return;
      }

      if (isOtpSent) {
        await authRepository.verifyPhoneOtp({
          countryCode: selectedCountry.dialCode,
          otp,
          phoneNumber: phone,
        });
        router.push("/explorer");
        return;
      }

      const message = await authRepository.initPhoneOtp({
        countryCode: selectedCountry.dialCode,
        phoneNumber: phone,
      });
      setIsOtpSent(true);
      setNotice(message);
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  }, [authMethod, authRepository, email, isOtpSent, mode, otp, password, phone, router, selectedCountry.dialCode, username]);

  async function handleSso(provider: string) {
    if (provider !== "google" && provider !== "apple") {
      setAuthMethod("magic");
      setNotice("Enter your email below and we'll send a magic link.");
      return;
    }

    setError(null);
    setNotice(null);
    setOauthLoading(provider);

    try {
      const providers = await authRepository.getOAuthProviders();
      const providerStatus = providers[provider];

      if (!providerStatus.available) {
        setNotice(
          providerStatus.message ??
            `${provider === "google" ? "Google" : "Apple"} sign in is not available yet.`
        );
        return;
      }

      window.location.href = `${apiConfig.baseUrl}${authRepository.getOAuthUrl(provider)}`;
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : "Could not verify OAuth provider status."
      );
    } finally {
      setOauthLoading(null);
    }
  }

  return (
    <main className="min-h-svh lg:h-svh flex flex-col overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 lg:px-14 xl:px-20 lg:py-10">
      <div className="flex items-center justify-between gap-4 text-[13.5px] text-ink-soft">
        <span>{TOP[mode].label}</span>
        <button
          type="button"
          onClick={toggleMode}
          className="text-ink px-3.5 py-2 rounded-full border border-line whitespace-nowrap transition-[background,border-color] duration-200 hover:bg-bg-soft hover:border-ink-soft"
        >
          {TOP[mode].link}
        </button>
      </div>

      <div className="flex-1 w-full max-w-105 mx-auto flex flex-col justify-center py-10 sm:py-12 lg:py-14">
        {/* Mode tabs */}
        <div
          className="relative grid grid-cols-2 bg-bg-soft border border-line rounded-full p-1 mb-8 overflow-hidden"
          role="tablist"
          aria-label="Authentication mode"
        >
          <span
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
              mode === "signin" ? "translate-x-0 left-1" : "translate-x-full left-1"
            }`}
            aria-hidden="true"
          />
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setAuthMode(m)}
              className={`relative z-1 px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-250 ${
                mode === m ? "text-bg-soft" : "text-ink-soft hover:text-ink"
              }`}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>

        <section key={mode} className="auth-mode-enter">
          <h1
            className="font-serif font-normal leading-none"
            style={{ fontSize: "clamp(40px, 4.6vw, 56px)" }}
          >
            {TITLE[mode].prefix}
            <em className="italic text-accent">{TITLE[mode].em}</em>.
          </h1>
          <p className="mt-3.5 text-ink-soft text-[15px] leading-[1.55] max-w-95">
            {SUB[mode]}
          </p>
        </section>

        {/* SSO buttons */}
        <div className="mt-8 flex flex-col gap-2.5">
          <SsoButton
            disabled={oauthLoading !== null}
            label={oauthLoading === "google" ? "Checking Google..." : "Continue with Google"}
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
            disabled={oauthLoading !== null}
            label={oauthLoading === "apple" ? "Checking Apple..." : "Continue with Apple"}
            onClick={() => handleSso("apple")}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#141311" aria-hidden="true">
                <path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-4zM14 4.8c.7-.8 1.1-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z" />
              </svg>
            }
          />
          <SsoButton
            disabled={oauthLoading !== null}
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
          or use Captura credentials
        </div>

        <div
          className="grid grid-cols-3 gap-1 bg-bg-soft border border-line rounded-full p-1 mb-5"
          role="tablist"
          aria-label="Authentication method"
        >
          {([
            ["phone", "Phone"],
            ["password", mode === "signin" ? "Password" : "Register"],
            ["magic", "Email link"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={authMethod === value}
              onClick={() => {
                setAuthMethod(value);
                setError(null);
                setNotice(null);
              }}
              className={`px-3 py-2 rounded-full font-mono text-[10px] tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-200 ${
                authMethod === value ? "bg-ink text-bg-soft" : "text-ink-soft hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {authMethod === "phone" && (
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft">
              Phone number
            </span>
            <div className="relative flex items-center bg-bg-soft border border-line rounded-xl p-1 pr-1.5 transition-[border-color] duration-250 focus-within:border-ink">
              <button
                type="button"
                aria-expanded={isCountryPickerOpen}
                aria-haspopup="listbox"
                aria-label="Select country code"
                onClick={() => setIsCountryPickerOpen((isOpen) => !isOpen)}
                className="flex items-center gap-2 px-3 py-2.5 bg-bg rounded-[10px] text-[14px] border border-transparent transition-[border-color] hover:border-line"
              >
                <CountryMark country={selectedCountry} />
                <span className="font-mono text-[13px] text-ink">{selectedCountry.dialCode}</span>
                <span
                  className={`h-1.5 w-1.5 border-b border-r border-ink-faint transition-transform duration-200 ${
                    isCountryPickerOpen ? "-rotate-135 translate-y-0.5" : "rotate-45 -translate-y-0.5"
                  }`}
                  aria-hidden="true"
                />
              </button>
              <input
                type="tel"
                placeholder="812 3456 7890"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none font-serif text-[22px] tracking-[-0.005em] px-3 py-1.5 text-ink placeholder:text-ink-faint placeholder:italic"
              />
              {isCountryPickerOpen && (
                <div
                  className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 rounded-xl border border-line bg-bg-soft p-1.5 shadow-[0_24px_70px_-32px_rgba(20,19,17,0.45)]"
                  role="listbox"
                  aria-label="Country phone prefixes"
                >
                  {COUNTRY_OPTIONS.map((country) => {
                    const selected = country.dialCode === selectedCountry.dialCode;

                    return (
                      <button
                        key={country.code}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryPickerOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                          selected ? "bg-bg text-ink" : "text-ink-soft hover:bg-bg hover:text-ink"
                        }`}
                      >
                        <CountryMark country={country} />
                        <span className="flex-1 text-[13px]">{country.country}</span>
                        <span className="font-mono text-[12px] text-ink">{country.dialCode}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {isOtpSent && (
              <>
                <span className="font-mono text-[10.5px] tracking-[0.08em] uppercase text-ink-soft mt-2">
                  Verification code
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-bg-soft border border-line rounded-xl outline-none font-serif text-[22px] tracking-[0.08em] px-4 py-3 text-ink placeholder:text-ink-faint placeholder:italic focus:border-ink"
                />
              </>
            )}
          </div>
        )}

        {authMethod === "password" && (
          <div className="flex flex-col gap-3">
            {mode === "signup" && (
              <AuthInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@captura.ai"
                autoComplete="email"
              />
            )}
            <AuthInput
              label="Username"
              value={username}
              onChange={setUsername}
              placeholder="johndoe"
              autoComplete="username"
            />
            <AuthInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>
        )}

        {authMethod === "magic" && (
          <AuthInput
            label="Email magic link"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@captura.ai"
            autoComplete="email"
          />
        )}

        {(error || notice) && (
          <p
            className={`mt-4 rounded-xl border px-4 py-3 text-[13px] leading-[1.45] ${
              error
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-line bg-bg-soft text-ink-soft"
            }`}
          >
            {error ?? notice}
          </p>
        )}

        {/* Continue button */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={isLoading}
          className="group mt-4.5 w-full flex items-center justify-center gap-2.5 bg-ink text-bg-soft rounded-xl text-[14.5px] font-medium transition-[transform,background] duration-200 hover:-translate-y-px hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          style={{ padding: "16px 22px" }}
        >
          {isLoading
            ? "One moment…"
            : authMethod === "phone" && isOtpSent
              ? "Verify code"
              : authMethod === "magic"
                ? "Send magic link"
                : CTA_LABEL[mode]}
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
          <span>One tap. We&apos;ll send a quiet confirmation.</span>
        </div>

        {/* Legal */}
        <p className="mt-7 text-[12px] leading-[1.55] text-ink-faint max-w-95">
          By continuing, you agree to Captura&apos;s{" "}
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
          . We&apos;ll only contact you about your account — never about your moments.
        </p>

        {/* Switch mode row */}
        <div className="mt-8 pt-6 border-t border-line-soft flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-[13.5px] text-ink-soft">
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

      <div className="flex flex-col sm:flex-row gap-2 sm:justify-between font-mono text-[10.5px] tracking-[0.06em] uppercase text-ink-faint border-t border-line-soft pt-5">
        <span>© 2026 Captura Studio</span>
        <a href="#" className="hover:text-ink transition-colors">
          Need help signing in?
        </a>
      </div>
    </main>
  );
}

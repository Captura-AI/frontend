"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createAuthRepository, createHttpClient, createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";

function MagicLinkVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | null>(null);

  const authRepository = useMemo(() => {
    const session = createSessionStore();
    const http = createHttpClient(apiConfig.baseUrl, session);
    return createAuthRepository(http, session);
  }, []);

  useEffect(() => {
    async function verify() {
      if (!token) {
        setError("Magic link token is missing.");
        return;
      }

      try {
        await authRepository.verifyMagicLink(token);
        router.replace("/explorer");
      } catch (verifyError) {
        setError(
          verifyError instanceof Error
            ? verifyError.message
            : "Magic link verification failed."
        );
      }
    }

    void verify();
  }, [authRepository, router, token]);

  return (
    <main className="min-h-screen bg-bg text-ink flex items-center justify-center px-6">
      <section className="w-full max-w-md rounded-2xl border border-line bg-bg-soft p-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-soft">
          Captura authentication
        </p>
        <h1 className="mt-4 font-serif text-[42px] leading-none font-normal">
          {error ? "Link expired" : "Verifying link"}
          <em className="italic text-accent">.</em>
        </h1>
        <p className="mt-4 text-[14px] leading-[1.55] text-ink-soft">
          {error ??
            "One moment while we confirm your email and prepare your session."}
        </p>
        {error && (
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-ink px-5 py-3 text-[14px] font-medium text-bg-soft"
          >
            Request a new link
          </Link>
        )}
      </section>
    </main>
  );
}

export default function MagicLinkVerifyPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-bg px-6 text-ink">
          <section className="w-full max-w-md rounded-2xl border border-line bg-bg-soft p-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
              Captura authentication
            </p>
            <h1 className="mt-4 font-serif text-[42px] font-normal leading-none">
              Verifying link<em className="italic text-accent">.</em>
            </h1>
            <p className="mt-4 text-[14px] leading-[1.55] text-ink-soft">
              One moment while we prepare your secure session.
            </p>
          </section>
        </main>
      }
    >
      <MagicLinkVerifyContent />
    </Suspense>
  );
}

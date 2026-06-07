"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createSessionStore } from "@/infrastructure";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const sessionStore = useMemo(() => createSessionStore(), []);

  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    const params = new URLSearchParams(hash);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken") ?? undefined;

    if (!accessToken) {
      router.replace("/login");
      return;
    }

    sessionStore.saveSession(accessToken, refreshToken);
    window.history.replaceState(null, "", window.location.pathname);
    router.replace("/explorer");
  }, [router, sessionStore]);

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6 text-ink">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-ink-muted">
          Captura authentication
        </p>
        <h1 className="mt-4 font-serif text-5xl">Google sign in</h1>
        <p className="mt-4 text-ink-soft">Completing sign in...</p>
      </div>
    </main>
  );
}

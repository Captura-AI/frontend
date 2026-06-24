"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { io, type Socket } from "socket.io-client";
import { createSessionStore } from "@/infrastructure";
import { apiConfig } from "@/shared";

interface AnalysisPollerProps {
  isActive: boolean;
}

const POLL_INTERVAL_MS = 5000;

/**
 * Invisible client component that keeps the uploads page in sync with AI
 * analysis progress. Uses two strategies:
 *
 * 1. WebSocket (primary) — connects to the backend /moments namespace and
 *    refreshes when a `moment.analyzed` event arrives for this user.
 *
 * 2. Polling (fallback) — when no WS connection is established, falls back
 *    to a 5-second refresh interval so the page still updates without WS.
 *
 * Both strategies stop as soon as `isActive` becomes false (no more
 * frames in "analyzing" state).
 */
export function AnalysisPoller({ isActive }: AnalysisPollerProps) {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const token = createSessionStore().getAccessToken();

    if (!token) return;

    const socket = io(`${apiConfig.baseUrl}/moments`, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 3,
      timeout: 3000,
    });

    socketRef.current = socket;

    socket.on("connect", () => setWsConnected(true));
    socket.on("disconnect", () => setWsConnected(false));
    socket.on("connect_error", () => setWsConnected(false));

    socket.on("moment.analyzed", () => {
      router.refresh();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setWsConnected(false);
    };
  }, [isActive, router]);

  useEffect(() => {
    if (!isActive || wsConnected) return;

    const id = setInterval(() => router.refresh(), POLL_INTERVAL_MS);

    return () => clearInterval(id);
  }, [isActive, wsConnected, router]);

  return null;
}

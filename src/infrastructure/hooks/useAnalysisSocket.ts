"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { io, type Socket } from "socket.io-client";
import { apiConfig } from "@/shared";
import { createSessionStore } from "@/infrastructure";


/**
 * Connects to the backend WebSocket /moments namespace and listens for
 * `moment.analyzed` events. Triggers a page refresh whenever an analysis
 * result arrives for the authenticated photographer.
 *
 * The hook is a no-op when `isEnabled` is false — call it unconditionally
 * from page components and control connectivity via the flag.
 * Falls back gracefully to polling (AnalysisPoller) when the WS server is
 * unavailable.
 */
export function useAnalysisSocket(isEnabled: boolean): void {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const token = createSessionStore().getAccessToken();

    if (!token) return;

    const socket = io(`${apiConfig.baseUrl}/moments`, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 3,
    });

    socketRef.current = socket;

    socket.on("moment.analyzed", () => {
      router.refresh();
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isEnabled, router]);
}

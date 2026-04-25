"use client";

import { useState, useCallback } from "react";
import { createSessionStore } from "@/infrastructure/session/SessionCookieStore";
import { createAuthRepository } from "@/infrastructure/repositories/AuthRepository";
import { createHttpClient } from "@/infrastructure/api/HttpClient";
import { type AuthState, type LoginFormValues } from "../interfaces/login.interface";

const session = createSessionStore();
const http = createHttpClient(
  process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:3001",
  session
);
const authRepo = createAuthRepository(http, session);

export function useAuthStore() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: session.isAuthenticated(),
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: LoginFormValues) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await authRepo.login(credentials);
      setState({ isAuthenticated: true, isLoading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed.";
      setState({ isAuthenticated: false, isLoading: false, error: message });
    }
  }, []);

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await authRepo.logout();
    } finally {
      setState({ isAuthenticated: false, isLoading: false, error: null });
    }
  }, []);

  return { ...state, login, logout };
}


"use client";

import { useState, useCallback } from "react";

/**
 * Minimal auth store — actual authentication is handled
 * per-provider inside AuthPanel (SSO / phone OTP).
 */
export function useAuthStore() {
  const [isAuthenticated] = useState(false);

  const logout = useCallback(() => {
    // TODO: clear session cookie and redirect
  }, []);

  return { isAuthenticated, logout };
}


"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { useAuthStore } from "./store/useAuthStore";

export function LoginPageView() {
  const router = useRouter();
  const { isAuthenticated, isLoading, error, login } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to continue
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <LoginForm isLoading={isLoading} error={error} onSubmit={login} />
        </div>
      </div>
    </div>
  );
}

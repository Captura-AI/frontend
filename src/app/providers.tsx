"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/**
 * Client-side providers. Wraps the app in a TanStack Query client for
 * interactive/authenticated data fetching (search, dashboard, account).
 *
 * Public reads (Home, Explorer, Moment Detail) prefer Server Components via
 * `serverApiRequest`; this client handles user-driven refetch and mutations.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

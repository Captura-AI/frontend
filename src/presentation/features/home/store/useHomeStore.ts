import { useState } from "react";

/**
 * Local UI state for the Home page.
 * Extend this as the page grows (e.g. newsletter subscription loading state).
 */
export function useHomeStore() {
  const [isLoading, setIsLoading] = useState(false);

  return { isLoading, setIsLoading };
}

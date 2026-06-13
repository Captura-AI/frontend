"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Tracks whether an element has scrolled into view, for use with the
 * `.reveal` / `.is-visible` CSS utilities in globals.css.
 *
 * The `prefers-reduced-motion` media query in globals.css forces `.reveal`
 * elements to their visible state regardless of `isVisible`, so no
 * reduced-motion handling is needed here.
 */
export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

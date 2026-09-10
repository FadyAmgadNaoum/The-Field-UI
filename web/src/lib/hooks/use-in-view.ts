"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adds the "is-in" class to the observed element once it scrolls into
 * view (mirrors the prototype's IntersectionObserver-driven reveal,
 * chosen there over `animation-timeline: view()` for browser support).
 */
export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsIn(true);
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, isIn] as const;
}

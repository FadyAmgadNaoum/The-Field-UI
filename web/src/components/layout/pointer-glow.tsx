"use client";

import { useEffect, useRef } from "react";

export function PointerGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      el.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      el.classList.add("is-on");
    };
    const onLeave = () => el.classList.remove("is-on");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ref} data-glow aria-hidden="true" />;
}

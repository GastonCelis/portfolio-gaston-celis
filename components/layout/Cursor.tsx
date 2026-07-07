"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled || !dotRef.current) return;

    const dot = dotRef.current;
    document.body.style.cursor = "none";

    const quickX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const quickY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });

    function onMove(e: MouseEvent) {
      quickX(e.clientX);
      quickY(e.clientY);
    }

    function onOver(e: MouseEvent) {
      if ((e.target as HTMLElement)?.closest("a, button, [role='button']")) {
        gsap.to(dot, { scale: 2.5, duration: 0.2, ease: "power2.out" });
      }
    }

    function onOut(e: MouseEvent) {
      if ((e.target as HTMLElement)?.closest("a, button, [role='button']")) {
        gsap.to(dot, { scale: 1, duration: 0.2, ease: "power2.out" });
      }
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-200 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg mix-blend-difference"
    />
  );
}

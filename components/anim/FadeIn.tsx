"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export default function FadeIn({
  children,
  className,
  y = 40,
  delay = 0,
  duration = 0.8,
  start = "top 85%",
  gate,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  start?: string;
  /** When provided, skips the scroll trigger and instead plays once this flips to true (e.g. gated behind the preloader). */
  gate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;

      if (reducedMotion) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(ref.current, { opacity: 0, y });

      if (gate !== undefined) {
        if (!gate) return;
        gsap.to(ref.current, { opacity: 1, y: 0, duration, delay, ease: "power3.out" });
        return;
      }

      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reducedMotion, gate] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

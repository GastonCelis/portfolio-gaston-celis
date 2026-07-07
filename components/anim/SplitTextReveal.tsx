"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export default function SplitTextReveal({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  gate = true,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  /** Lines stay hidden until this is true — used to chain the reveal to the preloader exit. */
  gate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;

      const lines = gsap.utils.toArray<HTMLElement>("[data-split-line]", ref.current);

      if (reducedMotion) {
        gsap.set(lines, { opacity: 1, y: 0, filter: "blur(0px)" });
        return;
      }

      gsap.set(lines, { opacity: 0, y: 40, filter: "blur(8px)" });

      if (!gate) return;

      gsap.to(lines, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        delay,
        stagger,
        ease: "power4.out",
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

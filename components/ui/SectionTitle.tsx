"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export default function SectionTitle({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reducedMotion) return;

      gsap.set(ref.current, { clipPath: "inset(0 0 100% 0)", opacity: 0 });
      gsap.to(ref.current, {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <div ref={ref} className="mb-12 flex items-baseline gap-4">
      <span className="font-display text-sm text-accent/60">{index} —</span>
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

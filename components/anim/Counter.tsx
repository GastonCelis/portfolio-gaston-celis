"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export default function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const match = value.match(/^(\+?)(\d+)$/);

  useGSAP(
    () => {
      if (!ref.current || reducedMotion || !match) return;

      const [, prefix, digits] = match;
      const target = parseInt(digits, 10);
      const counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 1.4,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(counter.val)}`;
          }
        },
      });
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <p ref={ref} className={className}>
      {value}
    </p>
  );
}

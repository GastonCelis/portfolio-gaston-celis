"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

export default function WordScrollReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      const spans = gsap.utils.toArray<HTMLElement>("span", ref.current);

      if (reducedMotion) {
        gsap.set(spans, { color: "var(--color-fg)" });
        return;
      }

      gsap.to(spans, {
        color: "var(--color-fg)",
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    },
    { scope: ref, dependencies: [reducedMotion] }
  );

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="text-[#3F3F46]">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

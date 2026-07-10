"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { techStack } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import Chip from "@/components/ui/Chip";

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reducedMotion) return;

      const chips = gsap.utils.toArray<HTMLElement>("[data-chip]", ref.current);
      gsap.set(chips, { opacity: 0, scale: 0.8 });
      gsap.to(chips, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.012,
        ease: "back.out(1.7)",
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
    <section id="stack" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-300">
        <SectionTitle index="04" title="Stack" />
        <div ref={ref} className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {techStack.map((group) => (
            <div key={group.category}>
              <h3 className="mb-4 text-sm uppercase tracking-wide text-fg-muted">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} data-chip className="inline-block">
                    <Chip label={item} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

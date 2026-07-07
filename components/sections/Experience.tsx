"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { experience } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!listRef.current || reducedMotion) return;

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }

      const items = gsap.utils.toArray<HTMLElement>("[data-entry]", listRef.current);
      items.forEach((item, i) => {
        const fromX = i % 2 === 0 ? -30 : 30;
        gsap.set(item, { opacity: 0, x: fromX });
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: listRef, dependencies: [reducedMotion] }
  );

  return (
    <section id="trayectoria" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-300">
        <SectionTitle index="02" title="Trayectoria" />
        <div ref={listRef} className="relative pl-8 sm:pl-12">
          <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-border" />
          <div
            ref={lineRef}
            aria-hidden
            className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
          />
          <ol className="flex flex-col gap-16">
            {experience.map((entry) => (
              <li
                key={entry.company}
                data-entry
                className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-start"
              >
                <div>
                  <p className="text-sm text-accent">{entry.role}</p>
                  <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">
                    {entry.company}
                  </h3>
                  <p className="mt-3 max-w-2xl text-fg-muted">{entry.description}</p>
                </div>
                <p className="font-display text-3xl font-bold text-accent/30 sm:text-right sm:text-5xl">
                  {entry.period}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

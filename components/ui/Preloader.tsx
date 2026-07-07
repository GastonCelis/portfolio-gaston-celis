"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { usePreloaderContext } from "@/lib/preloader-context";
import { copy } from "@/lib/data";
import Marquee from "@/components/ui/Marquee";

const MIN_DURATION = 1200;
// Hard ceiling so a stalled/failed asset load (or a network hiccup) can never
// leave the site permanently stuck behind the preloader.
const MAX_WAIT = 5000;

export default function Preloader() {
  const { progress, ready, markReady } = usePreloaderContext();
  const [canExit, setCanExit] = useState(false);
  const [exited, setExited] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (startedAt.current === null) {
      startedAt.current = Date.now();
    }
    if (progress < 100) return;

    const elapsed = Date.now() - startedAt.current;
    if (elapsed >= MIN_DURATION) {
      setCanExit(true);
      return;
    }
    const timeout = setTimeout(() => setCanExit(true), MIN_DURATION - elapsed);
    return () => clearTimeout(timeout);
  }, [progress]);

  useEffect(() => {
    const fallback = setTimeout(() => setCanExit(true), MAX_WAIT);
    return () => clearTimeout(fallback);
  }, []);

  useGSAP(
    () => {
      if (!canExit || ready) return;

      if (reducedMotion) {
        setExited(true);
        markReady();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setExited(true);
          markReady();
        },
      });
      tl.to(pillRef.current, { scale: 0.85, opacity: 0, duration: 0.35, ease: "power2.in" }).to(
        rootRef.current,
        { clipPath: "inset(0 0 100% 0)", duration: 0.8, ease: "power4.inOut" },
        "-=0.1"
      );
    },
    { dependencies: [canExit] }
  );

  if (exited) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-base"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div aria-hidden className="absolute inset-0 flex items-center opacity-40">
        <Marquee text={copy.marquee} />
      </div>
      <div
        ref={pillRef}
        className="relative rounded-full border border-border bg-surface/80 px-8 py-4 backdrop-blur-md"
      >
        <p className="font-display text-sm tracking-wide text-fg" role="status" aria-live="polite">
          CARGANDO {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

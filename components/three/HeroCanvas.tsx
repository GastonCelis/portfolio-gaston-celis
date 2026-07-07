"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function HeroCanvas() {
  // Defers mounting the heavy three.js/drei chunk until the browser is idle,
  // so its ~600ms+ script-evaluation task doesn't compete with hydration and
  // blow out Total Blocking Time right after the page becomes interactive.
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setShouldMount(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setShouldMount(true), 200);
    return () => clearTimeout(id);
  }, []);

  if (!shouldMount) return null;

  return (
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
  );
}

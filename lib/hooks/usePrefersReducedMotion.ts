"use client";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

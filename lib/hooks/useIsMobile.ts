"use client";

import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

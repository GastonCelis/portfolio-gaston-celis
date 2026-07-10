"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type PreloaderContextValue = {
  ready: boolean;
  progress: number;
  markReady: () => void;
  setProgress: (value: number) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
};

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const markReady = useCallback(() => setReady(true), []);

  const value = useMemo(
    () => ({ ready, progress, markReady, setProgress, mobileMenuOpen, setMobileMenuOpen }),
    [ready, progress, markReady, mobileMenuOpen]
  );

  return <PreloaderContext.Provider value={value}>{children}</PreloaderContext.Provider>;
}

export function usePreloaderContext() {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    throw new Error("usePreloaderContext must be used within PreloaderProvider");
  }
  return ctx;
}

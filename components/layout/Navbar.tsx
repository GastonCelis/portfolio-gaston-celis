"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { usePreloaderContext } from "@/lib/preloader-context";
import { identity, navLinks } from "@/lib/data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { setMobileMenuOpen } = usePreloaderContext();

  useEffect(() => {
    function onScroll() {
      setCompact(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    setMobileMenuOpen(open);
    return () => setMobileMenuOpen(false);
  }, [open, setMobileMenuOpen]);

  useGSAP(
    () => {
      if (!navRef.current || reducedMotion) return;
      gsap.set(navRef.current, { opacity: 0, y: -20 });
      gsap.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });
    },
    { dependencies: [reducedMotion] }
  );

  useGSAP(
    () => {
      if (!open || !menuRef.current) return;
      const links = gsap.utils.toArray<HTMLElement>("[data-menu-link]", menuRef.current);

      if (reducedMotion) {
        gsap.set(menuRef.current, { opacity: 1 });
        gsap.set(links, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(menuRef.current, { opacity: 0 });
      gsap.set(links, { opacity: 0, y: 20 });
      gsap.to(menuRef.current, { opacity: 1, duration: 0.2, ease: "power1.out" });
      gsap.to(links, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        delay: 0.1,
        ease: "power3.out",
      });
    },
    { dependencies: [open, reducedMotion] }
  );

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
      <nav
        className={`flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-border bg-surface/80 backdrop-blur-md transition-all duration-300 sm:px-6 ${
          compact ? "px-4 py-2" : "px-4 py-2.5 sm:py-3"
        }`}
        aria-label="Navegación principal"
      >
        <a
          href="#top"
          className={`rounded-sm font-display text-sm font-bold tracking-tight text-fg ${focusRing}`}
          aria-label={`${identity.name} — inicio`}
        >
          GC
        </a>

        <ul className="hidden items-center gap-6 text-sm text-fg-muted md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`rounded-sm transition-colors hover:text-fg ${focusRing}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={identity.cvPath}
          download
          className={`hidden rounded-full border border-border px-4 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent md:inline-block ${focusRing}`}
        >
          CV
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center justify-center rounded-full border border-border p-2 text-fg md:hidden ${focusRing}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Abrir menú"
        >
          <span className="sr-only">Menú</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>
      </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-20 z-150 bg-base md:hidden">
          <div ref={menuRef} className="flex flex-col items-center gap-6 px-6 py-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-menu-link
                onClick={() => setOpen(false)}
                className={`rounded-sm font-display text-2xl text-fg ${focusRing}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={identity.cvPath}
              download
              data-menu-link
              onClick={() => setOpen(false)}
              className={`mt-4 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent ${focusRing}`}
            >
              Descargar CV
            </a>
          </div>
        </div>
      )}
    </>
  );
}

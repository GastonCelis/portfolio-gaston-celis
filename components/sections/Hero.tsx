"use client";

import { copy, identity } from "@/lib/data";
import Marquee from "@/components/ui/Marquee";
import SplitTextReveal from "@/components/anim/SplitTextReveal";
import FadeIn from "@/components/anim/FadeIn";
import HeroCanvas from "@/components/three/HeroCanvas";
import MagneticButton from "@/components/ui/MagneticButton";
import { GithubIcon, LinkedInIcon, DownloadIcon } from "@/components/ui/icons";
import { usePreloaderContext } from "@/lib/preloader-context";

export default function Hero() {
  const { ready, mobileMenuOpen } = usePreloaderContext();

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6"
    >
      {!mobileMenuOpen && (
        <div aria-hidden className="absolute inset-0">
          <HeroCanvas />
        </div>
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-[120px]"
      />

      <div className="hidden flex-col gap-5 lg:absolute lg:left-6 lg:top-1/2 lg:flex lg:-translate-y-1/2">
        <a
          href={identity.github}
          className="rounded-full text-fg-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          aria-label="GitHub"
        >
          <GithubIcon />
        </a>
        <a
          href={identity.linkedin}
          className="rounded-full text-fg-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <span className="mx-auto h-16 w-px bg-border" />
      </div>

      <div className="relative mx-auto flex w-full max-w-300 flex-col items-start">
        <SplitTextReveal gate={ready}>
          <p data-split-line className="font-display text-lg text-accent">
            {copy.hero.greeting}
          </p>

          <h1
            data-split-line
            className="font-display text-[clamp(3rem,10vw,9rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-fg"
          >
            {copy.hero.name}
          </h1>

          <div data-split-line className="relative">
            <p className="font-display text-2xl font-bold uppercase tracking-tight text-fg sm:text-3xl">
              {copy.hero.roleGhost}
            </p>
            <p
              aria-hidden
              className="pointer-events-none absolute left-1 top-1 -z-10 font-display text-2xl font-bold uppercase tracking-tight text-accent/35 sm:text-3xl"
            >
              {copy.hero.ghostText}
            </p>
          </div>
        </SplitTextReveal>

        <FadeIn delay={0.5} gate={ready}>
          <p className="mt-6 max-w-xl text-lg text-fg-muted">{copy.hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#proyectos"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-fg transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
            >
              {copy.hero.ctaPrimary}
            </a>
            <MagneticButton>
              <a
                href={identity.cvPath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              >
                <DownloadIcon />
                {copy.hero.ctaSecondary}
              </a>
            </MagneticButton>
          </div>
        </FadeIn>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <Marquee text={copy.marquee} />
      </div>
    </section>
  );
}

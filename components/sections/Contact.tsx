import { copy, identity } from "@/lib/data";
import { GithubIcon, LinkedInIcon, DownloadIcon } from "@/components/ui/icons";
import FadeIn from "@/components/anim/FadeIn";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  return (
    <section id="contacto" className="border-t border-border px-6 py-32">
      <FadeIn className="mx-auto flex max-w-300 flex-col items-start gap-8">
        <h2 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold uppercase leading-none tracking-tight text-fg">
          {copy.contact.title}
        </h2>
        <p className="max-w-xl text-lg text-fg-muted">{copy.contact.subtitle}</p>

        <a
          href={`mailto:${identity.email}`}
          className="rounded-sm font-display text-2xl font-bold text-fg underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:text-4xl"
        >
          {identity.email}
        </a>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={identity.github}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            aria-label="GitHub"
          >
            <GithubIcon /> GitHub
          </a>
          <a
            href={identity.linkedin}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            aria-label="LinkedIn"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <MagneticButton>
            <a
              href={identity.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-fg transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <DownloadIcon /> Descargar CV
            </a>
          </MagneticButton>
        </div>
      </FadeIn>
    </section>
  );
}

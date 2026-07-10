import Image from "next/image";
import type { Project } from "@/lib/data";
import Chip from "@/components/ui/Chip";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/icons";

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <article className="group border-b border-border py-10 transition-colors hover:border-accent/40">
      <div className="flex flex-col gap-6 transition-transform duration-300 group-hover:translate-x-3 sm:flex-row sm:items-start sm:gap-10">
        <span
          className="font-display text-6xl font-extrabold text-transparent transition-colors group-hover:text-accent sm:text-7xl"
          style={{ WebkitTextStroke: "1.5px var(--color-border)" }}
          aria-hidden
        >
          {project.number}
        </span>

        <div className="flex-1">
          <p className="text-sm text-accent">{project.role}</p>
          <h3 className="font-display text-2xl font-bold text-fg sm:text-3xl">
            {project.name}
          </h3>

          <ul className="mt-4 flex flex-col gap-2 text-fg-muted">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="max-w-2xl">
                {bullet}
              </li>
            ))}
          </ul>

          {project.stack.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Chip key={item} label={item} />
              ))}
            </div>
          )}

          {(project.url || project.repoUrl) && (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  Ver sitio
                  <ArrowUpRightIcon />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  <GithubIcon width="16" height="16" />
                  Repositorio
                </a>
              )}
            </div>
          )}

          {project.images && project.images.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {project.images.map((src) => (
                <div
                  key={src}
                  className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface"
                >
                  <Image
                    src={src}
                    alt={project.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

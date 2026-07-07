import type { Project } from "@/lib/data";
import Chip from "@/components/ui/Chip";

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

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

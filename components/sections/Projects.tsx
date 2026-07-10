import { projectGroups } from "@/lib/projects";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectItem from "@/components/sections/ProjectItem";
import FadeIn from "@/components/anim/FadeIn";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export default function Projects() {
  return (
    <section id="proyectos" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-300">
        <SectionTitle index="03" title="Proyectos" />
        {projectGroups
          .filter((group) => group.projects.length > 0)
          .map((group) => (
            <div key={group.id} className="mt-16 first:mt-0">
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold text-fg sm:text-2xl">
                    {group.title}
                  </h3>
                  {group.url && (
                    <a
                      href={group.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                    >
                      {group.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      <ArrowUpRightIcon />
                    </a>
                  )}
                </div>
                {group.note && (
                  <p className="mt-1 max-w-2xl text-sm text-fg-muted">{group.note}</p>
                )}
              </div>
              <div>
                {group.projects.map((project) => (
                  <FadeIn key={project.number} y={24}>
                    <ProjectItem project={project} />
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

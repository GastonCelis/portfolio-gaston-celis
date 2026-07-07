import { projects } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectItem from "@/components/sections/ProjectItem";
import FadeIn from "@/components/anim/FadeIn";

export default function Projects() {
  return (
    <section id="proyectos" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-300">
        <SectionTitle index="03" title="Proyectos" />
        <div>
          {projects.map((project) => (
            <FadeIn key={project.number} y={24}>
              <ProjectItem project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

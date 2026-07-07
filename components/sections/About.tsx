import { about, stats } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import StatCard from "@/components/ui/StatCard";

export default function About() {
  return (
    <section id="sobre-mi" className="border-t border-border px-6 py-32">
      <div className="mx-auto max-w-300">
        <SectionTitle index="01" title="Sobre mí" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <p className="text-lg leading-relaxed text-fg-muted">{about.summary}</p>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

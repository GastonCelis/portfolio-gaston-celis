import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiDotnet,
  SiNodedotjs,
  SiJavascript,
  SiTailwindcss,
} from "react-icons/si";

const items: { icon: IconType; label: string }[] = [
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiDotnet, label: ".NET" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiTailwindcss, label: "Tailwind CSS" },
];

// Repeated enough times so a single half comfortably exceeds even ultra-wide
// monitors (~4-5K) — otherwise the -50% loop shows a dead gap once the
// content runs out before the viewport does.
const REPEATS = 4;
const half = Array.from({ length: REPEATS }, () => items).flat();
const track = [...half, ...half];

export default function TechMarquee() {
  return (
    <div
      aria-hidden
      className="flex overflow-hidden whitespace-nowrap border-t border-border/60 py-4"
    >
      <div className="flex shrink-0 animate-tech-marquee items-center">
        {track.map(({ icon: Icon, label }, i) => (
          <span key={i} className="flex items-center gap-2.5 px-6 text-fg-muted">
            <Icon className="h-5 w-5 shrink-0" />
            <span className="font-display text-sm font-bold uppercase tracking-tight sm:text-base">
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

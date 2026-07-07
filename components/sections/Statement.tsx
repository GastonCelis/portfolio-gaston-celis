import { copy } from "@/lib/data";
import WordScrollReveal from "@/components/anim/WordScrollReveal";

export default function Statement() {
  return (
    <section className="border-t border-border px-6 py-32">
      <WordScrollReveal
        text={copy.statement}
        className="mx-auto max-w-4xl text-center font-display text-[clamp(1.5rem,3.5vw,2.75rem)] leading-tight tracking-tight"
      />
    </section>
  );
}

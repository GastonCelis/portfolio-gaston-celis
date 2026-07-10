// Repeated enough times so a single half comfortably exceeds even ultra-wide
// monitors — otherwise the -50% loop shows a dead gap once the text runs out
// before the viewport does.
const REPEATS = 4;

export default function Marquee({ text }: { text: string }) {
  const half = Array.from({ length: REPEATS }, () => text);

  return (
    <div
      aria-hidden
      className="flex overflow-hidden whitespace-nowrap font-display text-lg font-bold uppercase tracking-tight text-border sm:text-xl"
    >
      <div className="flex shrink-0 animate-marquee gap-8 pr-8">
        {[...half, ...half].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

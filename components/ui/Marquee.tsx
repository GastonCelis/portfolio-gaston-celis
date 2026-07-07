export default function Marquee({ text }: { text: string }) {
  return (
    <div
      aria-hidden
      className="flex overflow-hidden whitespace-nowrap font-display text-lg font-bold uppercase tracking-tight text-border sm:text-xl"
    >
      <div className="flex shrink-0 animate-marquee gap-8 pr-8">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}

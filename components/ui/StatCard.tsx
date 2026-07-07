import type { Stat } from "@/lib/data";
import Counter from "@/components/anim/Counter";

export default function StatCard({ value, label }: Stat) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent">
      <Counter value={value} className="font-display text-4xl font-bold text-fg sm:text-5xl" />
      <p className="mt-2 text-sm text-fg-muted">{label}</p>
    </div>
  );
}

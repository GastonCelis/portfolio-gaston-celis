export default function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-sm text-fg-muted transition-colors hover:border-accent hover:text-accent">
      {label}
    </span>
  );
}

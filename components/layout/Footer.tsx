import { copy } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 pt-16">
      <p className="font-display leading-none tracking-tight text-fg/[0.06] text-[18vw] whitespace-nowrap select-none">
        {copy.footer.name}
      </p>
      <div className="mx-auto flex max-w-300 flex-col gap-2 py-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.footer.signature}</p>
      </div>
    </footer>
  );
}

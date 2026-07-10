import { copy } from "@/lib/data";
import { ArrowUpRightIcon } from "@/components/ui/icons";

const linkStyle =
  "rounded-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border px-6">
      <div className="mx-auto max-w-300">
        <div className="flex flex-col gap-3 py-8 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {copy.footer.signature} · {year}
          </p>
          <a href="#top" className={`inline-flex items-center gap-1.5 ${linkStyle} hover:text-accent`}>
            Volver arriba
            <ArrowUpRightIcon className="-rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
}

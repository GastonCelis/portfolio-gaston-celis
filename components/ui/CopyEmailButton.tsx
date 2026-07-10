"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleCopy}
        className="group inline-flex items-center gap-3 rounded-sm font-display text-2xl font-bold text-fg transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:text-4xl"
      >
        <span className="underline decoration-accent decoration-2 underline-offset-8">
          {email}
        </span>
        {copied ? (
          <CheckIcon className="shrink-0 text-accent" />
        ) : (
          <CopyIcon className="shrink-0 text-fg-muted transition-colors group-hover:text-accent" />
        )}
      </button>
      <p role="status" aria-live="polite" className="mt-2 h-5 text-sm text-accent">
        {copied ? "Email copiado al portapapeles" : ""}
      </p>
    </div>
  );
}

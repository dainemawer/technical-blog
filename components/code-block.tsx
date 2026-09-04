"use client";

import { useState } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied by the browser or permissions
      // policy; leave the button label as-is rather than claiming success.
    }
  }

  return (
    <div className="relative my-1.5">
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="absolute top-0 right-0 text-faint text-xs hover:text-ink focus-visible:text-ink"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        translate="no"
        className="overflow-x-auto whitespace-pre font-mono text-muted text-sm leading-loose"
      >
        {code}
      </pre>
    </div>
  );
}

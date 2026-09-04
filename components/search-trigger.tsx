"use client";

import { useSetCommandPaletteOpen } from "./command-palette-context";

export function SearchTrigger() {
  const setOpen = useSetCommandPaletteOpen();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="flex items-baseline gap-1.5 text-muted hover:text-ink"
    >
      <span>Search</span>
      <span className="font-mono text-2xs text-faint">⌘K</span>
    </button>
  );
}

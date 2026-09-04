"use client";

import type { ReactNode } from "react";
import { useCommandPaletteOpen } from "./command-palette-context";

// Makes the rest of the page unreachable to pointer, keyboard, and
// assistive tech while the command palette dialog is open — aria-modal
// alone doesn't hide background content from a screen reader's virtual
// cursor, `inert` does.
export function InertWhenPaletteOpen({ children }: { children: ReactNode }) {
  const open = useCommandPaletteOpen();
  return <div inert={open || undefined}>{children}</div>;
}

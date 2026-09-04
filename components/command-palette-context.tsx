"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Split into two contexts so components that only dispatch (e.g.
// SearchTrigger, which never reads whether the palette is open) don't
// re-render every time it opens/closes — only components that read the
// open state (CommandPalette itself) do.
const CommandPaletteStateContext = createContext<boolean | null>(null);
const CommandPaletteDispatchContext = createContext<
  ((open: boolean) => void) | null
>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <CommandPaletteDispatchContext value={setOpen}>
      <CommandPaletteStateContext value={open}>
        {children}
      </CommandPaletteStateContext>
    </CommandPaletteDispatchContext>
  );
}

export function useCommandPaletteOpen() {
  const context = useContext(CommandPaletteStateContext);
  if (context === null) {
    throw new Error(
      "useCommandPaletteOpen must be used within a CommandPaletteProvider",
    );
  }
  return context;
}

export function useSetCommandPaletteOpen() {
  const context = useContext(CommandPaletteDispatchContext);
  if (context === null) {
    throw new Error(
      "useSetCommandPaletteOpen must be used within a CommandPaletteProvider",
    );
  }
  return context;
}

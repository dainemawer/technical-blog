"use client";

import dynamic from "next/dynamic";

// Code-split the palette (and the post dataset it searches) out of the
// main bundle shared by every route — most visitors never open it.
// `ssr: false` requires a Client Component boundary, hence this wrapper
// around the otherwise-Server-Component root layout.
const CommandPalette = dynamic(
  () => import("./command-palette").then((mod) => mod.CommandPalette),
  { ssr: false },
);

export function CommandPaletteMount() {
  return <CommandPalette />;
}

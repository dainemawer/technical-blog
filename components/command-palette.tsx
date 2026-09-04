"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { formatPostDate } from "@/lib/format";
import { getAllPosts } from "@/lib/posts";
import {
  useCommandPaletteOpen,
  useSetCommandPaletteOpen,
} from "./command-palette-context";

export function CommandPalette() {
  const open = useCommandPaletteOpen();
  const setOpen = useSetCommandPaletteOpen();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const router = useRouter();
  const posts = useMemo(() => getAllPosts(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((post) =>
      `${post.title} ${post.dek}`.toLowerCase().includes(q),
    );
  }, [posts, query]);

  if (!open) return null;

  function close() {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }

  function select(slug: string) {
    close();
    router.push(`/${slug}`);
  }

  return (
    // Click-outside-to-close is a supplementary mouse affordance; Escape
    // (handled globally in CommandPaletteProvider) is the keyboard-equivalent
    // way to dismiss this overlay.
    // biome-ignore lint/a11y/noStaticElementInteractions: see comment above
    // biome-ignore lint/a11y/useKeyWithClickEvents: see comment above
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="fixed inset-0 z-60 flex justify-center bg-overlay pt-palette-offset backdrop-blur-sm"
    >
      <div className="flex max-h-palette w-155 flex-col overflow-hidden rounded-palette bg-surface p-6 pb-5 shadow-palette">
        <div className="flex items-baseline gap-3">
          <input
            // biome-ignore lint/a11y/noAutofocus: intentional for a keyboard-triggered command palette
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setCursor((c) =>
                  results.length ? (c + 1) % results.length : 0,
                );
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setCursor((c) =>
                  results.length
                    ? (c - 1 + results.length) % results.length
                    : 0,
                );
              } else if (event.key === "Enter" && results[cursor]) {
                select(results[cursor].slug);
              }
            }}
            placeholder="Search writing"
            className="flex-1 border-none bg-transparent text-md text-ink outline-none placeholder:text-faint"
          />
          <span className="font-mono text-2xs text-faint">esc</span>
        </div>

        <div className="mt-5 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">
          {results.map((post, index) => (
            <button
              type="button"
              key={post.slug}
              onClick={() => select(post.slug)}
              onMouseEnter={() => setCursor(index)}
              className="grid grid-cols-result items-baseline gap-x-5 text-left"
              style={{ opacity: index === cursor ? 1 : 0.42 }}
            >
              <div className="text-right text-xs text-faint">
                {formatPostDate(post.date)}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-base font-medium tracking-tight text-ink text-pretty">
                  {post.title}
                </div>
                <div className="text-sm text-muted text-pretty">{post.dek}</div>
              </div>
            </button>
          ))}
          {results.length === 0 && (
            <div className="text-md text-faint">
              Nothing here — try "sticky", "storybook", "estimation".
            </div>
          )}
        </div>

        <div className="mt-5 flex items-baseline gap-2 border-divider border-t pt-3.5 text-2xs text-faint">
          <span>↑↓ to navigate</span>
          <span className="text-divider">|</span>
          <span>↵ to open</span>
          <span className="text-divider">|</span>
          <span>
            {results.length === 1 ? "1 result" : `${results.length} results`}
          </span>
        </div>
      </div>
    </div>
  );
}

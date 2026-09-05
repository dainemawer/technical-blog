import Link from "next/link";
import type { ReactNode } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renders the small `[label](url)` link syntax article content is allowed
 * to use inside otherwise-plain paragraph strings — not a full Markdown
 * parser, just enough to embed a hyperlink in prose.
 */
export function renderInlineText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  for (
    let match = LINK_PATTERN.exec(text);
    match !== null;
    match = LINK_PATTERN.exec(text)
  ) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (href.startsWith("/")) {
      nodes.push(
        <Link
          key={key++}
          href={href}
          className="text-ink underline decoration-divider underline-offset-2 hover:decoration-ink focus-visible:decoration-ink"
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-ink underline decoration-divider underline-offset-2 hover:decoration-ink focus-visible:decoration-ink"
        >
          {label}
        </a>,
      );
    }
    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

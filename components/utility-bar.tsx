export function UtilityBar() {
  return (
    <div className="flex h-6 items-baseline justify-end gap-2 text-sm text-muted">
      <span className="flex items-baseline gap-1.5">
        <span>Search</span>
        <span className="font-mono text-2xs text-faint">⌘K</span>
      </span>
      <span className="text-divider">|</span>
      {/* TODO: point at a real subscribe flow once one exists; RSS is the interim mechanism */}
      <a href="/rss.xml" className="hover:text-ink">
        Subscribe
      </a>
      <span className="text-divider">|</span>
      <a href="/rss.xml" className="hover:text-ink">
        RSS
      </a>
    </div>
  );
}

import { SearchTrigger } from "./search-trigger";

export function UtilityBar() {
  return (
    <div className="flex h-6 items-baseline justify-end gap-2 text-sm text-muted">
      <SearchTrigger />
      <span className="text-divider">|</span>
      {/* TODO: point at a real subscribe flow once one exists; RSS is the interim mechanism */}
      <a href="/rss.xml" className="hover:text-ink focus-visible:text-ink">
        Subscribe
      </a>
      <span className="text-divider">|</span>
      <a href="/rss.xml" className="hover:text-ink focus-visible:text-ink">
        RSS
      </a>
    </div>
  );
}

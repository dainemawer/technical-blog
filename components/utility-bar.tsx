"use client";

import { SearchTrigger } from "./search-trigger";
import { useSetSubscribeModalOpen } from "./subscribe-modal-context";

export function UtilityBar() {
  const setSubscribeOpen = useSetSubscribeModalOpen();

  return (
    <div className="flex h-6 items-baseline justify-end gap-2 text-sm text-muted">
      <SearchTrigger />
      <span className="text-divider">|</span>
      <button
        type="button"
        onClick={() => setSubscribeOpen(true)}
        className="cursor-pointer hover:text-ink focus-visible:text-ink"
      >
        Subscribe
      </button>
      <span className="text-divider">|</span>
      <a href="/rss.xml" className="hover:text-ink focus-visible:text-ink">
        RSS
      </a>
    </div>
  );
}

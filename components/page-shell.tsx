import type { ReactNode } from "react";
import { FooterElsewhere } from "./footer-elsewhere";
import { UtilityBar } from "./utility-bar";

export function PageShell({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-from via-brand-via to-brand-to px-4 py-10 sm:px-6 md:py-24">
      <div className="mx-auto grid w-full max-w-card grid-cols-1 gap-11 rounded-card bg-surface px-6 py-8 shadow-card sm:px-10 md:grid-cols-shell md:gap-0 md:px-14 md:py-11">
        <div className="flex flex-col">{sidebar}</div>
        <div className="flex flex-col">
          <UtilityBar />
          <div className="mt-17.5">{children}</div>
          <FooterElsewhere />
        </div>
      </div>
    </div>
  );
}

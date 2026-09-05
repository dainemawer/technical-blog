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
    <div className="min-h-screen bg-surface">
      <div className="mx-auto grid w-full max-w-shell grid-cols-1 gap-11 px-6 py-8 sm:px-10 md:grid-cols-shell md:gap-0 md:px-14 md:py-11">
        <div className="flex flex-col">{sidebar}</div>
        <div className="flex flex-col">
          <header>
            <UtilityBar />
          </header>
          <main id="content" className="mt-17.5">
            {children}
          </main>
          <FooterElsewhere />
        </div>
      </div>
    </div>
  );
}

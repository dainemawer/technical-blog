import { footerNav, site } from "@/lib/site";
import { MetaRow } from "./meta-row";

export function FooterElsewhere() {
  return (
    <footer className="mt-22 border-divider border-t pt-6.5">
      <MetaRow label="Elsewhere">
        <div className="flex flex-col gap-5.5">
          <nav
            aria-label="Elsewhere"
            className="grid grid-cols-4 gap-x-8 text-sm text-muted"
          >
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-2.5">
                <h3 className="font-normal text-faint text-xs">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-ink focus-visible:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="text-xs text-faint">
            {site.name} — {site.tagline}. © {new Date().getFullYear()}
          </div>
        </div>
      </MetaRow>
    </footer>
  );
}

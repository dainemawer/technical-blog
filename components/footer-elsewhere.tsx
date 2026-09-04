import { footerNav, site } from "@/lib/site";
import { MetaRow } from "./meta-row";

export function FooterElsewhere() {
  return (
    <div className="mt-22 border-divider border-t pt-6.5">
      <MetaRow label="Elsewhere">
        <div className="flex flex-col gap-5.5">
          <div className="grid grid-cols-4 gap-x-8 text-sm text-muted">
            {footerNav.map((group) => (
              <div key={group.heading} className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="text-xs text-faint">
            {site.name} — {site.tagline}. © {new Date().getFullYear()}
          </div>
        </div>
      </MetaRow>
    </div>
  );
}

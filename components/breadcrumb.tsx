import Link from "next/link";
import { Fragment } from "react";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-baseline text-faint text-xs"
    >
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && <span className="px-1.5">/</span>}
          {item.href ? (
            <Link
              href={item.href}
              className="text-faint hover:text-ink focus-visible:text-ink"
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

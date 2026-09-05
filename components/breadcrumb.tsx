import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-faint text-xs">
      <ol className="flex items-baseline">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-baseline">
            {index > 0 && (
              <span aria-hidden="true" className="px-1.5">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                transitionTypes={["nav-back"]}
                className="text-faint hover:text-ink focus-visible:text-ink"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

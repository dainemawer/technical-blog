import Link from "next/link";
import { getYears } from "@/lib/posts";

export function YearFilter({ selected }: { selected?: number }) {
  const years = getYears();
  const latest = years[0];

  return (
    <nav aria-label="Years" className="flex flex-col items-start gap-6.5">
      <ul className="flex flex-col items-start gap-6.5">
        {years.map((year) => {
          const isActive = selected ? selected === year : year === latest;
          return (
            <li key={year}>
              <Link
                href={selected === year ? "/" : `/?year=${year}`}
                aria-current={isActive ? "page" : undefined}
                className={`cursor-pointer font-medium text-ink text-sm transition-opacity duration-140 ease-out hover:opacity-100 focus-visible:opacity-100 ${isActive ? "opacity-100" : "opacity-28"}`}
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {year}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

import Link from "next/link";
import { getYears } from "@/lib/posts";

export function YearFilter({ selected }: { selected?: number }) {
  const years = getYears();
  const latest = years[0];

  return (
    <div className="flex flex-col items-start gap-6.5">
      {years.map((year) => {
        const isActive = selected ? selected === year : year === latest;
        return (
          <Link
            key={year}
            href={selected === year ? "/" : `/?year=${year}`}
            className="cursor-pointer font-medium text-ink text-sm transition-opacity duration-140 ease-out hover:opacity-100"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              opacity: isActive ? 1 : 0.28,
            }}
          >
            {year}
          </Link>
        );
      })}
    </div>
  );
}

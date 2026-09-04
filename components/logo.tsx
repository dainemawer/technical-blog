import Link from "next/link";
import { site } from "@/lib/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="font-bold text-base text-ink tracking-tight transition-opacity duration-140 ease-out hover:opacity-60 focus-visible:opacity-60"
    >
      {site.logo}
    </Link>
  );
}

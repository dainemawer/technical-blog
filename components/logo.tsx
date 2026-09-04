import Link from "next/link";
import { site } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="font-bold text-base text-ink tracking-tight">
      {site.logo}
    </Link>
  );
}

import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Logo } from "@/components/logo";
import { MetaRow } from "@/components/meta-row";
import { PageShell } from "@/components/page-shell";
import { PostListItem } from "@/components/post-list-item";
import { now } from "@/lib/now";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What has my attention this month, kept honest by a visible date.",
};

export default function NowPage() {
  const [latest] = getAllPosts();

  return (
    <PageShell
      sidebar={
        <div className="flex flex-col gap-23.5">
          <Logo />
          <nav aria-label="Archive" className="flex flex-col gap-3.5 pr-10">
            <div className="mb-1 text-faint text-xs">Previously</div>
            {now.archive.map((entry, index) => (
              <span
                key={entry}
                className="text-ink text-sm"
                style={{ opacity: index === 0 ? 1 : 0.32 }}
              >
                {entry}
              </span>
            ))}
          </nav>
        </div>
      }
    >
      <div className="mx-auto max-w-content">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Now" }]} />

        <h1 className="mt-4.5 text-2xl text-ink tracking-tight">Now</h1>
        <div className="mt-2 text-md text-muted text-pretty">
          What has my attention this month, kept honest by a visible date.
        </div>
        <div className="mt-5 flex items-baseline gap-x-2 text-sm text-muted">
          <span>
            Updated {now.updated.day} {now.updated.month}{" "}
            <span className="text-faint">{now.updated.year}</span>
          </span>
          <span className="text-divider">|</span>
          <span>Cape Town, GMT+2</span>
        </div>

        <div className="mt-15 flex flex-col gap-10">
          {now.entries.map((entry) => (
            <MetaRow key={entry.label} label={entry.label}>
              <p className="text-md text-ink leading-relaxed text-pretty">
                {entry.body}
              </p>
            </MetaRow>
          ))}

          {latest && (
            <MetaRow label="Latest">
              <PostListItem post={latest} />
            </MetaRow>
          )}
        </div>
      </div>
    </PageShell>
  );
}

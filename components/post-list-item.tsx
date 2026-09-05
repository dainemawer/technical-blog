import Link from "next/link";
import { formatPostDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

export function PostListItem({
  post,
  headingLevel: Heading = "h2",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article>
      <Link
        href={`/${post.slug}`}
        transitionTypes={["nav-forward"]}
        className="grid grid-cols-meta items-baseline gap-x-12 opacity-42 transition-opacity duration-140 ease-out hover:opacity-100 focus-visible:opacity-100"
      >
        <time dateTime={post.date} className="text-right text-sm text-muted">
          {formatPostDate(post.date)}
        </time>
        <div className="flex flex-col gap-1">
          <Heading className="text-xl font-medium tracking-tight text-ink text-pretty">
            {post.title}
          </Heading>
          <p className="text-md text-muted text-pretty">{post.dek}</p>
          <div className="mt-0.5 text-xs text-faint">{post.readTime}</div>
        </div>
      </Link>
    </article>
  );
}

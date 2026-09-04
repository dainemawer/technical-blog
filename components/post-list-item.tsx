import Link from "next/link";
import { formatPostDate } from "@/lib/format";
import type { Post } from "@/lib/posts";

export function PostListItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="grid grid-cols-meta items-baseline gap-x-12 opacity-42 transition-opacity duration-140 ease-out hover:opacity-100"
    >
      <div className="text-right text-sm text-muted">
        {formatPostDate(post.date)}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xl font-medium tracking-tight text-ink text-pretty">
          {post.title}
        </div>
        <div className="text-md text-muted text-pretty">{post.dek}</div>
        <div className="mt-0.5 text-xs text-faint">{post.readTime}</div>
      </div>
    </Link>
  );
}

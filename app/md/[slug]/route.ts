import { notFound } from "next/navigation";
import { getPostContent } from "@/lib/mdx";
import { getPostBySlug } from "@/lib/posts";

export async function GET(_request: Request, ctx: RouteContext<"/md/[slug]">) {
  const { slug } = await ctx.params;
  const post = getPostBySlug(slug);
  const content = getPostContent(slug);

  if (!post || !content) notFound();

  const lines = [
    `# ${post.title}`,
    "",
    `> ${post.dek}`,
    "",
    `Published ${post.date}${post.updated ? `, updated ${post.updated}` : ""} — ${post.readTime}`,
    "",
    content.shortAnswer,
    "",
    content.rawBody,
  ];

  if (content.takeaways.length > 0) {
    lines.push("", "## Takeaways", "");
    for (const takeaway of content.takeaways) lines.push(`- ${takeaway}`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

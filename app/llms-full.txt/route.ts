import { articleContent } from "@/lib/article-content";
import { generateLlmsTxt } from "@/lib/llms";
import { getAllPosts } from "@/lib/posts";

function generateLlmsFullTxt(): string {
  const parts = [generateLlmsTxt(), "", "## Full article text", ""];

  for (const post of getAllPosts()) {
    const content = articleContent[post.slug];
    if (!content) continue;

    parts.push(`### ${post.title}`, "", content.shortAnswer, "");
    for (const section of content.sections) {
      if (section.heading) parts.push(`#### ${section.heading}`, "");
      parts.push(...section.paragraphs, "");
    }
  }

  return parts.join("\n");
}

export function GET() {
  return new Response(generateLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

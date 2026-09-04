import { getAllPosts } from "./posts";
import { site } from "./site";
import { topics } from "./topics";

export function generateLlmsTxt(): string {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.role} at ${site.company.name}, based in ${site.location}. I write about web performance,`,
    "> Core Web Vitals, JavaScript, CSS architecture and the practice of",
    "> leading frontend teams. Articles are technical, first-person and based",
    "> on production work.",
    "",
    `Author: ${site.name}`,
    `Role: ${site.role} at ${site.company.name}`,
    `Location: ${site.location}`,
    `Canonical: ${site.url}`,
    "Licence: Content may be quoted with attribution and a link to the source URL.",
    "",
    "## Topics",
    "",
  ];

  for (const topic of topics) {
    lines.push(`- [${topic.name}](${site.url}/topics/${topic.slug}.md):`);
    lines.push(`  ${topic.dek}`);
  }

  lines.push("", "## Articles", "");

  for (const post of getAllPosts()) {
    const updated = post.updated ? `, updated ${post.updated}` : "";
    lines.push(`- [${post.title}](${site.url}/${post.slug}.md):`);
    lines.push(`  Published ${post.date}${updated}. ${post.dek}`);
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Full archive](${site.url}/)`,
    `- [RSS](${site.url}/rss.xml)`,
    `- [About](${site.url}/about.md)`,
  );

  return lines.join("\n");
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { Logo } from "@/components/logo";
import { MetaRow } from "@/components/meta-row";
import { PageShell } from "@/components/page-shell";
import { PostListItem } from "@/components/post-list-item";
import { getPostsByTopic } from "@/lib/posts";
import { getTopicBySlug, topics } from "@/lib/topics";

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata(
  props: PageProps<"/topics/[topic]">,
): Promise<Metadata> {
  const { topic: slug } = await props.params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return { title: `${topic.name} — Topics`, description: topic.dek };
}

export default async function TopicPage(props: PageProps<"/topics/[topic]">) {
  const { topic: slug } = await props.params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const posts = getPostsByTopic(topic.slug);

  return (
    <PageShell
      sidebar={
        <div className="flex flex-col gap-23.5">
          <Logo />
          <nav aria-label="Topics" className="flex flex-col gap-3.5 pr-10">
            <div className="mb-1 text-faint text-xs">Topics</div>
            {topics.map((t) => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                aria-current={t.slug === topic.slug ? "page" : undefined}
                className={`text-ink text-sm hover:opacity-100 focus-visible:opacity-100 ${t.slug === topic.slug ? "opacity-100" : "opacity-32"}`}
              >
                {t.name}
              </Link>
            ))}
          </nav>
        </div>
      }
    >
      <div className="mx-auto max-w-content">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Topics" }]}
        />

        <h1 className="mt-4.5 text-2xl text-ink tracking-tight">
          {topic.name}
        </h1>
        <div className="mt-2 text-md text-muted text-pretty">{topic.dek}</div>
        <div className="mt-5 flex items-baseline gap-x-2 text-sm text-muted">
          <span>
            {posts.length} article{posts.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-13 flex flex-col gap-11.5">
          <MetaRow label="Articles">
            <div className="flex flex-col gap-7.5">
              {posts.map((post) => (
                <PostListItem key={post.slug} post={post} />
              ))}
              {posts.length === 0 && (
                <p className="text-md text-faint">
                  No articles under this topic yet.
                </p>
              )}
            </div>
          </MetaRow>
        </div>
      </div>
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { CodeBlock } from "@/components/code-block";
import { Logo } from "@/components/logo";
import { MetaRow } from "@/components/meta-row";
import { PageShell } from "@/components/page-shell";
import { Toc } from "@/components/toc";
import { articleContent } from "@/lib/article-content";
import { formatArticleDate } from "@/lib/format";
import { highlightCode } from "@/lib/highlight";
import { renderInlineText } from "@/lib/inline-markdown";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getTopicBySlug } from "@/lib/topics";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.dek };
}

export default async function ArticlePage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  const content = articleContent[slug];

  if (!post || !content) notFound();

  const published = formatArticleDate(post.date);
  const updated = post.updated ? formatArticleDate(post.updated) : undefined;
  const topic = post.topics[0] ? getTopicBySlug(post.topics[0]) : undefined;
  const highlightedCode = content.code
    ? await highlightCode(
        content.code.source,
        content.code.lang ?? "javascript",
      )
    : undefined;

  return (
    <PageShell
      sidebar={
        <div className="flex h-full flex-col gap-23.5">
          <Logo />
          <Toc
            heading="On this page"
            ariaLabel="On this page"
            items={content.toc}
            sticky
          />
        </div>
      }
    >
      <div className="mx-auto max-w-content">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Writing", href: "/" },
            ...(topic
              ? [{ label: topic.name, href: `/topics/${topic.slug}` }]
              : []),
          ]}
        />

        <h1 className="mt-4.5 text-2xl text-ink tracking-tight text-pretty">
          {post.title}
        </h1>
        <div className="mt-2 text-md text-muted text-pretty">{post.dek}</div>

        <div className="mt-5 flex flex-wrap items-baseline gap-x-2 text-sm text-muted">
          <Link
            href="/about"
            className="text-ink transition-opacity duration-140 ease-out hover:opacity-60 focus-visible:opacity-60"
          >
            {"Daine Mawer"}
          </Link>
          <span className="text-divider">|</span>
          <span>
            {published.day} {published.month}{" "}
            <span className="text-faint">{published.year}</span>
          </span>
          {updated && (
            <>
              <span className="text-divider">|</span>
              <span>
                Updated {updated.day} {updated.month}{" "}
                <span className="text-faint">{updated.year}</span>
              </span>
            </>
          )}
          <span className="text-divider">|</span>
          <span>{post.readTime}</span>
          {post.wordCount != null && (
            <>
              <span className="text-divider">|</span>
              <span>{post.wordCount.toLocaleString()} words</span>
            </>
          )}
        </div>

        <div className="mt-13">
          <MetaRow label="The short answer">
            <p className="text-md text-ink leading-relaxed text-pretty">
              {content.shortAnswer}
            </p>
          </MetaRow>
        </div>

        <div className="mt-15 flex flex-col gap-6.5 text-md text-ink leading-relaxed">
          {content.sections.map((section, index) => (
            <div key={section.id ?? index} className="flex flex-col gap-6.5">
              {section.heading && (
                <h2
                  id={section.id}
                  className="mt-8 scroll-mt-10 text-ink text-lg tracking-tight"
                >
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-pretty">
                  {renderInlineText(paragraph)}
                </p>
              ))}
              {section.id === "challenge" && content.code && (
                <CodeBlock code={content.code.source} html={highlightedCode} />
              )}
            </div>
          ))}

          {content.related && (
            <aside className="my-6.5 grid grid-cols-meta items-baseline gap-x-12 text-muted text-sm">
              <div className="text-right text-faint">Related</div>
              <Link
                href={content.related.href}
                className="hover:text-ink focus-visible:text-ink"
              >
                {content.related.label}
              </Link>
            </aside>
          )}
        </div>

        <div id="takeaways" className="mt-18 scroll-mt-10">
          <MetaRow label="Takeaways">
            <ol className="flex list-decimal flex-col gap-3 pl-5.5 text-base text-ink leading-normal text-pretty">
              {content.takeaways.map((takeaway) => (
                <li key={takeaway.slice(0, 40)}>{takeaway}</li>
              ))}
            </ol>
          </MetaRow>
        </div>

        <div id="faq" className="mt-18 scroll-mt-10">
          <MetaRow label="Questions">
            <div className="flex flex-col gap-7">
              {content.faq.map((item) => (
                <div key={item.question} className="flex flex-col gap-1.5">
                  <h3 className="text-base text-ink">{item.question}</h3>
                  <p className="text-base text-muted leading-normal text-pretty">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </MetaRow>
        </div>

        <div className="mt-19 grid grid-cols-2 gap-x-12 text-sm text-muted">
          {content.prev && (
            <Link
              href={content.prev.href}
              className="hover:text-ink focus-visible:text-ink"
            >
              {content.prev.label}
            </Link>
          )}
          {content.next && (
            <Link
              href={content.next.href}
              className="text-right hover:text-ink focus-visible:text-ink"
            >
              {content.next.label}
            </Link>
          )}
        </div>
      </div>
    </PageShell>
  );
}

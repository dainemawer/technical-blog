import { Logo } from "@/components/logo";
import { PageShell } from "@/components/page-shell";
import { PostListItem } from "@/components/post-list-item";
import { YearFilter } from "@/components/year-filter";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage(props: PageProps<"/">) {
  const { year } = await props.searchParams;
  const selectedYear = typeof year === "string" ? Number(year) : undefined;

  const posts = getAllPosts().filter(
    (post) =>
      !selectedYear || new Date(post.date).getFullYear() === selectedYear,
  );

  return (
    <PageShell
      sidebar={
        <div className="flex flex-col gap-14">
          <Logo />
          <YearFilter selected={selectedYear} />
        </div>
      }
    >
      <div className="flex flex-col gap-8.5">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </PageShell>
  );
}

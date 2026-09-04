export type Post = {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  readTime: string;
  wordCount?: number;
  topics: string[]; // topic slugs
};

/**
 * Placeholder content standing in for a real content source (MDX files,
 * a CMS, etc.) while the routes/templates are scaffolded. Shape mirrors
 * the source design's post list — swap for real data once the content
 * layer is decided.
 */
export const posts: Post[] = [
  {
    slug: "leading-with-ai",
    title: "Leading With AI: What Helped Me Through the Hard Parts",
    dek: "How I used AI through the Monocle.com rebuild.",
    date: "2025-10-05",
    readTime: "9 min read",
    topics: ["engineering-management"],
  },
  {
    slug: "no-code-low-code-frontend",
    title: "The Rise of No-Code and Low-Code in Frontend Development",
    dek: "Benefits, challenges, and the role of AI.",
    date: "2025-01-15",
    readTime: "7 min read",
    topics: ["javascript"],
  },
  {
    slug: "css-custom-properties-fallbacks",
    title: "Using CSS Custom Properties with Fallbacks for Efficiency",
    dek: "Less boilerplate, fewer surprises.",
    date: "2024-05-06",
    readTime: "5 min read",
    topics: ["css", "performance"],
  },
  {
    slug: "what-is-google-baseline",
    title: "What Is Google Baseline and Its Impact?",
    dek: "Interoperability across browser vendors, explained.",
    date: "2024-04-28",
    readTime: "6 min read",
    topics: ["css", "performance"],
  },
  {
    slug: "determine-when-a-sticky-element-is-stuck",
    title: "How to Determine When a Sticky Element is Stuck in JavaScript",
    dek: "A small JavaScript function for the pseudo-class CSS never gave us.",
    date: "2024-03-14",
    updated: "2026-02-09",
    readTime: "6 min read",
    wordCount: 1140,
    topics: ["javascript", "performance"],
  },
  {
    slug: "mastering-task-estimation",
    title: "Mastering Task Estimation with the FATE Framework",
    dek: "Accurate timelines, and a happy client.",
    date: "2024-03-12",
    readTime: "8 min read",
    topics: ["engineering-management"],
  },
  {
    slug: "react-scalability-storybook",
    title: "Enhance Your React App's Scalability using Storybook",
    dek: "Component libraries and visual regression testing.",
    date: "2024-02-05",
    readTime: "7 min read",
    topics: ["javascript", "performance"],
  },
  {
    slug: "understanding-chromes-coverage-panel",
    title: "Understanding Chrome's Coverage Panel",
    dek: "Leveraging its insights to optimise performance.",
    date: "2023-11-27",
    readTime: "5 min read",
    topics: ["performance"],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByTopic(topic: string): Post[] {
  return getAllPosts().filter((post) => post.topics.includes(topic));
}

export function getYears(): number[] {
  const years = new Set(posts.map((post) => new Date(post.date).getFullYear()));
  return [...years].sort((a, b) => b - a);
}

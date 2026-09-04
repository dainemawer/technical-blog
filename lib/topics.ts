export type Topic = {
  slug: string;
  name: string;
  dek: string;
};

export const topics: Topic[] = [
  {
    slug: "performance",
    name: "Web Performance",
    dek: "Measuring what users actually feel, and cutting what they never needed.",
  },
  {
    slug: "javascript",
    name: "JavaScript",
    dek: "Browser APIs, event handling, observers, framework-agnostic patterns.",
  },
  {
    slug: "css",
    name: "CSS",
    dek: "Custom properties, positioning, Baseline and interoperability.",
  },
  {
    slug: "engineering-management",
    name: "Engineering Management",
    dek: "Estimation, scoping, team process.",
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export type UsesSection = {
  id: string;
  label: string;
  items: { name: string; description: string }[];
};

export const usesReviewedOn = "2026-02-09";

export const usesSections: UsesSection[] = [
  {
    id: "desk",
    label: "Desk",
    items: [
      {
        name: "MacBook Pro 16″ M3 Max",
        description:
          "36GB. The RAM matters more than the cores when you keep four Chrome profiles and a Docker stack open.",
      },
      {
        name: "LG UltraFine 27″",
        description:
          "Single display, not two. Fewer places for a Slack notification to hide.",
      },
      {
        name: "Keychron K3 — brown switches",
        description: "Low profile, quiet enough for a call I forgot to mute.",
      },
    ],
  },
  {
    id: "editor",
    label: "Editor",
    items: [
      {
        name: "VS Code",
        description:
          "Vitesse Light, JetBrains Mono at 14px, line height 1.7. Format on save, no exceptions.",
      },
      {
        name: "Biome",
        description:
          "Replaced ESLint and Prettier on new projects. The speed difference is not subtle.",
      },
      {
        name: "Ghostty + Fish",
        description:
          "Starship prompt, trimmed to branch and node version only.",
      },
    ],
  },
  {
    id: "measuring",
    label: "Measuring",
    items: [
      {
        name: "Chrome DevTools",
        description:
          "Performance and Coverage panels. Almost everything I've written about performance started in one of the two.",
      },
      {
        name: "WebPageTest",
        description:
          "Throttled mobile, Cape Town test location. Lab numbers from a fast desktop are a story, not data.",
      },
      {
        name: "CrUX + Vercel Analytics",
        description: "Field data settles arguments that lab data starts.",
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    items: [
      {
        name: "This site",
        description:
          "Next.js, self-hosted fonts, deployed on Vercel. No client-side framework on article pages.",
      },
      {
        name: "Storybook",
        description:
          "With visual regression. The subject of one of the more useful things I've written.",
      },
    ],
  },
];

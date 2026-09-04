export const about = {
  summary:
    "I lead frontend engineering teams and write about the parts of the job that don't fit in a ticket: web performance as a measurement discipline, CSS and JavaScript architecture that survives a second team, and estimation that holds up in front of a client. Most of what I publish comes out of production work rather than side projects.",
  work: [
    {
      period: "2022 — now",
      description:
        "Frontend Engineering Manager. Leading a distributed team across large-scale publishing and commerce rebuilds.",
    },
    {
      period: "2018 — 2022",
      description:
        "Senior Frontend Engineer. Performance and accessibility remediation on high-traffic WordPress and headless builds.",
    },
  ],
  speaking: [
    {
      venue: "WordCamp",
      topic: "Core Web Vitals for real sites, not lab scores.",
    },
    { venue: "Meetups", topic: "Estimation as a design constraint." },
  ],
  writesAbout: [
    { label: "Performance", href: "/topics/performance" },
    { label: "JavaScript", href: "/topics/javascript" },
    { label: "CSS", href: "/topics/css" },
    { label: "Engineering Management", href: "/topics/engineering-management" },
  ],
  verify: [
    { label: "GitHub", href: "https://github.com/dainemawer" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dainemawer" },
    { label: "Bluesky", href: "https://bsky.app/profile/dainemawer.com" },
    { label: "daine@dainemawer.com", href: "mailto:daine@dainemawer.com" },
  ],
} as const;

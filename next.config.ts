import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        // App Router dynamic segments can't include a literal suffix
        // (`app/[slug].md` isn't a supported file convention), so the
        // markdown twin lives at /md/[slug] and is rewritten here to
        // keep the public URL at /:slug.md.
        source: "/:slug.md",
        destination: "/md/:slug",
      },
    ];
  },
};

export default nextConfig;

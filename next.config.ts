import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonce: this site has no third-party or inline scripts to allow for,
// so a static policy (settable in next.config, no proxy required) is enough.
// Dev needs 'unsafe-eval' (React's debug eval) and 'unsafe-inline' (Turbopack's
// HMR bootstrap scripts) — neither is present in a production build.
const cspHeader = `
  default-src 'self';
  script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
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

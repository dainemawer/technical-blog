import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Set once a GTM container exists (see components/analytics.tsx) — until
// then this stays empty and the CSP below stays as strict as it's ever been.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

// No nonce: nonce-based CSP forces every page to render dynamically per
// request (no static generation/ISR), which this mostly-static blog can't
// afford to give up. GTM's dataLayer bootstrap is instead served as a
// same-origin static file (public/gtm-init.js) so script-src never needs
// 'unsafe-inline' or a hash pinned to a third-party snippet — only gtm.js
// itself and GA4's collection endpoints need allowlisting, and only once
// NEXT_PUBLIC_GTM_ID is actually set.
// Dev needs 'unsafe-eval' (React's debug eval) and 'unsafe-inline' (Turbopack's
// HMR bootstrap scripts) — neither is present in a production build.
const cspHeader = `
  default-src 'self';
  script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""}${gtmId ? " https://www.googletagmanager.com" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self'${gtmId ? " https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com" : ""};
  ${gtmId ? "frame-src https://www.googletagmanager.com;" : ""}
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
  async redirects() {
    return [
      // Old site used /articles/<slug>; this one is flat. One entry per
      // migrated post, old slug -> new (often shortened) slug.
      {
        source:
          "/articles/leading-with-ai-what-helped-me-through-the-hard-parts",
        destination: "/leading-with-ai",
        permanent: true,
      },
      {
        source:
          "/articles/the-rise-of-no-code-and-low-code-in-frontend-development",
        destination: "/no-code-low-code-frontend",
        permanent: true,
      },
      {
        source:
          "/articles/using-css-custom-properties-with-fallbacks-for-efficiency",
        destination: "/css-custom-properties-fallbacks",
        permanent: true,
      },
      {
        source: "/articles/what-is-google-baseline-and-its-impact",
        destination: "/what-is-google-baseline",
        permanent: true,
      },
      {
        source:
          "/articles/determine-when-a-sticky-element-is-stuck-in-javascript",
        destination: "/determine-when-a-sticky-element-is-stuck",
        permanent: true,
      },
      {
        source:
          "/articles/unlocking-project-success-mastering-task-estimation-with-the-fate-framework",
        destination: "/mastering-task-estimation",
        permanent: true,
      },
      {
        source:
          "/articles/enhance-your-react-apps-scalability-using-storybook-and-chromatic",
        destination: "/react-scalability-storybook",
        permanent: true,
      },
      {
        source: "/articles/understanding-chromes-coverage-panel",
        destination: "/understanding-chromes-coverage-panel",
        permanent: true,
      },
      {
        source:
          "/articles/how-to-effectively-setup-nextjs-with-a-component-library-using-monorepos",
        destination: "/nextjs-component-library-monorepo",
        permanent: true,
      },
      {
        source: "/articles/ten-proven-techniques-for-effective-code-reviews",
        destination: "/effective-code-reviews",
        permanent: true,
      },
      {
        source: "/articles/four-tips-for-properly-using-the-return-statement",
        destination: "/using-the-return-statement",
        permanent: true,
      },
      {
        source: "/articles/leveraging-commitlint-for-consistency",
        destination: "/leveraging-commitlint",
        permanent: true,
      },
      {
        source:
          "/articles/five-frontend-file-architectures-for-better-code-organisation",
        destination: "/frontend-file-architectures",
        permanent: true,
      },
      {
        source: "/articles/how-to-motivate-and-inspire-individual-contributors",
        destination: "/motivate-individual-contributors",
        permanent: true,
      },
      // Dropped: personal/lifestyle content, doesn't fit the new site's
      // strictly-technical positioning (see lib/llms.ts) — send to home
      // rather than 404.
      {
        source: "/articles/four-surprising-benefits-of-intermittent-fasting",
        destination: "/",
        permanent: true,
      },
      {
        source: "/articles/waking-up-early-a-crash-course-for-engineers",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/articles/the-future-of-frontend-development-in-2025-trends-ai-and-the-evolving-role-of-engineers",
        destination: "/",
        permanent: true,
      },
      // Dropped: the old page 500s (noindex + broken render already), and
      // was never imported — nothing to redirect to.
      {
        source: "/articles/nextjs-seo-checklist-for-frontend-developers",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

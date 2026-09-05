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
};

export default nextConfig;

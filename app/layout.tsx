import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import { CommandPaletteProvider } from "@/components/command-palette-context";
import { CommandPaletteMount } from "@/components/command-palette-mount";
import { InertWhenPaletteOpen } from "@/components/inert-when-palette-open";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: `${site.role}. ${site.location}.`,
  alternates: {
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-70 focus-visible:rounded-md focus-visible:bg-surface focus-visible:px-4 focus-visible:py-2 focus-visible:text-ink focus-visible:text-sm focus-visible:shadow-palette"
        >
          Skip to content
        </a>
        <CommandPaletteProvider>
          <InertWhenPaletteOpen>{children}</InertWhenPaletteOpen>
          <CommandPaletteMount />
        </CommandPaletteProvider>
      </body>
    </html>
  );
}

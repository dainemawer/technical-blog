import type { Metadata } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";
import { CommandPalette } from "@/components/command-palette";
import { CommandPaletteProvider } from "@/components/command-palette-context";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <CommandPaletteProvider>
          {children}
          <CommandPalette />
        </CommandPaletteProvider>
      </body>
    </html>
  );
}

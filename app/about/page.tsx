import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Logo } from "@/components/logo";
import { MetaRow } from "@/components/meta-row";
import { PageShell } from "@/components/page-shell";
import { about } from "@/lib/about";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.role}. ${site.location}.`,
};

export default function AboutPage() {
  return (
    <PageShell
      sidebar={
        <div className="flex flex-col gap-23.5">
          <Logo />
          <nav aria-label="Sections" className="flex flex-col gap-3.5 pr-10">
            <div className="mb-1 text-faint text-xs">
              Elsewhere on this page
            </div>
            <Link
              href="/about"
              aria-current="page"
              className="text-ink text-sm"
            >
              About
            </Link>
            <Link
              href="/uses"
              className="text-ink text-sm opacity-32 hover:opacity-100 focus-visible:opacity-100"
            >
              Uses
            </Link>
            <Link
              href="/now"
              className="text-ink text-sm opacity-32 hover:opacity-100 focus-visible:opacity-100"
            >
              Now
            </Link>
          </nav>
        </div>
      }
    >
      <div className="mx-auto max-w-content">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "About" }]}
        />

        <h1 className="mt-4.5 text-2xl text-ink tracking-tight">{site.name}</h1>
        <div className="mt-2 text-md text-muted text-pretty">
          {site.role}. {site.location}.
        </div>

        <div className="mt-13">
          <MetaRow label="In short">
            <p className="text-md text-ink leading-relaxed text-pretty">
              {about.summary}
            </p>
          </MetaRow>
        </div>

        <div className="mt-17 flex flex-col gap-10">
          <MetaRow label="Work">
            <div className="flex flex-col gap-5.5 text-base text-ink leading-normal">
              {about.work.map((item) => (
                <div
                  key={item.period}
                  className="grid grid-cols-subrow items-baseline gap-x-8"
                >
                  <div className="text-sm text-muted">{item.period}</div>
                  <div>{item.description}</div>
                </div>
              ))}
            </div>
          </MetaRow>

          <MetaRow label="Speaking">
            <div className="flex flex-col gap-3.5 text-base text-ink leading-normal">
              {about.speaking.map((item) => (
                <div
                  key={item.venue}
                  className="grid grid-cols-subrow items-baseline gap-x-8"
                >
                  <div className="text-sm text-muted">{item.venue}</div>
                  <div>{item.topic}</div>
                </div>
              ))}
            </div>
          </MetaRow>

          <MetaRow label="Writes about">
            <div className="flex flex-wrap items-baseline gap-x-2 text-sm text-muted">
              {about.writesAbout.map((topic, index) => (
                <span key={topic.href} className="flex items-baseline gap-x-2">
                  {index > 0 && <span className="text-divider">|</span>}
                  <Link href={topic.href} className="hover:text-ink">
                    {topic.label}
                  </Link>
                </span>
              ))}
            </div>
          </MetaRow>

          <MetaRow label="Verify">
            <div className="flex flex-wrap items-baseline gap-x-2 text-sm text-muted">
              {about.verify.map((link, index) => (
                <span key={link.href} className="flex items-baseline gap-x-2">
                  {index > 0 && <span className="text-divider">|</span>}
                  <a href={link.href} className="hover:text-ink">
                    {link.label}
                  </a>
                </span>
              ))}
            </div>
          </MetaRow>
        </div>
      </div>
    </PageShell>
  );
}

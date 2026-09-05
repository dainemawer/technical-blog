import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Logo } from "@/components/logo";
import { PageShell } from "@/components/page-shell";
import { Toc } from "@/components/toc";
import { formatArticleDate } from "@/lib/format";
import { usesReviewedOn, usesSections } from "@/lib/uses";

export const metadata: Metadata = {
  title: "Uses",
  description: "The hardware and software I actually open every day, and why.",
};

export default function UsesPage() {
  const reviewed = formatArticleDate(usesReviewedOn);

  return (
    <PageShell
      sidebar={
        <div className="flex h-full flex-col gap-23.5">
          <Logo />
          <Toc
            heading="On this page"
            ariaLabel="On this page"
            items={usesSections.map((section) => ({
              id: section.id,
              label: section.label,
            }))}
            sticky
          />
        </div>
      }
    >
      <div className="mx-auto max-w-content">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Uses" }]} />

        <h1 className="mt-4.5 text-2xl text-ink tracking-tight">Uses</h1>
        <div className="mt-2 text-md text-muted text-pretty">
          The hardware and software I actually open every day, and why.
        </div>
        <div className="mt-5 flex items-baseline gap-x-2 text-sm text-muted">
          <span>
            Reviewed {reviewed.day} {reviewed.month} {reviewed.year}
          </span>
          <span className="text-divider">|</span>
          <span>No affiliate links</span>
        </div>

        <div className="mt-15 flex flex-col gap-11">
          {usesSections.map((section) => (
            <div
              key={section.id}
              className="grid grid-cols-meta items-start gap-x-12"
            >
              <h2
                id={section.id}
                className="scroll-mt-10 text-right font-normal text-faint text-sm"
              >
                {section.label}
              </h2>
              <div className="flex flex-col gap-5 text-base text-ink leading-normal">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="grid grid-cols-subrow items-baseline gap-x-8"
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-muted">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

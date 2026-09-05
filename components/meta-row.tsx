import type { ReactNode } from "react";

export function MetaRow({
  id,
  label,
  headingLevel: Heading = "h2",
  children,
}: {
  id?: string;
  label: ReactNode;
  headingLevel?: "h2" | "h3";
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className="grid grid-cols-meta items-start gap-x-12 scroll-mt-10"
    >
      <Heading className="text-right text-sm text-faint leading-normal font-normal">
        {label}
      </Heading>
      <div>{children}</div>
    </div>
  );
}

import type { ReactNode } from "react";

export function MetaRow({
  id,
  label,
  children,
}: {
  id?: string;
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      className="grid grid-cols-meta items-start gap-x-12 scroll-mt-10"
    >
      <div className="text-right text-sm text-faint leading-normal">
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

import type { ReactNode } from "react";

export function MetaRow({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-meta items-start gap-x-12">
      <div className="text-right text-sm text-faint leading-normal">
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

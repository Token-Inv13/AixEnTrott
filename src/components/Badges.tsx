import type { ReactNode } from 'react';

export function Pill({
  children,
  tone = 'slate',
}: {
  children: ReactNode;
  tone?: 'slate' | 'sky' | 'emerald' | 'amber' | 'rose';
}) {
  const styles: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
    emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
    rose: 'bg-rose-50 text-rose-700 ring-1 ring-rose-100',
  };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}>{children}</span>;
}

export function SectionKicker({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sky">{children}</p>;
}

export function SectionTitle({
  children,
  description,
}: {
  children: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{children}</h1>
      {description ? <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">{description}</p> : null}
    </div>
  );
}


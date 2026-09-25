import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  eyebrow?: string;
  /** Optional lead paragraph rendered under the heading. */
  intro?: ReactNode;
};

/**
 * Every section previously rendered its own <main> and <h1>, producing
 * nested landmarks and five competing top-level headings on one page.
 * This wrapper gives each one a single <section> + <h2> instead.
 */
export default function Section({
  id,
  title,
  children,
  intro,
  eyebrow,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      {eyebrow ? (
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-300">
          <span className="h-px w-8 bg-teal-500" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={`${id}-heading`}
        className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-5xl dark:text-white"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          {intro}
        </p>
      ) : null}
      <div className="mt-10">{children}</div>
    </section>
  );
}

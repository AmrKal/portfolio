import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  /** Optional lead paragraph rendered under the heading. */
  intro?: ReactNode;
};

/**
 * Every section previously rendered its own <main> and <h1>, producing
 * nested landmarks and five competing top-level headings on one page.
 * This wrapper gives each one a single <section> + <h2> instead.
 */
export default function Section({ id, title, children, intro }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2
        id={`${id}-heading`}
        className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
          {intro}
        </p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ProjectCardProps = {
  name: string;
  description: ReactNode;
  href?: string;
  linkLabel?: string;
  eyebrow?: string;
  outcome?: string;
  tags: string[];
  image?: string;
  tone?: "accent" | "muted";
};

export default function ProjectCard({
  name,
  description,
  href,
  linkLabel = "GitHub",
  eyebrow,
  outcome,
  tags,
  image,
  tone = "accent",
}: ProjectCardProps) {
  return (
    <article
      className={
        tone === "accent"
          ? "group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-xl hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-700 dark:hover:shadow-black/20"
          : "flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
      }
    >
      {image ? (
        <div className="relative mb-5 h-44 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
          <Image
            src={image}
            alt={`${name} screenshot`}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-300">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {name}
          </h3>
        </div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${linkLabel}: ${name}`}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300"
          >
            {linkLabel}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>

      {outcome ? (
        <p className="mt-5 border-l-2 border-teal-400 pl-3 text-sm font-medium leading-6 text-slate-800 dark:text-slate-200">
          {outcome}
        </p>
      ) : null}

      {tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2 text-xs">
          {tags.map((tag) => (
            <li
              key={tag}
              className={
                tone === "accent"
                  ? "rounded-full bg-slate-100 px-2.5 py-1.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  : "rounded-full border border-slate-200 px-2.5 py-1.5 text-slate-600 dark:border-slate-700 dark:text-slate-400"
              }
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

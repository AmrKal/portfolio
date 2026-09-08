import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

type ProjectCardProps = {
  name: string;
  description: ReactNode;
  href?: string;
  tags: string[];
  /** Optional screenshot. Omitted cards simply render without a thumbnail
      instead of repeating one shared placeholder on every card. */
  image?: string;
  /** Featured projects get the accent tag style, GitHub repos the muted one. */
  tone?: "accent" | "muted";
};

export default function ProjectCard({
  name,
  description,
  href,
  tags,
  image,
  tone = "accent",
}: ProjectCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      {image && (
        <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={image}
            alt={`${name} screenshot`}
            fill
            sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h4 className="text-lg font-semibold break-words text-neutral-900 dark:text-neutral-100">
          {name}
        </h4>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on GitHub`}
            className="flex shrink-0 items-center gap-1 text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:text-blue-400"
          >
            GitHub <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>

      <p className="mb-4 flex-1 text-sm text-neutral-600 dark:text-neutral-400">
        {description}
      </p>

      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 text-xs">
          {tags.map((tag) => (
            <li
              key={tag}
              className={
                tone === "accent"
                  ? "rounded-full bg-blue-50 px-2 py-1 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "rounded-full bg-neutral-100 px-2 py-1 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
              }
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      </div>
    </article>
  );
}

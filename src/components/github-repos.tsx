"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./project-card";
import { featuredProjects } from "@/lib/projects";
import { site } from "@/lib/site";

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  fork: boolean;
  private: boolean;
};

type Status = "loading" | "ready" | "error";

const featuredNames = new Set(
  featuredProjects.map((project) => project.name.toLowerCase()),
);

export default function GithubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const controller = new AbortController();

    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${site.githubUsername}/repos?sort=updated&per_page=100`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          },
        );

        // The unauthenticated API is rate limited to 60 requests/hour and
        // answers with an error *object* rather than an array. The previous
        // version called .filter() on it, threw, and left "Loading..." forever.
        if (!response.ok) {
          throw new Error(`GitHub responded with ${response.status}`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response shape from GitHub");
        }

        const filtered = (data as GitHubRepo[])
          .filter(
            (repo) =>
              !repo.fork &&
              !repo.private &&
              !featuredNames.has(repo.name.toLowerCase()),
          )
          .slice(0, 12);

        setRepos(filtered);
        setStatus("ready");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Failed to load GitHub repositories:", error);
        setStatus("error");
      }
    };

    fetchRepos();
    return () => controller.abort();
  }, []);

  const profileUrl = `https://github.com/${site.githubUsername}`;

  if (status === "loading") {
    return (
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
        aria-live="polite"
      >
        <span className="sr-only">Loading repositories from GitHub…</span>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
          />
        ))}
      </div>
    );
  }

  if (status === "error" || repos.length === 0) {
    return (
      <p className="text-neutral-600 dark:text-neutral-400">
        {status === "error"
          ? "Couldn’t load repositories from GitHub right now — "
          : "No additional public repositories to show — "}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          browse them on GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <ProjectCard
          key={repo.id}
          name={repo.name}
          href={repo.html_url}
          description={repo.description || "No description provided."}
          tags={repo.language ? [repo.language] : []}
          tone="muted"
        />
      ))}
    </div>
  );
}

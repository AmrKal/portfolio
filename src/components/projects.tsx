import Section from "./section";
import ProjectCard from "./project-card";
import GithubRepos from "./github-repos";
import { featuredProjects } from "@/lib/projects";

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Products built around a concrete problem."
      intro="A focused set of backend, automation and full-stack projects—from pull-request intelligence to customer ordering."
    >
      <div className="mb-20 grid grid-cols-1 gap-5 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            eyebrow={project.eyebrow}
            description={project.description}
            outcome={project.outcome}
            href={project.href}
            linkLabel={project.linkLabel}
            tags={project.tech}
            image={project.image}
          />
        ))}
      </div>

      <div className="mb-7 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Repository feed
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
            More from GitHub
          </h3>
        </div>
        <a
          href="https://github.com/KalanyAmr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-teal-700 hover:underline dark:text-teal-300"
        >
          View profile
        </a>
      </div>
      <GithubRepos />
    </Section>
  );
}

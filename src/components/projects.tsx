import Section from "./section";
import ProjectCard from "./project-card";
import GithubRepos from "./github-repos";
import { featuredProjects } from "@/lib/projects";

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      intro="A selection of things I’ve built, plus a live feed of my latest public repositories."
    >
      <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            description={project.description}
            href={project.github}
            tags={project.tech}
            image={project.image}
          />
        ))}
      </div>

      <h3 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        More from GitHub
      </h3>
      <GithubRepos />
    </Section>
  );
}

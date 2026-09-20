export type FeaturedProject = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  /** Optional screenshot under /public, e.g. "/shots/portfolio.png". */
  image?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "portfolio",
    description:
      "My personal portfolio website built with Next.js and Tailwind CSS.",
    tech: ["TypeScript", "Next.js", "Tailwind"],
    github: "https://github.com/amrkal/portfolio",
  },
  {
    name: "WorldAppTrivia",
    description:
      "Mobile trivia game built with Flutter and Dart, featuring multiple categories.",
    tech: ["Dart", "Flutter"],
    github: "https://github.com/amrkal/WorldAppTrivia",
  },
  {
    name: "job-mail-tracker",
    description:
      "Python tool to parse job-related emails and track application metadata in Excel.",
    tech: ["Python"],
    github: "https://github.com/amrkal/job-mail-tracker",
  },
  {
    name: "ai-code-reviewer",
    description:
      "AI-powered GitHub code reviewer that analyzes repos using GPT and shows side-by-side diffs.",
    tech: ["Python", "React"],
    github: "https://github.com/amrkal/ai-code-reviewer",
  },
  {
    name: "PowerTrack",
    description:
      "Final year project for order and inventory management, including admin control panel.",
    tech: ["TypeScript", "React"],
  },
  {
    name: "AdminPanelApp",
    description:
      "Private admin dashboard for managing orders and inventory, built with TypeScript.",
    tech: ["TypeScript"],
  },
  {
    name: "ElysianSoftech",
    description:
      "Authentication system with login and registration built using JavaScript.",
    tech: ["JavaScript"],
    github: "https://github.com/amrkal/ElysianSoftech",
  },
  {
    name: "TennisCourt-BackEnd",
    description:
      "Python-based backend API for managing tennis court reservations and user data.",
    tech: ["Python"],
    github: "https://github.com/amrkal/TennisCourt-BackEnd",
  },
  {
    name: "TennisCourt-FrontEnd",
    description:
      "React frontend for booking and managing tennis court reservations.",
    tech: ["JavaScript"],
    github: "https://github.com/amrkal/TennisCourt-FrontEnd",
  },
  {
    name: "Braude-Mid-Project",
    description:
      "Flower shop management system built in Java as part of a university software engineering project.",
    tech: ["Java"],
    github: "https://github.com/amrkal/Braude-Mid-Project",
  },
];

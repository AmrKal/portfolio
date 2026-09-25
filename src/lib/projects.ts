export type FeaturedProject = {
  name: string;
  repoName?: string;
  eyebrow: string;
  description: string;
  tech: string[];
  outcome?: string;
  href?: string;
  linkLabel?: string;
  /** Optional screenshot under /public, e.g. "/shots/portfolio.png". */
  image?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "AI Code Reviewer",
    repoName: "ai-code-reviewer",
    eyebrow: "Developer tooling",
    description:
      "Automates pull-request analysis by processing GitHub diffs and returning structured review feedback through backend API endpoints.",
    tech: ["Python", "FastAPI", "GitHub API", "OpenAI API"],
    href: "https://github.com/KalanyAmr/ai-code-reviewer",
    linkLabel: "View code",
  },
  {
    name: "PowerStock",
    repoName: "PowerTrack",
    eyebrow: "Inventory operations",
    description:
      "An API-backed inventory and order platform with a database schema, admin workflows and real-time synchronization.",
    outcome: "Reduced manual inventory tracking by approximately 60%.",
    tech: ["TypeScript", "Python", "MongoDB", "REST APIs"],
    // The PowerTrack repository holds the capstone deliverables — report,
    // presentation and archives — not the source, so "View code" sent anyone
    // who clicked it to a folder of .docx and .zip files.
    href: "https://github.com/KalanyAmr/PowerTrack",
    linkLabel: "View project files",
  },
  {
    name: "Job Application Tracker",
    repoName: "job-mail-tracker",
    eyebrow: "Workflow automation",
    description:
      "Turns job-related email into structured application records and dashboard views with filters, response statistics and export.",
    tech: ["Python", "Pandas", "Streamlit"],
    href: "https://github.com/KalanyAmr/job-mail-tracker",
    linkLabel: "View code",
  },
  {
    name: "TradeForge",
    repoName: "CryptoBot",
    eyebrow: "Trading systems",
    description:
      "A full-stack crypto trading platform supporting paper, backtest and live modes, with risk controls and Binance integration.",
    tech: ["Python", "FastAPI", "Next.js", "Binance API"],
  },
  {
    name: "JAM Pizza Truck",
    repoName: "jam-pizza-truck",
    eyebrow: "Customer experience",
    description:
      "A Hebrew right-to-left digital menu and ordering flow that lets customers place an order directly through WhatsApp.",
    tech: ["Next.js", "RTL", "WhatsApp"],
    href: "https://jam-pizza-truck.vercel.app",
    linkLabel: "Visit site",
  },
];

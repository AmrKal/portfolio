/**
 * Resolves the canonical origin for this deployment.
 *
 * Hardcoding it is fragile: the value feeds metadataBase, the sitemap,
 * robots.txt and the JSON-LD, so a stale domain silently breaks every link
 * preview. Vercel exposes the production domain at build time, so prefer it
 * and fall back only when building outside Vercel.
 *
 * Set NEXT_PUBLIC_SITE_URL to override, e.g. after attaching a custom domain.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Set by Vercel to the project's production domain on every deployment.
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  // Preview deployments have no production domain; use the deployment URL.
  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}

/**
 * Single source of truth for personal details that were previously
 * duplicated across the sidebar, contact, and projects components.
 */
export const site = {
  name: "Amr Kalany",
  role: "Software Engineer",
  email: "Amr.kalaany@gmail.com",
  /** Used to build the "More from GitHub" feed. */
  githubUsername: "amrkal",
  cv: "/Amr_Kalany_CV.pdf",
  description:
    "Software engineer working across the stack — from embedded C/C++ and " +
    "real-time control systems to AI-powered web applications with React, " +
    "Next.js and Python.",
  url: resolveSiteUrl(),
  profileImage: "/profile.jpg",
} as const;

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/amrkal" },
  { name: "LinkedIn", href: "https://linkedin.com/in/amrkal" },
  { name: "HackerRank", href: "https://www.hackerrank.com/Kalany" },
  { name: "LeetCode", href: "https://leetcode.com/amrkal" },
] as const;

/** Section order drives both the nav and the scroll-spy observer. */
export const sections = [
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

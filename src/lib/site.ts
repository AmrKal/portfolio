/**
 * Single source of truth for personal details that were previously
 * duplicated across the sidebar, contact, and projects components.
 */
export const site = {
  name: "Amr Kalany",
  role: "Software Engineer",
  email: "amrkalany@gmail.com",
  /** Used to build the "More from GitHub" feed. */
  githubUsername: "amrkal",
  cv: "/Amr_Kalany_CV.pdf",
  description:
    "Software engineer working across the stack — from embedded C/C++ and " +
    "real-time control systems to AI-powered web applications with React, " +
    "Next.js and Python.",
  url: "https://amrkalany.vercel.app",
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

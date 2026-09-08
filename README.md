# Amr Kalany — Portfolio

Personal portfolio site: a single-page profile with projects, skills, resume and
a contact form, built with the Next.js App Router.

**Live:** https://amrkalany.vercel.app

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react |
| Analytics | @vercel/analytics |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint 9 (flat config) |
| `npm run lint:fix` | ESLint with autofix |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
src/
  app/
    layout.tsx        Root layout: fonts, metadata, analytics
    page.tsx          Composes the single page (server component)
    globals.css       Tailwind entry + design tokens
  components/
    sidebar.tsx       Client: desktop sidebar, mobile drawer, scroll-spy
    section.tsx       Shared <section> + <h2> wrapper
    hero.tsx          Hero banner
    projects.tsx      Featured grid (server)
    github-repos.tsx  Client: live GitHub repo feed
    project-card.tsx  Shared card used by both project lists
    skills.tsx  about.tsx  resume.tsx  contact.tsx
  lib/
    site.ts           Name, role, email, social links, section order
    projects.ts       Featured project data
public/
  profile.jpg  Amr_Kalany_CV.pdf  placeholder.png
```

Only `sidebar.tsx`, `github-repos.tsx` and `contact.tsx` are client components —
everything else renders on the server.

## Editing content

Most content lives in data files rather than markup:

- **Name, role, email, social links, nav order** — `src/lib/site.ts`
- **Featured projects** — `src/lib/projects.ts`
- **Skills** — the `skillGroups` array in `src/components/skills.tsx`
- **Resume entries** — the `groups` array in `src/components/resume.tsx`
- **CV** — replace `public/Amr_Kalany_CV.pdf`

### Project screenshots

`ProjectCard` renders a thumbnail only when a project defines an `image`. To add
one, drop the file in `public/` and reference it:

```ts
{
  name: "portfolio",
  description: "...",
  tech: ["TypeScript", "Next.js"],
  image: "/shots/portfolio.png",
}
```

## Notes

- The "More from GitHub" feed calls the public GitHub API from the browser. That
  endpoint is rate limited to 60 requests/hour per IP; when it fails the section
  falls back to a link to the profile rather than blocking the page.
- Dark mode follows the OS setting (`prefers-color-scheme`); there is no toggle.

## Deployment

Deployed on Vercel. Pushes to `main` deploy automatically; any other branch gets
a preview deployment.

# Amr Kalany — Portfolio

Personal portfolio site: a single-page profile covering background, toolkit,
experience, selected work and a contact form, built with the Next.js App Router.

**Live:** https://portfolio-os5.vercel.app

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
| `npm run test:e2e` | Playwright end-to-end tests |
| `npm run test:e2e:ui` | Playwright in interactive UI mode |

## Environment variables

The contact form posts to `/api/contact`. Without these set, the endpoint
returns 501 and the form falls back to opening the visitor's own mail client,
so the site works either way.

| Variable | Required for | Notes |
|---|---|---|
| `RESEND_API_KEY` | Sending mail | From https://resend.com |
| `CONTACT_FROM_EMAIL` | Sending mail | Must be on a domain verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | Nothing (optional) | Overrides the canonical origin |

Set both in Vercel under Project → Settings → Environment Variables. For local
use, put them in `.env.local` (already gitignored). Messages are delivered to
`site.email` with the sender's address as `reply_to`.

## Testing

```bash
npm run test:e2e
```

Playwright builds the app and starts it on port 3100 automatically. The suite
runs against three viewports (desktop, a taller desktop, and mobile) and covers
document semantics, the contact form, the mobile drawer, the scroll-spy, the
GitHub feed's failure paths, and the metadata/SEO routes.

Calls to the GitHub API are stubbed, so the tests are deterministic and do not
consume the 60 requests/hour unauthenticated rate limit.

The `desktop-tall` viewport exists deliberately: a past scroll-spy bug
reproduced at 900px tall but not at Playwright's 720px default.

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`:
lint, typecheck, build and a production-dependency audit in one job, the
Playwright suite in another.

## Project structure

```
src/
  app/
    layout.tsx        Root layout: fonts, metadata, analytics
    page.tsx          Composes the single page (server component)
    globals.css       Tailwind entry + design tokens
    opengraph-image.tsx  Generated 1200x630 social card
    sitemap.ts  robots.ts  SEO route handlers
  components/
    sidebar.tsx       Client: desktop sidebar, mobile drawer, scroll-spy
    section.tsx       Shared <section> + <h2> wrapper
    hero.tsx          Hero banner
    projects.tsx      Featured grid (server)
    github-repos.tsx  Client: live GitHub repo feed
    project-card.tsx  Shared card used by both project lists
    structured-data.tsx  schema.org Person JSON-LD
    skills.tsx  about.tsx  resume.tsx  contact.tsx
  app/api/contact/
    route.ts          Contact form endpoint (Resend)
  lib/
    site.ts           Name, role, email, social links, section order
    projects.ts       Featured project data
e2e/                  Playwright specs
public/
  profile.jpg  Amr_Kalany_CV.pdf
```

Only `sidebar.tsx`, `github-repos.tsx` and `contact.tsx` are client components —
everything else renders on the server.

## Editing content

Most content lives in data files rather than markup:

- **Name, role, specialty, location, email, social links, nav order** —
  `src/lib/site.ts`. The nav labels shown in the sidebar come from the
  `sections` array here; the `id` of each must match the section element in
  `src/app/page.tsx`, which the scroll-spy relies on.
- **Featured projects** — `src/lib/projects.ts`
- **Skills** — the `skillGroups` array in `src/components/skills.tsx`
- **Experience and training** — the `experience` and `training` arrays in
  `src/components/resume.tsx`
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
- The social card at `/opengraph-image` is generated at build time from
  `src/app/opengraph-image.tsx`. Do not add `openGraph.images` to the metadata
  in `layout.tsx`: explicit entries take precedence over the file convention,
  and the portrait profile photo crops badly in a landscape card.
- The sidebar scroll-spy recomputes from scroll and resize events, coalesced to
  one pass per animation frame. It deliberately does **not** use an
  `IntersectionObserver`: an observer fires only when a threshold boundary is
  crossed, so a scroll that crosses none — the tail of a smooth scroll coming to
  rest, or a few pixels of wheel — leaves the highlight on whatever it decided
  mid-scroll. That shipped once and only failed on some viewports. `e2e/navigation.spec.ts`
  guards it; the scrolls in that test are `behavior: "instant"` on purpose,
  because a smooth scroll emits enough events to cross thresholds by itself and
  hides the bug.
- `site.url` feeds `metadataBase`, the sitemap, robots.txt and the JSON-LD. It
  is derived at build time from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so it
  follows the deployment instead of being hardcoded. Set `NEXT_PUBLIC_SITE_URL`
  to override it, for example after attaching a custom domain. Outside Vercel it
  falls back to `http://localhost:3000`.

## Deployment

Deployed on Vercel. Pushes to `main` deploy automatically; any other branch gets
a preview deployment.

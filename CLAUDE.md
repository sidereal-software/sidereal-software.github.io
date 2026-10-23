# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Marketing website for Sidereal Software (https://sidereal.software), an astronomy
software consultancy founded by Dan Avner. Single-page React app deployed to GitHub
Pages via GitHub Actions: `.github/workflows/deploy.yml` deploys `main` on push and
weekly (Mondays), syncs publications from ORCID before building, and fails loudly if
the Pages settings drift; `ci.yml` runs the same checks plus the Playwright e2e job on
branches and PRs.
The custom domain is configured in the repository's Pages settings (authoritative);
`public/CNAME` is kept for reference but ignored by workflow deploys - never delete
either.

## Stack

- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/index.css`, no `tailwind.config`)
- shadcn/ui components, vendored in `src/components/ui/` (the shadcn registry is not
  reachable from all dev environments; add new components by vendoring their source)
- lucide-react icons; Fontsource fonts: Unbounded (display) for headings and
  Monument titles, Hanken Grotesk (body) for everything else
- `@react-spring/web` for micro-motion; every spring config and hook lives in
  `src/lib/motion.ts`
- Playwright + axe for end-to-end checks in `e2e/`

## Commands

- `npm run dev` - dev server
- `npm run build` - type-check and production build
- `npm run lint` - oxlint
- `npm test` - vitest component tests (jsdom + Testing Library)
- `npm run test:e2e` - Playwright against a production preview; run
  `npx playwright install chromium` once first, and set `E2E_PORT` to run two at once
- `npm run sync:publications` - refresh `src/content/publications.generated.json`
  from ORCID
- `npm run format` / `npm run format:check` - Prettier

## Structure

- `src/App.tsx` - assembles the page from section components; the order is the sales
  narrative: Hero (with the institutions row), Services, Work (case studies, career,
  publications), About, Working together (`#process`: steps and FAQ), Contact
- `src/components/sections/` - one file per section
- `src/components/monument.tsx` - the section titles and case-study names, each at a
  fixed clamp size (76px at most); `caps.tsx` keeps mixed-case acronyms (APIs, pyINDI) intact
  inside uppercase text; `image-caption.tsx` captions photos
- `src/content/` - site data: `career.ts` (career and case-study dates, best guesses),
  `images.ts` (every photo and its credit; also feeds the footer), `publications.ts`
  (the hand-picked featured three and profile links)
- `src/components/ui/` - vendored shadcn/ui primitives; keep these unmodified and style
  via className at call sites
- `src/index.css` - Tailwind setup, all theme tokens, and the shared `page-gutter`,
  `section-y`, `label-heading`, and `link-accent` utilities. The site is dark-only:
  `index.html` carries a static `dark` class and there is one token block. To retheme,
  edit the `:root` block only. It passes WCAG AA contrast (checked by axe in
  `e2e/full-page.spec.ts`); re-check contrast when changing tokens.
- `DESIGN.md` - the design system as built: tokens, type, the Monument Scale Rule, the
  Casing Rule, motion, and components. Read it before any UI change and keep it true.

## Content

Site content is factual and about real people and projects. Do not invent projects,
credentials, statistics, or testimonials. Sources of truth: Dan's personal site
(https://www.danavner.com) and direction given in conversation.

- The contact form submits through Formspree via `@formspree/react`; the form ID
  constant lives in `src/components/sections/contact.tsx`. Preserve the `_gotcha`
  honeypot field and the reveal-on-click email (the address is assembled at runtime so
  scrapers never see it).
- The site has no testimonials. Dan's letters of recommendation were written as
  private letters, so never quote them anywhere on the site.
- Analytics is GoatCounter, loaded from a script tag in `index.html`. It sets no
  cookies and collects no personal data, so the site needs no consent banner; keep it
  that way. `src/head.test.ts` guards that tag and the other easily-lost head tags.
- Publications: the list comes from Dan's ORCID record through
  `scripts/sync-publications.js` into `src/content/publications.generated.json`
  (generated; never hand-edit). The deploy re-syncs it and keeps the committed snapshot
  if ORCID fails. The featured three in `publications.ts` are curated by hand.
  `src/lib/orcid.js` stays plain JavaScript so Node runs the script without a build.
- Every photo needs a license that allows commercial use and an entry in
  `src/content/images.ts`; captions give name and location only; each credit, license, and source link appears once, in the footer's Image credits list. CC BY-SA
  photos are shown unaltered (cropping only).
- `public/og.png` is a 1200x630 screenshot of the hero. It is the social
  preview, so regenerate it whenever the hero copy changes or it will advertise stale
  wording.

## Agent skills

- Tracker: none; specs, tickets, and the TODO list are local markdown in `.scratch/` (gitignored). See `docs/agents/issue-tracker.md`.
- Domain docs: glossary at `GLOSSARY.md`, ADRs in `docs/adr/`. See `docs/agents/domain.md`.

## Agent rules

- Never use the em dash. Use plain dash "-" instead.
- Never manually modify auto-generated files.
- When making technical decisions, do not give much weight to development cost. Prefer
  quality, simplicity, robustness, scalability, and long term maintainability.
- For one-off or infrequent operational work, start with the simplest direct end-to-end
  path. Do not build wrappers, control planes, policy layers, custom verifiers, or
  automation unless the direct path exposes a concrete blocker or repeated need.
- When doing bug fixes, always start by reproducing the bug end-to-end, as closely
  aligned with how an end user would experience it as possible.
- When end-to-end testing, be picky about the UI and obsessed with pixel perfection. If
  something clearly looks off, even if unrelated to the current task, try to get it
  fixed along the way.
- Apply the same standard to lint, test failures, and test flakiness: if you see one,
  get it fixed even if you did not cause it.
- Before using dynamic workflows, ultracode, or any harness feature that spawns a large
  swarm of subagents, explain the tradeoffs and ask for explicit approval.

## Git workflow

- Do not commit or push changes unless explicitly instructed.
- Never use `git add .`; stage only the files relevant to the current task.
- Before proposing a commit, run `npm run build`, `npm run lint`, `npm test`,
  `npm run test:e2e`, and `npm run format:check`.
- Show `git status --short` and summarize the staged diff.
- Use Conventional Commits messages (`type(scope): summary`). If a ticket ID appears in
  the branch name or conversation, use it as the scope.
- Commits are authored as Dan Avner <ldpavner@gmail.com>. Never auto-add an agent name
  as a commit co-author or add agent attribution trailers.
- Never amend, rebase, reset, force-push, or delete branches without explicit approval.

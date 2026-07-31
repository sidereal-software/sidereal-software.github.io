# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Marketing website for Sidereal Software (https://sidereal.software), an astronomy
software consultancy founded by Dan Avner. Single-page React app deployed to GitHub
Pages via GitHub Actions (`.github/workflows/deploy.yml`). The custom domain is set by
`public/CNAME`.

## Stack

- Vite + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/index.css`, no `tailwind.config`)
- shadcn/ui components, vendored in `src/components/ui/` (the shadcn registry is not
  reachable from all dev environments; add new components by vendoring their source)
- lucide-react icons, Fontsource fonts following the Solar Dusk theme: Merriweather
  (serif) for large headings, Fira Code (mono) for badges and small labels, Oxanium
  (sans) for body text and mid-size titles

## Commands

- `npm run dev` - dev server
- `npm run build` - type-check and production build (must pass before proposing a commit)
- `npm run lint` - oxlint
- `npm test` - vitest component tests (jsdom + Testing Library)
- `npm run format` / `npm run format:check` - Prettier

## Structure

- `src/App.tsx` - assembles the page from section components, ordered for client
  conversion: hero, trust strip, services, case study, experience, testimonials,
  founder, process, contact
- `src/components/sections/` - one file per section
- `src/components/ui/` - vendored shadcn/ui primitives; keep these unmodified and style
  via className at call sites
- `src/index.css` - Tailwind setup and all theme tokens. The site supports light and
  dark: an inline script in `index.html` applies the `dark` class before first paint
  (stored preference, then system setting) and the header `ThemeToggle` switches it.
  To retheme, edit the `:root` and `.dark` blocks only.
- `public/CNAME` - custom domain; never delete

## Content

Site content is factual and about real people and projects. Do not invent projects,
credentials, statistics, or testimonials. Sources of truth: Dan's personal site
(https://www.danavner.com) and direction given in conversation.

- The contact form submits through Formspree via `@formspree/react`; the form ID
  constant lives in `src/components/sections/contact.tsx`.
- The testimonials section (`src/components/sections/testimonials.tsx`) quotes
  letters of recommendation; the excerpts were approved for public use by Dan.
  Get his approval again before altering a quote or adding a new one.

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
- Before proposing a commit, run `npm run build`, `npm run lint`, `npm test`, and
  `npm run format:check`.
- Show `git status --short` and summarize the staged diff.
- Use Conventional Commits messages (`type(scope): summary`). If a ticket ID appears in
  the branch name or conversation, use it as the scope.
- Commits are authored as Dan Avner <ldpavner@gmail.com>. Never auto-add an agent name
  as a commit co-author or add agent attribution trailers.
- Never amend, rebase, reset, force-push, or delete branches without explicit approval.

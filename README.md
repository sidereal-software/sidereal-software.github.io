# Sidereal Software

Marketing website for [Sidereal Software](https://sidereal.software) - production-quality
astronomy software for observatories, research teams, and scientific institutions.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com)
  components (vendored in `src/components/ui/`)
- Light and dark themes (Solar Dusk palette), WCAG AA contrast in both

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm test         # vitest component tests
npm run lint     # oxlint
npm run format   # prettier
```

CI (`.github/workflows/ci.yml`) runs lint, format check, tests, and the build on every
non-main branch push and every pull request.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs the same checks and
publishes `dist/` to GitHub Pages. Two settings in Settings > Pages are required and
cannot be set by the workflow (they need repo admin): "Source" must be
"GitHub Actions", and "Custom domain" must be `sidereal.software`. With workflow
deploys GitHub ignores the `public/CNAME` file, so the settings are the source of
truth; the deploy fails loudly if they drift.

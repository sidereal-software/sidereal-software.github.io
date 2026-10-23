# Sidereal Software

Marketing website for [Sidereal Software](https://sidereal.software), an astronomy
software consultancy.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with vendored
  [shadcn/ui](https://ui.shadcn.com) components
- Dark-only theme, WCAG AA contrast; Unbounded and Hanken Grotesk via
  [Fontsource](https://fontsource.org); design system recorded in `DESIGN.md`
- [react-spring](https://react-spring.dev) micro-motion, off under reduced motion
- Publications synced from [ORCID](https://orcid.org/0009-0006-3587-3380)
- [GoatCounter](https://www.goatcounter.com) analytics, no cookies or consent banner
  ([dashboard](https://siderealsoftware.goatcounter.com))

## Development

```sh
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm test         # vitest
npm run test:e2e # playwright (run `npx playwright install chromium` once first)
npm run lint     # oxlint
npm run format   # prettier
npm run sync:publications  # refresh the publication list from ORCID
```

CI runs the checks and the e2e suite on every branch push and pull request.

## Deployment

Pushes to `main`, and a weekly run on Mondays, publish `dist/` to GitHub Pages via
`.github/workflows/deploy.yml`. Each deploy first re-syncs publications from ORCID,
keeping the committed snapshot if ORCID is down.
Two admin-only Pages settings are required, and the deploy fails loudly if they drift:
Source = "GitHub Actions", Custom domain = `sidereal.software`. Workflow deploys ignore
`public/CNAME`, so those settings are the source of truth.

# Sidereal Software

Marketing website for [Sidereal Software](https://sidereal.software), an astronomy
software consultancy.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with vendored
  [shadcn/ui](https://ui.shadcn.com) components
- Light and dark themes (Solar Dusk), WCAG AA contrast in both
- [GoatCounter](https://www.goatcounter.com) analytics, no cookies or consent banner
  ([dashboard](https://siderealsoftware.goatcounter.com))

## Development

```sh
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm test         # vitest
npm run lint     # oxlint
npm run format   # prettier
```

CI runs all of these on every branch push and pull request.

## Deployment

Pushes to `main` publish `dist/` to GitHub Pages via `.github/workflows/deploy.yml`.
Two admin-only Pages settings are required, and the deploy fails loudly if they drift:
Source = "GitHub Actions", Custom domain = `sidereal.software`. Workflow deploys ignore
`public/CNAME`, so those settings are the source of truth.

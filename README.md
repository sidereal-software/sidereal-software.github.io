# Sidereal Software

Marketing website for [Sidereal Software](https://sidereal.software) - production-quality
astronomy software for observatories, research teams, and scientific institutions.

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com)
  components (vendored in `src/components/ui/`)
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run lint     # oxlint
npm run format   # prettier
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages. The custom domain (`sidereal.software`) is configured
by `public/CNAME`. The repository's Pages settings must have "Source" set to
"GitHub Actions".

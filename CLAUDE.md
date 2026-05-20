# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro landing page for a tech company website. Stack: Astro 6, Tailwind CSS, shadcn/ui, TypeScript (strict).

## Commands

Use `bun` as the package manager — not npm or npx.

```bash
bun install          # install dependencies
bun run dev          # dev server at localhost:4321
bun run build        # production build to ./dist/
bun run preview      # preview production build
bunx astro add ...   # add Astro integrations (e.g. tailwind, react)
bunx astro check     # TypeScript diagnostics
```

## Adding shadcn components

shadcn/ui requires the `@astrojs/react` integration and `tailwindcss`. Add components via:

```bash
bunx shadcn@latest add <component>
```

Components land in `src/components/ui/`. Import them in `.astro` files using the `client:load` (or `client:visible`) directive since they are React components.

## Architecture

- `src/pages/` — file-based routing; each `.astro` file is a route
- `src/layouts/Layout.astro` — root HTML shell (`<html>`, `<head>`, global meta); wrap pages with `<Layout>`
- `src/components/` — shared Astro and React components; shadcn components live in `src/components/ui/`
- `public/` — static assets served at `/`; files here bypass Astro processing

Pages compose layouts and components. Astro components use the frontmatter fence (`---`) for server-side logic; React components (shadcn) need a `client:*` directive to hydrate in the browser.

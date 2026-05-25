# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro landing page for a tech company website. Stack: Astro 6, Tailwind CSS, shadcn/ui, TypeScript (strict).

## Commands

Use `bun` as the package manager (preferred). `npm` and `npx` are acceptable alternatives.

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

## Import alias

Always use the `@/` alias instead of relative paths when importing files or components.
The alias maps to `src/` and is configured in both `tsconfig.json` and `astro.config.mjs`.

```ts
// ✅ correct
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import { cn } from '@/lib/utils'
import type { SceneProps } from '@/data/storytelling/credential'

// ❌ avoid
import { GridBackground } from '../../../components/storytelling/backgrounds/GridBackground'
import { cn } from '../../../lib/utils'
```

This applies to `.astro`, `.tsx`, `.ts` — all source files.

## Architecture

- `src/pages/` — file-based routing; each `.astro` file is a route
- `src/layouts/Layout.astro` — root HTML shell (`<html>`, `<head>`, global meta); wrap pages with `<Layout>`
- `src/components/` — shared Astro and React components; shadcn components live in `src/components/ui/`
- `public/` — static assets served at `/`; files here bypass Astro processing

Pages compose layouts and components. Astro components use the frontmatter fence (`---`) for server-side logic; React components (shadcn) need a `client:*` directive to hydrate in the browser.

## Troubleshooting display and animation issues

When the user reports that animations, visual effects, or interactive behavior don't work as expected, the cause is often Astro's default static rendering — React components render to HTML on the server and ship no JS unless a `client:*` directive is present.

Reference: https://docs.astro.build/en/reference/directives-reference/#client-directives

| Directive             | When JS loads                   | Use for                                                             |
| --------------------- | ------------------------------- | ------------------------------------------------------------------- |
| `client:load`         | Immediately on page load        | Above-the-fold interactive components                               |
| `client:idle`         | When browser is idle            | Non-critical UI                                                     |
| `client:visible`      | When component enters viewport  | Below-the-fold animations/effects                                   |
| `client:only="react"` | Immediately, skips SSR entirely | Components that break during SSR (e.g. use `window`, WebGL, canvas) |

If an animation or effect works in isolation but breaks on the site, first check whether the component has the right `client:*` directive. `client:only` is the escape hatch for anything that relies on browser APIs unavailable during SSR.

## Content collections

Each Astro content collection is defined in its own file under `src/content-definition/<entity>.ts` and re-exported from `src/content.config.ts`.

```
src/content-definition/
  site.ts            # site-wide JSON config
  services.ts        # service entries
  blogs.ts           # blog posts (MDX)
  founder-quotes.ts  # founder quote MDX entries
```

- Each file exports a named `defineCollection(...)` constant matching the collection key.
- `src/content.config.ts` only imports those exports and re-exports them via `collections`.
- TypeScript shape interfaces (not Zod schemas) live in `src/content-definition/home.ts`.
- When adding a new collection: create `src/content-definition/<entity>.ts`, export the collection, then add it to `collections` in `content.config.ts`.

## Documentation maintenance

Whenever you edit or create files in `src/content-definition/` or `src/data/`, run the **manage-content** skill to keep the reference docs in sync.

Reference docs live in `project-skills/manage-content/references/`. The skill (`project-skills/manage-content/SKILL.md`) describes exactly which reference file maps to which source file and what to update.

Keep the docs accurate — if a field is added, removed, or renamed in the source, the reference doc must reflect that before the task is considered done.

## LLM-generated artifacts

Artifacts produced during AI-assisted sessions (PRDs, plans, research notes, design decisions, conversation summaries) are stored under:

```
docs/artifacts/<type>/yyyy-mm-dd-<topic>.md
```

**Type subdirectories:**

| Type | Contents |
| --- | --- |
| `prd` | Product requirement documents and feature specs |
| `plan` | Implementation plans and architectural decisions |
| `research` | Research notes, reference analysis, technology comparisons |
| `design` | Design decisions, UX notes, visual direction |

**Example:**

```
docs/artifacts/prd/2026-05-23-storytelling-credential.md
docs/artifacts/plan/2026-05-23-scrollytelling-architecture.md
```

When producing an artifact during a session, save it to the appropriate subdirectory. Do not place artifacts directly in `docs/` root.

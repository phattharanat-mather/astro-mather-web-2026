# Mather — Landing Page

A tech company landing page built with Astro 6, Tailwind CSS, shadcn/ui, and TypeScript.

## Stack

- **Astro 6** — file-based routing, content collections, MDX
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — React component library
- **TypeScript** (strict mode)

## Project Structure

```text
/
├── public/                        # Static assets (served as-is)
├── src/
│   ├── assets/                    # Processed images and media
│   ├── components/                # Astro and React components
│   │   └── ui/                    # shadcn/ui components
│   ├── content/                   # MDX content files
│   ├── content-definition/        # Content collection schemas
│   │   ├── blogs.ts
│   │   ├── founder-quotes.ts
│   │   ├── services.ts
│   │   └── site.ts
│   ├── data/                      # Static site data (site.ts, etc.)
│   ├── layouts/
│   │   └── Layout.astro           # Root HTML shell
│   └── pages/                     # File-based routes
└── package.json
```

## Commands

All commands are run from the project root. Use `bun` (preferred) or `npm`.

| Command              | Action                                  |
| :------------------- | :-------------------------------------- |
| `bun install`        | Install dependencies                    |
| `bun run dev`        | Start dev server at `localhost:4321`    |
| `bun run build`      | Build for production to `./dist/`       |
| `bun run preview`    | Preview the production build locally    |
| `bunx astro check`   | Run TypeScript diagnostics              |
| `bunx astro add ...` | Add Astro integrations                  |

> npm equivalents: replace `bun` with `npm` and `bunx` with `npx`.

## Adding shadcn Components

```bash
bunx shadcn@latest add <component>
```

Components are placed in `src/components/ui/`. Use the `client:load` or `client:visible` directive when importing them in `.astro` files.

## Content Collections

Content collections are defined in `src/content-definition/` and registered in `src/content.config.ts`. To add a new collection:

1. Create `src/content-definition/<entity>.ts` with a `defineCollection(...)` export.
2. Import and add it to `collections` in `src/content.config.ts`.

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
├── project-skills/                # Claude Code skills for this project
│   └── manage-content/            # Add/update site content via AI
├── src/
│   ├── assets/                    # Processed images and media
│   ├── components/                # Astro and React components
│   │   └── ui/                    # shadcn/ui components
│   ├── content/                   # MDX content files
│   ├── content-definition/        # Content collection schemas
│   ├── data/                      # Static site data (site.ts, etc.)
│   ├── layouts/
│   │   └── Layout.astro           # Root HTML shell
│   └── pages/                     # File-based routes
└── package.json
```

## Commands

All commands are run from the project root. Use `bun` (preferred) or `npm`.

| Command              | Action                               |
| :------------------- | :----------------------------------- |
| `bun install`        | Install dependencies                 |
| `bun run dev`        | Start dev server at `localhost:4321` |
| `bun run build`      | Build for production to `./dist/`    |
| `bun run preview`    | Preview the production build locally |
| `bunx astro check`   | Run TypeScript diagnostics           |
| `bunx astro add ...` | Add Astro integrations               |

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

## Project Skills (Claude Code)

This project ships Claude Code skills in `project-skills/`. Skills are in-repo instructions that tell an AI agent exactly how to handle specific tasks — they load automatically when relevant, so you can ask Claude to do things in plain language without explaining the project structure each time.

### Available skills

| Skill            | What it does                                                                                                                                                                                                                        |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `manage-content` | Add or update any site content — blog posts, projects, services, testimonials, clients, announcements, value props, credential pages, or site config. Just ask Claude: _"add a blog post about X"_ or _"update the services list"_. |

### Installing / updating skills

After pulling changes that touch `project-skills/`, re-install to pick up the latest versions:

```bash
bunx skills@1.5.0 add ./project-skills -a 'universal' -a 'claude-code' -y -p
```

### Updating a skill

Skills are living docs — update them alongside the code they describe. If you change a content schema or add a new collection, update the matching reference doc in `project-skills/manage-content/references/` and, if the collection is new, add a row to the routing table in `project-skills/manage-content/SKILL.md`.

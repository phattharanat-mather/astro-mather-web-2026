# How to add a project

Projects appear in the **Platform Solutions** section on the home page, filterable by category tab.

## File location

```
src/content/projects/<yyyy>/<slug>/index.mdx
```

Projects are grouped by year. The full path `yyyy/slug` becomes the entry's ID and the detail page URL (`/projects/yyyy/slug`).

## Frontmatter fields

| Field        | Type       | Required | Description                                                    |
| ------------ | ---------- | -------- | -------------------------------------------------------------- |
| `title`      | `string`   | yes      | Project name shown on the card                                 |
| `year`       | `number`   | yes      | Project year (e.g. `2026`)                                     |
| `categories` | `string[]` | yes      | One or more tab keys (e.g. `["web", "ai"]`)                    |
| `image`      | image      | no       | Co-located image file processed by Astro's image pipeline      |
| `featured`   | `boolean`  | no       | If `true`, card links to `/projects/<yyyy>/<slug>`             |
| `archived`   | `boolean`  | no       | If `true`, project is hidden from the portfolio grid           |

## Valid category keys

The tabs are defined in `src/data/project-categories.ts`:

| Key        | Label                    |
| ---------- | ------------------------ |
| `web`      | Web Application          |
| `mobile`   | Mobile Application       |
| `strategy` | Strategy & Data-Driven   |
| `ai`       | AI                       |

A project with multiple categories appears in each matching tab.

## Adding a cover image

The `image` field uses Astro's `image()` schema helper — the image is processed and optimized at build time.

**Where to place the file:** inside an `images/` subfolder within the project folder:

```
src/content/projects/2026/my-project/
├── index.mdx
└── images/
    └── cover.jpg
```

**How to reference it in frontmatter:** use a path relative to `index.mdx`:

```mdx
---
title: "My Project"
year: 2026
categories: ["web", "ai"]
image: "./images/cover.jpg"
---
```

> Do not use a `/public` path (e.g. `/images/...`). The `image()` helper only works with co-located files referenced by relative path.

## Example

```
src/content/projects/2026/my-project/index.mdx
```

```mdx
---
title: "My Project"
year: 2026
categories: ["web", "ai"]
---
```

## Linking to a project detail page

Set `featured: true` to make the card link to `/projects/yyyy/slug` and show a "Read more →" hint. The detail page is generated automatically by `src/pages/projects/[...slug].astro`.

```mdx
---
title: "My Project"
year: 2026
categories: ["web", "ai"]
featured: true
---
```

## Hiding a project

Set `archived: true` to remove a project from the portfolio grid without deleting the file.

## Adding a new tab

Append an entry to `src/data/project-categories.ts`:

```ts
{ label: "New Category", key: "new-key" }
```

Then use `"new-key"` as a category in any project MDX file.

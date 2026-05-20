# How to add a project

Projects appear in the **Platform Solutions** section on the home page, filterable by category tab.

## File location

```
src/content/projects/<slug>/index.mdx
```

Each project lives in its own directory. The directory name becomes the entry's ID.

## Frontmatter fields

| Field        | Type       | Required | Description                                      |
| ------------ | ---------- | -------- | ------------------------------------------------ |
| `title`      | `string`   | yes      | Project name shown on the card                   |
| `categories` | `string[]` | yes      | One or more tab keys (e.g. `["web", "ai"]`)      |
| `image`      | `string`   | no       | Path to a co-located image asset                 |

## Valid category keys

The tabs are defined in `src/data/project-categories.ts`:

| Key        | Label                    |
| ---------- | ------------------------ |
| `web`      | Web Application          |
| `mobile`   | Mobile Application       |
| `strategy` | Strategy & Data-Driven   |
| `ai`       | AI                       |

A project with multiple categories appears in each matching tab.

## Example

```
src/content/projects/my-project/index.mdx
```

```mdx
---
title: "My Project"
categories: ["web", "ai"]
---
```

## Adding a new tab

To add a new category tab, append an entry to `src/data/project-categories.ts`:

```ts
{ label: "New Category", key: "new-key" }
```

Then use `"new-key"` as a category in any project MDX file.

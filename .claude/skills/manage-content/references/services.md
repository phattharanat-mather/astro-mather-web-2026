# How to Add a Service

Services live in `src/content/services/`. Each service is a single `.mdx` file — no folder needed.

## File structure

```
src/content/services/
├── 01-ai-technology.mdx
├── 02-data-research.mdx
└── 07-your-new-service.mdx   ← new file
```

Naming convention: `<index>-<slug>.mdx` where index is zero-padded (e.g. `07`).

## Frontmatter fields

```mdx
---
index: "07"                    # required — display number shown in the card (e.g. "07")
title: Your Service Title      # required — displayed as the service heading
---
```

Both fields are required.

## Body content

Write a plain description paragraph below the frontmatter. This text appears as the service body copy. One to three sentences is typical.

```mdx
---
index: "07"
title: Cloud Infrastructure
---

Design, deploy, and manage scalable cloud environments tailored to your workload. We handle architecture, cost optimisation, and ongoing operations so your team can focus on building.
```

## Display order

Services are listed in the order they appear when sorted by filename. Keep the numeric prefix in sync with the `index` frontmatter field so the display number matches the file order.

## No image attachments

Services are text-only entries — the schema does not include an image field. If you need to associate visuals, add them as static assets in `public/` and reference them from the component that renders the service section.

## Checklist

- [ ] Filename follows `<index>-<slug>.mdx` pattern
- [ ] `index` and `title` are set in frontmatter
- [ ] `index` value matches the numeric prefix in the filename
- [ ] Body copy is concise (1–3 sentences)

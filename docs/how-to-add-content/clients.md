# How to Add a Client

Clients live in `src/content/clients/<year>/`. Each client is a single `.mdx` file inside a year folder.

## File structure

```
src/content/clients/
├── 2023/
│   ├── 01-nexlayer.mdx
│   └── 02-finbridge.mdx
├── 2024/
│   └── 01-datasphere.mdx
└── 2025/
    └── 04-acme-corp.mdx   ← new file
```

The year folder determines the year group. Naming convention: `<index>-<slug>.mdx` where index is zero-padded and **restarts from `01` within each year folder**. Display order is derived from the filename — no `index` frontmatter needed.

## Frontmatter fields

```mdx
---
name: Acme Corp                  # required — displayed in the marquee chip
logo: /images/clients/acme.svg   # optional — path to logo asset in public/
---
```

No body content is used.

## Display order

Clients are sorted by their full path (`<year>/<filename>`), so they appear year-first (ascending), then by filename order within each year.

## Section heading and intro

"Our Clients" and "We take care of" are **not** in the collection — edit them in `src/data/home.ts` under the `clients` export.

## Checklist

- [ ] File is inside the correct `src/content/clients/<year>/` folder
- [ ] Filename follows `<index>-<slug>.mdx` pattern, with index starting from `01` within the year
- [ ] `name` is set in frontmatter
- [ ] If adding a logo, the asset exists in `public/` and the path is correct

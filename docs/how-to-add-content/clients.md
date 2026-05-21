# How to Add a Client

Clients live in `src/content/clients/`. Each client is a single `.mdx` file directly in that folder, with its logo image in `src/content/clients/logos/`.

## File structure

```
src/content/clients/
├── logos/
│   ├── singha.png
│   └── haier.png
├── singha.mdx
└── haier.mdx        ← new file
```

## Frontmatter fields

```mdx
---
name: Acme Corp                    # required — displayed in the marquee chip
year: 2025                         # optional — client relationship year
logo: ./logos/acme.png             # optional — relative path to logo in logos/
---
```

No body content is used.

## Adding a logo

Place the logo image in `src/content/clients/logos/` then reference it with a relative path (`./logos/<filename>`) in the `logo` field. Astro will optimise it at build time.

## Display order

Clients are sorted alphabetically by filename. Prefix the filename with a number (e.g. `01-singha.mdx`) if you need explicit ordering.

## Section heading and intro

"Our Clients" heading and intro text are configured in `src/data/home.ts` under the `clients` export.

## Checklist

- [ ] MDX file is directly in `src/content/clients/` (no year subfolder)
- [ ] `name` is set in frontmatter
- [ ] If adding a logo, the image is in `src/content/clients/logos/` and the `logo` path is correct

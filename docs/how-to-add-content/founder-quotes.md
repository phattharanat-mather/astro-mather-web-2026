# How to Add a Founder Quote

Founder quotes live in `src/content/founder-quotes/`. Each entry is a folder containing an `index.mdx` file and an optional portrait image.

## Folder structure

```
src/content/founder-quotes/
└── firstname-lastname-initial/
    ├── index.mdx        ← required
    └── image.png        ← optional portrait photo
```

Use a short, unique slug for the folder name (e.g. `somprasonk-g`).

## Frontmatter fields

```mdx
---
name: "Full Name"          # required — displayed as the speaker's name
role: "Founder / MD"       # required — displayed below the name
order: 1                   # required — controls display order (lower = earlier)
image: "./image.png"       # optional — path relative to this folder
featured: true             # optional — whether to highlight this quote
---
```

## Body content

Write the quote text below the frontmatter. Keep it to 1–3 sentences — it's meant to be a focused statement, not a long paragraph.

```mdx
---
name: "Somprasong Kaewsakulthong"
role: "Founder / MD"
order: 1
image: "./image.png"
featured: true
---

The world moves faster than ever — more complex, more unpredictable. AI and data science aren't just tools; they're how modern businesses make confident decisions and stay ahead of rapidly shifting consumer behavior.
```

## Adding a portrait image

1. Place the image in the entry's folder (recommended filename: `image.png` or `image.webp`).
2. Set `image: "./image.png"` in frontmatter.
3. Astro processes this through its image pipeline — use a high-quality original (at least 400×400 px); Astro will optimise it at build time.

> The `image` field uses Astro's `image()` helper, so the path **must** be relative (`./image.png`), not an absolute or public path.

## Controlling display order

The `order` field is a number. Entries are sorted ascending — `order: 1` appears first. If adding a second quote, use `order: 2`, and so on.

## Checklist

- [ ] Folder name is lowercase, hyphen-separated
- [ ] `index.mdx` exists inside the folder
- [ ] `name`, `role`, and `order` are set in frontmatter
- [ ] Portrait image (if included) is inside the same folder and referenced with `./`

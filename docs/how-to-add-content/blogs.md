# How to Add a Blog Post

Blog posts live in `src/content/blogs/`. Each post is a folder containing an `index.mdx` file and any attached images.

## Folder structure

```
src/content/blogs/
└── your-post-slug/
    ├── index.mdx        ← required
    └── cover.png        ← optional image attachment
```

The folder name becomes the post's URL slug: `your-post-slug` → `/blogs/your-post-slug`.

## Frontmatter fields

```mdx
---
title: "Your Post Title"           # required — displayed as the page heading
date: 2026-05-20                   # required — ISO date (YYYY-MM-DD)
excerpt: "One-sentence summary."   # optional — used in blog listing cards
image: "./cover.png"               # optional — path relative to this folder
author: "The Mather Team"          # optional — displayed below the title
---
```

All fields except `title` and `date` are optional.

## Body content

Write standard Markdown below the frontmatter fence. MDX is supported, so you can import and use Astro/React components if needed.

```mdx
---
title: "Example Post"
date: 2026-05-20
excerpt: "A short description shown in previews."
author: "The Mather Team"
---

Intro paragraph here.

## Section heading

More content. Use **bold**, _italic_, and standard Markdown as needed.

---

Call-to-action line at the bottom. [Contact us](#contact) to discuss.
```

## Adding images

1. Place the image file inside the post's folder (e.g. `cover.png`, `diagram.webp`).
2. Reference it in frontmatter with a relative path: `image: "./cover.png"`.
3. To embed images inline in the body, use standard Markdown: `![Alt text](./diagram.webp)`.

> Images referenced from the body are served as static assets. Prefer `.webp` or `.png` for web quality.

## Checklist

- [ ] Folder name is lowercase, hyphen-separated (no spaces or special characters)
- [ ] `index.mdx` exists inside the folder
- [ ] `title` and `date` are set in frontmatter
- [ ] Image files (if any) are inside the same folder and referenced with `./`

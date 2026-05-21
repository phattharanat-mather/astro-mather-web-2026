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
image: "cover.png"                 # optional — filename of a co-located image (no path prefix needed)
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

### Cover image (frontmatter `image`)

The `image` field is processed by Astro's image optimization pipeline (`image()` schema helper). Rules:

1. Place the image **directly inside the post's folder** — no subdirectories (e.g. `src/content/blogs/your-post/cover.png`).
2. Reference it by **filename only** — no path prefix: `image: "cover.png"`.
3. The image is displayed as a full-width cover banner above the article body.

### Inline images (body)

To embed images inside the MDX body, import them at the top of the file and use an `<img>` tag or Astro's `<Image>` component:

```mdx
import cover from './cover.png';
import diagram from './diagram.webp';

<img src={cover.src} alt="Cover" />
```

> Prefer `.webp` or `.png`. Inline images imported this way are also processed by Vite and benefit from hashing/caching.

## Checklist

- [ ] Folder name is lowercase, hyphen-separated (no spaces or special characters)
- [ ] `index.mdx` exists inside the folder
- [ ] `title` and `date` are set in frontmatter
- [ ] Cover image (if any) is placed directly in the post folder and referenced by filename only (no `./` prefix)
- [ ] Inline body images are imported at the top of the MDX file and used via `{image.src}`

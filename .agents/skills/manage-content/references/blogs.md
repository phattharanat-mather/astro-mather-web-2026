# How to Add a Blog Post

Blog posts live in `src/content/blogs/`. Each post is a folder containing an `index.mdx` file and any images placed alongside it.

## Folder structure

```
src/content/blogs/
└── your-post-slug/
    ├── index.mdx              ← required
    ├── cover.png              ← cover image (frontmatter image:)
    ├── diagram.png            ← body image (markdown or import)
    └── ...
```

The folder name becomes the post's URL slug: `your-post-slug` → `/blogs/your-post-slug`.

## Frontmatter fields

```mdx
---
title: "Your Post Title"           # required
date: 2026-05-20                   # required — ISO date (YYYY-MM-DD)
excerpt: "One-sentence summary."   # optional — shown in listing cards
image: "./cover.png"               # optional — cover image (see rules below)
author: "The Mather Team"          # optional — shown below the title
---
```

## Adding images

### Cover image (frontmatter `image`)

The `image` field is processed by Astro's `image()` schema helper, which resolves it to `ImageMetadata` at build time.

**Rules:**
- The image **must be in the same folder as `index.mdx`** — subdirectories do not work with the schema helper.
- The path **must start with `./`**: `image: "./cover.png"`.
- The cover is displayed as a full-width banner above the article body.

```
your-post-slug/
├── index.mdx
└── cover.png    ← image: "./cover.png"  ✓
```

```
your-post-slug/
├── index.mdx
└── images/
    └── cover.png    ← image: "./images/cover.png"  ✗  won't resolve
```

### Body images

Two valid approaches — both work with Astro 6's MDX pipeline.

**Option A — Markdown syntax (simplest):**

```mdx
![A snowy village scene](./diagram.png)
```

Astro's remark pipeline imports and optimises the image automatically. No imports needed.

**Option B — ESM import with `<Image>`:**

```mdx
import { Image } from 'astro:assets';
import diagram from './diagram.png';

<Image src={diagram} alt="A snowy village scene" style="border-radius: 8px;" />
```

Pass the import directly to `src` — **not** `diagram.src`. `<img src={diagram.src}>` will throw `LocalImageUsedWrongly` in Astro 6 because `.src` is a plain string.

## Full example

```mdx
---
title: "Stable Diffusion QR Codes"
date: 2026-05-15
excerpt: "How ControlNet hides scannable codes inside artwork."
author: "The Mather Team"
image: "./cover.png"
---

import { Image } from 'astro:assets';
import diagram from './diagram.png';

Intro paragraph here.

![A snowy village QR code](./photo.png)

<Image src={diagram} alt="ControlNet diagram" style="border-radius: 8px;" />

## Section heading

More content.
```

## Checklist

- [ ] Folder name is lowercase and hyphen-separated
- [ ] `index.mdx` exists inside the folder
- [ ] `title` and `date` are set in frontmatter
- [ ] Cover image (if any) is in the **same folder** as `index.mdx` and referenced with `./` prefix
- [ ] Body images use markdown `![alt](./img.png)` or `<Image src={importedImg} />` — not `<img src={img.src}>`

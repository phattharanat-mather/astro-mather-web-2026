# How to Use Images in Astro MDX Content

Applies to all four collections: `blogs`, `founder-quotes`, `projects`, `splash-modals`.

---

## Folder structure

Each entry is a folder containing `index.mdx`. Place images alongside it or inside an `images/` subdirectory:

```
your-entry-slug/
├── index.mdx
├── cover.png          ← frontmatter image (must be a sibling)
└── images/
    ├── diagram.png    ← body image (markdown or import)
    └── photo.jpg      ← body image (markdown or import)
```

> Both sibling paths (`./cover.png`) and subdirectory paths (`./images/cover.png`) resolve correctly for the frontmatter `image` field. Place images wherever keeps the folder tidy.

---

## Frontmatter image field

All four collections expose an optional `image` field processed by Astro's `image()` schema helper.

```mdx
---
image: "./cover.png"
---
```

**Requirements:**
- Path must start with `./`
- File must be a **direct sibling** of `index.mdx` — not inside `images/` or any subfolder

| Collection | Field | What it renders |
|---|---|---|
| `blogs` | `image` | Full-width cover banner above the article |
| `founder-quotes` | `image` | Founder's headshot |
| `projects` | `image` | Project thumbnail card |
| `splash-modals` | `image` | Modal illustration |

**Both of these work:**
```
your-entry-slug/
├── index.mdx
└── cover.png               ← image: "./cover.png"  ✓

your-entry-slug/
├── index.mdx
└── images/
    └── cover.png           ← image: "./images/cover.png"  ✓
```

---

## Body images (inline in MDX)

Body images are written inside the MDX content, below the frontmatter fence. They work in `blogs` and `splash-modals` (collections with rich body content).

Body images **can** live in `images/` subdirectories — the MDX remark pipeline resolves relative paths freely.

### Option A — Markdown syntax (simplest)

```mdx
![A snowy village scene](./photo.jpg)
![ControlNet diagram](./images/diagram.png)
```

Astro's remark pipeline imports and optimises the image automatically. No imports needed.

### Option B — ESM import with `<Image>` (more control)

Use this when you need extra props: explicit `width`/`height`, `style`, `class`, `loading`, etc.

```mdx
import { Image } from 'astro:assets';
import diagram from './images/diagram.png';
import photo from './photo.jpg';

<Image src={diagram} alt="ControlNet diagram" style="border-radius: 8px;" />
<Image src={photo} alt="A snowy village scene" width={800} />
```

Pass the import directly to `src` — **not** `.src`. Using `<img src={diagram.src}>` throws `LocalImageUsedWrongly` in Astro 6 because `.src` is a plain string, not `ImageMetadata`.

---

## Quick reference

| Use case | Path location | Syntax |
|---|---|---|
| Frontmatter cover/photo | Sibling or `images/` subdir | `image: "./file.png"` or `image: "./images/file.png"` |
| Body image (simple) | Sibling or `images/` subdir | `![alt](./images/file.png)` |
| Body image (with props) | Sibling or `images/` subdir | `import img from './images/file.png'` then `<Image src={img} alt="..." />` |

---

## Checklist

- [ ] Frontmatter `image` path starts with `./` and points to a file inside the entry folder (sibling or subdirectory)
- [ ] Body images use `![alt](./path)` or `<Image src={importedVar} />` — not `<img src={img.src}>`
- [ ] Imports appear at the top of the file, after the closing `---` of frontmatter and before any prose

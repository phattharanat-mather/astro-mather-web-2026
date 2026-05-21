# How to Add a Splash Modal

Splash modals live in `src/content/splash-modals/`. Each modal is a folder containing an `index.mdx` file and any co-located images.

## Folder structure

```
src/content/splash-modals/
└── your-modal-slug/
    ├── index.mdx        ← required
    └── cover.jpg        ← optional co-located image
```

The folder name is the entry ID (used internally; not shown to visitors).

## Frontmatter fields

```mdx
---
active: true                       # required — set false to hide without deleting
order: 1                           # optional — lower number shows first when multiple are active
title: "Your Modal Title"          # optional — displayed as the modal heading
image: "./cover.jpg"               # optional — path relative to this folder
size: large                        # optional — "small" (max-w-lg) | "large" (max-w-2xl); default small
card3d: false                      # optional — enable Aceternity 3D card effect; default false
variant: image-left                # optional — layout variant (see below)
---
```

Only `active` is required.

### Layout variants (`variant`)

| Value | Description |
|---|---|
| `image-top` | Image spans the full width above the text (default when image is set) |
| `image-left` | Image on the left, text on the right (side-by-side) |
| `image-right` | Text on the left, image on the right (side-by-side) |
| `image-only` | Full-bleed image with no text area |
| `text-only` | No image rendered even if `image` is set |

If `variant` is omitted the component chooses a sensible default.

## Body content

Write standard Markdown below the frontmatter fence. This becomes the modal body copy. MDX is supported.

```mdx
---
active: true
order: 1
title: "Mather 2026 — New Heights, New Capabilities"
image: "./matterhorn-vert.jpg"
size: large
card3d: true
variant: image-left
---

We're expanding our practice in **AI Engineering**, **Data Strategy**, and **Digital Transformation** for 2026.

Whether you're building your first data pipeline or scaling an enterprise AI platform — let's talk about what's possible.
```

## Showing / hiding a modal

- To show a modal: set `active: true`.
- To hide a modal without deleting it: set `active: false`.
- Only one modal should have `active: true` at a time unless the display logic is designed for multiple.

## Checklist

- [ ] Folder name is lowercase, hyphen-separated (no spaces or special characters)
- [ ] `index.mdx` exists inside the folder
- [ ] `active` is set in frontmatter
- [ ] Image file (if any) is co-located in the same folder and referenced with `./` (e.g. `image: "./cover.jpg"`)
- [ ] `size` and `variant` are set when a non-default layout is needed

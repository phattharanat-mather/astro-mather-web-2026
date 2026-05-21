# How to add credential pages

Credential pages power the `/credential` section. The index at `/credential` lists all visible pages with a **Present** button that jumps to slide 1. Each slide at `/credential/<slug>` has prev/next navigation and a sidebar page list. Keyboard arrow keys also navigate between slides.

## File structure

```
src/content/credential-pages/
  001-introduction/
    index.mdx
  002-our-approach/
    index.mdx
    diagram.png        ← attachments live alongside index.mdx
```

- The folder name prefix (`001`, `002`, …) sets the sort order.
- The suffix after the first `-` is a human-readable slug used in the URL: `/credential/001-introduction`.

## Frontmatter

```mdx
---
title: Introduction       # required — shown in sidebar and browser title
hide: true                # optional — exclude this page from navigation
---
```

| Field  | Type    | Required | Description                                  |
|--------|---------|----------|----------------------------------------------|
| title  | string  | yes      | Display name in sidebar, top bar, and nav    |
| hide   | boolean | no       | Set `true` to remove from the presentation   |

## Adding a new page

1. Create a folder: `src/content/credential-pages/<NNN>-<slug>/`
2. Add `index.mdx` with at minimum a `title` frontmatter field.
3. Place any images or attachments in the same folder and import them in the MDX file.

## Using images

```mdx
---
title: Our Work
---

import cover from './cover.png';
import { Image } from 'astro:assets';

<Image src={cover} alt="Our work overview" />
```

See `docs/how-to-add-content/how-to-use-image-with-astro-mdx.md` for more detail.

## Hiding a page

Add `hide: true` to the frontmatter. The page will be excluded from the sidebar, dot indicators, and keyboard navigation — but the URL still exists and the file is still built.

# How to Add a Value Proposition

Value props live in `src/content/value-props/`. Each item is a single `.mdx` file.

## File structure

```
src/content/value-props/
├── 01-budget-control.mdx
├── 02-streamlined-workflow.mdx
└── 04-your-new-prop.mdx   ← new file
```

Naming convention: `<index>-<slug>.mdx` where index is zero-padded (e.g. `04`).

## Frontmatter fields

```mdx
---
index: "04"                            # required — controls display order
title: Your Value Prop Title           # required — card heading
description: One sentence summary.    # required — card body copy
---
```

All three fields are required. No body content is used.

## Section heading and tagline

The section heading ("We Help Grow Your Business") and intro ("Practical solutions that move the needle.") are **not** in the collection — edit them in `src/data/home.ts` under the `valueProps` export.

## Display order

Cards are sorted by `index` in ascending order. Keep the numeric prefix in the filename in sync with the `index` field.

## Checklist

- [ ] Filename follows `<index>-<slug>.mdx` pattern
- [ ] `index`, `title`, and `description` are set in frontmatter
- [ ] `index` matches the numeric prefix in the filename
- [ ] `description` is one concise sentence

# manage-content

Keep content documentation in sync whenever a content collection schema or site data file changes.

## Trigger

Invoke this skill when any of the following files are edited or created:

| Source changed | Reference to update |
| --- | --- |
| `src/content-definition/announcements.ts` | `references/announcements.md` |
| `src/content-definition/blogs.ts` | `references/blogs.md` |
| `src/content-definition/clients.ts` | `references/clients.md` |
| `src/content-definition/credential-pages.ts` | `references/credential-pages.md` |
| `src/content-definition/projects.ts` | `references/projects.md` |
| `src/content-definition/services.ts` | `references/services.md` |
| `src/content-definition/testimonials.ts` | `references/testimonials.md` |
| `src/content-definition/value-props.ts` | `references/value-props.md` |
| `src/content-definition/<new-entity>.ts` | `references/<new-entity>.md` (create) |
| `src/data/site.ts` | `references/how-to-config-site.md` |
| `src/data/home.ts` | `references/how-to-config-site.md` |

## What to do

1. **Read the changed source file** (`src/content-definition/<entity>.ts` or `src/data/*.ts`) to understand what fields were added, removed, or renamed.

2. **Read the corresponding reference doc** (`references/<entity>.md` or `references/how-to-config-site.md`) so you know what the doc currently says.

3. **Update the reference doc** to reflect the source changes:
   - Add new fields to the frontmatter table with type, required status, and a clear description.
   - Remove or rename fields that no longer exist.
   - Update any example snippets to match the current schema.
   - Keep the writing style consistent with the rest of the file — concise, imperative, developer-facing.

4. **Create the reference doc** if it doesn't exist yet (new collection). Follow the structure of an existing reference (e.g. `references/services.md`) as a template.

5. Do **not** update `CLAUDE.md` — the trigger table there points to this skill, not to individual docs.

## Reference docs overview

```
references/
  announcements.md            ← src/content-definition/announcements.ts
  blogs.md                    ← src/content-definition/blogs.ts
  clients.md                  ← src/content-definition/clients.ts
  credential-pages.md         ← src/content-definition/credential-pages.ts
  how-to-config-site.md       ← src/data/site.ts + src/data/home.ts
  how-to-use-image-with-astro-mdx.md  ← general image guide (no schema source)
  projects.md                 ← src/content-definition/projects.ts
  services.md                 ← src/content-definition/services.ts
  testimonials.md             ← src/content-definition/testimonials.ts
  value-props.md              ← src/content-definition/value-props.ts
```

`how-to-use-image-with-astro-mdx.md` is not tied to a schema — only update it when Astro's image API itself changes or a new pattern is established.

## Checklist before finishing

- [ ] All added/removed/renamed fields are reflected in the reference doc
- [ ] Example frontmatter snippets in the doc compile with the current schema
- [ ] If a new collection was added, its reference file exists and is linked in this skill's trigger table above
- [ ] No leftover references to deleted fields remain in the doc

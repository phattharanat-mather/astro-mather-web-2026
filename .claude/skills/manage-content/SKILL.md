---
name: manage-content
description: Guide for adding or updating site content — blog posts, projects, services, testimonials, clients, announcements, value props, credential pages, and site configuration. Use this skill whenever the user wants to add, edit, remove, or ask how to manage any piece of content on the site, even if they don't use those exact words (e.g. "add a new case study", "update our services list", "post an announcement", "change the site name").
---

# manage-content

This skill helps you add and update content on The Mather website. Each content type has its own reference doc with the exact file structure, frontmatter fields, and rules to follow.

## Content type → reference doc

| What the user wants to manage | Read this reference |
| --- | --- |
| Blog posts | `references/blogs.md` |
| Projects (portfolio / case studies) | `references/projects.md` |
| Services | `references/services.md` |
| Testimonials | `references/testimonials.md` |
| Clients (logo wall) | `references/clients.md` |
| Announcements | `references/announcements.md` |
| Value propositions | `references/value-props.md` |
| Credential / presentation slides | `references/credential-pages.md` |
| Site name, contact, social links, nav | `references/how-to-config-site.md` |
| Images inside MDX files | `references/how-to-use-image-with-astro-mdx.md` |

## How to use this skill

1. **Identify the content type** from what the user is asking.
2. **Read the matching reference doc** — it has the file location, required frontmatter fields, naming conventions, and examples.
3. **Create or edit the file** as described in that reference.
4. If the user is adding an image, also check `references/how-to-use-image-with-astro-mdx.md` for image rules.

## Keeping the skill in sync

If you change a schema file under `src/content-definition/` or a data file under `src/data/`, update the corresponding reference doc in `references/` so it stays accurate. See `CLAUDE.md` → "Documentation maintenance" for the full checklist.

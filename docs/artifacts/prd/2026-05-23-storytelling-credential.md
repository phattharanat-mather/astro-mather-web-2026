# Storytelling Page — PRD

**Route:** `/storytelling/<topic>` (current: `/storytelling/credential`)
**Branch:** `feature/story-telling`
**Status:** Planning — approved for implementation
**Date:** 2026-05-23
**Last updated:** 2026-05-23

---

## Table of Contents

1. [Overview](#1-overview)
2. [Goals](#2-goals)
3. [Interaction Model](#3-interaction-model--scrollytelling)
4. [Design Decisions](#4-design-decisions)
5. [Content Structure — 6 Scenes](#5-content-structure--6-scenes)
6. [File Structure](#6-file-structure)
7. [Technology Choices](#7-technology-choices)
8. [Astro vs React Decision](#8-astro-vs-react-decision)
9. [Responsive Behaviour](#9-responsive-behaviour)
10. [Page Shell](#10-page-shell)
11. [Chapter Navigation (ToC)](#11-chapter-navigation-toc)
12. [Out of Scope (v1)](#12-out-of-scope-v1)
13. [Open Questions](#13-open-questions)

---

## 1. Overview

An interactive, scroll-driven storytelling page that presents The Mather's company profile — methodology, services, tech stack, clients, and projects — as a narrative experience rather than a static brochure.

**Reference inspiration:** [FT Quantum Computing interactive](https://ig.ft.com/quantum-computing/)
**Source material:** `_references/Company Profile THE MATHER_2026.pdf` (screenshots in `_references/screenshots-presentation/`)

The page system is **multi-topic**: each topic lives at `/storytelling/<topic>`. The first topic is **`credential`** — the company credential deck.

---

## 2. Goals

- Convert the company presentation PDF into an engaging, web-native story
- Give prospects/clients a memorable, differentiated "About us" experience
- Showcase the company's technical sophistication through the medium itself
- Surface all existing project assets and client logos in context
- Allow the user to **skip directly to any chapter** via an in-page table of contents

---

## 3. Interaction Model — Scrollytelling

The page is divided into **two columns**:

```
┌─────────────────────┬──────────────────────────────┐
│                     │                              │
│   STORY (left)      │   ASSET PANEL (right)        │
│                     │                              │
│  Narrative text     │  position: sticky; top: 0    │
│  scrolls normally   │  height: 100vh               │
│                     │                              │
│  Each "step" block  │  Transitions to new visual   │
│  acts as a waypoint │  when step enters viewport   │
│                     │                              │
└─────────────────────┴──────────────────────────────┘
```

**Scroll mechanics:**

- `IntersectionObserver` watches each story step block
- When a step enters the viewport (threshold ~40%), the active scene index updates
- The sticky right panel cross-fades to the corresponding visual asset
- Asset transitions use `motion/react` (`AnimatePresence` + `motion.div`)
- On mobile: columns stack vertically; asset appears above its corresponding text step

**Chapter skip navigation:**

- A floating chapter nav (dots or labelled list) overlays the left edge or top
- Clicking a chapter label smooth-scrolls to that step's anchor (`#scene-001`, `#scene-002`, …)
- The active chapter is highlighted as the user scrolls

---

## 4. Design Decisions

| Decision              | Choice                                                         | Rationale                                                                                                   |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Story column position | **Left**                                                       | Classic FT/editorial convention; natural reading flow                                                       |
| Asset panel position  | **Right sticky**                                               | Visuals anchor while text scrolls                                                                           |
| Color theme           | **Full-bleed light / editorial**                               | White background, newspaper feel — deliberately distinct from the dark main site to signal a different mode |
| Navigation            | **Standalone — no site Nav**                                   | Immersive experience; subtle back-arrow only                                                                |
| Typography feel       | Editorial — generous line-height, serif accent for pull quotes | Matches the "story" framing                                                                                 |
| Chapter skip nav      | **Yes — floating ToC**                                         | User requested; allows non-linear reading                                                                   |
| Scene component names | **3-digit numbered — `Scene001Intro`, `Scene002Methodology`, …** | Keeps folder sort correct up to 999 scenes; consistent with anchor IDs (`#scene-001`) |
| Component location    | `src/components/storytelling/<topic>/`                         | Topic-scoped; clean separation when more topics are added                                                   |
| Scene tech            | **React** (not Astro)                                          | Scenes live inside the React tree; need Motion animations + shared scroll state. See §8.                    |
| Scene content         | **Hardcoded inside each scene component**                      | Left column copy + right panel visual both live in the same `.tsx` file; no MDX or external data file for content |
| Scene loading         | **`React.lazy()` via scene registry**                         | Scene components are lazy-imported; `credential.ts` holds the registry (id, label, dynamic import). Avoids a large static import block; scales to many scenes |
| Static assets         | **`src/assets/storytelling/credential/`**                     | Processed by Astro image pipeline; subdirs `clients/` and `tech/` for logo sets |
| Scene types           | **`standard` \| `divider` \| `sub`**                          | `standard` = two-column scrollytelling; `divider` = full-bleed chapter break; `sub` = sub-scene under a divider (defaults to two-column unless the component overrides its own layout) |
| Divider scene layout  | **Full-bleed title card**                                     | Large heading, background image/colour, full viewport — no two-column split. `StoryEngine` detects `type: "divider"` and skips the two-col wrapper |
| Sub-scene layout      | **Two-column by default; bespoke if the story demands it**    | Registry entry is `type: "sub"`; the scene component itself decides if it needs a custom layout (e.g. a hero project with a special visual treatment) |
| Chapter nav           | **All scenes visible**                                        | Every scene (standard, divider, sub) appears in the ToC; dividers styled as section headings, sub-scenes as regular items beneath them |

---

## 5. Content Structure — Scenes

_(Topic: `credential`)_

> Scene count will grow as projects are added. Scene numbers are sequential and permanent — do not renumber. Divider scenes mark chapter breaks; sub-scenes follow their divider.

---

### Scene 001 — Introduction `[standard]`

**Anchor:** `#scene-001`
**Left text:** Brand introduction, The Mather name origin, company founding context — hardcoded in `Scene001Intro.tsx`
**Right asset:** Animated `IsoWireframe` component (already built) + The Mather wordmark with 4M letters animating in
**Waypoint trigger:** Page load / first step

---

### Scene 002 — Methodology `[standard]`

**Anchor:** `#scene-002`
**Left text:** Explanation of the 4M framework (Methodology, Mathematics, Machine Learning, Matching) — hardcoded in `Scene002Methodology.tsx`
**Right asset:** 4-quadrant diagram; each M label and quadrant animates in sequentially on entry
**Waypoint trigger:** Step 2 enters viewport

---

### Scene 003 — Services `[standard]`

**Anchor:** `#scene-003`
**Left text:** What The Mather builds — overview of the 6 service areas (AI Technology, Data Research, Web/Mobile, Data Migration, Data-Driven Strategy, Data Analysis) — hardcoded in `Scene003Services.tsx`
**Right asset:** 6 service cards tile in with staggered Motion animation
**Waypoint trigger:** Step 3 enters viewport

---

### Scene 004 — Tech Stack `[standard]`

**Anchor:** `#scene-004`
**Left text:** "Powered by modern tools" — description of engineering philosophy — hardcoded in `Scene004TechStack.tsx`
**Right asset:** Tech logo grid (React, Next.js, Flutter, Firebase, Prisma, Vercel, shadcn, etc.) with logos appearing in sequence
**Asset source:** `src/assets/storytelling/credential/tech/`
**Waypoint trigger:** Step 4 enters viewport

---

### Scene 005 — Clients `[standard]`

**Anchor:** `#scene-005`
**Left text:** "Trusted by leading organisations across Thailand and Southeast Asia" — hardcoded in `Scene005Clients.tsx`
**Right asset:** Client logo mosaic (PTT, Chevron, Suzuki, Haier, LINE BK, Sansiri, 15+ logos) fades in as a grid
**Asset source:** `src/assets/storytelling/credential/clients/`
**Waypoint trigger:** Step 5 enters viewport

---

### Scene 006 — Projects _(chapter divider)_ `[divider]`

**Anchor:** `#scene-006`
**Layout:** Full-bleed title card — large "Projects" heading, background image/colour, full viewport. No two-column split.
**Component:** `Scene006ProjectsDivider.tsx`
**Waypoint trigger:** Step 6 enters viewport

---

### Scene 007+ — Individual Projects `[sub]`

**Anchors:** `#scene-007`, `#scene-008`, …
**Layout:** Two-column by default. Scene component may override to a bespoke layout if the project story demands it.
**Components:** `Scene007ProjectName.tsx`, `Scene008ProjectName.tsx`, …
**Left text:** Project narrative — hardcoded in each component
**Right asset:** Project visuals — sourced from `src/content/projects/2026-imported/**/*.png`

> Project scenes are added incrementally. Each project gets a dedicated scene file.

---

## 6. File Structure

```
src/
├── pages/
│   └── storytelling/
│       └── credential.astro               ← Page shell (no Nav, editorial theme)
│
├── assets/
│   └── storytelling/
│       └── credential/
│           ├── clients/                   ← PTT.png, Chevron.svg, Haier.png …
│           └── tech/                      ← react.svg, nextjs.svg, flutter.svg …
│
├── components/
│   └── storytelling/
│       ├── credential/                    ← Topic-scoped components
│       │   ├── ScrollyTelling.tsx         ← React root (client:only="react")
│       │   ├── StoryEngine.tsx            ← IntersectionObserver + active scene state
│       │   ├── StoryStep.tsx              ← Left col: individual narrative block + anchor
│       │   ├── StoryPanel.tsx             ← Right sticky panel + AnimatePresence
│       │   ├── ChapterNav.tsx             ← Floating ToC — dots/labels, scroll-spy
│       │   └── scenes/
│       │       ├── Scene001Intro.tsx      ← Owns copy + animation (hardcoded)
│       │       ├── Scene002Methodology.tsx
│       │       ├── Scene003Services.tsx
│       │       ├── Scene004TechStack.tsx
│       │       ├── Scene005Clients.tsx
│       │       └── Scene006Projects.tsx
│       └── shared/                        ← Reusable across future topics
│           └── (e.g. SceneShell.tsx, useScrollSpy.ts)
│
└── data/
    └── storytelling/
        └── credential.ts                  ← Scene registry only: id, label, lazy import
```

**`credential.ts` shape (registry, no content):**

```ts
export type SceneType = "standard" | "divider" | "sub"

export interface SceneEntry {
  id: string          // e.g. "scene-001"
  label: string       // shown in ChapterNav
  type: SceneType
  component: () => Promise<{ default: React.ComponentType }>
}

export const scenes: SceneEntry[] = [
  { id: "scene-001", label: "Introduction",  type: "standard", component: () => import('./scenes/Scene001Intro') },
  { id: "scene-002", label: "Methodology",   type: "standard", component: () => import('./scenes/Scene002Methodology') },
  { id: "scene-003", label: "Services",      type: "standard", component: () => import('./scenes/Scene003Services') },
  { id: "scene-004", label: "Tech Stack",    type: "standard", component: () => import('./scenes/Scene004TechStack') },
  { id: "scene-005", label: "Clients",       type: "standard", component: () => import('./scenes/Scene005Clients') },
  { id: "scene-006", label: "Projects",      type: "divider",  component: () => import('./scenes/Scene006ProjectsDivider') },
  { id: "scene-007", label: "Project A",     type: "sub",      component: () => import('./scenes/Scene007ProjectA') },
  // … add projects here
]
```

`StoryEngine` checks `scene.type`:
- `"divider"` → renders `<DividerLayout>` (full-bleed, full viewport)
- `"standard"` | `"sub"` → renders `<TwoColLayout>` (unless the component overrides internally)

---

## 7. Technology Choices

| Concern             | Solution                                                               | Already in stack?                    |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| Scroll detection    | `IntersectionObserver` (custom hook `useScrollSpy`)                    | ✅ pattern exists in `Layout.astro`  |
| Asset transitions   | `motion/react` `AnimatePresence`                                       | ✅ `motion` v12 installed            |
| Sticky layout       | CSS `position: sticky` + Tailwind `sticky top-0 h-screen`             | ✅                                   |
| Project images      | `import.meta.glob` over `src/content/projects/`                       | ✅ images already present            |
| Component hydration | `client:only="react"` on `ScrollyTelling`                             | ✅                                   |
| Scene lazy loading  | `React.lazy()` resolved from scene registry in `credential.ts`        | ✅ React built-in                    |
| UI primitives       | shadcn `Badge` for project categories                                  | ✅                                   |
| Chapter nav anchors | Native `id` attributes + `scrollIntoView` / `href="#scene-00X"`       | ✅ no library needed                 |
| **New libraries**   | **None**                                                               | ✅                                   |

---

## 8. Astro vs React Decision

**Scene components are React, not Astro.**

| Factor | Astro scenes | React scenes |
|---|---|---|
| Motion animations inside scene | ❌ Not possible without `client:*` per scene | ✅ Full motion/react access |
| Shared active-scene state | ❌ Requires prop drilling across island boundaries | ✅ Single React tree, useState |
| AnimatePresence cross-fade | ❌ Cannot wrap Astro components | ✅ Native |
| SSR safety | ❌ Scroll APIs unavailable — need `client:only` anyway | ✅ Handled by `client:only="react"` on root |
| File simplicity | Mixed .astro + .tsx | All .tsx in one tree |

**Decision:** One `client:only="react"` on `ScrollyTelling.tsx`. Everything inside is React. The only Astro file per topic is the page shell at `src/pages/storytelling/<topic>.astro`.

---

## 9. Responsive Behaviour

| Breakpoint    | Layout                                                                     |
| ------------- | -------------------------------------------------------------------------- |
| `lg` and up   | Two-column sticky (story left 40%, asset right 60%)                        |
| Below `lg`    | Single column; asset appears **above** each step, full-width, `h-64`       |
| Chapter nav   | Left-edge floating on `lg`+; collapses to a top progress bar on mobile     |

---

## 10. Page Shell

```astro
---
// src/pages/storytelling/credential.astro
import Layout from '../../layouts/Layout.astro'
import ScrollyTelling from '../../components/storytelling/credential/ScrollyTelling'
---
<Layout title="The Mather — Credential" noNav={true} colorPreset="editorial">
  <ScrollyTelling client:only="react" />
</Layout>
```

The `editorial` color preset uses `--color-background: #fff`, `--color-foreground: #111`, with Instrument Serif for display text.

---

## 11. Chapter Navigation (ToC)

`ChapterNav.tsx` — a floating panel rendered inside the React tree so it has access to `activeScene` state.

**Behaviour:**
- Renders a vertical list of chapter labels (or dots with tooltips on hover)
- Highlights the currently active scene using `activeScene` state from `StoryEngine`
- Each item is an `<a href="#scene-00X">` for native scroll-to-anchor
- Positioned `fixed left-6 top-1/2 -translate-y-1/2` on desktop
- Hidden or collapsed to a progress bar on mobile

**Chapter labels (credential topic):**

All scenes appear in the ToC. Dividers are styled as section headings; sub-scenes appear as regular items beneath them.

| # | Label | Type |
|---|---|---|
| 001 | Introduction | standard |
| 002 | Methodology | standard |
| 003 | Services | standard |
| 004 | Tech Stack | standard |
| 005 | Clients | standard |
| 006 | **Projects** | **divider** |
| 007+ | Project Name | sub |

---

## 12. Out of Scope (v1)

- Individual project deep-dive links (the Projects page handles this)
- Video assets
- Horizontal scroll variant
- MDX / CMS-editable story content (copy is hardcoded inside each scene component)
- Additional topics beyond `credential`

---

## 13. Open Questions

- [x] ~~Scene 006 Projects — auto-cycle vs. curated~~ → resolved: Scene006 is a divider; each project is its own sub-scene
- [x] ~~Scene type model~~ → `standard | divider | sub`; dividers are full-bleed title cards
- [x] ~~Sub-scene layout~~ → two-column default; component may override for special stories
- [x] ~~Chapter nav visibility~~ → all scenes shown; dividers as section headings, sub-scenes as regular items
- [ ] **Other dividers** — which other chapter groups (besides Projects) get a divider scene? What are they?
- [ ] **End CTA** — is there a call-to-action at the very end of the story? (e.g. "Start a project with us" → `/contact`)
- [ ] **Nav linking** — is `/storytelling/credential` linked from the main site Nav, or a standalone shareable URL only?
- [ ] **Chapter nav style** — numbered dots with tooltip labels on hover, or full text labels always visible on desktop?
- [ ] **Scene component API** — does `StoryEngine` pass a `side` prop (`"left"` / `"right"`) so each scene renders only one half, or does each scene component own and render both halves internally?

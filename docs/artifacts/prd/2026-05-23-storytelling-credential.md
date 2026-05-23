# Storytelling Page — PRD

**Route:** `/storytelling/<topic>` (current: `/storytelling/credential`)
**Branch:** `feature/story-telling`
**Status:** Planning — approved for implementation
**Date:** 2026-05-23

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
- Clicking a chapter label smooth-scrolls to that step's anchor (`#scene-01`, `#scene-02`, …)
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
| Scene component names | **Numbered — `Scene01Intro`, `Scene02Methodology`, …**         | Keeps folder order predictable; maps to scroll position                                                     |
| Component location    | `src/components/storytelling/<topic>/`                         | Topic-scoped; clean separation when more topics are added                                                   |
| Scene tech            | **React** (not Astro)                                          | Scenes live inside the React tree; need Motion animations + shared scroll state. See §8.                    |

---

## 5. Content Structure — 6 Scenes

_(Topic: `credential`)_

### Scene 01 — Introduction

**Anchor:** `#scene-01`
**Left text:** Brand introduction, The Mather name origin, company founding context
**Right asset:** `Scene01Intro` — animated `IsoWireframe` component (already built) + The Mather wordmark with 4M letters animating in
**Waypoint trigger:** Page load / first step

---

### Scene 02 — Methodology

**Anchor:** `#scene-02`
**Left text:** Explanation of the 4M framework (Methodology, Mathematics, Machine Learning, Matching)
**Right asset:** `Scene02Methodology` — 4-quadrant diagram; each M label and quadrant animates in sequentially on entry
**Waypoint trigger:** Step 2 enters viewport

---

### Scene 03 — Services

**Anchor:** `#scene-03`
**Left text:** What The Mather builds — overview of the 6 service areas (AI Technology, Data Research, Web/Mobile, Data Migration, Data-Driven Strategy, Data Analysis)
**Right asset:** `Scene03Services` — 6 service cards tile in with staggered Motion animation
**Waypoint trigger:** Step 3 enters viewport

---

### Scene 04 — Tech Stack

**Anchor:** `#scene-04`
**Left text:** "Powered by modern tools" — description of engineering philosophy
**Right asset:** `Scene04TechStack` — tech logo grid (React, Next.js, Flutter, Firebase, Prisma, Vercel, shadcn, etc.) with logos appearing in sequence
**Waypoint trigger:** Step 4 enters viewport

---

### Scene 05 — Clients

**Anchor:** `#scene-05`
**Left text:** "Trusted by leading organisations across Thailand and Southeast Asia"
**Right asset:** `Scene05Clients` — client logo mosaic (PTT, Chevron, Suzuki, Haier, LINE BK, Sansiri, 15+ logos) fades in as a grid
**Waypoint trigger:** Step 5 enters viewport

---

### Scene 06 — Projects

**Anchor:** `#scene-06`
**Left text:** "Our work speaks for itself" — brief narrative about project diversity
**Right asset:** `Scene06Projects` — cycling project card showcase; shows project image + title + category badge (web / mobile / strategy / AI)
**Source images:** `src/content/projects/2026-imported/**/*.png`
**Waypoint trigger:** Step 6 enters viewport

---

## 6. File Structure

```
src/
├── pages/
│   └── storytelling/
│       └── credential.astro               ← Page shell (no Nav, editorial theme)
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
│       │       ├── Scene01Intro.tsx
│       │       ├── Scene02Methodology.tsx
│       │       ├── Scene03Services.tsx
│       │       ├── Scene04TechStack.tsx
│       │       ├── Scene05Clients.tsx
│       │       └── Scene06Projects.tsx
│       └── shared/                        ← Reusable across future topics
│           └── (e.g. SceneShell.tsx, useScrollSpy.ts)
│
└── data/
    └── storytelling/
        └── credential.ts                  ← Chapter text, scene IDs, chapter labels
```

---

## 7. Technology Choices

| Concern             | Solution                                                               | Already in stack?                    |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| Scroll detection    | `IntersectionObserver` (custom hook `useScrollSpy`)                    | ✅ pattern exists in `Layout.astro`  |
| Asset transitions   | `motion/react` `AnimatePresence`                                       | ✅ `motion` v12 installed            |
| Sticky layout       | CSS `position: sticky` + Tailwind `sticky top-0 h-screen`             | ✅                                   |
| Project images      | `import.meta.glob` over `src/content/projects/`                       | ✅ images already present            |
| Component hydration | `client:only="react"` on `ScrollyTelling`                             | ✅                                   |
| UI primitives       | shadcn `Badge` for project categories                                  | ✅                                   |
| Chapter nav anchors | Native `id` attributes + `scrollIntoView` / `href="#scene-XX"`        | ✅ no library needed                 |
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
- Each item is an `<a href="#scene-XX">` for native scroll-to-anchor
- Positioned `fixed left-6 top-1/2 -translate-y-1/2` on desktop
- Hidden or collapsed to a progress bar on mobile

**Chapter labels (credential topic):**

| # | Label |
|---|---|
| 01 | Introduction |
| 02 | Methodology |
| 03 | Services |
| 04 | Tech Stack |
| 05 | Clients |
| 06 | Projects |

---

## 12. Out of Scope (v1)

- Individual project deep-dive links (the Projects page handles this)
- Video assets
- Horizontal scroll variant
- CMS-editable story content (hardcoded in `src/data/storytelling/credential.ts` for now)
- Additional topics beyond `credential`

---

## 13. Open Questions

- [ ] Should the Projects scene (06) auto-cycle through all projects, or show a curated subset of ~6 hero projects?
- [ ] Is there a **call-to-action** at the end of the story? (e.g. "Start a project with us" → contact)
- [ ] Should `/storytelling/credential` be linked from the main Nav, or is it a standalone shareable URL for now?
- [ ] Chapter nav style: **numbered dots with tooltip labels** vs **full text labels always visible**?

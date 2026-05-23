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

## 3. Interaction Model — Slide Deck with Internal Animation

Each scene occupies the **full viewport** (`100vw × 100vh`) — like a PowerPoint slide that has its own interactive story and animation sequence inside.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│                   SCENE (full viewport)              │
│                                                      │
│   Each scene owns its own layout, copy, and          │
│   animation steps. The engine just says "you're      │
│   active" and passes the current step index.         │
│                                                      │
│                    step: 0 → 1 → 2 → … → N          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Two control axes:**

| Axis | Input | Action |
|---|---|---|
| **Flow** | `↓` / scroll down / swipe up | Next animation step within scene → when fully progressed, advance to next scene |
| **Flow** | `↑` / scroll up / swipe down | Previous animation step → when at step 0, go to previous scene |
| **Jump** | `→` / on-screen right arrow | Skip to next scene (ignores remaining animation steps) |
| **Jump** | `←` / on-screen left arrow | Jump to previous scene start (resets to step 0) |
| **Jump** | ChapterNav click | Jump directly to any scene (resets to step 0) |

**Flow behaviour (↓):**
- `step < maxSteps` → `step++` (next animation state within scene)
- `step === maxSteps` → `sceneIndex++` (advance to next scene, reset step to 0)

**State managed by `StoryEngine`:**
- `activeScene: number` — which scene is displayed
- `activeStep: number` — current animation step within that scene
- Scene receives `step` as a controlled prop; scene renders based on it
- `StoryEngine` owns all keyboard and wheel event listeners

**Scene transition:**
- `AnimatePresence` wraps the active scene
- Transition style: **TBD** (see §13 open questions)

---

## 4. Design Decisions

| Decision              | Choice                                                         | Rationale                                                                                                   |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Scene model           | **Full-viewport slide deck**                                   | Each scene = 100vw × 100vh; discrete units with internal animation, not a continuous scroll page            |
| Navigation — between scenes | **↓ (flow) auto-advances when done; → (jump) skips**   | Two axes: flow (↓↑) progresses naturally; jump (←→) lets user skip. See §3.                                |
| Navigation — within scene | **`step` prop controlled by `StoryEngine`**              | Scene receives `step: number`; engine owns all keyboard/wheel events; scene is a pure renderer               |
| Color theme           | **Full-bleed light / editorial**                               | White background, newspaper feel — deliberately distinct from the dark main site to signal a different mode |
| Navigation            | **Standalone — no site Nav**                                   | Immersive experience; subtle back-arrow only                                                                |
| Typography feel       | Editorial — generous line-height, serif accent for pull quotes | Matches the "story" framing                                                                                 |
| Chapter skip nav      | **Yes — floating ToC**                                         | Allows non-linear reading; jumps to scene start (step 0)                                                    |
| Scene component names | **3-digit numbered — `Scene001Intro`, `Scene002Methodology`, …** | Keeps folder sort correct up to 999 scenes; consistent with anchor IDs (`#scene-001`)                    |
| Component location    | `src/components/storytelling/<topic>/`                         | Topic-scoped; clean separation when more topics are added                                                   |
| Scene tech            | **React** (not Astro)                                          | Scenes live inside the React tree; need Motion animations + shared scroll state. See §8.                    |
| Scene content         | **Hardcoded inside each scene component**                      | Copy + layout + animation all owned by the scene file; no MDX or external data file for content             |
| Scene loading         | **`React.lazy()` via scene registry**                         | Scene components are lazy-imported from `credential.ts`. Avoids large static import block; scales to many scenes |
| Static assets         | **`src/assets/storytelling/credential/`**                     | Processed by Astro image pipeline; subdirs `clients/` and `tech/` for logo sets                             |
| Scene types           | **`standard` \| `divider` \| `sub`**                          | `standard` = any scene layout (two-col default); `divider` = full-bleed chapter break; `sub` = sub-scene under a divider. All are full-viewport. |
| Divider scene layout  | **Full-bleed title card**                                     | Large heading, background image/colour, full viewport. `ChapterNav` renders dividers as section headings.   |
| Sub-scene layout      | **Two-column by default; bespoke if story demands it**        | Scene component decides its own layout internally; no wrapper imposed by `StoryEngine`                      |
| Chapter nav           | **All scenes visible**                                        | Every scene (standard, divider, sub) appears in the ToC; dividers as section headings, sub-scenes as regular items |
| Scene transition      | **Slide** (configurable)                                      | Next scene slides in from right; previous from left. `SceneTransition` accepts a `variant` prop (`"slide" \| "fade" \| "cut"`) so it can be changed per-topic or per-scene without touching engine logic |

---

## 5. Content Structure — Scenes

_(Topic: `credential`)_

> Scene count will grow as projects are added. Scene numbers are sequential and permanent — do not renumber. Divider scenes mark chapter breaks; sub-scenes follow their divider.

---

### Scene 001 — Introduction `[standard]`

**Anchor:** `#scene-001`
**Steps:** TBD (wordmark letters animate in + IsoWireframe build-up)
**Content:** Brand introduction, The Mather name origin, company founding context — hardcoded in `Scene001Intro.tsx`
**Asset:** Animated `IsoWireframe` component (already built) + The Mather wordmark with 4M letters animating in

---

### Scene 002 — Methodology `[standard]`

**Anchor:** `#scene-002`
**Steps:** 4 (one per M — Methodology, Mathematics, Machine Learning, Matching)
**Content:** Explanation of the 4M framework — hardcoded in `Scene002Methodology.tsx`
**Asset:** 4-quadrant diagram; each M label and quadrant animates in on each step

---

### Scene 003 — Services `[standard]`

**Anchor:** `#scene-003`
**Steps:** 6 (one per service area) or 1 (all cards tile in together)
**Content:** What The Mather builds — 6 service areas — hardcoded in `Scene003Services.tsx`
**Asset:** 6 service cards tile in with staggered Motion animation

---

### Scene 004 — Tech Stack `[standard]`

**Anchor:** `#scene-004`
**Steps:** 1–N (logos appear in sequence or in groups)
**Content:** "Powered by modern tools" — hardcoded in `Scene004TechStack.tsx`
**Asset:** Tech logo grid (React, Next.js, Flutter, Firebase, Prisma, Vercel, shadcn, etc.)
**Asset source:** `src/assets/storytelling/credential/tech/`

---

### Scene 005 — Clients `[standard]`

**Anchor:** `#scene-005`
**Steps:** 1 (all logos fade in as a grid) or N (logos appear in rows)
**Content:** "Trusted by leading organisations across Thailand and Southeast Asia" — hardcoded in `Scene005Clients.tsx`
**Asset:** Client logo mosaic (PTT, Chevron, Suzuki, Haier, LINE BK, Sansiri, 15+ logos)
**Asset source:** `src/assets/storytelling/credential/clients/`

---

### Scene 006 — Projects _(chapter divider)_ `[divider]`

**Anchor:** `#scene-006`
**Steps:** 1 (static title card; no internal animation)
**Layout:** Full-bleed title card — large "Projects" heading, background image/colour, full viewport
**Component:** `Scene006ProjectsDivider.tsx`

---

### Scene 007+ — Individual Projects `[sub]`

**Anchors:** `#scene-007`, `#scene-008`, …
**Steps:** Defined per scene component
**Layout:** Two-column by default. Scene component may override to a bespoke layout if the project story demands it.
**Components:** `Scene007ProjectName.tsx`, `Scene008ProjectName.tsx`, …
**Content:** Project narrative — hardcoded in each component
**Asset:** Project visuals — sourced from `src/content/projects/2026-imported/**/*.png`

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
│       │   ├── StoryEngine.tsx            ← activeScene + activeStep state; keyboard/wheel handler
│       │   ├── SceneArrows.tsx            ← On-screen ← → jump buttons (desktop)
│       │   ├── ChapterNav.tsx             ← Floating ToC + controls hint
│       │   └── scenes/
│       │       ├── Scene001Intro.tsx      ← Full viewport; owns layout + copy + animation
│       │       ├── Scene002Methodology.tsx
│       │       ├── Scene003Services.tsx
│       │       ├── Scene004TechStack.tsx
│       │       ├── Scene005Clients.tsx
│       │       ├── Scene006ProjectsDivider.tsx
│       │       └── Scene007+ProjectName.tsx
│       └── shared/                        ← Reusable across future topics
│           ├── useSceneNav.ts             ← keydown + wheel hook; returns { goNext, goPrev, jumpTo }
│           └── SceneTransition.tsx        ← AnimatePresence wrapper for scene entrance/exit
│
└── data/
    └── storytelling/
        └── credential.ts                  ← Scene registry: id, label, type, steps, lazy import
```

**`credential.ts` shape:**

```ts
export type SceneType = "standard" | "divider" | "sub"

export interface SceneProps {
  step: number       // current animation step (0-indexed), controlled by StoryEngine
  isActive: boolean  // true when this scene is the displayed scene
}

export interface SceneEntry {
  id: string         // e.g. "scene-001" — used as anchor id
  label: string      // shown in ChapterNav
  type: SceneType
  steps: number      // total animation steps (1 = no internal animation, just entrance)
  component: () => Promise<{ default: React.ComponentType<SceneProps> }>
}

export const scenes: SceneEntry[] = [
  { id: "scene-001", label: "Introduction", type: "standard", steps: 4, component: () => import('./scenes/Scene001Intro') },
  { id: "scene-002", label: "Methodology",  type: "standard", steps: 4, component: () => import('./scenes/Scene002Methodology') },
  { id: "scene-003", label: "Services",     type: "standard", steps: 1, component: () => import('./scenes/Scene003Services') },
  { id: "scene-004", label: "Tech Stack",   type: "standard", steps: 1, component: () => import('./scenes/Scene004TechStack') },
  { id: "scene-005", label: "Clients",      type: "standard", steps: 1, component: () => import('./scenes/Scene005Clients') },
  { id: "scene-006", label: "Projects",     type: "divider",  steps: 1, component: () => import('./scenes/Scene006ProjectsDivider') },
  { id: "scene-007", label: "Project A",    type: "sub",      steps: 3, component: () => import('./scenes/Scene007ProjectA') },
  // … add projects here
]
```

**`StoryEngine` logic:**
- `↓` / wheel down: `step < scene.steps - 1` → `step++`; else → `sceneIndex++`, `step = 0`
- `↑` / wheel up: `step > 0` → `step--`; else → `sceneIndex--`, `step = 0`
- `→`: `sceneIndex++`, `step = 0`
- `←`: `sceneIndex--`, `step = 0`
- ChapterNav click: `sceneIndex = target`, `step = 0`

---

## 7. Technology Choices

| Concern                   | Solution                                                               | Already in stack?                    |
| ------------------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| Scene navigation (between)| `keydown` + `wheel` events in `useSceneNav` hook                      | ✅ no library; native browser APIs   |
| Scene navigation (within) | `step` state in `StoryEngine`; passed as prop to active scene          | ✅ React `useState`                  |
| Scene transitions         | `motion/react` `AnimatePresence` in `SceneTransition.tsx`             | ✅ `motion` v12 installed            |
| Scene lazy loading        | `React.lazy()` resolved from scene registry in `credential.ts`        | ✅ React built-in                    |
| Project images            | `import.meta.glob` over `src/content/projects/`                       | ✅ images already present            |
| Component hydration       | `client:only="react"` on `ScrollyTelling`                             | ✅                                   |
| UI primitives             | shadcn `Badge` for project categories                                  | ✅                                   |
| Scene transitions         | `SceneTransition.tsx` wraps `AnimatePresence`; accepts `variant: "slide" \| "fade" \| "cut"` | ✅ `motion` v12 |
| On-screen arrows          | `SceneArrows.tsx` — `fixed` positioned, ghost buttons                 | ✅ no library needed                 |
| Controls hint             | Inline hint in `ChapterNav.tsx`; first-visit overlay in `StoryEngine` | ✅ no library needed                 |
| **New libraries**         | **None**                                                               | ✅                                   |

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

Every scene is always full viewport (`100vw × 100vh`) on all breakpoints. Layout inside the scene adapts.

| Breakpoint    | Scene layout                                               | Navigation                                                   |
| ------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| `lg` and up   | Scene decides (two-column default for standard/sub)        | Keyboard `↓↑←→`; on-screen `SceneArrows` (←→); `ChapterNav` |
| Below `lg`    | Scene decides (single column; asset stacked)               | Swipe up/down (flow); swipe left/right (jump); `ChapterNav`  |
| Chapter nav   | `fixed left-6 top-1/2` on `lg`+                            | Bottom pill / collapsed on mobile                            |
| SceneArrows   | `fixed` mid-left and mid-right, visible on `lg`+           | Hidden on mobile (replaced by swipe)                         |

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

## 11. Chapter Navigation (ToC) + Controls Hint

### ChapterNav

`ChapterNav.tsx` — floating panel inside the React tree; reads `activeScene` from `StoryEngine`.

**Behaviour:**
- Renders a vertical list of all scenes
- Dividers styled as section headings; sub-scenes as regular items beneath
- Clicking any item calls `jumpTo(sceneIndex)` — sets `sceneIndex` and resets `step` to 0
- Positioned `fixed left-6 top-1/2 -translate-y-1/2` on desktop
- Collapsed to a bottom pill / progress bar on mobile

**Chapter labels (credential topic):**

| # | Label | Type |
|---|---|---|
| 001 | Introduction | standard |
| 002 | Methodology | standard |
| 003 | Services | standard |
| 004 | Tech Stack | standard |
| 005 | Clients | standard |
| 006 | **Projects** | **divider** |
| 007+ | Project Name | sub |

### Controls Hint

Two-layer approach so the hint informs without cluttering:

**Layer 1 — First-visit overlay (auto-dismiss):**
- Centred overlay on Scene 001 load
- Shows the full control scheme for 3–4 seconds then fades out
- Dismissed immediately on any input
- Stored in `sessionStorage` so it only shows once per visit

```
  ┌─────────────────────────────────┐
  │                                 │
  │   ↓  scroll to explore          │
  │   →  skip to next scene         │
  │   ←→  jump between scenes       │
  │                                 │
  │   or use the menu on the left   │
  │                                 │
  └─────────────────────────────────┘
```

**Layer 2 — Persistent hint in ChapterNav footer:**
- Always visible; small, muted text at the bottom of the floating nav
- `↓ explore  ·  → skip`
- Serves as a reminder after the first-visit overlay has dismissed

### SceneArrows

`SceneArrows.tsx` — on-screen ← → jump buttons for mouse users.

- `fixed` positioned at mid-left and mid-right viewport edges
- Ghost/outline circle style; `opacity-30` idle, `opacity-100` on hover
- Arrow icon only; no label
- Visible on `lg+` desktop; hidden on mobile
- Left arrow disabled (visually) on Scene 001; right arrow disabled on last scene

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
- [x] ~~Interaction model~~ → slide deck; ↓↑ flow, ←→ jump; `StoryEngine` owns state + keyboard/wheel
- [x] ~~Scene component API~~ → `step: number` + `isActive: boolean` props; scene is a pure renderer
- [x] ~~On-screen arrows~~ → `SceneArrows.tsx`; ghost buttons fixed mid-left/right; desktop only
- [x] ~~Controls hint~~ → first-visit overlay (auto-dismiss) + persistent hint in ChapterNav footer
- [x] ~~Scene transition style~~ → **slide** (next scene pushes in from right; prev pushes in from left). Transition variant is a configurable prop on `SceneTransition.tsx` so it can be changed per-topic or per-scene later without touching engine logic.
- [ ] **Other dividers** — which other chapter groups (besides Projects) get a divider scene? What are they?
- [ ] **End CTA** — is there a call-to-action at the very end of the story? (e.g. "Start a project with us" → `/contact`)
- [ ] **Nav linking** — is `/storytelling/credential` linked from the main site Nav, or a standalone shareable URL only?
- [ ] **Chapter nav style** — numbered dots with tooltip labels on hover, or full text labels always visible on desktop?

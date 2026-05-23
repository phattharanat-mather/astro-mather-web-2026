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

## 3. Interaction Model — Slide Deck with Lenis Internal Scroll

Each scene occupies the **full viewport** (`100vw × 100vh`). Navigation between scenes is a discrete slide transition. Navigation within a scene is smooth scroll driven by **Lenis**, which normalises wheel/touch input and exposes a `progress` value (0→1) that drives animations.

```
← → / scene overflow
        │
        ▼
┌─────────────────────────────────────┐
│  motion/react AnimatePresence       │  ← scene slides in/out (configurable variant)
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Active Scene (full viewport) │  │
│  │                               │  │
│  │  Lenis (scoped to scene)      │  │  ← smooth wheel/touch → progress 0→1
│  │       ↓ progress              │  │
│  │  useTransform(progress, …)    │  │  ← motion/react maps progress → values
│  │  opacity / y / scale / …      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Two control axes:**

| Axis | Input | Action |
|---|---|---|
| **Flow** | `↓` / scroll / swipe up | Lenis scrolls within scene → at `progress === 1` + continued scroll → next scene |
| **Flow** | `↑` / scroll back / swipe down | Lenis scrolls back within scene → at `progress === 0` + continued scroll → prev scene |
| **Jump** | `→` / on-screen right arrow | Skip to next scene instantly (bypasses Lenis; resets progress to 0) |
| **Jump** | `←` / on-screen left arrow | Jump to previous scene (bypasses Lenis; resets progress to 0) |
| **Jump** | ChapterNav click | Jump to any scene (bypasses Lenis; resets progress to 0) |

**Within-scene animation (Lenis + motion/react):**
- Each active scene has a scoped Lenis instance on its scroll container
- `lenis.on('scroll', ({ progress }) => motionProgress.set(progress))`
- Scene uses `useSceneScroll()` hook → returns a `MotionValue<number>` (0→1)
- `useTransform(progress, [0, 0.25, 0.5, …], […])` maps progress to any animated property
- Lenis is initialised on scene mount, destroyed on unmount

**Scene advance on overscroll:**
```ts
lenis.on('scroll', ({ progress, velocity }) => {
  motionProgress.set(progress)
  if (progress >= 1 && velocity > 0) StoryEngine.nextScene()
  if (progress <= 0 && velocity < 0) StoryEngine.prevScene()
})
```

**State managed by `StoryEngine`:**
- `activeScene: number` — which scene is displayed
- `nextScene()` / `prevScene()` / `jumpTo(index)` — mutate `activeScene`
- No `activeStep` — within-scene progress is owned by Lenis inside each scene

**Scene transition:**
- `motion/react` `AnimatePresence` in `SceneTransition.tsx`
- Default variant: **slide** (next from right, prev from left)
- `variant` prop is configurable per-topic or per-scene

---

## 4. Design Decisions

| Decision              | Choice                                                         | Rationale                                                                                                   |
| --------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Scene model           | **Full-viewport slide deck**                                   | Each scene = 100vw × 100vh; discrete units with internal animation, not a continuous scroll page            |
| Navigation — between scenes | **↓ flow (Lenis overscroll) + → jump**                 | Lenis detects overscroll at progress 0/1 and signals StoryEngine. ←→ jump bypasses Lenis entirely. See §3. |
| Navigation — within scene | **Lenis scoped to scene + motion/react `useTransform`**  | Lenis normalises wheel/touch → `progress` MotionValue → scene maps to animated values. StoryEngine has no step state. |
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
**Scroll animation:** `progress 0→0.5` wordmark 4M letters animate in; `0.5→1` IsoWireframe builds up
**Content:** Brand introduction, The Mather name origin, company founding context — hardcoded in `Scene001Intro.tsx`
**Asset:** Animated `IsoWireframe` component (already built) + The Mather wordmark

---

### Scene 002 — Methodology `[standard]`

**Anchor:** `#scene-002`
**Scroll animation:** `progress 0→1` divided into 4 equal bands — one quadrant (M) reveals per band
**Content:** Explanation of the 4M framework — hardcoded in `Scene002Methodology.tsx`
**Asset:** 4-quadrant diagram built up as user scrolls

---

### Scene 003 — Services `[standard]`

**Anchor:** `#scene-003`
**Scroll animation:** 6 service cards stagger in across `progress 0→0.8`
**Content:** What The Mather builds — 6 service areas — hardcoded in `Scene003Services.tsx`
**Asset:** Service cards tile in with staggered animation

---

### Scene 004 — Tech Stack `[standard]`

**Anchor:** `#scene-004`
**Scroll animation:** Tech logos appear in groups across `progress 0→1`
**Content:** "Powered by modern tools" — hardcoded in `Scene004TechStack.tsx`
**Asset:** Tech logo grid (React, Next.js, Flutter, Firebase, Prisma, Vercel, shadcn, etc.)
**Asset source:** `src/assets/storytelling/credential/tech/`

---

### Scene 005 — Clients `[standard]`

**Anchor:** `#scene-005`
**Scroll animation:** Client logos fade in row by row across `progress 0→0.8`
**Content:** "Trusted by leading organisations across Thailand and Southeast Asia" — hardcoded in `Scene005Clients.tsx`
**Asset:** Client logo mosaic (PTT, Chevron, Suzuki, Haier, LINE BK, Sansiri, 15+ logos)
**Asset source:** `src/assets/storytelling/credential/clients/`

---

### Scene 006 — Projects _(chapter divider)_ `[divider]`

**Anchor:** `#scene-006`
**Scroll animation:** Minimal — entrance only; Lenis scroll container is short (single overscroll advances to Scene 007)
**Layout:** Full-bleed title card — large "Projects" heading, background image/colour, full viewport
**Component:** `Scene006ProjectsDivider.tsx`

---

### Scene 007+ — Individual Projects `[sub]`

**Anchors:** `#scene-007`, `#scene-008`, …
**Scroll animation:** Defined per scene component using `useSceneScroll()` progress
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
│           ├── useSceneScroll.ts          ← creates scoped Lenis instance; returns MotionValue<number> 0→1
│           └── SceneTransition.tsx        ← AnimatePresence wrapper; variant prop (slide|fade|cut)
│
└── data/
    └── storytelling/
        └── credential.ts                  ← Scene registry: id, label, type, lazy import
```

**`credential.ts` shape:**

```ts
export type SceneType = "standard" | "divider" | "sub"

export interface SceneProps {
  isActive: boolean  // true when this scene is displayed; scene starts Lenis on mount
}

export interface SceneEntry {
  id: string         // e.g. "scene-001" — used as anchor id
  label: string      // shown in ChapterNav
  type: SceneType
  component: () => Promise<{ default: React.ComponentType<SceneProps> }>
}

export const scenes: SceneEntry[] = [
  { id: "scene-001", label: "Introduction", type: "standard", component: () => import('./scenes/Scene001Intro') },
  { id: "scene-002", label: "Methodology",  type: "standard", component: () => import('./scenes/Scene002Methodology') },
  { id: "scene-003", label: "Services",     type: "standard", component: () => import('./scenes/Scene003Services') },
  { id: "scene-004", label: "Tech Stack",   type: "standard", component: () => import('./scenes/Scene004TechStack') },
  { id: "scene-005", label: "Clients",      type: "standard", component: () => import('./scenes/Scene005Clients') },
  { id: "scene-006", label: "Projects",     type: "divider",  component: () => import('./scenes/Scene006ProjectsDivider') },
  { id: "scene-007", label: "Project A",    type: "sub",      component: () => import('./scenes/Scene007ProjectA') },
  // … add projects here
]
```

**`useSceneScroll` hook (shared):**
```ts
// Returns a MotionValue<number> from 0 to 1 driven by Lenis
// Calls onComplete(direction) when progress hits 0 or 1 boundary
export function useSceneScroll(
  containerRef: RefObject<HTMLDivElement>,
  onComplete: (direction: 'forward' | 'backward') => void
): MotionValue<number>
```

**`StoryEngine` logic:**
- `→` key: `sceneIndex++`
- `←` key: `sceneIndex--`
- ChapterNav click: `sceneIndex = target`
- Lenis overscroll forward (from active scene): `sceneIndex++`
- Lenis overscroll backward (from active scene): `sceneIndex--`
- No `activeStep` state — within-scene progress lives entirely in Lenis + MotionValue

---

## 7. Technology Choices

| Concern                        | Solution                                                                        | Already in stack?              |
| ------------------------------ | ------------------------------------------------------------------------------- | ------------------------------ |
| Between-scene navigation       | `keydown` listener in `StoryEngine`; `←→` mutate `activeScene`                 | ✅ native browser API          |
| Between-scene transition       | `motion/react` `AnimatePresence` + slide variants in `SceneTransition.tsx`      | ✅ `motion` v12 installed      |
| Within-scene smooth scroll     | `lenis` scoped to active scene container via `useSceneScroll` hook              | ⬆️ **new dep** — `lenis` (MIT) |
| Within-scene animation values  | `motion/react` `useMotionValue` + `useTransform` driven by Lenis `progress`     | ✅ `motion` v12 installed      |
| Scene overscroll → scene advance | Lenis `scroll` event; `progress >= 1 && velocity > 0` → `StoryEngine.nextScene()` | ✅ via `lenis` + `useSceneScroll` |
| Scene lazy loading             | `React.lazy()` resolved from scene registry in `credential.ts`                  | ✅ React built-in              |
| Project images                 | `import.meta.glob` over `src/content/projects/`                                 | ✅ images already present      |
| Component hydration            | `client:only="react"` on `ScrollyTelling`                                       | ✅                             |
| UI primitives                  | shadcn `Badge` for project categories                                           | ✅                             |
| On-screen arrows               | `SceneArrows.tsx` — `fixed` positioned, ghost buttons                           | ✅ no extra library            |
| Controls hint                  | First-visit overlay in `StoryEngine` + persistent footer in `ChapterNav`        | ✅ no extra library            |
| **New libraries**              | **`lenis` only** (MIT, ~2kb)                                                    | ⬆️ one new dep                 |

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
- Clicking any item calls `jumpTo(sceneIndex)` — sets `activeScene`; Lenis resets to `progress = 0` on mount
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
- [x] ~~Interaction model~~ → slide deck; Lenis flow (↓↑ overscroll → scene advance), ←→ jump; `StoryEngine` owns `activeScene`
- [x] ~~Scene component API~~ → `isActive: boolean` only; scene calls `useSceneScroll()` internally for its own `progress` MotionValue; no `step` prop
- [x] ~~Animation stack~~ → **hybrid**: `lenis` (within-scene smooth scroll + overscroll detection) + `motion/react` (scene transitions + `useTransform` for animated values). One new dep: `lenis` MIT.
- [x] ~~On-screen arrows~~ → `SceneArrows.tsx`; ghost buttons fixed mid-left/right; desktop only
- [x] ~~Controls hint~~ → first-visit overlay (auto-dismiss) + persistent hint in ChapterNav footer
- [x] ~~Scene transition style~~ → **slide** (next scene pushes in from right; prev pushes in from left). Transition variant is a configurable prop on `SceneTransition.tsx` so it can be changed per-topic or per-scene later without touching engine logic.
- [ ] **Other dividers** — which other chapter groups (besides Projects) get a divider scene? What are they?
- [ ] **End CTA** — is there a call-to-action at the very end of the story? (e.g. "Start a project with us" → `/contact`)
- [ ] **Nav linking** — is `/storytelling/credential` linked from the main site Nav, or a standalone shareable URL only?
- [ ] **Chapter nav style** — numbered dots with tooltip labels on hover, or full text labels always visible on desktop?

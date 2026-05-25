# Hero Variants

Saved variants of the landing page hero section. Each file is a drop-in replacement for `Hero.astro`.

## How to switch

`Hero.astro` is a thin switcher — it just imports and renders the active variant. Change one line there:

```astro
// src/components/home/Hero.astro

// Switch to a different variant by changing this import:
import Hero from '@/components/home/hero-variants/HeroVariant1.astro';
// import Hero from '@/components/home/hero-variants/HeroVariant2.astro';
```

`index.astro` never needs to change. All variants share the same `data: HeroData` interface.

---

## Active variant

`Hero.astro` currently loads: **HeroVariant1**

---

## Variants

### HeroVariant1 — Isometric Boxes + Bottom Readout Strip

**File:** `HeroVariant1.astro`

**Background:** Isometric animated boxes (`<Boxes />`) covering the full section height. Mask is a linear gradient (`black 0% → black 70% → transparent 100%`) so the effect is visible from top to bottom and fades softly at the lower edge. A background scrim (`transparent → var(--background)`) blends the boxes cleanly into the section border.

**Layout:** Vertically centered content block (`min-h-svh`, `justify-center`) with:
- Display headline (`h1`) with staggered fade-in
- Gradient accent line (1px, `var(--grad)`, 6rem wide)
- Subheadline paragraph (muted, `max-w-xl`)
- `HeroSignal` — 4M indicator + FlipWords methodology cycle

**Bottom readout strip:** Absolute-pinned to the section's bottom edge, separated by a `var(--line)` top border. Two mono-label columns:
- Left: `Bangkok · Thailand` (location)
- Right: `Scroll` + animated bounce arrow (scroll cue)

This fills the dead space that appears below centered content in a full-viewport section, and reinforces the Instrument Panel aesthetic from the design system.

**Dependencies:** `HeroSignal`, `Boxes` (from `@/components/ui/background-boxes`), `motion/react` (via HeroSignal), `FlipWords`.

---

### HeroVariant2 — Vortex Particle Field

**File:** `HeroVariant2.astro`

**Background:** Animated noise-flow particle field (`<Vortex />`) rendered on a canvas filling the full section. Particles span `baseHue={210}` with a 100-degree range, covering the cyan-blue-violet-purple band of the design system palette (`oklch` hue ~200–310). Background canvas fill is `oklch(0.07 0.022 264)` (Observatory Black). Uses `client:only="react"` since the component depends on `window` and canvas APIs.

**Layout:** Identical structure to HeroVariant1 — vertically centered content block, bottom fade scrim, bottom readout strip. Only the background layer changes.

**Tuning props on `<Vortex>`:**
- `baseHue={210}` — cyan start, violet-purple range
- `particleCount={500}` — dense field
- `rangeY={800}` — particles spread across full viewport height
- `rangeSpeed={1.2}` — deliberate flow, not frantic

**Dependencies:** `HeroSignal`, `Vortex` (from `@/components/ui/vortex`), `simplex-noise`, `motion/react`.

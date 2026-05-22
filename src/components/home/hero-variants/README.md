# Hero Variants

Saved variants of the landing page hero section. Each file is a drop-in replacement for `Hero.astro`.

## How to switch

In `src/pages/index.astro`, change the import line:

```astro
// Before (active variant)
import Hero from '@/components/home/Hero.astro';

// After (switch to a variant)
import Hero from '@/components/home/hero-variants/HeroVariant1.astro';
```

The component interface is identical across all variants — they all accept `data: HeroData` — so no other changes are needed.

To make a variant the new active hero, copy it over `Hero.astro`:

```bash
cp src/components/home/hero-variants/HeroVariant1.astro src/components/home/Hero.astro
```

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

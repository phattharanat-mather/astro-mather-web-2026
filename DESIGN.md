---
name: The Mather
description: Full-service technology consulting — AI, Data, Web & Mobile — for Thai and SEA enterprises.
colors:
  observatory-black: "oklch(0.07 0.022 264)"
  instrument-bay: "oklch(0.10 0.030 264)"
  command-violet: "oklch(0.58 0.26 272)"
  readout-cyan: "oklch(0.82 0.14 200)"
  alert-rose: "oklch(0.67 0.22 350)"
  panel-white: "oklch(0.93 0.025 272)"
  dimmed-readout: "oklch(0.55 0.055 258)"
  grid-line: "oklch(1 0 0 / 8%)"
  dawn-paper: "oklch(0.97 0.015 275)"
  dawn-ink: "oklch(0.14 0.040 265)"
typography:
  display:
    fontFamily: "'Geist Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4rem, 12vw, 8rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Geist Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Geist Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Geist Variable', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  sm: "2px"
  md: "4px"
  lg: "8px"
  xl: "12px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  6: "1.5rem"
  8: "2rem"
  12: "3rem"
  16: "4rem"
  24: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.command-violet}"
    textColor: "{colors.panel-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "oklch(0.65 0.24 272)"
    textColor: "{colors.panel-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.panel-white}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  chip-unchecked:
    backgroundColor: "oklch(0.13 0.030 264)"
    textColor: "{colors.dimmed-readout}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  chip-checked:
    backgroundColor: "{colors.command-violet}"
    textColor: "{colors.panel-white}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  input-default:
    backgroundColor: "oklch(1 0 0 / 12%)"
    textColor: "{colors.panel-white}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: The Mather

## 1. Overview

**Creative North Star: "The Instrument Panel"**

The Mather's visual system is built like a precision instrument display: every element deliberate, every color a readout, nothing decorative. The deep observatory-black background is not aesthetic darkness for its own sake — it is the canvas that makes signals legible. Violet and cyan are frequencies, not brand swatches. The system's sophistication is legible in its restraint.

The three named presets — Cosmos (deep indigo-black), Dawn (light lavender), and Void (near-pure black with boosted frequencies) — are not theme variants in the conventional sense. They are exposure modes: different ambient conditions for reading the same information. Cosmos is the default readout. Dawn is the sunlit briefing. Void is the high-contrast emergency view. Each surfaces identical structure under different light.

This system explicitly rejects: the Web3 / crypto neon-on-black aesthetic (electric palettes, grid textures, token-price energy); generic SaaS cream (off-white + purple gradient + floating feature cards); and corporate enterprise cliché (navy + gold, stock-photo handshakes, serif headlines, PowerPoint-flavored section templates). Those references signal category, not competence. The Instrument Panel signals neither — it signals precision.

**Key Characteristics:**
- OKLCH color throughout; perceptually uniform across all three presets
- Flat surfaces differentiated by tonal step, not shadow
- Sharp corners (4px radius default) — no rounded softness
- Single variable-weight typeface (Geist) used across all roles; hierarchy through scale and weight, not font switching
- Monospace reserve: `font-mono` is a label register, not a personality — used only for `text-xs tracking-widest uppercase` metadata
- Motion is deliberate: scroll-reveal entrances, hover state responses; no ambient animation except the hero background

## 2. Colors: The Three-Frequency Palette

Three presets, one palette identity. Violet is authority. Cyan is data. Rose is the signal worth acting on.

### Primary
- **Command Violet** (`oklch(0.58 0.26 272)` in Cosmos; `oklch(0.52 0.26 272)` in Dawn; `oklch(0.62 0.28 272)` in Void): Highest-authority surface color. Used on the primary button background, headline1 token (section headings in color), the nav active state, the focus ring, and interactive element primary state. The violet hue at hue 272 reads as technological without the purple-brand association of SaaS competitors.

### Secondary
- **Readout Cyan** (`oklch(0.82 0.14 200)` Cosmos; `oklch(0.48 0.14 200)` Dawn; `oklch(0.85 0.18 195)` Void): Lower chroma than the primary — this is data-channel color, not accent. Used on headline2 (sub-headings in color), secondary action labels, and the stats strip secondary elements. In Cosmos and Void, its high lightness at low chroma reads as a clean terminal readout. In Dawn, it darkens significantly to maintain contrast on a light surface.

### Tertiary
- **Alert Rose** (`oklch(0.67 0.22 350)` Cosmos; `oklch(0.60 0.22 350)` Dawn; `oklch(0.70 0.24 350)` Void): The rarest frequency. Appears only at high-stakes moments: contact section address icon, the gradient (which should be eliminated per the critique), and destructive states. Its scarcity is the point — when rose appears, it demands attention.

### Neutral
- **Observatory Black** (`oklch(0.07 0.022 264)`): Root background in Cosmos. Indigo-tinted — not `#000`. The chroma at 0.022 is enough to read as a designed black, not a default.
- **Instrument Bay** (`oklch(0.10 0.030 264)`): Card and surface elevation layer. Separated from the background by a 3-point lightness step — no shadow needed.
- **Panel White** (`oklch(0.93 0.025 272)`): Primary text in dark presets. Violet-tinted at chroma 0.025 — cooler than warm white, calibrated to the indigo background.
- **Dimmed Readout** (`oklch(0.55 0.055 258)`): Secondary text. Used for body copy in sections, muted descriptions. Higher chroma than panel-white to prevent a grey cast.
- **Grid Line** (`oklch(1 0 0 / 8%)` in dark; `oklch(0 0 0 / 7%)` in Dawn): Structural dividers. Transparent white/black over the background — inherits the tonal identity without hardcoding a border color.
- **Dawn Paper** (`oklch(0.97 0.015 275)`): Dawn preset background. Lavender-white, not pure white. Chroma 0.015 at hue 275 gives a barely perceptible violet cast that keeps it family.
- **Dawn Ink** (`oklch(0.14 0.040 265)`): Dawn preset foreground. Near-black with significant chroma — avoids the washed look of grey text on lavender.

### Named Rules

**The Frequency Rule.** Violet is authority. Cyan is data. Rose is action. Never use all three at full saturation in the same viewport section. Each frequency means something; overuse makes all of them mean nothing.

**The Tinted-Neutral Rule.** Every background and surface token carries a violet hue tint (chroma 0.010–0.030). `#000000` and `#ffffff` are forbidden. The tint is what ties all three presets into a single palette identity.

**The Scarcity Rule.** Alert Rose (`oklch(0.67 0.22 350)`) appears on fewer than 5% of any screen. Its rarity is its power. If rose appears in three places on a page, redesign two of them.

## 3. Typography

**Display / Headline / Body / Label Font:** Geist Variable (`ui-sans-serif`, `system-ui`, `sans-serif` fallback)
**Mono Label Font:** `ui-monospace`, Cascadia Code, Source Code Pro, Menlo

**Character:** A single variable-weight sans-serif used across all roles, differentiated by scale and weight alone. Geist Variable's weight axis spans thin to heavy — this system uses it aggressively, creating hierarchy through weight contrast rather than font-switching. The mono fallback appears only in metadata labels, never as personality decoration.

### Hierarchy

- **Display** (700, `clamp(4rem, 12vw, 8rem)`, line-height 0.9, tracking `-0.02em`): Reserved for the company name in the hero. One use per page. The tight line-height and negative tracking make it structural at large sizes.
- **Headline** (700, `clamp(1.75rem, 4vw, 2.5rem)`, line-height 1.1, tracking `-0.01em`): Section h2 headings. The primary hierarchy signal below Display. Used for the section's central claim — one per section.
- **Title** (600, `1.125rem`, line-height 1.3): Service names, card headings, sub-section labels. Semibold separates it from body without the full weight of Headline.
- **Body** (400, `0.875rem`, line-height 1.7, max `65–75ch`): All descriptive copy. The generous line-height (1.7) compensates for the small size in dark-on-dark contexts. Cap line length at 65–75ch to prevent reading fatigue on wide viewports.
- **Label** (mono, 400, `0.75rem`, letter-spacing `0.1em`, uppercase): Section index numbers (`/ 01`), stat captions, form field labels, nav link text, date metadata. Mono + uppercase + widest tracking is a single register — it marks information as metadata, not content. **This label style must not be applied to body copy, button text, or section headings.** Its meaning collapses when overused.

### Named Rules

**The Single-Family Rule.** Geist Variable is the only typeface. No display serif, no editorial italic, no secondary sans. Hierarchy through the weight axis and scale ratio only. If a proposed design introduces a second typeface, reject it.

**The Label Reserve Rule.** `font-mono tracking-widest uppercase` is a metadata register, not a style. It is prohibited on buttons, body copy, and section titles. Its current overuse (9+ distinct uses across the page) dilutes its function. Use it only for: section index numbers, stat captions, date stamps, and form section labels.

**The Scale Commitment Rule.** The ratio between adjacent type steps must be ≥1.25. A 1.1× ratio between Title and Body reads as uncommitted. Body is 0.875rem; Title is 1.125rem (1.29× ratio, correct). Headline is 2rem+ (≥1.78× above Title, correct). Display is 4rem+ (≥2× above Headline, correct). Maintain these distances.

## 4. Elevation

This system is flat by default. Surfaces are differentiated by tonal step — background → card/surface → popover — not by shadow. The 3-point lightness gap between Observatory Black (`L=0.07`) and Instrument Bay (`L=0.10`) is enough to read as a raised surface on a calibrated display without any `box-shadow` declaration.

Ambient glow replaces shadow for interactive state. On hover and focus, accent-colored diffuse glows emerge from interactive elements. Against the deep background, a soft violet or cyan glow carries the visual weight of a hard shadow at a fraction of the opacity. At rest: no glow, no shadow, no elevation signal. On interaction: the surface activates.

### Shadow Vocabulary

- **Ambient Glow — Interactive** (`0 0 24px oklch(0.58 0.26 272 / 30%)`): Hover and focus state on primary buttons and interactive surfaces. Violet frequency. Applied via transition so it eases in rather than snapping.
- **Ambient Glow — Cyan** (`0 0 16px oklch(0.82 0.14 200 / 25%)`): Secondary interactive elements; data display highlights. Cyan frequency.
- **No shadow at rest.** The absence of glow is the default state. Glow is a response to human action, not a decorative layer.

### Named Rules

**The Flat-By-Default Rule.** Every surface is flat at rest. No `box-shadow` on cards, containers, or nav. Elevation is communicated by lightness step (`--background` → `--card` → `--surface` → `--popover`), not shadow depth.

**The Glow-Is-Earned Rule.** Ambient glow appears only in response to user interaction (hover, focus). A glowing card that glows at rest is a broken implementation of this system.

## 5. Components

### Buttons

The button is a decision, not an invitation. Sharp corners (4px radius), solid fills, no decoration at rest. The primary button is where Command Violet appears at its most saturated and most visible.

- **Shape:** Sharp (4px radius). No rounding at `lg` or higher. The corner is an instrument edge, not a consumer product curve.
- **Primary:** `background: oklch(0.58 0.26 272)`, `color: oklch(0.93 0.025 272)`, padding `8px 16px`. Hover: lightness lifts to `oklch(0.65 0.24 272)` + ambient violet glow `0 0 20px oklch(0.58 0.26 272 / 35%)`. Transition: `background 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms`.
- **Ghost / Secondary:** Transparent background, `color: var(--foreground)`, no border. Hover: faint text underline or subtle background tint `oklch(1 0 0 / 5%)`. Never a colored border — the Ghost button signals a secondary path, not a decorated secondary.
- **Label typography on buttons:** `font-sans` (not mono), `text-sm`, `font-medium`. The label-mono register is explicitly prohibited inside buttons.

### Interest Chips (Signature Component)

The contact form's checkbox chips are the system's most user-centered pattern and must be preserved in all future form designs.

- **Unchecked:** `background: oklch(0.13 0.030 264)` (muted surface), `color: var(--muted-foreground)`, 4px radius, padding `6px 12px`, `font-size: 0.75rem`.
- **Checked:** `background: oklch(0.58 0.26 272)` (Command Violet), `color: oklch(0.93 0.025 272)`, same geometry. Transition via `has-[:checked]` CSS — no JavaScript.
- **Usage:** Only in contexts where the user is pre-categorizing intent (contact, filter). Never use chip styling for navigation or status labels.

### Cards / Containers

- **Corner Style:** 4px radius (matching button geometry). Consistent across the system.
- **Background:** `oklch(0.10 0.030 264)` (Instrument Bay) — one tonal step above the page background.
- **Shadow Strategy:** None at rest. Ambient glow on hover if the card is interactive: `0 0 24px oklch(0.58 0.26 272 / 20%)`.
- **Border:** `oklch(1 0 0 / 8%)` (Grid Line) — a 1px structural edge, not a decorative stripe. No `border-left` accents.
- **Internal Padding:** Minimum `1.5rem (space-6)` on all sides. Generous inside, compressed outside — not the inverse.

### Inputs / Fields

- **Style:** `background: oklch(1 0 0 / 12%)` (translucent white over dark surface), no visible border at rest, 4px radius, padding `12px 16px`.
- **Focus:** `outline: 2px solid oklch(0.58 0.26 272)`, `outline-offset: 2px` — the ring token. No glow at focus for inputs (glow is reserved for interactive/action elements, not data entry fields).
- **Placeholder:** `color: var(--muted-foreground)` — dimmed readout, not the primary text color.
- **Error state (required but unimplemented):** `outline: 2px solid oklch(0.65 0.25 25)` (destructive token). Error message below the field in `text-xs` body (not mono label register). Never clear the field content on error.

### Navigation

- **Style:** Fixed header, `background: var(--background) / 90%` with backdrop blur `12px`. Transparent blur maintains spatial hierarchy — nav is above the page, not on it.
- **Link typography:** `font-mono text-xs tracking-widest uppercase`. This is the one correct use of the mono label register in navigation — it marks nav items as structural labels, not body content.
- **Active / Hover:** Color shifts to `var(--primary)` (Command Violet). No underline, no background — color alone carries the state.
- **Mobile:** Drawer slides from the right, full-height, `background: var(--background)`. Closes on link tap. Hamburger has explicit `aria-label` and `aria-expanded` state.

### Service Row (Signature Component)

The OurServices section's row treatment is the design system's strongest pattern and the reference for all future list-based section layouts.

- **At rest:** Full-width horizontal row with `border-b: 1px solid var(--line)`. Left column: mono index (`/ 01`) + service name. Right: arrow `→` at `opacity: 0.4`.
- **On hover:** `background: oklch(0.10 0.030 264 / 50%)` surface tint appears, arrow translates `translateX(4px)` at full opacity. Transition: `background 250ms ease-out, transform 250ms ease-out`.
- **Geometry:** No card borders, no rounded corners, no shadow. The row is a table entry, not a card. This distinction matters.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH throughout — it is the canonical color format. Never introduce hex color values that aren't approximations of an existing OKLCH token.
- **Do** differentiate surfaces by lightness step only: `--background` (L=0.07) → `--card` (L=0.10) → `--surface` (L=0.10) → `--popover`. No shadow at rest.
- **Do** apply ambient violet glow (`0 0 24px oklch(0.58 0.26 272 / 30%)`) on interactive elements at hover/focus. Reserve it for action moments only.
- **Do** use the service row pattern (bordered row, no card, hover tint + arrow) for all list-based content. It is the system's most designed element.
- **Do** use the interest chip pattern (`has-[:checked]` CSS, no JavaScript) for any intent-categorization interaction.
- **Do** cap body text at 65–75ch max-width. Long lines on wide viewports are a reading failure, not a layout choice.
- **Do** keep `font-mono tracking-widest uppercase` reserved for section index labels, stat captions, date stamps, and form section labels — never buttons, never body copy.
- **Do** introduce asymmetric layout composition for new sections. The single centered stack is a known weakness. New sections should choose: left-aligned with an asymmetric companion, or a strict visible grid, not a centered-stacked block.
- **Do** cite the three design principles before any new section: Show method (not just outcome), Earned complexity (purposeful not decorative), Enterprise trust (precision signals care).

### Don't:
- **Don't** use `background-clip: text` with a gradient fill on any copy. This is prohibited system-wide. The `--grad` token exists in the CSS but must not be applied to text. Emphasis through weight (`font-weight: 900`) and size contrast, not gradient.
- **Don't** apply `border-left` or `border-right` greater than 1px as a colored accent stripe on any card, list item, or callout. Rewrite using full borders, background tints, leading index numbers, or nothing.
- **Don't** use glassmorphism (backdrop-filter: blur + semi-transparent card fill) decoratively. Nav blur is the one allowed instance — structural, not aesthetic.
- **Don't** introduce a second typeface. Geist Variable is the only family. No editorial serif, no display font for headlines, no secondary sans. The weight axis handles all hierarchy.
- **Don't** render fabricated client logos or names. The clients marquee must reflect actual clients. A placeholder marquee destroys more trust than no marquee at all.
- **Don't** use the identical section header template (overline label + h2 + muted paragraph) across all sections without variation. That pattern is approved for up to three sections. Beyond three, a new layout composition must be introduced.
- **Don't** design a new section as a centered vertical stack if it can be anything else. Asymmetric composition, left-aligned text + right-side data, or a strict grid are all preferable to another `max-w-7xl mx-auto` centered block.
- **Don't** let the Web3 / crypto aesthetic enter through the back door: no aggressive neon treatment, no grid-texture backgrounds, no token-price ticker energy. The palette's cyan and violet must remain technical, not speculative.
- **Don't** use generic SaaS landing-page structure: no floating feature cards over a gradient background, no "10× better" metric strips, no scroll-triggered number counters, no "Trusted by X companies" badge rows with fabricated logos.
- **Don't** place corporate enterprise clichés: no stock photography of handshakes or smiling teams, no navy + gold palette intrusions, no PowerPoint-style bullet-list sections.
- **Don't** repeat the mono label register more than 6 times per page. If it appears on more than 6 distinct elements, audit and remove the least essential uses. Its accent function depends on scarcity.

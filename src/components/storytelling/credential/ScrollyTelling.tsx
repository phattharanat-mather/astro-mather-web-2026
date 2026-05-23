import { Suspense, type ReactNode } from 'react'
import { StoryEngineProvider, useStoryEngine } from './StoryEngine'
import { SceneTransition } from '../shared/SceneTransition'
import { ChapterNav } from './ChapterNav'
import { StoryFooter } from './StoryFooter'
import { ControlsHint } from './ControlsHint'
import { scenes } from '@/data/storytelling/credential'

// ─── Theme CSS tokens ────────────────────────────────────────────────────────
// All scenes and chrome consume CSS custom properties defined here.
// Two presets: dark (Cosmos) and light (Dawn).

const THEME_CSS = `
  /* ─── Storytelling typography scale ───────────────────────────────────────
     Theme-agnostic — same values in both dark and light presets.
     Use these in scene style={{ fontSize: 'var(--story-fs-*)' }} props so
     a single edit here propagates to every scene instantly.

     Scale rationale (presentation / large-screen context):
       xs    12 px  — tag pills, micro labels
       label 13 px  — overline / metadata (tracking + uppercase)
       sm    15 px  — secondary body, dense-card text
       base  17 px  — primary body copy
       title 20 px  — card headings (h3)
       h2-sm clamp 2–2.6 rem   — section headline, narrow layout
       h2    clamp 2.2–3.2 rem — section headline, standard
       h2-lg clamp 2.8–4.5 rem — CTA / feature headline
  */
  [data-story-theme] {
    --story-fs-xs:    0.75rem;
    --story-fs-label: 0.8125rem;
    --story-fs-sm:    0.9375rem;
    --story-fs-base:  1.0625rem;
    --story-fs-title: 1.25rem;
    --story-fs-h2-sm: clamp(2rem, 3.5vw, 2.6rem);
    --story-fs-h2:    clamp(2.2rem, 4.5vw, 3.2rem);
    --story-fs-h2-lg: clamp(2.8rem, 6vw, 4.5rem);
  }

  [data-story-theme="dark"] {
    --story-bg:           oklch(0.07 0.022 264);
    --story-surface:      oklch(0.10 0.030 264);
    --story-surface-hi:   oklch(0.15 0.028 264);
    --story-fg:           oklch(0.93 0.025 272);
    --story-fg-muted:     oklch(0.45 0.040 264);
    --story-accent:       oklch(0.58 0.26  272);
    --story-accent-muted: oklch(0.12 0.040 272);
    --story-cyan:         oklch(0.75 0.14  200);
    --story-cyan-muted:   oklch(0.12 0.030 200);
    --story-rose:         oklch(0.67 0.22  350);
    --story-rose-muted:   oklch(0.12 0.040 350);
    --story-line:         oklch(1 0 0 / 8%);
    --story-line-hex:     #ffffff;
    --story-invert-bg:    oklch(0.93 0.025 272);
    --story-invert-fg:    oklch(0.07 0.022 264);
    --story-invert-muted: oklch(0.45 0.022 264);
  }
  [data-story-theme="light"] {
    --story-bg:           oklch(0.97 0.015 275);
    --story-surface:      oklch(0.92 0.020 272);
    --story-surface-hi:   oklch(0.86 0.022 272);
    --story-fg:           oklch(0.14 0.040 265);
    --story-fg-muted:     oklch(0.50 0.040 265);
    --story-accent:       oklch(0.52 0.26  272);
    --story-accent-muted: oklch(0.90 0.050 272);
    --story-cyan:         oklch(0.42 0.14  200);
    --story-cyan-muted:   oklch(0.88 0.040 200);
    --story-rose:         oklch(0.55 0.22  350);
    --story-rose-muted:   oklch(0.93 0.030 350);
    --story-line:         oklch(0 0 0 / 7%);
    --story-line-hex:     #000000;
    --story-invert-bg:    oklch(0.14 0.040 265);
    --story-invert-fg:    oklch(0.97 0.015 275);
    --story-invert-muted: oklch(0.70 0.025 272);
  }
`

// ─── Theme wrapper ────────────────────────────────────────────────────────────

function StoryThemeWrapper({ children }: { children: ReactNode }) {
  const { theme } = useStoryEngine()
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
      <div data-story-theme={theme} style={{ display: 'contents' }}>
        {children}
      </div>
    </>
  )
}

// ─── Scene renderer ───────────────────────────────────────────────────────────

function SceneRenderer() {
  const { activeIndex, direction } = useStoryEngine()
  const entry = scenes[activeIndex]

  if (!entry) return null

  const SceneComponent = entry.component

  return (
    // pb-11 reserves the 44px footer height so scene content isn't clipped
    <div className="relative w-full h-screen pb-11 overflow-hidden bg-[var(--story-bg)]">
      <SceneTransition sceneKey={activeIndex} direction={direction} variant="slide">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-[var(--story-bg)]">
              <span className="text-[var(--story-fg-muted)] text-sm tracking-widest animate-pulse">
                Loading…
              </span>
            </div>
          }
        >
          <SceneComponent isActive direction={direction} />
        </Suspense>
      </SceneTransition>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ScrollyTelling() {
  return (
    <StoryEngineProvider>
      <StoryThemeWrapper>
        {/* Scene viewport */}
        <SceneRenderer />

        {/* UI chrome */}
        <ChapterNav />
        <StoryFooter />
        <ControlsHint />
      </StoryThemeWrapper>
    </StoryEngineProvider>
  )
}

import { type ReactNode, type RefObject } from 'react'
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import { StripedBackground } from '@/components/storytelling/backgrounds/StripedBackground'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

export type StoryBackground = 'grid' | 'stripes' | 'none'

interface StorytellingLayoutProps {
  /**
   * Pass the scene's scroll-hook ref here — gets applied to the outer
   * full-screen container so `useSceneScroll` can observe wheel events.
   */
  containerRef?: RefObject<HTMLDivElement | null>

  /** Main scene content — rendered inside the max-width inner wrapper. */
  children: ReactNode

  /**
   * Content rendered inside the outer container but *outside* the max-width
   * wrapper. Use for absolutely-positioned overlays (e.g. scroll-cue, badges)
   * that need to escape the content column.
   */
  overlay?: ReactNode

  // — Outer full-screen container ——————————————————————————————————————————
  /** Additional classes merged onto the outer div. */
  className?: string
  /**
   * When true (default), the outer container is a flex centre
   * (`items-center justify-center`). Set false for scenes that manage their
   * own vertical rhythm.
   */
  centered?: boolean

  // — Inner max-width content wrapper ———————————————————————————————————————
  /** Additional classes merged onto the inner wrapper. */
  innerClassName?: string
  /** Max-width in layout pixels. Default 1200. */
  maxWidth?: number
  /**
   * Apply `px-8` horizontal padding to the inner wrapper. Default true.
   * Set false when each column manages its own horizontal padding (e.g.
   * Scene007 where the right panel has a different background).
   */
  padX?: boolean

  // — Background texture ————————————————————————————————————————————————————
  /** 'grid' | 'stripes' | 'none'. Default 'grid'. */
  background?: StoryBackground
  /** Pattern opacity (0–1). Default 0.035. */
  backgroundOpacity?: number
  /** Grid cell size in px. Only used when `background="grid"`. Default 40. */
  gridCellSize?: number
  /** Gap between stripes in px. Only used when `background="stripes"`. Default 24. */
  stripeSpacing?: number
  /** Stripe angle in degrees. Only used when `background="stripes"`. Default -45. */
  stripeAngle?: number
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Shared full-screen wrapper for storytelling scenes.
 *
 * Eliminates the repeated outer-container + background + inner max-width
 * boilerplate present in every scene. Reads `--story-*` CSS custom properties
 * from the active `[data-story-theme]` ancestor so colours and font sizes
 * update automatically when the user switches between dark and light themes.
 *
 * ## Font scale
 *
 * Scene content should reference the `--story-fs-*` tokens for all font sizes
 * instead of hardcoded px / rem values. The full token set is defined in
 * `ScrollyTelling.tsx`'s `THEME_CSS` block — changing a value there propagates
 * to every scene at once.
 *
 * | Token                | Value          | Use case                            |
 * |----------------------|----------------|-------------------------------------|
 * | `--story-fs-xs`      | 0.75 rem (12px)| Tag pills, micro labels             |
 * | `--story-fs-label`   | 0.8125rem (13px)| Overline / metadata labels         |
 * | `--story-fs-sm`      | 0.9375rem (15px)| Secondary body, dense-card text    |
 * | `--story-fs-base`    | 1.0625rem (17px)| Primary body copy                  |
 * | `--story-fs-title`   | 1.25rem  (20px)| Card headings (h3)                 |
 * | `--story-fs-h2-sm`   | clamp(2–2.6rem)| Section headline, narrow layout    |
 * | `--story-fs-h2`      | clamp(2.2–3.2rem)| Section headline, standard       |
 * | `--story-fs-h2-lg`   | clamp(2.8–4.5rem)| CTA / feature headline           |
 *
 * @example
 * ```tsx
 * <StorytellingLayout
 *   containerRef={containerRef}
 *   background="stripes"
 *   backgroundOpacity={0.04}
 *   innerClassName="grid grid-cols-2 gap-12 items-center"
 * >
 *   {children}
 * </StorytellingLayout>
 * ```
 */
export function StorytellingLayout({
  containerRef,
  children,
  overlay,
  className,
  centered = true,
  innerClassName,
  maxWidth = 1200,
  padX = true,
  background = 'grid',
  backgroundOpacity = 0.035,
  gridCellSize = 40,
  stripeSpacing = 24,
  stripeAngle = -45,
}: StorytellingLayoutProps) {
  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-screen overflow-hidden',
        centered && 'flex items-center justify-center',
        className,
      )}
      style={{ background: 'var(--story-bg)' }}
    >
      {background === 'grid' && (
        <GridBackground
          lineColor="var(--story-line-hex)"
          cellSize={gridCellSize}
          opacity={backgroundOpacity}
        />
      )}
      {background === 'stripes' && (
        <StripedBackground
          lineColor="var(--story-line-hex)"
          stripeSpacing={stripeSpacing}
          angle={stripeAngle}
          opacity={backgroundOpacity}
        />
      )}

      {/* Max-width content column */}
      <div
        className={cn('relative w-full mx-auto', padX && 'px-8', innerClassName)}
        style={{ maxWidth }}
      >
        {children}
      </div>

      {/* Overlay slot — absolutely positioned content that escapes the content column */}
      {overlay}
    </div>
  )
}

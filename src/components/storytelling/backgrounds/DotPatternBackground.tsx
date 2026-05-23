import { cn } from '@/lib/utils'
import { DotPattern } from '@/components/ui/dot-pattern'

interface DotPatternBackgroundProps {
  /** Horizontal spacing between dots in px. Default: 16 */
  width?: number
  /** Vertical spacing between dots in px. Default: 16 */
  height?: number
  /** Dot radius in px. Default: 1 */
  cr?: number
  /** Enable glowing pulse animation. Default: false */
  glow?: boolean
  /** Pattern opacity (0–1). Default: 1 */
  opacity?: number
  /** Extra classes merged onto the SVG element (e.g. mask-image utilities) */
  className?: string
}

/**
 * Absolute-inset SVG overlay that renders a dot grid texture.
 * Powered by the MagicUI DotPattern component.
 * Place inside any `relative overflow-hidden` container.
 *
 * Requires `client:load` or `client:only="react"` on the parent when using
 * `glow={true}`, as glow animates via browser measurements.
 *
 * Apply a radial-gradient mask via `className` to fade the grid at the edges:
 *
 * @example
 * <div className="relative bg-neutral-950">
 *   <DotPatternBackground
 *     glow
 *     className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
 *   />
 *   {children}
 * </div>
 */
export function DotPatternBackground({
  width = 16,
  height = 16,
  cr = 1,
  glow = false,
  opacity = 1,
  className,
}: DotPatternBackgroundProps) {
  return (
    <DotPattern
      width={width}
      height={height}
      cr={cr}
      glow={glow}
      style={{ opacity }}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80',
        className,
      )}
    />
  )
}

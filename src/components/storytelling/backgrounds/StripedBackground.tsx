import { cn } from '../../../lib/utils'

interface StripedBackgroundProps {
  /** Line colour — any CSS colour string. Default: #000000 */
  lineColor?: string
  /** Gap between stripes in px. Default: 20 */
  stripeSpacing?: number
  /** Angle of stripes in degrees. Default: -45 */
  angle?: number
  /** Pattern opacity (0–1). Default: 0.04 */
  opacity?: number
  /** Extra classes merged onto the overlay div */
  className?: string
}

/**
 * Absolute-inset overlay that renders diagonal stripe texture.
 * Place inside any `relative overflow-hidden` container.
 *
 * @example
 * <div className="relative bg-neutral-50">
 *   <StripedBackground lineColor="#000" stripeSpacing={20} opacity={0.04} />
 *   {children}
 * </div>
 */
export function StripedBackground({
  lineColor = '#000000',
  stripeSpacing = 20,
  angle = -45,
  opacity = 0.04,
  className,
}: StripedBackgroundProps) {
  const gap = stripeSpacing - 1
  const backgroundImage = `repeating-linear-gradient(${angle}deg, transparent, transparent ${gap}px, ${lineColor} ${gap}px, ${lineColor} ${stripeSpacing}px)`

  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ backgroundImage, opacity }}
    />
  )
}

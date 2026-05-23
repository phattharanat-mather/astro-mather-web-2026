import { cn } from '../../../lib/utils'

interface GridBackgroundProps {
  /** Line colour — any CSS colour string. Default: #ffffff */
  lineColor?: string
  /** Grid cell size in px. Default: 40 */
  cellSize?: number
  /** Pattern opacity (0–1). Default: 0.03 */
  opacity?: number
  /** Extra classes merged onto the overlay div */
  className?: string
}

/**
 * Absolute-inset overlay that renders a fine grid texture.
 * Place inside any `relative overflow-hidden` container.
 *
 * @example
 * <div className="relative bg-neutral-950">
 *   <GridBackground lineColor="#fff" cellSize={40} opacity={0.03} />
 *   {children}
 * </div>
 */
export function GridBackground({
  lineColor = '#ffffff',
  cellSize = 40,
  opacity = 0.03,
  className,
}: GridBackgroundProps) {
  const line = cellSize - 1
  const backgroundImage = [
    `repeating-linear-gradient(0deg, transparent, transparent ${line}px, ${lineColor} ${line}px, ${lineColor} ${cellSize}px)`,
    `repeating-linear-gradient(90deg, transparent, transparent ${line}px, ${lineColor} ${line}px, ${lineColor} ${cellSize}px)`,
  ].join(', ')

  return (
    <div
      aria-hidden
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ backgroundImage, opacity }}
    />
  )
}

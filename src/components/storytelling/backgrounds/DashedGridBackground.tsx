import { useId } from 'react'
import { cn } from '@/lib/utils'

interface DashedGridBackgroundProps {
  /** Grid cell width in px. Default: 30 */
  width?: number
  /** Grid cell height in px. Default: 30 */
  height?: number
  /** Pattern x offset in px. Default: -1 */
  x?: number
  /** Pattern y offset in px. Default: -1 */
  y?: number
  /** SVG strokeDasharray value. Default: "4 2" */
  strokeDasharray?: string
  /** Stroke colour — any CSS colour string. Default: currentColor */
  strokeColor?: string
  /** Pattern opacity (0–1). Default: 0.3 */
  opacity?: number
  /** Extra classes merged onto the SVG element (e.g. mask-image utilities) */
  className?: string
}

/**
 * Absolute-inset SVG overlay that renders a dashed grid texture.
 * Place inside any `relative overflow-hidden` container.
 *
 * Apply a radial-gradient mask via `className` to fade the grid at the edges:
 *
 * @example
 * <div className="relative bg-neutral-950">
 *   <DashedGridBackground
 *     strokeDasharray="4 2"
 *     className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
 *   />
 *   {children}
 * </div>
 */
export function DashedGridBackground({
  width = 30,
  height = 30,
  x = -1,
  y = -1,
  strokeDasharray = '4 2',
  strokeColor,
  opacity = 0.3,
  className,
}: DashedGridBackgroundProps) {
  const id = useId()

  return (
    <svg
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        'fill-transparent stroke-neutral-400/30',
        className,
      )}
      style={{ opacity, ...(strokeColor ? { color: strokeColor } : {}) }}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke={strokeColor ?? 'currentColor'}
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}

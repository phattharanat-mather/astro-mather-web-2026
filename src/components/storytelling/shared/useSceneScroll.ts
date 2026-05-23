import { useEffect, useRef } from 'react'
import { useMotionValue, type MotionValue } from 'motion/react'

export type ScrollDirection = 'forward' | 'backward'

/**
 * Virtual scroll hook — intercepts wheel/touch events on the container
 * without moving the DOM. Returns a MotionValue<number> (0→1).
 *
 * Content stays fixed and centered in the viewport; animations are driven
 * entirely by useTransform(progress, ...) in each scene.
 *
 * onComplete(direction) fires (once, debounced) when user scrolls past
 * the 0 or 1 boundary.
 */
export function useSceneScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onComplete: (direction: ScrollDirection) => void,
  scrollRange = 1200,
): MotionValue<number> {
  const progress = useMotionValue(0)
  const onCompleteRef = useRef(onComplete)
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const rafRef = useRef<number>(0)
  // Cooldown prevents repeated scene-change firings from a single overscroll burst
  const cooldownRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    // Reset on scene entry
    progress.set(0)
    targetRef.current = 0
    currentRef.current = 0
    cooldownRef.current = false

    // Smooth lerp animation loop
    function tick() {
      const diff = targetRef.current - currentRef.current
      if (Math.abs(diff) > 0.0002) {
        currentRef.current += diff * 0.1
        progress.set(Math.max(0, Math.min(1, currentRef.current)))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    function triggerComplete(dir: ScrollDirection) {
      if (cooldownRef.current) return
      cooldownRef.current = true
      onCompleteRef.current(dir)
      // Allow re-triggering after 600ms (scene transition should have started)
      setTimeout(() => { cooldownRef.current = false }, 600)
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const prev = targetRef.current
      const next = Math.max(0, Math.min(1, prev + e.deltaY / scrollRange))
      targetRef.current = next

      if (prev >= 1 && e.deltaY > 0) {
        triggerComplete('forward')
      } else if (prev <= 0 && e.deltaY < 0) {
        triggerComplete('backward')
      }
    }

    let touchStartY = 0
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY
    }
    function onTouchMove(e: TouchEvent) {
      e.preventDefault()
      const dy = touchStartY - e.touches[0].clientY
      touchStartY = e.touches[0].clientY
      const prev = targetRef.current
      const next = Math.max(0, Math.min(1, prev + dy / (scrollRange * 0.5)))
      targetRef.current = next

      if (prev >= 1 && dy > 0) triggerComplete('forward')
      else if (prev <= 0 && dy < 0) triggerComplete('backward')
    }

    const el = containerRef.current
    if (!el) return

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      cancelAnimationFrame(rafRef.current)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
    }
  }, [containerRef, scrollRange]) // eslint-disable-line react-hooks/exhaustive-deps

  return progress
}

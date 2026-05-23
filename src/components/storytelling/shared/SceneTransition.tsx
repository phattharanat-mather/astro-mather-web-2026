import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'

export type TransitionVariant = 'slide' | 'fade' | 'cut'

interface Props {
  children: ReactNode
  sceneKey: string | number
  direction: 1 | -1
  variant?: TransitionVariant
}

/**
 * Wrap scene changes in an AnimatePresence transition.
 * AnimatePresence is mounted once; sceneKey changes drive enter/exit.
 */
export function SceneTransition({ children, sceneKey, direction, variant = 'slide' }: Props) {
  const getInitial = () => {
    if (variant === 'fade') return { opacity: 0, x: 0 }
    if (variant === 'cut') return { opacity: 1, x: 0 }
    return { x: direction > 0 ? '100%' : '-100%', opacity: 1 }
  }

  const getAnimate = () => ({ x: 0, opacity: 1 })

  const getExit = () => {
    if (variant === 'fade') return { opacity: 0, x: 0 }
    if (variant === 'cut') return { opacity: 1, x: 0 }
    return { x: direction > 0 ? '-100%' : '100%', opacity: 1 }
  }

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={sceneKey}
        initial={getInitial()}
        animate={getAnimate()}
        exit={getExit()}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

import { useRef } from 'react'
import { motion } from 'motion/react'
import { useSceneScroll } from '../../shared/useSceneScroll'
import { useStoryEngine } from '../StoryEngine'
import type { SceneProps } from '../../../../data/storytelling/credential'

export default function Scene008ProjectsDivider({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col items-center justify-center relative bg-neutral-50 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, #000 20px, #000 21px)` }}
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-neutral-400 text-[11px] tracking-[0.3em] uppercase mb-6"
        >
          Chapter 03
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-neutral-900 leading-none"
          style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
        >
          Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-neutral-400 mt-6 max-w-md text-[15px] leading-relaxed"
        >
          A selection of our work across web, mobile, AI, and data strategy.
        </motion.p>
      </div>
    </div>
  )
}

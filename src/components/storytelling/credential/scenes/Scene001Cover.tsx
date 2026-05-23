import { useRef } from 'react'
import { motion } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import type { SceneProps } from '@/data/storytelling/credential'

export default function Scene001Cover({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene } = useStoryEngine()

  useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
  })

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col items-center justify-center relative bg-neutral-950 overflow-hidden"
    >
      <GridBackground lineColor="#ffffff" cellSize={40} opacity={0.03} />

      {/* Content — centered, max 1200px */}
      <div className="relative w-full max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-neutral-500 text-[11px] tracking-[0.3em] uppercase mb-8"
        >
          Company Credential · 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-white leading-none tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
        >
          The Mather
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="text-neutral-400 mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          Data is the book.{' '}
          <span className="text-neutral-300">AI be the learner.</span>{' '}
          <span className="text-white font-medium">We are the helper.</span>
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-neutral-600 text-[10px] tracking-[0.2em] uppercase">Scroll to begin</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-neutral-600 to-transparent"
        />
      </motion.div>
    </div>
  )
}

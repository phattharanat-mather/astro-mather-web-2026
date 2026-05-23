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
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--story-bg)' }}
    >
      <GridBackground lineColor="var(--story-line-hex)" cellSize={40} opacity={0.04} />

      {/* Content */}
      <div className="relative w-full max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-[11px] tracking-[0.3em] uppercase mb-8"
          style={{ color: 'var(--story-fg-muted)' }}
        >
          Company Credential · 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="leading-none tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', color: 'var(--story-fg)' }}
        >
          The Mather
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-6 max-w-xl leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'var(--story-fg-muted)' }}
        >
          Data is the book.{' '}
          <span style={{ color: 'var(--story-fg)', opacity: 0.75 }}>AI be the learner.</span>{' '}
          <span style={{ color: 'var(--story-fg)', fontWeight: 500 }}>We are the helper.</span>
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--story-fg-muted)' }}>
          Scroll to begin
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, var(--story-fg-muted), transparent)' }}
        />
      </motion.div>
    </div>
  )
}

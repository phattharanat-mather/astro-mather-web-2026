import { useRef } from 'react'
import { motion } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { StorytellingLayout } from '@/components/storytelling/credential/StorytellingLayout'
import type { SceneProps } from '@/data/storytelling/credential'

export default function Scene001Cover({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene } = useStoryEngine()

  useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
  })

  return (
    <StorytellingLayout
      containerRef={containerRef}
      backgroundOpacity={0.04}
      innerClassName="flex flex-col items-center text-center"
      overlay={
        /* Scroll cue — positioned relative to the full-screen container */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span
            className="tracking-[0.2em] uppercase"
            style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}
          >
            Scroll to begin
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, var(--story-fg-muted), transparent)' }}
          />
        </motion.div>
      }
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="tracking-[0.3em] uppercase mb-8"
        style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
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
        style={{ fontSize: 'var(--story-fs-base)', color: 'var(--story-fg-muted)' }}
      >
        Data is the book.{' '}
        <span style={{ color: 'var(--story-fg)', opacity: 0.75 }}>AI be the learner.</span>{' '}
        <span style={{ color: 'var(--story-fg)', fontWeight: 500 }}>We are the helper.</span>
      </motion.p>
    </StorytellingLayout>
  )
}

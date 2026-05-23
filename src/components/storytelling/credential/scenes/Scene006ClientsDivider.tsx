import { useRef } from 'react'
import { motion } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { StorytellingLayout } from '@/components/storytelling/credential/StorytellingLayout'
import type { SceneProps } from '@/data/storytelling/credential'

export default function Scene006ClientsDivider({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  return (
    <StorytellingLayout
      containerRef={containerRef}
      gridCellSize={60}
      backgroundOpacity={0.05}
      innerClassName="flex flex-col items-center text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="tracking-[0.3em] uppercase mb-6"
        style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
      >
        Chapter 02
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="leading-none"
        style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', color: 'var(--story-fg)' }}
      >
        Clients
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-6 max-w-md leading-relaxed"
        style={{ fontSize: 'var(--story-fs-base)', color: 'var(--story-fg-muted)' }}
      >
        Trusted by leading organisations across Thailand and Southeast Asia.
      </motion.p>
    </StorytellingLayout>
  )
}

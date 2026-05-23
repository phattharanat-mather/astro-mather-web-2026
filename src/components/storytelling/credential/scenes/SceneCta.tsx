import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import type { SceneProps } from '@/data/storytelling/credential'

export default function SceneCta({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'backward') prevScene()
  })

  const headlineOpacity = useTransform(progress, [0, 0.3], [0, 1])
  const headlineY = useTransform(progress, [0, 0.3], [24, 0])
  const subOpacity = useTransform(progress, [0.1, 0.35], [0, 1])
  const btnOpacity = useTransform(progress, [0.2, 0.4], [0, 1])
  const btnY = useTransform(progress, [0.2, 0.4], [16, 0])

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--story-invert-bg)' }}
    >
      <GridBackground lineColor="var(--story-line-hex)" cellSize={40} opacity={0.05} />

      <div className="relative w-full max-w-[1200px] mx-auto px-8 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[11px] tracking-[0.3em] uppercase mb-8"
          style={{ color: 'var(--story-invert-muted)' }}
        >
          The Mather · Bangkok, Thailand
        </motion.p>

        <motion.h2
          style={{
            opacity: headlineOpacity,
            y: headlineY,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: 'var(--story-invert-fg)',
          }}
          className="leading-tight max-w-2xl"
        >
          The right partner is closer than you think.
        </motion.h2>

        <motion.p
          style={{ opacity: subOpacity, color: 'var(--story-invert-muted)' }}
          className="mt-6 max-w-md text-[15px] leading-relaxed"
        >
          Let's talk about your data, your systems, and how we can help you move faster
          with more confidence.
        </motion.p>

        <motion.div
          style={{ opacity: btnOpacity, y: btnY }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-[14px] transition-colors"
            style={{ background: 'var(--story-invert-fg)', color: 'var(--story-invert-bg)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
          >
            Start a project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="mailto:info@themather.asia"
            className="text-[13px] transition-colors"
            style={{ color: 'var(--story-invert-muted)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--story-invert-fg)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--story-invert-muted)' }}
          >
            info@themather.asia
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-[11px] tracking-wide"
          style={{ color: 'var(--story-invert-muted)', opacity: 0.6 }}
        >
          555 Rasa Tower, Phahonyothin Rd, Chatuchak, Bangkok 10900
          <span className="mx-3">·</span>+02 937 0555
        </motion.div>
      </div>
    </div>
  )
}

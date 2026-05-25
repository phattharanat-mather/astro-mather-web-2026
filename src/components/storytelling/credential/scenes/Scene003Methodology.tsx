import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { StorytellingLayout } from '@/components/storytelling/credential/StorytellingLayout'
import type { SceneProps } from '@/data/storytelling/credential'

// Alternating surface/bg creates a checkerboard — both tokens adapt to the active theme.
const QUADRANTS = [
  { letter: 'M', title: 'Methodology', description: 'Proven process design — every project starts with a structured framework tailored to your goals.', alt: true },
  { letter: 'A', title: 'Mathematics', description: 'Statistical rigour — we let data speak through quantitative and qualitative analysis.', alt: false },
  { letter: 'T', title: 'Machine Learning', description: 'AI that learns — models trained on your data, built to avoid unconscious human error.', alt: false },
  { letter: 'H', title: 'Matching', description: 'Right-fit solutions — matching technology choices to business context, not trends.', alt: true },
]

export default function Scene003Methodology({ isActive: _isActive, direction }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  }, 1200, direction === -1 ? 1 : 0)

  const headerOpacity = useTransform(progress, [0, 0.12], [0, 1])
  const headerY = useTransform(progress, [0, 0.12], [16, 0])

  const s0 = useTransform(progress, [0, 0.18], [0.88, 1]); const o0 = useTransform(progress, [0, 0.18], [0, 1])
  const s1 = useTransform(progress, [0.22, 0.40], [0.88, 1]); const o1 = useTransform(progress, [0.22, 0.40], [0, 1])
  const s2 = useTransform(progress, [0.44, 0.62], [0.88, 1]); const o2 = useTransform(progress, [0.44, 0.62], [0, 1])
  const s3 = useTransform(progress, [0.66, 0.84], [0.88, 1]); const o3 = useTransform(progress, [0.66, 0.84], [0, 1])

  const qt = [{ s: s0, o: o0 }, { s: s1, o: o1 }, { s: s2, o: o2 }, { s: s3, o: o3 }]

  return (
    <StorytellingLayout
      containerRef={containerRef}
      backgroundOpacity={0.03}
    >
      <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-8">
        <p
          className="tracking-[0.25em] uppercase mb-2"
          style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
        >
          Our Framework
        </p>
        <h2 style={{ fontSize: 'var(--story-fs-h2)', color: 'var(--story-fg)' }}>
          The 4M Methodology
        </h2>
        <p
          className="mt-2 max-w-lg leading-relaxed"
          style={{ fontSize: 'var(--story-fs-base)', color: 'var(--story-fg-muted)' }}
        >
          Every engagement follows the same four principles — no exceptions.
        </p>
      </motion.div>

      <div
        className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden max-w-3xl"
        style={{ background: 'var(--story-line)', border: '1px solid var(--story-line)' }}
      >
        {QUADRANTS.map((q, i) => (
          <motion.div
            key={q.letter}
            style={{
              scale: qt[i].s,
              opacity: qt[i].o,
              background: q.alt ? 'var(--story-surface)' : 'var(--story-bg)',
              color: 'var(--story-fg)',
            }}
            className="p-8 lg:p-10"
          >
            <span
              className="font-bold leading-none block mb-4 opacity-20"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              {q.letter}
            </span>
            <h3
              className="font-semibold mb-2"
              style={{ fontSize: 'var(--story-fs-title)' }}
            >
              {q.title}
            </h3>
            <p
              className="leading-relaxed"
              style={{ fontSize: 'var(--story-fs-sm)', color: 'var(--story-fg-muted)' }}
            >
              {q.description}
            </p>
          </motion.div>
        ))}
      </div>
    </StorytellingLayout>
  )
}

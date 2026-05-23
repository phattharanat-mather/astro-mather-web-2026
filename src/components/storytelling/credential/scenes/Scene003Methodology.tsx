import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import type { SceneProps } from '@/data/storytelling/credential'

// Dark quads use invert tokens; light quads use surface tokens — works in both themes.
const QUADRANTS = [
  { letter: 'M', title: 'Methodology', description: 'Proven process design — every project starts with a structured framework tailored to your goals.', dark: true },
  { letter: 'A', title: 'Mathematics', description: 'Statistical rigour — we let data speak through quantitative and qualitative analysis.', dark: false },
  { letter: 'T', title: 'Machine Learning', description: 'AI that learns — models trained on your data, built to avoid unconscious human error.', dark: false },
  { letter: 'H', title: 'Matching', description: 'Right-fit solutions — matching technology choices to business context, not trends.', dark: true },
]

export default function Scene003Methodology({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  const headerOpacity = useTransform(progress, [0, 0.12], [0, 1])
  const headerY = useTransform(progress, [0, 0.12], [16, 0])

  const s0 = useTransform(progress, [0, 0.18], [0.88, 1]); const o0 = useTransform(progress, [0, 0.18], [0, 1])
  const s1 = useTransform(progress, [0.22, 0.40], [0.88, 1]); const o1 = useTransform(progress, [0.22, 0.40], [0, 1])
  const s2 = useTransform(progress, [0.44, 0.62], [0.88, 1]); const o2 = useTransform(progress, [0.44, 0.62], [0, 1])
  const s3 = useTransform(progress, [0.66, 0.84], [0.88, 1]); const o3 = useTransform(progress, [0.66, 0.84], [0, 1])

  const qt = [{ s: s0, o: o0 }, { s: s1, o: o1 }, { s: s2, o: o2 }, { s: s3, o: o3 }]

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--story-bg)' }}
    >
      <GridBackground lineColor="var(--story-line-hex)" cellSize={40} opacity={0.03} />
      <div className="relative w-full max-w-[1200px] mx-auto px-8">

        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-8">
          <p className="text-[11px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--story-fg-muted)' }}>
            Our Framework
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--story-fg)' }}>
            The 4M Methodology
          </h2>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed" style={{ color: 'var(--story-fg-muted)' }}>
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
                background: q.dark ? 'var(--story-invert-bg)' : 'var(--story-surface)',
                color: q.dark ? 'var(--story-invert-fg)' : 'var(--story-fg)',
              }}
              className="p-8 lg:p-10"
            >
              <span
                className="font-bold leading-none block mb-4 opacity-20"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
              >
                {q.letter}
              </span>
              <h3 className="font-semibold text-base mb-2">{q.title}</h3>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: q.dark ? 'var(--story-invert-muted)' : 'var(--story-fg-muted)' }}
              >
                {q.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

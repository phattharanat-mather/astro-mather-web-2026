import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import type { SceneProps } from '@/data/storytelling/credential'

const QUADRANTS = [
  { letter: 'M', title: 'Methodology', description: 'Proven process design — every project starts with a structured framework tailored to your goals.', color: 'bg-neutral-900', textColor: 'text-white', descColor: 'text-neutral-400' },
  { letter: 'A', title: 'Mathematics', description: 'Statistical rigour — we let data speak through quantitative and qualitative analysis.', color: 'bg-neutral-100', textColor: 'text-neutral-900', descColor: 'text-neutral-500' },
  { letter: 'T', title: 'Machine Learning', description: 'AI that learns — models trained on your data, built to avoid unconscious human error.', color: 'bg-neutral-100', textColor: 'text-neutral-900', descColor: 'text-neutral-500' },
  { letter: 'H', title: 'Matching', description: 'Right-fit solutions — matching technology choices to business context, not trends.', color: 'bg-neutral-900', textColor: 'text-white', descColor: 'text-neutral-400' },
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
      className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <GridBackground lineColor="#000000" cellSize={40} opacity={0.025} />
      <div className="relative w-full max-w-[1200px] mx-auto px-8">

        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-8">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-2">Our Framework</p>
          <h2
            className="text-neutral-900"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            The 4M Methodology
          </h2>
          <p className="text-neutral-400 mt-2 max-w-lg text-[15px] leading-relaxed">
            Every engagement follows the same four principles — no exceptions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-px bg-neutral-100 border border-neutral-100 rounded-2xl overflow-hidden max-w-3xl">
          {QUADRANTS.map((q, i) => (
            <motion.div
              key={q.letter}
              style={{ scale: qt[i].s, opacity: qt[i].o }}
              className={`${q.color} ${q.textColor} p-8 lg:p-10`}
            >
              <span
                className="font-bold leading-none block mb-4 opacity-20"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                {q.letter}
              </span>
              <h3 className="font-semibold text-base mb-2">{q.title}</h3>
              <p className={`text-[13px] leading-relaxed ${q.descColor}`}>{q.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import type { SceneProps } from '@/data/storytelling/credential'

const LETTERS = ['M', 'A', 'T', 'H', 'E', 'R']
const FONT_LARGE = 'clamp(2.5rem, 7vw, 5rem)'

export default function Scene002Intro({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  // Letter transforms (6 letters, staggered 0→0.36)
  const l0Op = useTransform(progress, [0, 0.06], [0, 1]); const l0Y = useTransform(progress, [0, 0.08], [30, 0])
  const l1Op = useTransform(progress, [0.06, 0.12], [0, 1]); const l1Y = useTransform(progress, [0.06, 0.14], [30, 0])
  const l2Op = useTransform(progress, [0.12, 0.18], [0, 1]); const l2Y = useTransform(progress, [0.12, 0.20], [30, 0])
  const l3Op = useTransform(progress, [0.18, 0.24], [0, 1]); const l3Y = useTransform(progress, [0.18, 0.26], [30, 0])
  const l4Op = useTransform(progress, [0.24, 0.30], [0, 1]); const l4Y = useTransform(progress, [0.24, 0.32], [30, 0])
  const l5Op = useTransform(progress, [0.30, 0.36], [0, 1]); const l5Y = useTransform(progress, [0.30, 0.38], [30, 0])

  const letterTransforms = [
    { opacity: l0Op, y: l0Y }, { opacity: l1Op, y: l1Y }, { opacity: l2Op, y: l2Y },
    { opacity: l3Op, y: l3Y }, { opacity: l4Op, y: l4Y }, { opacity: l5Op, y: l5Y },
  ]

  const subtitleOpacity = useTransform(progress, [0.3, 0.5], [0, 1])
  const textOpacity = useTransform(progress, [0.4, 0.65], [0, 1])
  const textY = useTransform(progress, [0.4, 0.65], [24, 0])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <GridBackground lineColor="#000000" cellSize={40} opacity={0.025} />
      <div className="relative w-full max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

        {/* Left — animated wordmark */}
        <div>
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-8">
            Introduction
          </p>
          <div className="flex gap-1 lg:gap-2 mb-6">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                style={{ opacity: letterTransforms[i].opacity, y: letterTransforms[i].y, fontSize: FONT_LARGE }}
                className="text-neutral-900 font-bold leading-none"
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <motion.p style={{ opacity: subtitleOpacity }} className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Four principles. One methodology.
          </motion.p>
        </div>

        {/* Right — company intro */}
        <motion.div style={{ opacity: textOpacity, y: textY }}>
          <p className="text-[11px] tracking-[0.25em] text-neutral-300 uppercase mb-6">
            Who we are
          </p>
          <h2
            className="text-neutral-900 leading-tight mb-6"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            We're a data and technology company headquartered in Bangkok, Thailand.
          </h2>
          <div className="space-y-4 text-neutral-500 leading-relaxed text-[15px]">
            <p>
              The Mather partners with businesses across Southeast Asia to turn raw data into
              confident decisions — through AI, analytics, and purpose-built digital products.
            </p>
            <p>
              Our name comes from the four cornerstones that guide every engagement:{' '}
              <strong className="text-neutral-700">Methodology</strong>,{' '}
              <strong className="text-neutral-700">Mathematics</strong>,{' '}
              <strong className="text-neutral-700">Machine Learning</strong>, and{' '}
              <strong className="text-neutral-700">Matching</strong> — the 4M framework.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <p className="text-[11px] tracking-[0.2em] text-neutral-300 uppercase mb-3">Founded by</p>
            <p className="text-neutral-700 font-medium">Somprasonk Gabbualoy</p>
            <p className="text-neutral-400 text-sm mt-1">
              "Quality work at a fair price — we handle the complexity so you don't have to."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

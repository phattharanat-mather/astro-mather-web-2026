import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { GridBackground } from '@/components/storytelling/backgrounds/GridBackground'
import type { SceneProps } from '@/data/storytelling/credential'

const WEB_PROJECTS = [
  { name: 'Hachiban', category: 'Restaurant Chain', desc: "Digital platform for Japan's leading ramen chain in Thailand" },
  { name: 'Manoottangwai', category: 'E-Commerce', desc: 'Online retail experience with data-driven product discovery' },
  { name: 'Eartone', category: 'Audio Brand', desc: 'Brand identity and web presence for an audio technology brand' },
  { name: 'CIMB Thai Auto', category: 'Financial Services', desc: 'Auto loan application platform for CIMB Thai Bank' },
  { name: 'Cultural Fund', category: 'Government', desc: 'Ministry of Culture grant management system' },
  { name: 'DII', category: 'Industrial', desc: 'Data-driven industrial intelligence platform' },
  { name: 'Blue Alain Ducasse', category: 'Luxury F&B', desc: 'Digital presence for the Alain Ducasse restaurant group in Thailand' },
  { name: 'Ainu', category: 'Lifestyle', desc: 'Brand and digital experience for a Thai lifestyle brand' },
  { name: 'Singha Corporation', category: 'Conglomerate', desc: "Web strategy and development for Thailand's Singha group" },
  { name: 'PAC Architect', category: 'Architecture', desc: 'Portfolio and client-facing web platform for PAC Architect' },
]

export default function Scene009WebApps({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  const headerOpacity = useTransform(progress, [0, 0.1], [0, 1])
  const headerY = useTransform(progress, [0, 0.1], [16, 0])

  const c0Op = useTransform(progress, [0.05, 0.12], [0, 1]); const c0Y = useTransform(progress, [0.05, 0.12], [20, 0])
  const c1Op = useTransform(progress, [0.12, 0.19], [0, 1]); const c1Y = useTransform(progress, [0.12, 0.19], [20, 0])
  const c2Op = useTransform(progress, [0.19, 0.26], [0, 1]); const c2Y = useTransform(progress, [0.19, 0.26], [20, 0])
  const c3Op = useTransform(progress, [0.26, 0.33], [0, 1]); const c3Y = useTransform(progress, [0.26, 0.33], [20, 0])
  const c4Op = useTransform(progress, [0.33, 0.40], [0, 1]); const c4Y = useTransform(progress, [0.33, 0.40], [20, 0])
  const c5Op = useTransform(progress, [0.40, 0.47], [0, 1]); const c5Y = useTransform(progress, [0.40, 0.47], [20, 0])
  const c6Op = useTransform(progress, [0.47, 0.54], [0, 1]); const c6Y = useTransform(progress, [0.47, 0.54], [20, 0])
  const c7Op = useTransform(progress, [0.54, 0.61], [0, 1]); const c7Y = useTransform(progress, [0.54, 0.61], [20, 0])
  const c8Op = useTransform(progress, [0.61, 0.68], [0, 1]); const c8Y = useTransform(progress, [0.61, 0.68], [20, 0])
  const c9Op = useTransform(progress, [0.68, 0.75], [0, 1]); const c9Y = useTransform(progress, [0.68, 0.75], [20, 0])

  const ct = [
    { o: c0Op, y: c0Y }, { o: c1Op, y: c1Y }, { o: c2Op, y: c2Y },
    { o: c3Op, y: c3Y }, { o: c4Op, y: c4Y }, { o: c5Op, y: c5Y },
    { o: c6Op, y: c6Y }, { o: c7Op, y: c7Y }, { o: c8Op, y: c8Y },
    { o: c9Op, y: c9Y },
  ]

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <GridBackground lineColor="#000000" cellSize={40} opacity={0.025} />
      <div className="relative w-full max-w-[1200px] mx-auto px-8">

        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-8">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-2">Web Applications</p>
          <h2
            className="text-neutral-900"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Digital products that represent brands
          </h2>
          <p className="text-neutral-400 mt-2 max-w-lg text-[15px]">
            {WEB_PROJECTS.length} projects — from fintech to luxury hospitality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-100 border border-neutral-100 rounded-2xl overflow-hidden">
          {WEB_PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              style={{ opacity: ct[i].o, y: ct[i].y }}
              className="bg-white p-5 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-1.5">
                <h3 className="text-neutral-900 font-semibold text-[15px]">{project.name}</h3>
                <span className="shrink-0 text-[10px] tracking-wide bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">{project.category}</span>
              </div>
              <p className="text-neutral-400 text-[13px] leading-relaxed">{project.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '../../shared/useSceneScroll'
import { useStoryEngine } from '../StoryEngine'
import type { SceneProps } from '../../../../data/storytelling/credential'

const CLIENTS_ROW_1 = ['PTT', 'Chevron', 'Singha Corporation', 'CIMB Thai Auto', 'Haier', 'Sansiri', 'PTT', 'Chevron', 'Singha Corporation', 'CIMB Thai Auto', 'Haier', 'Sansiri']
const CLIENTS_ROW_2 = ['Thai-Denmark', 'LINE BK', 'Ministry of Culture', 'BMA', 'Autodeft', 'SACIT', 'Thai-Denmark', 'LINE BK', 'Ministry of Culture', 'BMA', 'Autodeft', 'SACIT']
const CLIENTS_ROW_3 = ['Medisana', 'Erik Kayser', 'Hachiban', 'Ainu', 'Blue Alain Ducasse', 'Manoottangwai', 'Medisana', 'Erik Kayser', 'Hachiban', 'Ainu', 'Blue Alain Ducasse', 'Manoottangwai']

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden py-1.5">
      <div className={`flex gap-3 ${reverse ? 'marquee-reverse' : 'marquee'}`} style={{ width: 'max-content' }}>
        {items.map((name, i) => (
          <div key={`${name}-${i}`} className="shrink-0 px-4 py-2 border border-neutral-200 rounded-xl bg-white text-neutral-500 text-[13px] font-medium whitespace-nowrap">
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Scene007ClientsShowcase({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  const textOpacity = useTransform(progress, [0, 0.2], [0, 1])
  const textY = useTransform(progress, [0, 0.2], [24, 0])
  const stat1Op = useTransform(progress, [0.15, 0.3], [0, 1])
  const stat2Op = useTransform(progress, [0.25, 0.4], [0, 1])
  const stat3Op = useTransform(progress, [0.35, 0.5], [0, 1])

  return (
    <>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee { animation: marquee 30s linear infinite; }
        .marquee-reverse { animation: marquee-reverse 32s linear infinite; }
      `}</style>

      <div
        ref={containerRef}
        className="w-full h-screen flex items-center justify-center bg-white overflow-hidden"
      >
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

          {/* Left — narrative */}
          <div className="px-8 py-12">
            <motion.div style={{ opacity: textOpacity, y: textY }}>
              <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-4">Our clients</p>
              <h2
                className="text-neutral-900 leading-tight mb-6"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
              >
                Trusted by leaders across Thailand and Southeast Asia
              </h2>
              <p className="text-neutral-500 text-[15px] leading-relaxed mb-8">
                From energy conglomerates to restaurant chains, government agencies to luxury brands
                — we've helped organisations of every size harness data to make better decisions.
              </p>
            </motion.div>

            <div className="flex flex-col gap-5">
              <motion.div style={{ opacity: stat1Op }}>
                <p className="text-3xl font-bold text-neutral-900">15+</p>
                <p className="text-neutral-400 text-sm mt-1">Named enterprise clients</p>
              </motion.div>
              <motion.div style={{ opacity: stat2Op }}>
                <p className="text-3xl font-bold text-neutral-900">28+</p>
                <p className="text-neutral-400 text-sm mt-1">Projects delivered</p>
              </motion.div>
              <motion.div style={{ opacity: stat3Op }}>
                <p className="text-3xl font-bold text-neutral-900">4</p>
                <p className="text-neutral-400 text-sm mt-1">Service categories</p>
              </motion.div>
            </div>
          </div>

          {/* Right — CSS marquee */}
          <div className="flex flex-col justify-center gap-3 bg-neutral-50 h-full py-12 px-6 overflow-hidden rounded-r-none lg:rounded-r-2xl">
            <MarqueeRow items={CLIENTS_ROW_1} />
            <MarqueeRow items={CLIENTS_ROW_2} reverse />
            <MarqueeRow items={CLIENTS_ROW_3} />
          </div>
        </div>
      </div>
    </>
  )
}

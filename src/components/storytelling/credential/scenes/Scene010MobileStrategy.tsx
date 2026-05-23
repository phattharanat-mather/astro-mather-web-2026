import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '../../shared/useSceneScroll'
import { useStoryEngine } from '../StoryEngine'
import type { SceneProps } from '../../../../data/storytelling/credential'

const MOBILE = [{ name: 'Haier', category: 'Mobile App', desc: 'iOS & Android application for Haier home appliance management and support' }]
const STRATEGY = [
  { name: 'Sansiri', category: 'Strategy', desc: "Data-driven marketing strategy for Thailand's leading property developer" },
  { name: 'Ainu', category: 'Strategy', desc: 'Consumer insight study and growth strategy for the Ainu lifestyle brand' },
  { name: 'Hi-Class', category: 'Strategy', desc: 'Market positioning and competitive data analysis' },
  { name: 'Toa Group', category: 'Strategy', desc: "Strategic data programme for Thailand's leading paint manufacturer" },
  { name: 'Thai-Denmark', category: 'Strategy', desc: 'Data strategy for a joint-venture dairy brand' },
  { name: 'Medisana', category: 'Strategy', desc: 'Health tech market entry strategy for the Thai market' },
  { name: 'Gracz', category: 'Strategy', desc: 'Gaming brand data and audience strategy' },
  { name: 'Erik Kayser', category: 'AI + Strategy', desc: 'AI-augmented customer insight for a luxury French bakery chain' },
  { name: 'Singha Kameda', category: 'Strategy', desc: 'Data strategy for a Singha-Kameda snack joint venture' },
]
const AI = [
  { name: 'Erik Kayser', category: 'AI', desc: 'Image recognition and customer behaviour AI models for F&B operations' },
  { name: 'Internal R&D', category: 'AI', desc: 'Signal and NLP AI research projects for future product development' },
]
const TEAM = ['Business Development', 'Data & AI Engineering', 'Design', 'Software Development', 'Client Service']

export default function Scene010MobileStrategy({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  const headerOp = useTransform(progress, [0, 0.1], [0, 1])
  const col1Op = useTransform(progress, [0.1, 0.25], [0, 1]); const col1Y = useTransform(progress, [0.1, 0.25], [20, 0])
  const col2Op = useTransform(progress, [0.25, 0.4], [0, 1]); const col2Y = useTransform(progress, [0.25, 0.4], [20, 0])
  const col3Op = useTransform(progress, [0.4, 0.55], [0, 1]); const col3Y = useTransform(progress, [0.4, 0.55], [20, 0])

  function Pill({ label, color }: { label: string; color: string }) {
    return <span className={`text-[10px] px-2 py-0.5 rounded-full ${color}`}>{label}</span>
  }

  return (
    <div ref={containerRef} className="w-full h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-8">

        <motion.div style={{ opacity: headerOp }} className="mb-8">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-2">Mobile, Strategy & AI</p>
          <h2 className="text-neutral-900" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}>
            Beyond the web
          </h2>
          <p className="text-neutral-400 mt-2 max-w-lg text-[15px]">Mobile applications, data-driven strategy, and AI projects across sectors.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <motion.div style={{ opacity: col1Op, y: col1Y }}>
            <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-blue-400" /><p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase font-medium">Mobile</p></div>
            {MOBILE.map((p) => (
              <div key={p.name} className="p-4 border border-neutral-100 rounded-xl">
                <div className="flex items-center justify-between mb-1.5"><h4 className="text-neutral-900 font-semibold text-sm">{p.name}</h4><Pill label={p.category} color="bg-blue-50 text-blue-600" /></div>
                <p className="text-neutral-400 text-[12px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div style={{ opacity: col2Op, y: col2Y }}>
            <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-amber-400" /><p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase font-medium">Strategy</p></div>
            <div className="flex flex-col gap-2">
              {STRATEGY.map((p) => (
                <div key={p.name} className="p-3 border border-neutral-100 rounded-xl">
                  <div className="flex items-center justify-between mb-1"><h4 className="text-neutral-900 font-semibold text-sm">{p.name}</h4><Pill label={p.category} color="bg-amber-50 text-amber-600" /></div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div style={{ opacity: col3Op, y: col3Y }}>
            <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-violet-400" /><p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase font-medium">AI</p></div>
            <div className="flex flex-col gap-2 mb-6">
              {AI.map((p, i) => (
                <div key={i} className="p-3 border border-neutral-100 rounded-xl">
                  <div className="flex items-center justify-between mb-1"><h4 className="text-neutral-900 font-semibold text-sm">{p.name}</h4><Pill label={p.category} color="bg-violet-50 text-violet-600" /></div>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-neutral-300" /><p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase font-medium">Our team</p></div>
            {TEAM.map((d) => (
              <div key={d} className="flex items-center gap-2 py-1.5 border-b border-neutral-50 last:border-0">
                <span className="w-1 h-1 rounded-full bg-neutral-200 shrink-0" />
                <span className="text-neutral-500 text-[12px]">{d}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

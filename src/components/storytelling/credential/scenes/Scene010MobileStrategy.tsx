import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { StripedBackground } from '@/components/storytelling/backgrounds/StripedBackground'
import type { SceneProps } from '@/data/storytelling/credential'

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

function Pill({ label, variant }: { label: string; variant: 'accent' | 'rose' | 'cyan' }) {
  const styles: Record<string, { background: string; color: string }> = {
    accent: { background: 'var(--story-accent-muted)', color: 'var(--story-accent)' },
    rose:   { background: 'var(--story-rose-muted)',   color: 'var(--story-rose)' },
    cyan:   { background: 'var(--story-cyan-muted)',   color: 'var(--story-cyan)' },
  }
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded-full"
      style={styles[variant]}
    >
      {label}
    </span>
  )
}

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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--story-bg)' }}
    >
      <StripedBackground lineColor="var(--story-line-hex)" stripeSpacing={24} angle={-45} opacity={0.04} />
      <div className="relative w-full max-w-[1200px] mx-auto px-8">

        <motion.div style={{ opacity: headerOp }} className="mb-8">
          <p className="text-[11px] tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--story-fg-muted)' }}>
            Mobile, Strategy & AI
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--story-fg)' }}>
            Beyond the web
          </h2>
          <p className="mt-2 max-w-lg text-[15px]" style={{ color: 'var(--story-fg-muted)' }}>
            Mobile applications, data-driven strategy, and AI projects across sectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Mobile */}
          <motion.div style={{ opacity: col1Op, y: col1Y }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--story-accent)' }} />
              <p className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--story-fg-muted)' }}>
                Mobile
              </p>
            </div>
            {MOBILE.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-xl"
                style={{ border: '1px solid var(--story-line)' }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--story-fg)' }}>{p.name}</h4>
                  <Pill label={p.category} variant="accent" />
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--story-fg-muted)' }}>{p.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Strategy */}
          <motion.div style={{ opacity: col2Op, y: col2Y }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--story-rose)' }} />
              <p className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--story-fg-muted)' }}>
                Strategy
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {STRATEGY.map((p) => (
                <div
                  key={p.name}
                  className="p-3 rounded-xl"
                  style={{ border: '1px solid var(--story-line)' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--story-fg)' }}>{p.name}</h4>
                    <Pill label={p.category} variant="rose" />
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--story-fg-muted)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI + Team */}
          <motion.div style={{ opacity: col3Op, y: col3Y }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--story-cyan)' }} />
              <p className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--story-fg-muted)' }}>
                AI
              </p>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {AI.map((p, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl"
                  style={{ border: '1px solid var(--story-line)' }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--story-fg)' }}>{p.name}</h4>
                    <Pill label={p.category} variant="cyan" />
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--story-fg-muted)' }}>{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--story-line)' }} />
              <p className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--story-fg-muted)' }}>
                Our team
              </p>
            </div>
            {TEAM.map((d) => (
              <div
                key={d}
                className="flex items-center gap-2 py-1.5 last:border-0"
                style={{ borderBottom: '1px solid var(--story-line)' }}
              >
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--story-fg-muted)', opacity: 0.4 }} />
                <span className="text-[12px]" style={{ color: 'var(--story-fg-muted)' }}>{d}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

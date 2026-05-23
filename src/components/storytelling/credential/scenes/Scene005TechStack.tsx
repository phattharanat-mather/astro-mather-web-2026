import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '../../shared/useSceneScroll'
import { useStoryEngine } from '../StoryEngine'
import type { SceneProps } from '../../../../data/storytelling/credential'

const TECH_GROUPS = [
  { label: 'Frontend', items: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { label: 'Mobile', items: ['Flutter', 'React Native', 'Expo'] },
  { label: 'Backend & Data', items: ['Node.js', 'Python', 'Prisma', 'PostgreSQL', 'Firebase', 'Supabase'] },
  { label: 'AI & ML', items: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'scikit-learn'] },
  { label: 'Infrastructure', items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudflare'] },
]

export default function Scene005TechStack({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  const headerOpacity = useTransform(progress, [0, 0.1], [0, 1])
  const headerY = useTransform(progress, [0, 0.1], [16, 0])

  const g0Op = useTransform(progress, [0.08, 0.22], [0, 1]); const g0Y = useTransform(progress, [0.08, 0.22], [20, 0])
  const g1Op = useTransform(progress, [0.22, 0.36], [0, 1]); const g1Y = useTransform(progress, [0.22, 0.36], [20, 0])
  const g2Op = useTransform(progress, [0.36, 0.50], [0, 1]); const g2Y = useTransform(progress, [0.36, 0.50], [20, 0])
  const g3Op = useTransform(progress, [0.50, 0.64], [0, 1]); const g3Y = useTransform(progress, [0.50, 0.64], [20, 0])
  const g4Op = useTransform(progress, [0.64, 0.78], [0, 1]); const g4Y = useTransform(progress, [0.64, 0.78], [20, 0])

  const gt = [{ o: g0Op, y: g0Y }, { o: g1Op, y: g1Y }, { o: g2Op, y: g2Y }, { o: g3Op, y: g3Y }, { o: g4Op, y: g4Y }]

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto px-8">

        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-10">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-2">Powered by</p>
          <h2
            className="text-neutral-900"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Modern tools, proven in production
          </h2>
          <p className="text-neutral-400 mt-2 max-w-lg text-[15px] leading-relaxed">
            We choose the right tool for each job — not the most fashionable one.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 max-w-3xl">
          {TECH_GROUPS.map((group, i) => (
            <motion.div key={group.label} style={{ opacity: gt[i].o, y: gt[i].y }}>
              <p className="text-[11px] tracking-[0.2em] text-neutral-300 uppercase mb-2">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-[13px] font-medium text-neutral-600 bg-neutral-50 border border-neutral-100 px-4 py-1.5 rounded-full hover:border-neutral-300 hover:text-neutral-900 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

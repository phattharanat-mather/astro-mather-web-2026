import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { StorytellingLayout } from '@/components/storytelling/credential/StorytellingLayout'
import type { SceneProps } from '@/data/storytelling/credential'

const TECH_GROUPS = [
  { label: 'Frontend', items: ['React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
  { label: 'Mobile', items: ['Flutter', 'React Native', 'Expo'] },
  { label: 'Backend & Data', items: ['Node.js', 'Python', 'Prisma', 'PostgreSQL', 'Firebase', 'Supabase'] },
  { label: 'AI & ML', items: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'scikit-learn'] },
  { label: 'Infrastructure', items: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudflare'] },
]

export default function Scene005TechStack({ isActive: _isActive, direction }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  }, 1200, direction === -1 ? 1 : 0)

  const headerOpacity = useTransform(progress, [0, 0.1], [0, 1])
  const headerY = useTransform(progress, [0, 0.1], [16, 0])

  const g0Op = useTransform(progress, [0.08, 0.22], [0, 1]); const g0Y = useTransform(progress, [0.08, 0.22], [20, 0])
  const g1Op = useTransform(progress, [0.22, 0.36], [0, 1]); const g1Y = useTransform(progress, [0.22, 0.36], [20, 0])
  const g2Op = useTransform(progress, [0.36, 0.50], [0, 1]); const g2Y = useTransform(progress, [0.36, 0.50], [20, 0])
  const g3Op = useTransform(progress, [0.50, 0.64], [0, 1]); const g3Y = useTransform(progress, [0.50, 0.64], [20, 0])
  const g4Op = useTransform(progress, [0.64, 0.78], [0, 1]); const g4Y = useTransform(progress, [0.64, 0.78], [20, 0])

  const gt = [{ o: g0Op, y: g0Y }, { o: g1Op, y: g1Y }, { o: g2Op, y: g2Y }, { o: g3Op, y: g3Y }, { o: g4Op, y: g4Y }]

  return (
    <StorytellingLayout
      containerRef={containerRef}
      backgroundOpacity={0.03}
    >
      <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-10">
        <p
          className="tracking-[0.25em] uppercase mb-2"
          style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
        >
          Powered by
        </p>
        <h2 style={{ fontSize: 'var(--story-fs-h2)', color: 'var(--story-fg)' }}>
          Modern tools, proven in production
        </h2>
        <p
          className="mt-2 max-w-lg leading-relaxed"
          style={{ fontSize: 'var(--story-fs-base)', color: 'var(--story-fg-muted)' }}
        >
          We choose the right tool for each job — not the most fashionable one.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6 max-w-3xl">
        {TECH_GROUPS.map((group, i) => (
          <motion.div key={group.label} style={{ opacity: gt[i].o, y: gt[i].y }}>
            <p
              className="tracking-[0.2em] uppercase mb-2"
              style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)', opacity: 0.6 }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="font-medium px-4 py-1.5 rounded-full transition-colors cursor-default"
                  style={{
                    fontSize: 'var(--story-fs-sm)',
                    color: 'var(--story-fg-muted)',
                    background: 'var(--story-surface)',
                    border: '1px solid var(--story-line)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLSpanElement
                    el.style.color = 'var(--story-fg)'
                    el.style.borderColor = 'var(--story-fg-muted)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLSpanElement
                    el.style.color = 'var(--story-fg-muted)'
                    el.style.borderColor = 'var(--story-line)'
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </StorytellingLayout>
  )
}

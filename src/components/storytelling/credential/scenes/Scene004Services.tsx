import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { StripedBackground } from '@/components/storytelling/backgrounds/StripedBackground'
import type { SceneProps } from '@/data/storytelling/credential'

const SERVICES = [
  { number: '01', title: 'AI Technology', description: 'Developing AI technologies across signal, image, and NLP domains — avoiding unconscious human error in complex decision-making.', tags: ['Signal Processing', 'Image Recognition', 'NLP'] },
  { number: '02', title: 'Data Research', description: 'On-site and online data survey & collection via digital platforms, with quantitative and qualitative analysis of target behaviour.', tags: ['Survey Design', 'Behavioural Analysis', 'Market Research'] },
  { number: '03', title: 'Web & Mobile', description: 'Full-spectrum design and development of web and mobile applications, focused on user experience and brand identity.', tags: ['React / Next.js', 'Flutter', 'UI/UX Design'] },
  { number: '04', title: 'Data Migration', description: 'Business data transfer between systems (ETL) ensuring continuity and efficiency during system upgrades and integrations.', tags: ['ETL Pipelines', 'System Integration', 'Data Continuity'] },
  { number: '05', title: 'Data-Driven Strategy', description: 'Strategy research combining data collection, analysis, and behavioural insights to create actionable strategic plans.', tags: ['Strategic Planning', 'Data Analytics', 'Consumer Insights'] },
  { number: '06', title: 'Data Analysis', description: 'In-depth data science analysis with visualisation and reporting to generate strategic planning for the future.', tags: ['Data Science', 'Visualisation', 'Reporting'] },
]

export default function Scene004Services({ isActive: _isActive }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()

  const progress = useSceneScroll(containerRef, (dir) => {
    if (dir === 'forward') nextScene()
    else prevScene()
  })

  const headerOpacity = useTransform(progress, [0, 0.1], [0, 1])
  const headerY = useTransform(progress, [0, 0.1], [16, 0])

  const c0Op = useTransform(progress, [0.05, 0.15], [0, 1]); const c0Y = useTransform(progress, [0.05, 0.17], [28, 0])
  const c1Op = useTransform(progress, [0.17, 0.27], [0, 1]); const c1Y = useTransform(progress, [0.17, 0.29], [28, 0])
  const c2Op = useTransform(progress, [0.29, 0.39], [0, 1]); const c2Y = useTransform(progress, [0.29, 0.41], [28, 0])
  const c3Op = useTransform(progress, [0.41, 0.51], [0, 1]); const c3Y = useTransform(progress, [0.41, 0.53], [28, 0])
  const c4Op = useTransform(progress, [0.53, 0.63], [0, 1]); const c4Y = useTransform(progress, [0.53, 0.65], [28, 0])
  const c5Op = useTransform(progress, [0.65, 0.75], [0, 1]); const c5Y = useTransform(progress, [0.65, 0.77], [28, 0])

  const ct = [{ o: c0Op, y: c0Y }, { o: c1Op, y: c1Y }, { o: c2Op, y: c2Y }, { o: c3Op, y: c3Y }, { o: c4Op, y: c4Y }, { o: c5Op, y: c5Y }]

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <StripedBackground lineColor="#000000" stripeSpacing={24} angle={-45} opacity={0.025} />
      <div className="relative w-full max-w-[1200px] mx-auto px-8">

        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="mb-8">
          <p className="text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-2">What we do</p>
          <h2
            className="text-neutral-900"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif, Georgia, serif)' }}
          >
            Six service domains
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100 border border-neutral-100 rounded-2xl overflow-hidden">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.number}
              style={{ opacity: ct[i].o, y: ct[i].y }}
              className="bg-white p-6 hover:bg-neutral-50 transition-colors duration-200"
            >
              <span className="text-[11px] font-medium tracking-[0.2em] text-neutral-300 block mb-3">{service.number}</span>
              <h3 className="text-neutral-900 font-semibold text-[15px] mb-2">{service.title}</h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed mb-3">{service.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-wide bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

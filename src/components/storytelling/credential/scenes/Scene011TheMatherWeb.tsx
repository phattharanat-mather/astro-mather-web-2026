import { useRef, useState } from 'react'
import { motion, AnimatePresence, useTransform, useMotionValueEvent } from 'motion/react'
import { useSceneScroll } from '@/components/storytelling/shared/useSceneScroll'
import { useStoryEngine } from '@/components/storytelling/credential/StoryEngine'
import { StorytellingLayout } from '@/components/storytelling/credential/StorytellingLayout'
import type { SceneProps } from '@/data/storytelling/credential'
import matterhornImg from '@/content/projects/2026/the-mather-website-2026/images/matterhorn.jpg'
import matterhornVertImg from '@/content/projects/2026/the-mather-website-2026/images/matterhorn-vert.jpg'

// ─── Data ─────────────────────────────────────────────────────────────────────

const REQUIREMENTS = [
  {
    label: 'Brand-accurate',
    desc: 'Reflect The Mather identity — serious, data-led, visually precise',
  },
  {
    label: 'Content-owned',
    desc: 'Team updates services, blog, portfolio, and jobs without touching code',
  },
  {
    label: 'Multi-theme',
    desc: 'Dark, light, and 8 color presets persisted per visitor',
  },
  {
    label: 'Performance-first',
    desc: 'Lighthouse 95+ on performance, accessibility, and SEO',
  },
  {
    label: 'Fully typed',
    desc: 'Content schemas, component props, and routing validated end-to-end',
  },
]

const COLOR_PRESETS = [
  { name: 'Void',      bg: '#0c0c0c', accent: '#a0a0a0' },
  { name: 'Cosmos',    bg: '#0d1017', accent: '#8ab4f8' },
  { name: 'Dawn',      bg: '#1a0d0a', accent: '#f5a97c' },
  { name: 'Sun',       bg: '#181500', accent: '#f0c040' },
  { name: 'Moon',      bg: '#101218', accent: '#b0c4e8' },
  { name: 'Blackhole', bg: '#000000', accent: '#e8e8e8' },
  { name: 'Pulsar',    bg: '#110018', accent: '#cc88ff' },
  { name: 'Nebula',    bg: '#001818', accent: '#60e8c8' },
]

const COLLECTIONS = [
  { name: 'services',       desc: 'Service offering cards' },
  { name: 'projects',       desc: 'Portfolio entries' },
  { name: 'blogs',          desc: 'Team articles' },
  { name: 'openPositions',  desc: 'Job listings' },
  { name: 'testimonials',   desc: 'Rotating quotes' },
]

const STACK = [
  { label: 'Astro 6',          variant: 'accent' },
  { label: 'React',            variant: 'cyan'   },
  { label: 'Tailwind CSS',     variant: 'accent' },
  { label: 'shadcn/ui',        variant: 'accent' },
  { label: 'TypeScript strict',variant: 'rose'   },
  { label: 'Zod',              variant: 'rose'   },
  { label: 'Bun',              variant: 'cyan'   },
  { label: 'motion/react',     variant: 'cyan'   },
]

// step 0 = intro, step 1-5 = requirements 0-4
const STEP_THRESHOLDS = [0, 0.17, 0.33, 0.50, 0.67, 0.84]
function getStep(v: number): number {
  for (let i = STEP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (v >= STEP_THRESHOLDS[i]) return i
  }
  return 0
}

// ─── Pill ──────────────────────────────────────────────────────────────────────

function Pill({ label, variant }: { label: string; variant: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    accent: { bg: 'var(--story-accent-muted)', color: 'var(--story-accent)' },
    rose:   { bg: 'var(--story-rose-muted)',   color: 'var(--story-rose)'   },
    cyan:   { bg: 'var(--story-cyan-muted)',   color: 'var(--story-cyan)'   },
  }
  const s = colors[variant] ?? colors.accent
  return (
    <span
      className="px-3 py-1 rounded-full font-medium"
      style={{ fontSize: 'var(--story-fs-xs)', background: s.bg, color: s.color }}
    >
      {label}
    </span>
  )
}

// ─── Right Panels ─────────────────────────────────────────────────────────────

const panelTransition = { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }
const panelVariants = {
  enter: { opacity: 0, y: 12 },
  show:  { opacity: 1, y: 0  },
  exit:  { opacity: 0, y: -8 },
}

function PanelIntro() {
  return (
    <div className="relative w-full h-full">
      <img
        src={matterhornImg.src}
        alt="Matterhorn — The Mather brand visual"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, var(--story-bg) 0%, transparent 60%)' }}
      />
      <div className="absolute bottom-10 left-8 right-8">
        <p
          className="tracking-[0.2em] uppercase mb-2"
          style={{ fontSize: 'var(--story-fs-label)', color: 'rgba(255,255,255,0.55)' }}
        >
          themather.com · 2026
        </p>
        <p
          className="font-semibold leading-tight"
          style={{ fontSize: 'var(--story-fs-h2-sm)', color: '#ffffff' }}
        >
          The Mather Website 2026
        </p>
      </div>
    </div>
  )
}

function PanelBrand() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ maxHeight: '70%', aspectRatio: '2/3', border: '1px solid var(--story-line)' }}
      >
        <img
          src={matterhornVertImg.src}
          alt="Matterhorn vertical — brand visual"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--story-bg) 100%)' }}
        />
      </div>
      <p
        className="text-center max-w-xs"
        style={{ fontSize: 'var(--story-fs-sm)', color: 'var(--story-fg-muted)' }}
      >
        The Matterhorn — used as the primary brand visual across the 2026 site, symbolising
        precision and reach.
      </p>
    </div>
  )
}

function PanelCollections() {
  return (
    <div className="flex flex-col justify-center h-full px-8 gap-4">
      <p
        className="tracking-[0.2em] uppercase mb-2"
        style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
      >
        Content Collections
      </p>
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--story-line)' }}
      >
        {COLLECTIONS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className="flex items-center justify-between px-5 py-3"
            style={{
              borderBottom: i < COLLECTIONS.length - 1 ? '1px solid var(--story-line)' : 'none',
              background: 'var(--story-bg)',
            }}
          >
            <span
              className="font-mono font-medium"
              style={{ fontSize: 'var(--story-fs-sm)', color: 'var(--story-accent)' }}
            >
              {c.name}
            </span>
            <span
              style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}
            >
              {c.desc}
            </span>
          </motion.div>
        ))}
      </div>
      <p style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}>
        All schemas Zod-validated. Content updates require no developer involvement.
      </p>
    </div>
  )
}

function PanelTheme() {
  return (
    <div className="flex flex-col justify-center h-full px-8 gap-5">
      <p
        className="tracking-[0.2em] uppercase"
        style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
      >
        Color Presets
      </p>
      <div className="grid grid-cols-4 gap-2">
        {COLOR_PRESETS.map((preset, i) => (
          <motion.div
            key={preset.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--story-line)', aspectRatio: '1/1' }}
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-1"
              style={{ background: preset.bg }}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ background: preset.accent }}
              />
              <span
                className="font-medium"
                style={{
                  fontSize: 'var(--story-fs-xs)',
                  color: preset.accent,
                  opacity: 0.85,
                }}
              >
                {preset.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <p style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}>
        Preset is persisted to localStorage and applied before first paint — no flash.
      </p>
    </div>
  )
}

function PanelPerformance() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 gap-8">
      <div className="grid grid-cols-2 gap-4 w-full">
        {[
          { stat: '95+', label: 'Lighthouse score', color: 'var(--story-accent)' },
          { stat: '0',   label: 'JS shipped by default', color: 'var(--story-cyan)' },
          { stat: '<1s', label: 'Time to interactive', color: 'var(--story-rose)' },
          { stat: '100', label: 'Accessibility score', color: 'var(--story-accent)' },
        ].map(({ stat, label, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex flex-col items-center justify-center py-6 rounded-2xl"
            style={{ border: '1px solid var(--story-line)', background: 'var(--story-bg)' }}
          >
            <span
              className="font-bold leading-none mb-2"
              style={{ fontSize: 'var(--story-fs-h2-sm)', color }}
            >
              {stat}
            </span>
            <span
              className="text-center leading-tight px-2"
              style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
      <p
        className="text-center"
        style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}
      >
        Astro 6 ships zero JS by default. Islands hydrate only on demand.
      </p>
    </div>
  )
}

function PanelStack() {
  return (
    <div className="flex flex-col justify-center h-full px-8 gap-5">
      <p
        className="tracking-[0.2em] uppercase"
        style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
      >
        Stack
      </p>
      <div className="flex flex-wrap gap-2">
        {STACK.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            <Pill label={item.label} variant={item.variant} />
          </motion.div>
        ))}
      </div>
      <p style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}>
        TypeScript strict mode throughout — schemas, props, routes, and content collections
        all fully typed.
      </p>
    </div>
  )
}

const RIGHT_PANELS = [
  PanelIntro,
  PanelBrand,
  PanelCollections,
  PanelTheme,
  PanelPerformance,
  PanelStack,
]

// ─── Scene ────────────────────────────────────────────────────────────────────

export default function Scene011TheMatherWeb({ isActive: _isActive, direction }: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { nextScene, prevScene } = useStoryEngine()
  const [step, setStep] = useState(direction === -1 ? 5 : 0)

  const progress = useSceneScroll(
    containerRef,
    (dir) => {
      if (dir === 'forward') nextScene()
      else prevScene()
    },
    1800,
    direction === -1 ? 1 : 0,
  )

  useMotionValueEvent(progress, 'change', (v) => setStep(getStep(v)))

  // Header entry
  const headerOp = useTransform(progress, [0, 0.08], [0, 1])
  const headerY  = useTransform(progress, [0, 0.08], [16, 0])

  // Requirement entry stagger — all called unconditionally at top level
  const r0Op = useTransform(progress, [0.02, 0.09], [0, 1]); const r0Y = useTransform(progress, [0.02, 0.09], [14, 0])
  const r1Op = useTransform(progress, [0.05, 0.12], [0, 1]); const r1Y = useTransform(progress, [0.05, 0.12], [14, 0])
  const r2Op = useTransform(progress, [0.08, 0.15], [0, 1]); const r2Y = useTransform(progress, [0.08, 0.15], [14, 0])
  const r3Op = useTransform(progress, [0.11, 0.18], [0, 1]); const r3Y = useTransform(progress, [0.11, 0.18], [14, 0])
  const r4Op = useTransform(progress, [0.14, 0.21], [0, 1]); const r4Y = useTransform(progress, [0.14, 0.21], [14, 0])
  const rOps = [r0Op, r1Op, r2Op, r3Op, r4Op]
  const rYs  = [r0Y,  r1Y,  r2Y,  r3Y,  r4Y ]

  const activeReqIndex = step - 1 // -1 during intro

  const Panel = RIGHT_PANELS[step]

  return (
    <StorytellingLayout
      containerRef={containerRef}
      padX={false}
      centered={false}
      innerClassName="grid grid-cols-[44%_56%] h-full"
      backgroundOpacity={0.025}
    >
      {/* ── Left: Story + Requirements ───────────────────────────────────── */}
      <div className="flex flex-col justify-center px-10 py-14 h-full">

        <motion.div style={{ opacity: headerOp, y: headerY }} className="mb-8">
          <p
            className="tracking-[0.25em] uppercase mb-2"
            style={{ fontSize: 'var(--story-fs-label)', color: 'var(--story-fg-muted)' }}
          >
            Internal Project · 2026
          </p>
          <h2
            className="leading-tight"
            style={{ fontSize: 'var(--story-fs-h2)', color: 'var(--story-fg)' }}
          >
            The Mather Web
          </h2>
          <p
            className="mt-2 max-w-xs leading-relaxed"
            style={{ fontSize: 'var(--story-fs-sm)', color: 'var(--story-fg-muted)' }}
          >
            The site you are reading right now — built by The Mather, for The Mather.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {REQUIREMENTS.map((req, i) => {
            const isActive = activeReqIndex === i
            return (
              <motion.div key={req.label} style={{ opacity: rOps[i], y: rYs[i] }}>
                <div
                  className="flex gap-4 items-start px-4 py-3.5 rounded-xl transition-all duration-300"
                  style={{
                    background: isActive ? 'var(--story-surface)' : 'transparent',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: isActive ? 'var(--story-accent)' : 'var(--story-line)',
                  }}
                >
                  <div
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors duration-300"
                    style={{
                      background: isActive ? 'var(--story-accent)' : 'var(--story-line)',
                    }}
                  >
                    <span
                      className="font-bold leading-none"
                      style={{
                        fontSize: '10px',
                        color: isActive ? 'var(--story-bg)' : 'var(--story-fg-muted)',
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p
                      className="font-semibold mb-0.5 transition-colors duration-300"
                      style={{
                        fontSize: 'var(--story-fs-sm)',
                        color: isActive ? 'var(--story-fg)' : 'var(--story-fg-muted)',
                      }}
                    >
                      {req.label}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{ fontSize: 'var(--story-fs-xs)', color: 'var(--story-fg-muted)' }}
                    >
                      {req.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* ── Right: Animated Visual Panel ─────────────────────────────────── */}
      <div
        className="relative h-full overflow-hidden"
        style={{ borderLeft: '1px solid var(--story-line)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={panelVariants}
            initial="enter"
            animate="show"
            exit="exit"
            transition={panelTransition}
            className="absolute inset-0"
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>

    </StorytellingLayout>
  )
}

import { useState } from 'react'
import { useStoryEngine } from './StoryEngine'
import { scenes } from '@/data/storytelling/credential'

// ─── Laser Pointer overlay ────────────────────────────────────────────────────

function LaserPointer() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    document.documentElement.style.cursor = 'none'
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.style.cursor = ''
    }
  }, [])

  return (
    <div
      className="fixed z-[200] pointer-events-none"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
    >
      <div className="absolute inset-0 rounded-full bg-red-500/25 scale-[3.5] blur-md" />
      <div className="relative w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_3px_rgba(239,68,68,0.65)]" />
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconChevronLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconLaser({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.3" fill={active ? 'currentColor' : 'none'} />
      <path
        d="M6.5 1v1.2M6.5 10.8V12M1 6.5h1.2M10.8 6.5H12M2.7 2.7l.85.85M9.45 9.45l.85.85M9.45 3.55l.85-.85M2.7 10.3l.85-.85"
        stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"
      />
    </svg>
  )
}

function IconNav() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <rect x="1" y="2.3" width="11" height="1.1" rx="0.55" fill="currentColor" />
      <rect x="1" y="5.95" width="7.5" height="1.1" rx="0.55" fill="currentColor" />
      <rect x="1" y="9.6" width="9.5" height="1.1" rx="0.55" fill="currentColor" />
    </svg>
  )
}

// ─── Progress dots (max 10 buckets) ──────────────────────────────────────────

const MAX_DOTS = 10

function ProgressDots({ activeIndex, total }: { activeIndex: number; total: number }) {
  const count = Math.min(total, MAX_DOTS)

  // Map each dot bucket to the range of scene indices it represents
  const activeDot = Math.floor((activeIndex / Math.max(total - 1, 1)) * (count - 1))

  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={[
            'inline-block rounded-full transition-all duration-300',
            i === activeDot
              ? 'w-3 h-[5px] bg-neutral-600'
              : i < activeDot
              ? 'w-[5px] h-[5px] bg-neutral-400'
              : 'w-[5px] h-[5px] bg-neutral-200',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function StoryFooter() {
  const { activeIndex, total, nextScene, prevScene, navCollapsed, toggleNav } = useStoryEngine()
  const [laser, setLaser] = useState(false)

  const scene = scenes[activeIndex]
  const isFirst = activeIndex === 0
  const isLast = activeIndex === total - 1

  return (
    <>
      {laser && <LaserPointer />}

      {/*
        Layout:
          [Nav] [Laser] |          ← Chapter (pct%) →           (whitespace mirror)
          ↑ left-pinned            ↑ absolute-centered in full bar
      */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 h-11 bg-white/90 backdrop-blur-md border-t border-neutral-100">

        {/* ── Left: nav + laser ─────────────────────────────────── */}
        <div className="absolute left-0 top-0 h-full flex items-center gap-1 pl-3 pr-3">
          {/* Nav toggle */}
          <button
            onClick={toggleNav}
            aria-label={navCollapsed ? 'Show navigation' : 'Hide navigation'}
            aria-pressed={!navCollapsed}
            title="Toggle chapter nav"
            className={[
              'h-7 w-7 flex items-center justify-center rounded-md border transition-all duration-150',
              !navCollapsed
                ? 'border-neutral-800 bg-neutral-900 text-white'
                : 'border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:text-neutral-700 hover:bg-neutral-50',
            ].join(' ')}
          >
            <IconNav />
          </button>

          {/* Laser toggle */}
          <button
            onClick={() => setLaser((v) => !v)}
            aria-label={laser ? 'Disable laser pointer' : 'Enable laser pointer'}
            aria-pressed={laser}
            title="Laser pointer"
            className={[
              'h-7 w-7 flex items-center justify-center rounded-md border transition-all duration-150',
              laser
                ? 'border-red-300 bg-red-50 text-red-500'
                : 'border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:text-neutral-700 hover:bg-neutral-50',
            ].join(' ')}
          >
            <IconLaser active={laser} />
          </button>

          {/* Vertical separator */}
          <div className="ml-2 h-4 w-px bg-neutral-200" />
        </div>

        {/* ── Centre: ← name [pct%] xx/xx ···dots··· → ─────────── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2.5 pointer-events-auto select-none">

            {/* Prev */}
            <button
              onClick={prevScene}
              disabled={isFirst}
              aria-label="Previous scene"
              className={[
                'h-6 w-6 flex items-center justify-center rounded transition-all duration-150',
                isFirst
                  ? 'text-neutral-200 cursor-not-allowed'
                  : 'text-neutral-400 hover:text-neutral-800',
              ].join(' ')}
            >
              <IconChevronLeft />
            </button>

            {/* Chapter name */}
            <span className="text-[11px] font-medium text-neutral-600 tracking-wide whitespace-nowrap">
              {scene?.label ?? '—'}
            </span>

            {/* xx/xx */}
            <span className="text-[10px] text-neutral-300 tabular-nums whitespace-nowrap">
              {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>

            {/* Progress dots — capped at 10, each dot represents a bucket */}
            <ProgressDots activeIndex={activeIndex} total={total} />

            {/* Next */}
            <button
              onClick={nextScene}
              disabled={isLast}
              aria-label="Next scene"
              className={[
                'h-6 w-6 flex items-center justify-center rounded transition-all duration-150',
                isLast
                  ? 'text-neutral-200 cursor-not-allowed'
                  : 'text-neutral-400 hover:text-neutral-800',
              ].join(' ')}
            >
              <IconChevronRight />
            </button>

          </div>
        </div>

      </footer>
    </>
  )
}

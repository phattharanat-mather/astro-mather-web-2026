import { useState, useEffect } from 'react'
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
      <div
        className="absolute inset-0 rounded-full scale-[3.5] blur-md"
        style={{ background: 'var(--story-rose)', opacity: 0.25 }}
      />
      <div
        className="relative w-4 h-4 rounded-full"
        style={{ background: 'var(--story-rose)', boxShadow: '0 0 10px 3px color-mix(in oklch, var(--story-rose) 65%, transparent)' }}
      />
    </div>
  )
}

// ─── Progress dots (max 10 buckets) ──────────────────────────────────────────

const MAX_DOTS = 10

function ProgressDots({ activeIndex, total }: { activeIndex: number; total: number }) {
  const count = Math.min(total, MAX_DOTS)
  const activeDot = Math.floor((activeIndex / Math.max(total - 1, 1)) * (count - 1))

  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="inline-block rounded-full transition-all duration-300"
          style={{
            width: i === activeDot ? '0.75rem' : '0.3125rem',
            height: '0.3125rem',
            background: i === activeDot
              ? 'var(--story-fg-muted)'
              : i < activeDot
                ? 'color-mix(in oklch, var(--story-fg-muted) 30%, transparent)'
                : 'var(--story-line)',
          }}
        />
      ))}
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
      {/* outer ring */}
      <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.1" />
      {/* inner dot — filled when active */}
      <circle cx="6.5" cy="6.5" r="1.4" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1" />
      {/* crosshair ticks */}
      <path d="M6.5 1v1.5M6.5 10.5V12M1 6.5h1.5M10.5 6.5H12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
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

function IconSun() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 1v1.3M6.5 10.7V12M1 6.5h1.3M10.7 6.5H12M2.75 2.75l.92.92M9.33 9.33l.92.92M9.33 3.67l.92-.92M2.75 10.25l.92-.92" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M10.8 8.2a5.2 5.2 0 1 1-6.2-7.9A6.3 6.3 0 1 0 10.8 8.2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Footer bar ───────────────────────────────────────────────────────────────

export function StoryFooter() {
  const { activeIndex, total, nextScene, prevScene, navCollapsed, toggleNav, theme, toggleTheme } = useStoryEngine()
  const [laser, setLaser] = useState(false)

  const scene = scenes[activeIndex]
  const isFirst = activeIndex === 0
  const isLast = activeIndex === total - 1

  return (
    <>
      {laser && <LaserPointer />}

      <footer
        className="fixed bottom-0 left-0 right-0 z-50 h-11"
        style={{
          background: 'color-mix(in oklch, var(--story-bg) 90%, transparent)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--story-line)',
        }}
      >

        {/* ── Left: nav + laser + theme ─────────────────────────── */}
        <div className="absolute left-0 top-0 h-full flex items-center gap-1 pl-3 pr-3">

          {/* Nav toggle */}
          <button
            onClick={toggleNav}
            aria-label={navCollapsed ? 'Show navigation' : 'Hide navigation'}
            aria-pressed={!navCollapsed}
            className="h-7 px-2.5 flex items-center gap-1.5 rounded-md transition-all duration-150"
            style={
              !navCollapsed
                ? { border: '1px solid var(--story-fg)', background: 'var(--story-fg)', color: 'var(--story-bg)' }
                : { border: '1px solid var(--story-line)', background: 'transparent', color: 'var(--story-fg-muted)' }
            }
          >
            <IconNav />
            <span className="text-[11px] font-medium leading-none">Menu</span>
          </button>

          {/* Laser toggle */}
          <button
            onClick={() => setLaser((v) => !v)}
            aria-label={laser ? 'Disable laser pointer' : 'Enable laser pointer'}
            aria-pressed={laser}
            className="h-7 px-2.5 flex items-center gap-1.5 rounded-md transition-all duration-150"
            style={
              laser
                ? { border: '1px solid var(--story-rose)', background: 'var(--story-rose-muted)', color: 'var(--story-rose)' }
                : { border: '1px solid var(--story-line)', background: 'transparent', color: 'var(--story-fg-muted)' }
            }
          >
            <IconLaser active={laser} />
            <span className="text-[11px] font-medium leading-none">Laser</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="h-7 px-2.5 flex items-center gap-1.5 rounded-md transition-all duration-150"
            style={{ border: '1px solid var(--story-line)', background: 'transparent', color: 'var(--story-fg-muted)' }}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
            <span className="text-[11px] font-medium leading-none">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>

          {/* Vertical separator */}
          <div className="ml-2 h-4 w-px" style={{ background: 'var(--story-line)' }} />
        </div>

        {/* ── Centre: ← name xx/xx ···dots··· → — absolutely centred ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2.5 pointer-events-auto select-none">

            {/* Prev */}
            <button
              onClick={prevScene}
              disabled={isFirst}
              aria-label="Previous scene"
              className="h-6 w-6 flex items-center justify-center rounded transition-all duration-150"
              style={{ color: isFirst ? 'var(--story-line)' : 'var(--story-fg-muted)', cursor: isFirst ? 'not-allowed' : 'pointer' }}
            >
              <IconChevronLeft />
            </button>

            {/* Chapter name */}
            <span className="text-[11px] font-medium tracking-wide whitespace-nowrap" style={{ color: 'var(--story-fg-muted)' }}>
              {scene?.label ?? '—'}
            </span>

            {/* xx/xx */}
            <span className="text-[10px] tabular-nums whitespace-nowrap opacity-40" style={{ color: 'var(--story-fg-muted)' }}>
              {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>

            {/* Progress dots */}
            <ProgressDots activeIndex={activeIndex} total={total} />

            {/* Next */}
            <button
              onClick={nextScene}
              disabled={isLast}
              aria-label="Next scene"
              className="h-6 w-6 flex items-center justify-center rounded transition-all duration-150"
              style={{ color: isLast ? 'var(--story-line)' : 'var(--story-fg-muted)', cursor: isLast ? 'not-allowed' : 'pointer' }}
            >
              <IconChevronRight />
            </button>

          </div>
        </div>

      </footer>
    </>
  )
}

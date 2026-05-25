import { useState, useEffect, useRef } from 'react'
import { useStoryEngine } from './StoryEngine'
import { scenes } from '@/data/storytelling/credential'

// ─── Laser config ─────────────────────────────────────────────────────────────

const LASER_COLORS = [
  { id: 'rose',   value: 'oklch(0.67 0.22  350)' },
  { id: 'cyan',   value: 'oklch(0.72 0.14  200)' },
  { id: 'lime',   value: 'oklch(0.76 0.20  140)' },
  { id: 'amber',  value: 'oklch(0.80 0.18   75)' },
  { id: 'violet', value: 'oklch(0.62 0.25  285)' },
  { id: 'white',  value: 'oklch(0.94 0.01    0)' },
]

type LaserSize = 'sm' | 'lg'

// ─── Laser Pointer overlay ────────────────────────────────────────────────────

function LaserPointer({ color, size, tail }: { color: string; size: LaserSize; tail: boolean }) {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [tailDots, setTailDots] = useState<{ x: number; y: number }[]>([])
  const bufRef = useRef<{ x: number; y: number }[]>([])

  const dotPx = size === 'lg' ? 16 : 12

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const p = { x: e.clientX, y: e.clientY }
      setPos(p)
      if (tail) {
        bufRef.current = [...bufRef.current.slice(-28), p]
        setTailDots([...bufRef.current])
      }
    }
    window.addEventListener('mousemove', move)
    document.documentElement.style.cursor = 'none'
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.style.cursor = ''
    }
  }, [tail])

  // Clear tail when disabled
  useEffect(() => {
    if (!tail) {
      bufRef.current = []
      setTailDots([])
    }
  }, [tail])

  const N = tailDots.length

  return (
    <>
      {/* Tail */}
      {tail && tailDots.slice(0, -1).map((p, i) => {
        const t = (i + 1) / Math.max(N, 1)   // 0=oldest → 1=newest
        const opacity = t * t * 0.55
        const r = dotPx * (0.1 + t * 0.5)
        return (
          <div
            key={i}
            className="fixed pointer-events-none rounded-full"
            style={{
              left: p.x, top: p.y,
              width: r, height: r,
              background: color,
              opacity,
              transform: 'translate(-50%, -50%)',
              zIndex: 199,
            }}
          />
        )
      })}

      {/* Main dot */}
      <div
        className="fixed z-[200] pointer-events-none"
        style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
      >
        <div
          className="absolute inset-0 rounded-full blur-md"
          style={{ background: color, opacity: 0.28, transform: 'scale(3.5)' }}
        />
        <div
          className="relative rounded-full"
          style={{
            width: dotPx, height: dotPx,
            background: color,
            boxShadow: `0 0 ${dotPx * 0.7}px ${dotPx * 0.25}px color-mix(in oklch, ${color} 60%, transparent)`,
          }}
        />
      </div>
    </>
  )
}

// ─── Laser settings dropdown ──────────────────────────────────────────────────

function LaserMenu({
  active, color, size, tail,
  onToggle, onColor, onSize, onTail,
}: {
  active: boolean
  color: string
  size: LaserSize
  tail: boolean
  onToggle: () => void
  onColor: (c: string) => void
  onSize: (s: LaserSize) => void
  onTail: (v: boolean) => void
}) {
  return (
    <div
      className="absolute bottom-full left-0 mb-2 rounded-xl shadow-xl"
      style={{
        background: 'var(--story-surface)',
        border: '1px solid var(--story-line)',
        width: 184,
        zIndex: 60,
      }}
    >
      {/* Header */}
      <div
        className="px-3 py-2.5 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--story-line)' }}
      >
        <span className="text-[11px] font-semibold tracking-wide" style={{ color: 'var(--story-fg)' }}>
          Laser pointer
        </span>
        <button
          onClick={onToggle}
          className="h-5 px-2 rounded text-[10px] font-semibold transition-all duration-150"
          style={
            active
              ? { background: color, color: 'oklch(0.08 0.02 264)' }
              : { border: '1px solid var(--story-line)', color: 'var(--story-fg-muted)' }
          }
        >
          {active ? 'ON' : 'OFF'}
        </button>
      </div>

      <div className="p-3 flex flex-col gap-3.5">

        {/* Colour swatches */}
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--story-fg-muted)' }}>
            Colour
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {LASER_COLORS.map((lc) => {
              const isActive = lc.value === color
              return (
                <button
                  key={lc.id}
                  onClick={() => onColor(lc.value)}
                  aria-label={lc.id}
                  aria-pressed={isActive}
                  className="w-[18px] h-[18px] rounded-full transition-all duration-150"
                  style={{
                    background: lc.value,
                    transform: isActive ? 'scale(1.2)' : 'scale(1)',
                    boxShadow: isActive
                      ? `0 0 0 1.5px var(--story-surface), 0 0 0 3px ${lc.value}`
                      : 'none',
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Size */}
        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--story-fg-muted)' }}>
            Size
          </p>
          <div className="flex items-center gap-1.5">
            {(['sm', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => onSize(s)}
                className="h-6 w-10 rounded-md text-[11px] font-medium transition-all duration-150"
                style={
                  size === s
                    ? { background: 'var(--story-fg)', color: 'var(--story-bg)' }
                    : { border: '1px solid var(--story-line)', color: 'var(--story-fg-muted)' }
                }
              >
                {s === 'sm' ? 'S' : 'L'}
              </button>
            ))}
          </div>
        </div>

        {/* Tail toggle */}
        <div className="flex items-center justify-between">
          <span className="text-[11px]" style={{ color: 'var(--story-fg-muted)' }}>Tail</span>
          <button
            onClick={() => onTail(!tail)}
            aria-pressed={tail}
            className="relative rounded-full transition-colors duration-200 flex-shrink-0"
            style={{
              width: 32, height: 18,
              background: tail ? color : 'var(--story-line)',
            }}
          >
            <span
              className="absolute top-[2px] rounded-full transition-all duration-200"
              style={{
                width: 14, height: 14,
                left: tail ? 'calc(100% - 16px)' : 2,
                background: 'oklch(0.97 0.005 0)',
              }}
            />
          </button>
        </div>

      </div>
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

// ─── Icons — all use viewBox="-1 -1 15 15" for 1px stroke bleed margin ───────

function IconChevronLeft() {
  return (
    <svg width="12" height="12" viewBox="-1 -1 14 14" fill="none" overflow="hidden" aria-hidden>
      <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="12" height="12" viewBox="-1 -1 14 14" fill="none" overflow="hidden" aria-hidden>
      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg width="8" height="8" viewBox="-1 -1 10 10" fill="none" overflow="hidden" aria-hidden>
      <path d="M1 3l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconLaser({ active }: { active: boolean }) {
  return (
    <svg width="13" height="13" viewBox="-1 -1 15 15" fill="none" overflow="hidden" aria-hidden>
      <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6.5" cy="6.5" r="1.4" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1" />
      <path d="M6.5 1v1.5M6.5 10.5V12M1 6.5h1.5M10.5 6.5H12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function IconNav() {
  return (
    <svg width="13" height="13" viewBox="-1 -1 15 15" fill="none" overflow="hidden" aria-hidden>
      <rect x="1" y="2.3" width="11" height="1.1" rx="0.55" fill="currentColor" />
      <rect x="1" y="5.95" width="7.5" height="1.1" rx="0.55" fill="currentColor" />
      <rect x="1" y="9.6" width="9.5" height="1.1" rx="0.55" fill="currentColor" />
    </svg>
  )
}

function IconSun() {
  return (
    <svg width="13" height="13" viewBox="-1 -1 15 15" fill="none" overflow="hidden" aria-hidden>
      <circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.5 1v1.3M6.5 10.7V12M1 6.5h1.3M10.7 6.5H12M2.75 2.75l.92.92M9.33 9.33l.92.92M9.33 3.67l.92-.92M2.75 10.25l.92-.92" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="13" height="13" viewBox="-1 -1 15 15" fill="none" overflow="hidden" aria-hidden>
      <path d="M10.8 8.2a5.2 5.2 0 1 1-6.2-7.9A6.3 6.3 0 1 0 10.8 8.2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Footer bar ───────────────────────────────────────────────────────────────

export function StoryFooter() {
  const { activeIndex, total, nextScene, prevScene, navCollapsed, toggleNav, theme, toggleTheme } = useStoryEngine()

  const [laser, setLaser] = useState(false)
  const [laserOpen, setLaserOpen] = useState(false)
  const [laserColor, setLaserColor] = useState(LASER_COLORS[0].value)
  const [laserSize, setLaserSize] = useState<LaserSize>('sm')
  const [laserTail, setLaserTail] = useState(false)

  const menuWrapRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!laserOpen) return
    const handler = (e: MouseEvent) => {
      if (!menuWrapRef.current?.contains(e.target as Node)) {
        setLaserOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [laserOpen])

  const scene = scenes[activeIndex]
  const isFirst = activeIndex === 0
  const isLast = activeIndex === total - 1

  return (
    <>
      {laser && <LaserPointer color={laserColor} size={laserSize} tail={laserTail} />}

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

          {/* Laser dropdown wrapper */}
          <div className="relative" ref={menuWrapRef}>

            {laserOpen && (
              <LaserMenu
                active={laser}
                color={laserColor}
                size={laserSize}
                tail={laserTail}
                onToggle={() => setLaser((v) => !v)}
                onColor={(c) => { setLaserColor(c); setLaser(true) }}
                onSize={setLaserSize}
                onTail={setLaserTail}
              />
            )}

            <button
              onClick={() => setLaserOpen((v) => !v)}
              aria-label="Laser pointer settings"
              aria-expanded={laserOpen}
              className="h-7 px-2.5 flex items-center gap-1.5 rounded-md transition-all duration-150"
              style={
                laser
                  ? { border: `1px solid ${laserColor}`, background: `color-mix(in oklch, ${laserColor} 12%, transparent)`, color: laserColor }
                  : laserOpen
                    ? { border: '1px solid var(--story-fg)', background: 'var(--story-fg)', color: 'var(--story-bg)' }
                    : { border: '1px solid var(--story-line)', background: 'transparent', color: 'var(--story-fg-muted)' }
              }
            >
              <IconLaser active={laser} />
              <span className="text-[11px] font-medium leading-none">Laser</span>
              <IconChevronDown />
            </button>
          </div>

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

        {/* ── Centre: ← name xx/xx ···dots··· → ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2.5 pointer-events-auto select-none">

            <button
              onClick={prevScene}
              disabled={isFirst}
              aria-label="Previous scene"
              className="h-6 w-6 flex items-center justify-center rounded transition-all duration-150"
              style={{ color: isFirst ? 'var(--story-line)' : 'var(--story-fg-muted)', cursor: isFirst ? 'not-allowed' : 'pointer' }}
            >
              <IconChevronLeft />
            </button>

            <span className="text-[11px] font-medium tracking-wide whitespace-nowrap" style={{ color: 'var(--story-fg-muted)' }}>
              {scene?.label ?? '—'}
            </span>

            <span className="text-[10px] tabular-nums whitespace-nowrap opacity-40" style={{ color: 'var(--story-fg-muted)' }}>
              {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
            </span>

            <ProgressDots activeIndex={activeIndex} total={total} />

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

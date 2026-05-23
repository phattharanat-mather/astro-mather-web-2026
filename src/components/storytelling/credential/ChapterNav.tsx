import { motion, AnimatePresence } from 'motion/react'
import { scenes } from '../../../data/storytelling/credential'
import { useStoryEngine } from './StoryEngine'

export function ChapterNav() {
  const { activeIndex, jumpTo, navCollapsed: collapsed } = useStoryEngine()

  type NavItem = { index: number; scene: (typeof scenes)[0] }
  const items: NavItem[] = scenes.map((scene, index) => ({ index, scene }))

  return (
    <div className="fixed left-0 top-0 h-screen z-50 flex items-stretch pointer-events-none">
      <motion.nav
        animate={{ width: collapsed ? 0 : 220 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative backdrop-blur-sm overflow-hidden pointer-events-auto flex flex-col"
        style={{
          minWidth: 0,
          background: 'color-mix(in oklch, var(--story-bg) 96%, transparent)',
          borderRight: '1px solid var(--story-line)',
        }}
        aria-label="Chapter navigation"
      >
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col h-full py-6"
            >
              {/* Brand */}
              <div className="px-5 mb-5 pb-4" style={{ borderBottom: '1px solid var(--story-line)' }}>
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 mb-3 transition-opacity duration-150 hover:opacity-100"
                  style={{ color: 'var(--story-fg-muted)', opacity: 0.6 }}
                  title="Back to home"
                >
                  <span className="text-[11px]">←</span>
                  <span className="text-[10px] font-medium tracking-wide">Back to home</span>
                </a>
                <span
                  className="block text-[10px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--story-fg-muted)' }}
                >
                  The Mather
                </span>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--story-fg-muted)', opacity: 0.6 }}>
                  Credential · 2026
                </p>
              </div>

              {/* Scene list */}
              <ol className="flex-1 overflow-y-auto px-3 space-y-0.5">
                {items.map(({ index, scene }) => {
                  const isActive = index === activeIndex
                  const isDivider = scene.type === 'divider'
                  const isSub = scene.type === 'sub'
                  const isCta = scene.type === 'cta'

                  return (
                    <li key={scene.id}>
                      {isDivider && index > 0 && (
                        <div className="my-2" style={{ borderTop: '1px solid var(--story-line)' }} />
                      )}

                      <button
                        onClick={() => jumpTo(index)}
                        className={[
                          'w-full text-left rounded-md transition-all duration-150 flex items-center gap-2',
                          isDivider ? 'px-2 py-1.5 text-[10px] font-semibold tracking-wider uppercase' :
                          isSub ? 'pl-5 pr-2 py-1.5 text-[12px]' :
                          isCta ? 'px-2 py-1.5 text-[12px] font-medium' :
                          'px-2 py-1.5 text-[12px]',
                        ].join(' ')}
                        style={
                          isActive
                            ? { background: 'var(--story-fg)', color: 'var(--story-bg)' }
                            : isCta
                              ? { color: 'var(--story-accent)', background: 'transparent' }
                              : isDivider
                                ? { color: 'var(--story-fg-muted)', background: 'transparent' }
                                : { color: isSub ? 'var(--story-fg-muted)' : 'var(--story-fg-muted)', background: 'transparent' }
                        }
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background = 'var(--story-surface)'
                            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--story-fg)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                            ;(e.currentTarget as HTMLButtonElement).style.color = isCta
                              ? 'var(--story-accent)'
                              : 'var(--story-fg-muted)'
                          }
                        }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span
                          className="shrink-0 w-1.5 h-1.5 rounded-full transition-all"
                          style={{
                            background: isActive
                              ? 'var(--story-bg)'
                              : isDivider
                                ? 'var(--story-fg-muted)'
                                : 'var(--story-line)',
                          }}
                        />
                        <span className="truncate">{scene.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>

              {/* Controls hint */}
              <div className="px-5 pt-4 mt-2" style={{ borderTop: '1px solid var(--story-line)' }}>
                <p className="text-[10px] leading-relaxed" style={{ color: 'var(--story-fg-muted)', opacity: 0.6 }}>
                  ↓ scroll · → skip · ←→ jump
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}

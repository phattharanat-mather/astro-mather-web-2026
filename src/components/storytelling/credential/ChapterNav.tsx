import { motion, AnimatePresence } from 'motion/react'
import { scenes } from '../../../data/storytelling/credential'
import { useStoryEngine } from './StoryEngine'

export function ChapterNav() {
  const { activeIndex, jumpTo, navCollapsed: collapsed, toggleNav } = useStoryEngine()

  type NavItem = { index: number; scene: (typeof scenes)[0] }
  const items: NavItem[] = scenes.map((scene, index) => ({ index, scene }))

  return (
    <div className="fixed left-0 top-0 h-screen z-50 flex items-stretch pointer-events-none">
      {/* Main panel */}
      <motion.nav
        animate={{ width: collapsed ? 0 : 220 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative bg-white/96 backdrop-blur-sm border-r border-neutral-100 shadow-sm overflow-hidden pointer-events-auto flex flex-col"
        style={{ minWidth: 0 }}
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
              <div className="px-5 mb-5 pb-4 border-b border-neutral-100">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
                  The Mather
                </span>
                <p className="text-[10px] text-neutral-300 mt-0.5">Credential · 2026</p>
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
                      {/* Separator above dividers (except the first scene) */}
                      {isDivider && index > 0 && (
                        <div className="my-2 border-t border-neutral-100" />
                      )}

                      <button
                        onClick={() => jumpTo(index)}
                        className={[
                          'w-full text-left rounded-md transition-all duration-150 flex items-center gap-2',
                          isDivider ? 'px-2 py-1.5 text-[10px] font-semibold tracking-wider text-neutral-500 uppercase' :
                          isSub ? 'pl-5 pr-2 py-1.5 text-[12px] text-neutral-400' :
                          isCta ? 'px-2 py-1.5 text-[12px] font-medium text-amber-600' :
                          'px-2 py-1.5 text-[12px] text-neutral-500',
                          isActive ? 'bg-neutral-900 !text-white' : 'hover:bg-neutral-50 hover:text-neutral-800',
                        ].join(' ')}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className={['shrink-0 w-1.5 h-1.5 rounded-full transition-all', isActive ? 'bg-white' : isDivider ? 'bg-neutral-300' : 'bg-neutral-200'].join(' ')} />
                        <span className="truncate">{scene.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>

              {/* Controls hint */}
              <div className="px-5 pt-4 border-t border-neutral-100 mt-2">
                <p className="text-[10px] text-neutral-300 leading-relaxed">
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

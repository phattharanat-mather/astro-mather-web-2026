import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { scenes } from '../../../data/storytelling/credential'

export type StoryTheme = 'dark' | 'light'

interface StoryEngineState {
  activeIndex: number
  direction: 1 | -1
  total: number
  nextScene: () => void
  prevScene: () => void
  jumpTo: (index: number) => void
  navCollapsed: boolean
  toggleNav: () => void
  theme: StoryTheme
  toggleTheme: () => void
}

const StoryEngineContext = createContext<StoryEngineState | null>(null)

export function useStoryEngine() {
  const ctx = useContext(StoryEngineContext)
  if (!ctx) throw new Error('useStoryEngine must be used inside StoryEngineProvider')
  return ctx
}

interface Props {
  children: ReactNode
}

const NAV_STORAGE_KEY = 'storytelling-nav-collapsed'
const THEME_STORAGE_KEY = 'storytelling-theme'

export function StoryEngineProvider({ children }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [navCollapsed, setNavCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(NAV_STORAGE_KEY) === 'true'
  })
  const [theme, setTheme] = useState<StoryTheme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return (localStorage.getItem(THEME_STORAGE_KEY) as StoryTheme) ?? 'dark'
  })

  const total = scenes.length

  const toggleNav = useCallback(() => {
    setNavCollapsed((v) => {
      const next = !v
      localStorage.setItem(NAV_STORAGE_KEY, String(next))
      return next
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((v) => {
      const next: StoryTheme = v === 'dark' ? 'light' : 'dark'
      localStorage.setItem(THEME_STORAGE_KEY, next)
      return next
    })
  }, [])

  const nextScene = useCallback(() => {
    setDirection(1)
    setActiveIndex((i) => Math.min(i + 1, total - 1))
  }, [total])

  const prevScene = useCallback(() => {
    setDirection(-1)
    setActiveIndex((i) => Math.max(i - 1, 0))
  }, [])

  const jumpTo = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(Math.max(0, Math.min(index, total - 1)))
  }, [activeIndex, total])

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextScene()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prevScene()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [nextScene, prevScene])

  // Update URL hash on scene change
  useEffect(() => {
    const scene = scenes[activeIndex]
    if (scene) {
      window.history.replaceState(null, '', `#${scene.id}`)
    }
  }, [activeIndex])

  // Jump to scene on load if URL has a hash
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const idx = scenes.findIndex((s) => s.id === hash)
      if (idx !== -1) setActiveIndex(idx)
    }
  }, [])

  return (
    <StoryEngineContext.Provider value={{ activeIndex, direction, total, nextScene, prevScene, jumpTo, navCollapsed, toggleNav, theme, toggleTheme }}>
      {children}
    </StoryEngineContext.Provider>
  )
}

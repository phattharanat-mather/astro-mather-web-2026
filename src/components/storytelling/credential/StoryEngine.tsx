import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { scenes } from '../../../data/storytelling/credential'

interface StoryEngineState {
  activeIndex: number
  direction: 1 | -1
  total: number
  nextScene: () => void
  prevScene: () => void
  jumpTo: (index: number) => void
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

export function StoryEngineProvider({ children }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const total = scenes.length

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
    <StoryEngineContext.Provider value={{ activeIndex, direction, total, nextScene, prevScene, jumpTo }}>
      {children}
    </StoryEngineContext.Provider>
  )
}

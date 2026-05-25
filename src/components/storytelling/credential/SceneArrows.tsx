import { useStoryEngine } from './StoryEngine'

export function SceneArrows() {
  const { activeIndex, total, nextScene, prevScene } = useStoryEngine()

  const isFirst = activeIndex === 0
  const isLast = activeIndex === total - 1

  return (
    <>
      {/* Left / prev */}
      <button
        onClick={prevScene}
        disabled={isFirst}
        aria-label="Previous scene"
        className={[
          'fixed left-4 top-1/2 -translate-y-1/2 z-40',
          'hidden lg:flex items-center justify-center',
          'w-10 h-10 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm',
          'transition-all duration-200',
          isFirst
            ? 'opacity-20 cursor-not-allowed'
            : 'opacity-40 hover:opacity-100 hover:border-neutral-400 hover:shadow-md',
        ].join(' ')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right / next */}
      <button
        onClick={nextScene}
        disabled={isLast}
        aria-label="Next scene"
        className={[
          'fixed right-4 top-1/2 -translate-y-1/2 z-40',
          'hidden lg:flex items-center justify-center',
          'w-10 h-10 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm',
          'transition-all duration-200',
          isLast
            ? 'opacity-20 cursor-not-allowed'
            : 'opacity-40 hover:opacity-100 hover:border-neutral-400 hover:shadow-md',
        ].join(' ')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  )
}

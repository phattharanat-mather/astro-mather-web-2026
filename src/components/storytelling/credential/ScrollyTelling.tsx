import { Suspense } from 'react'
import { StoryEngineProvider, useStoryEngine } from './StoryEngine'
import { SceneTransition } from '../shared/SceneTransition'
import { ChapterNav } from './ChapterNav'
import { StoryFooter } from './StoryFooter'
import { ControlsHint } from './ControlsHint'
import { scenes } from '@/data/storytelling/credential'

function SceneRenderer() {
  const { activeIndex, direction } = useStoryEngine()
  const entry = scenes[activeIndex]

  if (!entry) return null

  const SceneComponent = entry.component

  return (
    // pb-11 reserves the 44px footer height so scene content isn't clipped
    <div className="relative w-full h-screen pb-11 overflow-hidden bg-white">
      <SceneTransition sceneKey={activeIndex} direction={direction} variant="slide">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-white">
              <span className="text-neutral-300 text-sm tracking-widest animate-pulse">
                Loading…
              </span>
            </div>
          }
        >
          <SceneComponent isActive />
        </Suspense>
      </SceneTransition>
    </div>
  )
}

export default function ScrollyTelling() {
  return (
    <StoryEngineProvider>
      {/* Scene viewport */}
      <SceneRenderer />

      {/* UI chrome */}
      <ChapterNav />
      <StoryFooter />
      <ControlsHint />
    </StoryEngineProvider>
  )
}

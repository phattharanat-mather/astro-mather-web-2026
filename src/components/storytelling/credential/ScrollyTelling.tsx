import { Suspense } from 'react'
import { StoryEngineProvider, useStoryEngine } from './StoryEngine'
import { SceneTransition } from '../shared/SceneTransition'
import { ChapterNav } from './ChapterNav'
import { SceneArrows } from './SceneArrows'
import { ControlsHint } from './ControlsHint'
import { scenes } from '../../../data/storytelling/credential'

function SceneRenderer() {
  const { activeIndex, direction } = useStoryEngine()
  const entry = scenes[activeIndex]

  if (!entry) return null

  const SceneComponent = entry.component

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
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
      <SceneArrows />
      <ControlsHint />
    </StoryEngineProvider>
  )
}

import type { ComponentType, LazyExoticComponent } from 'react'
import { lazy } from 'react'

export type SceneType = 'standard' | 'divider' | 'sub' | 'cta'

export interface SceneProps {
  /** true when this scene is the currently displayed scene */
  isActive: boolean
}

export interface SceneEntry {
  /** Anchor id, e.g. "scene-001". Used as the DOM id and URL hash. */
  id: string
  /** Label shown in ChapterNav */
  label: string
  type: SceneType
  component: LazyExoticComponent<ComponentType<SceneProps>>
}

export const scenes: SceneEntry[] = [
  {
    id: 'scene-001',
    label: 'Cover',
    type: 'divider',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene001Cover')),
  },
  {
    id: 'scene-002',
    label: 'Introduction',
    type: 'standard',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene002Intro')),
  },
  {
    id: 'scene-003',
    label: 'Methodology',
    type: 'standard',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene003Methodology')),
  },
  {
    id: 'scene-004',
    label: 'Services',
    type: 'standard',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene004Services')),
  },
  {
    id: 'scene-005',
    label: 'Tech Stack',
    type: 'standard',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene005TechStack')),
  },
  {
    id: 'scene-006',
    label: 'Clients',
    type: 'divider',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene006ClientsDivider')),
  },
  {
    id: 'scene-007',
    label: 'Our Clients',
    type: 'sub',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene007ClientsShowcase')),
  },
  {
    id: 'scene-008',
    label: 'Projects',
    type: 'divider',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene008ProjectsDivider')),
  },
  {
    id: 'scene-009',
    label: 'Web Applications',
    type: 'sub',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene009WebApps')),
  },
  {
    id: 'scene-010',
    label: 'Mobile & Strategy',
    type: 'sub',
    component: lazy(() => import('../../components/storytelling/credential/scenes/Scene010MobileStrategy')),
  },
  {
    id: 'scene-cta',
    label: 'Get in touch',
    type: 'cta',
    component: lazy(() => import('../../components/storytelling/credential/scenes/SceneCta')),
  },
]

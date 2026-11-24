import type { FC } from 'react'
import type { OrbitPose } from '../components/Orbit'

export type SceneProps = { step: number }

export type SceneDef = {
  id: string
  title: string
  chapter: string
  /** Número de momentos internos (revelado progresivo con → / Espacio). */
  steps: number
  tone: 'blue' | 'petrol' | 'sage' | 'coral' | 'amber'
  orbit: OrbitPose
  Component: FC<SceneProps>
}

import type { SceneDef } from './types'
import Scene01Cover from './Scene01Cover'
import Scene02Context from './Scene02Context'
import Scene03Problem from './Scene03Problem'
import Scene04Solution from './Scene04Solution'
import Scene05Question from './Scene05Question'
import Scene06Justification from './Scene06Justification'
import Scene07Objectives from './Scene07Objectives'
import Scene08Scope from './Scene08Scope'
import Scene09Actors from './Scene09Actors'
import Scene10Workflow from './Scene10Workflow'
import Scene11Regulations from './Scene11Regulations'
import Scene12Research from './Scene12Research'
import Scene13Architecture from './Scene13Architecture'
import Scene14Methodology from './Scene14Methodology'
import Scene15Closing from './Scene15Closing'

/** Recorrido narrativo: problemática → necesidad → propuesta → objetivos → funcionamiento → arquitectura → metodología → aporte. */
export const scenes: SceneDef[] = [
  { id: 'cover', tone: 'blue', title: 'Convivencia 360', chapter: 'Portada', steps: 1, orbit: { x: 1440, y: 560, size: 760, opacity: 1, rotate: 0 }, Component: Scene01Cover },
  { id: 'context', tone: 'sage', title: 'Contexto educativo', chapter: 'Problemática', steps: 1, orbit: { x: 1300, y: 560, size: 1010, opacity: 0.55, rotate: 60 }, Component: Scene02Context },
  { id: 'problem', tone: 'coral', title: 'Descripción del problema', chapter: 'Problemática', steps: 2, orbit: { x: 1900, y: 120, size: 520, opacity: 0.5, rotate: 120 }, Component: Scene03Problem },
  { id: 'solution', tone: 'blue', title: 'La necesidad de una solución', chapter: 'Necesidad', steps: 2, orbit: { x: 1340, y: 590, size: 900, opacity: 0.6, rotate: 180 }, Component: Scene04Solution },
  { id: 'question', tone: 'blue', title: 'Pregunta de investigación', chapter: 'Necesidad', steps: 1, orbit: { x: 960, y: 540, size: 1500, opacity: 0.55, rotate: 240 }, Component: Scene05Question },
  { id: 'justification', tone: 'sage', title: 'Justificación', chapter: 'Necesidad', steps: 1, orbit: { x: 1860, y: 70, size: 420, opacity: 0.6, rotate: 300 }, Component: Scene06Justification },
  { id: 'objectives', tone: 'blue', title: 'Objetivos', chapter: 'Propuesta', steps: 6, orbit: { x: 1760, y: 180, size: 420, opacity: 0.8, rotate: 360 }, Component: Scene07Objectives },
  { id: 'scope', tone: 'petrol', title: 'Alcance: seis módulos', chapter: 'Funcionamiento', steps: 1, orbit: { x: 640, y: 570, size: 940, opacity: 0.45, rotate: 420 }, Component: Scene08Scope },
  { id: 'actors', tone: 'blue', title: 'Actores institucionales', chapter: 'Funcionamiento', steps: 1, orbit: { x: 960, y: -330, size: 700, opacity: 0.6, rotate: 480 }, Component: Scene09Actors },
  { id: 'workflow', tone: 'petrol', title: 'Flujo de gestión y seguimiento', chapter: 'Funcionamiento', steps: 7, orbit: { x: 1890, y: 130, size: 380, opacity: 0.5, rotate: 540 }, Component: Scene10Workflow },
  { id: 'regulations', tone: 'amber', title: 'Marco normativo', chapter: 'Fundamentos', steps: 1, orbit: { x: 1430, y: 470, size: 520, opacity: 0.9, rotate: 600 }, Component: Scene11Regulations },
  { id: 'research', tone: 'petrol', title: 'Estado del arte y marco teórico', chapter: 'Fundamentos', steps: 2, orbit: { x: 1890, y: 120, size: 320, opacity: 0.55, rotate: 660 }, Component: Scene12Research },
  { id: 'architecture', tone: 'blue', title: 'Arquitectura tecnológica', chapter: 'Arquitectura', steps: 1, orbit: { x: 1310, y: 560, size: 900, opacity: 0.45, rotate: 720 }, Component: Scene13Architecture },
  { id: 'methodology', tone: 'sage', title: 'Metodología y administración', chapter: 'Metodología', steps: 2, orbit: { x: 1860, y: 80, size: 380, opacity: 0.6, rotate: 780 }, Component: Scene14Methodology },
  { id: 'closing', tone: 'sage', title: 'Cierre y conclusiones', chapter: 'Aporte', steps: 1, orbit: { x: 960, y: 470, size: 1700, opacity: 0.6, rotate: 1080 }, Component: Scene15Closing },
]

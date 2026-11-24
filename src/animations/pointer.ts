import { createContext, useContext } from 'react'
import { motionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

/** Posición normalizada del puntero (-1..1) compartida para efectos de parallax. */
export const pointer = { x: motionValue(0), y: motionValue(0) }

export const PointerContext = createContext(pointer)

/** Desplazamiento suavizado en px proporcional a la profundidad (depth). */
export function useParallax(depth: number): { x: MotionValue<number>; y: MotionValue<number> } {
  const p = useContext(PointerContext)
  const sx = useSpring(p.x, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(p.y, { stiffness: 60, damping: 18, mass: 0.6 })
  const x = useTransform(sx, (v) => v * depth)
  const y = useTransform(sy, (v) => v * depth)
  return { x, y }
}

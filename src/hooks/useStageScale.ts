import { useEffect, useState } from 'react'

export const STAGE_W = 1920
export const STAGE_H = 1080

/** Escala el lienzo 1920×1080 para que quepa completo en cualquier pantalla (letterbox). */
export function useStageScale() {
  const compute = () => Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)
  const [scale, setScale] = useState(compute)
  useEffect(() => {
    const onResize = () => setScale(compute())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return scale
}

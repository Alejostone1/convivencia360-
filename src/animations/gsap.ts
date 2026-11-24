import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { fmtInt } from '../utils/format'

/** Contador animado con GSAP. Escribe directamente en el nodo para no re-renderizar React. */
export function useCountUp(target: number, opts: { delay?: number; duration?: number; run?: boolean } = {}) {
  const ref = useRef<HTMLSpanElement>(null)
  const { delay = 0.3, duration = 1.8, run = true } = opts
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!run) {
      el.textContent = fmtInt(0)
      return
    }
    const state = { v: 0 }
    const tween = gsap.to(state, {
      v: target,
      duration,
      delay,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = fmtInt(state.v)
      },
    })
    return () => {
      tween.kill()
    }
  }, [target, delay, duration, run])
  return ref
}

/**
 * Dibuja progresivamente los trazos SVG marcados con [data-draw] dentro del contenedor.
 * Cada trazo puede definir data-delay (s) para sincronizarse con la narrativa.
 */
export function useDrawPaths(container: RefObject<SVGElement | HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const root = container.current
    if (!root) return
    const paths = Array.from(root.querySelectorAll<SVGGeometryElement>('[data-draw]'))
    const tweens = paths.map((p) => {
      const len = p.getTotalLength()
      const delay = Number(p.dataset.delay ?? 0)
      const dur = Number(p.dataset.dur ?? 1.1)
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
      return gsap.to(p, { strokeDashoffset: 0, duration: dur, delay, ease: 'power2.inOut' })
    })
    return () => tweens.forEach((t) => t.kill())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

import { motion } from 'framer-motion'
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { ease } from './variants'

/**
 * Revela un texto palabra por palabra con máscara (cada palabra sube desde detrás de una línea).
 * Acepta nodos anidados (<span className>, <br/>) y conserva sus estilos.
 */
export function SplitText({ children, delay = 0, stagger = 0.06, duration = 0.85 }: { children: ReactNode; delay?: number; stagger?: number; duration?: number }) {
  let i = 0
  const walk = (node: ReactNode): ReactNode =>
    Children.map(node, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        const parts = String(child).split(/(\s+)/)
        return parts.map((w, k) => {
          if (/^\s+$/.test(w) || w === '') return w
          const d = delay + i++ * stagger
          return (
            <span key={k} className="inline-block overflow-hidden pb-[0.08em] align-bottom" style={{ marginBottom: '-0.08em' }}>
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: '105%', rotate: 4, opacity: 0 }}
                animate={{ y: '0%', rotate: 0, opacity: 1 }}
                transition={{ duration, ease, delay: d }}
              >
                {w}
              </motion.span>
            </span>
          )
        })
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ children?: ReactNode }>
        if (el.type === 'br') return el
        return cloneElement(el, undefined, walk(el.props.children))
      }
      return child
    })
  return <>{walk(children)}</>
}

import type { Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

/** Transición entre escenas: la saliente se desvanece, la entrante emerge con foco. */
export const sceneVariants: Variants = {
  initial: { opacity: 0, scale: 1.03 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.15 + i * 0.09 } }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({ opacity: 1, transition: { duration: 0.8, ease, delay: 0.15 + i * 0.09 } }),
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: (i: number = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.7, ease, delay: 0.2 + i * 0.08 } }),
}

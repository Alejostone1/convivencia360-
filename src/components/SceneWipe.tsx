import { motion } from 'framer-motion'
import { ease } from '../animations/variants'

/**
 * Cortinilla cinematográfica entre escenas: dos paneles de marca barren el escenario
 * en la dirección de avance y dejan ver el número y título de la escena entrante.
 */
export function SceneWipe({ dir, n, title }: { dir: number; n: string; title: string }) {
  const from = dir > 0 ? '100%' : '-100%'
  const to = dir > 0 ? '-100%' : '100%'
  return (
    <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue via-petrol to-sage"
        initial={{ x: from }}
        animate={{ x: [from, '0%', '0%', to] }}
        transition={{ duration: 1.05, times: [0, 0.38, 0.55, 1], ease: [ease, 'linear', ease] }}
      />
      <motion.div
        className="absolute inset-0 bg-ink"
        initial={{ x: from }}
        animate={{ x: [from, '0%', '0%', to] }}
        transition={{ duration: 1.05, times: [0, 0.42, 0.52, 1], ease: [ease, 'linear', ease], delay: 0.06 }}
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-warm"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.92, 1, 1, 1.04] }}
          transition={{ duration: 0.95, times: [0, 0.35, 0.6, 0.85] }}
        >
          <svg viewBox="0 0 64 64" className="h-20 w-20">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#faf7f2" strokeOpacity="0.25" strokeWidth="4" />
            <motion.circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#3f9a83"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, rotate: -90 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease }}
              style={{ transformOrigin: '32px 32px' }}
            />
          </svg>
          <div className="font-display mt-5 text-[22px] font-bold tracking-[0.3em] text-sage-soft">{n}</div>
          <div className="font-display mt-2 text-[44px] font-extrabold">{title}</div>
        </motion.div>
      </motion.div>
    </div>
  )
}

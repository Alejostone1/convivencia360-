import { motion } from 'framer-motion'
import { useParallax } from '../animations/pointer'
import { ease } from '../animations/variants'

export type OrbitPose = { x: number; y: number; size: number; opacity: number; rotate: number }

/**
 * Hilo conductor visual: el anillo "360" persiste entre escenas y se desplaza, escala
 * y gira en cada cambio; además rota de forma continua y responde al puntero.
 */
export function Orbit({ pose }: { pose: OrbitPose }) {
  const par = useParallax(18)
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0"
      initial={false}
      animate={{ x: pose.x - pose.size / 2, y: pose.y - pose.size / 2, width: pose.size, height: pose.size, opacity: pose.opacity, rotate: pose.rotate }}
      transition={{ duration: 1.5, ease }}
    >
      <motion.div className="h-full w-full" style={par}>
        <svg viewBox="0 0 200 200" className="spin-slow h-full w-full overflow-visible">
          <circle cx="100" cy="100" r="96" fill="none" stroke="#1f4e8c" strokeOpacity="0.10" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="96" fill="none" stroke="#1f4e8c" strokeWidth="1.4" strokeDasharray="120 483" strokeLinecap="round" strokeOpacity="0.55" />
          <circle cx="100" cy="100" r="96" fill="none" stroke="#3f9a83" strokeWidth="1.4" strokeDasharray="60 543" strokeDashoffset="-200" strokeLinecap="round" strokeOpacity="0.6" />
          <circle cx="100" cy="100" r="96" fill="none" stroke="#0f5c6b" strokeWidth="1.4" strokeDasharray="30 573" strokeDashoffset="-360" strokeLinecap="round" strokeOpacity="0.5" />
          <circle cx="196" cy="100" r="2.4" fill="#3f9a83" />
          <circle cx="4" cy="100" r="1.6" fill="#1f4e8c" fillOpacity="0.6" />
        </svg>
        <svg viewBox="0 0 200 200" className="spin-rev absolute inset-0 h-full w-full overflow-visible">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#0f5c6b" strokeOpacity="0.16" strokeWidth="0.4" strokeDasharray="1 3" />
          <circle cx="100" cy="20" r="1.4" fill="#1f4e8c" fillOpacity="0.7" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

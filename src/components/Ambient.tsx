import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useParallax } from '../animations/pointer'

type Tone = 'blue' | 'petrol' | 'sage' | 'coral' | 'amber'

const palette: Record<Tone, [string, string, string]> = {
  blue: ['rgba(31,78,140,0.16)', 'rgba(63,154,131,0.12)', 'rgba(15,92,107,0.10)'],
  petrol: ['rgba(15,92,107,0.16)', 'rgba(31,78,140,0.10)', 'rgba(63,154,131,0.14)'],
  sage: ['rgba(63,154,131,0.18)', 'rgba(31,78,140,0.10)', 'rgba(217,154,43,0.08)'],
  coral: ['rgba(200,102,75,0.13)', 'rgba(217,154,43,0.10)', 'rgba(31,78,140,0.08)'],
  amber: ['rgba(217,154,43,0.14)', 'rgba(63,154,131,0.12)', 'rgba(31,78,140,0.10)'],
}

/**
 * Atmósfera viva del escenario: manchas de luz que derivan lentamente, cambian de tono con
 * la escena, responden al puntero (parallax) y partículas que ascienden.
 */
export function Ambient({ tone }: { tone: Tone }) {
  const [a, b, c] = palette[tone]
  const far = useParallax(-22)
  const near = useParallax(36)

  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: (i * 73) % 100,
        size: 3 + ((i * 7) % 5),
        dur: 14 + ((i * 11) % 12),
        delay: -((i * 5) % 20),
        drift: ((i % 2 ? 1 : -1) * (10 + ((i * 3) % 30))) as number,
        color: i % 3 === 0 ? '#3f9a83' : i % 3 === 1 ? '#1f4e8c' : '#0f5c6b',
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={far}>
        <motion.div
          className="absolute h-[900px] w-[900px] rounded-full blur-3xl"
          animate={{ x: [-120, 160, -60, -120], y: [-160, 40, 120, -160], background: `radial-gradient(circle, ${a} 0%, transparent 65%)` }}
          transition={{ x: { duration: 26, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 26, repeat: Infinity, ease: 'easeInOut' }, background: { duration: 1.4 } }}
          style={{ left: -150, top: -150 }}
        />
        <motion.div
          className="absolute h-[1000px] w-[1000px] rounded-full blur-3xl"
          animate={{ x: [0, -180, 80, 0], y: [0, -120, 60, 0], background: `radial-gradient(circle, ${b} 0%, transparent 65%)` }}
          transition={{ x: { duration: 32, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 32, repeat: Infinity, ease: 'easeInOut' }, background: { duration: 1.4 } }}
          style={{ right: -300, bottom: -350 }}
        />
        <motion.div
          className="absolute h-[700px] w-[700px] rounded-full blur-3xl"
          animate={{ x: [0, 140, -100, 0], y: [0, 100, -80, 0], background: `radial-gradient(circle, ${c} 0%, transparent 65%)` }}
          transition={{ x: { duration: 22, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 22, repeat: Infinity, ease: 'easeInOut' }, background: { duration: 1.4 } }}
          style={{ left: 700, top: 300 }}
        />
      </motion.div>

      <motion.div className="absolute inset-0" style={near}>
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ left: `${p.left}%`, bottom: -20, width: p.size, height: p.size, background: p.color }}
            animate={{ y: [0, -1140], x: [0, p.drift, 0], opacity: [0, 0.45, 0.45, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'linear', times: [0, 0.15, 0.85, 1] }}
          />
        ))}
      </motion.div>
    </div>
  )
}

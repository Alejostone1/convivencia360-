import { motion } from 'framer-motion'
import { ease, fadeUp } from '../../animations/variants'
import { researchQuestion } from '../../data/content'

// Términos clave dentro de la pregunta oficial (se resaltan sin alterar su redacción).
const keys = ['sistema de información web', 'gestión', 'seguimiento', 'centralización', 'monitoreo']

function segments(text: string) {
  const re = new RegExp(`(${keys.join('|')})`, 'g')
  return text.split(re).filter(Boolean)
}

export default function Scene05Question() {
  let k = 0
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="w-[1560px]">
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0} className="eyebrow flex items-center justify-center gap-4 text-blue">
          <span className="h-[2px] w-12 bg-current opacity-50" />
          04 · Pregunta de investigación
          <span className="h-[2px] w-12 bg-current opacity-50" />
        </motion.div>
        <motion.p
          className="font-display mt-12 text-center text-[60px] font-bold leading-[1.28] tracking-[-0.02em] text-ink"
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
        >
          {segments(researchQuestion).map((s, i) => {
            if (!keys.includes(s)) return <span key={i}>{s}</span>
            const d = 1.3 + k++ * 0.35
            return (
              <span key={i} className="relative inline-block whitespace-nowrap text-blue">
                <motion.span
                  className="absolute inset-x-[-4px] bottom-[6px] -z-10 h-[0.36em] origin-left rounded-sm bg-sage-soft"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, ease, delay: d }}
                />
                {s}
              </span>
            )
          })}
        </motion.p>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={22} className="mt-16 flex justify-center gap-4">
          {keys.map((t, i) => (
            <motion.span
              key={t}
              className="rounded-full border border-blue/25 bg-warm px-6 py-2 text-[21px] font-semibold text-blue"
              animate={{ y: [0, -9] }}
              whileHover={{ scale: 1.1, backgroundColor: '#dbe6f3' }}
              transition={{ y: { duration: 4 + (i % 3) * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 + i * 0.3 } }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

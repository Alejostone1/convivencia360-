import { motion } from 'framer-motion'
import { ease } from '../../animations/variants'
import { closingIdeas, project } from '../../data/content'

const CX = 960
const CY = 470
const R = 350

export default function Scene15Closing() {
  return (
    <div className="absolute inset-0">
      {[0, 1, 2, 3].map((k) => (
        <div key={k} className="ripple absolute rounded-full border-2 border-sage/35" style={{ left: CX - 330, top: CY - 330, width: 660, height: 660, animationDelay: `${k * 0.7}s`, animationDuration: '2.8s' }} />
      ))}
      {/* Ideas centrales alrededor del anillo */}
      {closingIdeas.map((t, i) => {
        const a = (i / closingIdeas.length) * Math.PI * 2 - Math.PI / 2
        const x = CX + Math.cos(a) * (R + 150) * 1.25
        const y = CY + Math.sin(a) * 330
        return (
          <motion.div
            key={t}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border border-line bg-white px-6 py-3 shadow-[0_14px_30px_-20px_rgba(14,42,71,0.5)]"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.7, x: (CX - x) * 0.3, y: (CY - y) * 0.3 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: [0, -10] }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.9, ease, delay: 0.5 + i * 0.12, y: { duration: 4 + (i % 3) * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 + i * 0.3 } }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: ['#1f4e8c', '#0f5c6b', '#3f9a83'][i % 3] }} />
            <span className="font-display whitespace-nowrap text-[23px] font-bold text-ink">{t}</span>
          </motion.div>
        )
      })}

      <div className="absolute flex flex-col items-center text-center" style={{ left: CX - 420, top: CY - 190, width: 840 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }} className="eyebrow text-petrol">
          14 · Aporte del proyecto
        </motion.div>
        <motion.h2
          className="font-display mt-6 font-extrabold leading-[0.95] tracking-[-0.035em] text-ink"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
        >
          <span className="text-[96px]">CONVIVENCIA</span>
          <br />
          <span className="shimmer-text bg-gradient-to-r from-blue via-sage to-blue bg-clip-text text-[130px] text-transparent">360</span>
        </motion.h2>
        <motion.p className="mt-6 max-w-[660px] text-[28px] leading-[1.4] text-ink" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 1.5 }}>
          La tecnología como herramienta para fortalecer el bienestar y la convivencia en las instituciones educativas.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-[80px] left-0 flex w-full flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1 }}
      >
        <div className="flex gap-12">
          {project.authors.map((a) => (
            <span key={a} className="font-display text-[26px] font-bold text-ink">
              {a}
            </span>
          ))}
        </div>
        <div className="mt-2 text-[19px] text-mute">
          {project.institution} · {project.place}
        </div>
        <div className="font-display mt-5 text-[22px] font-bold tracking-[0.3em] text-petrol">GRACIAS</div>
      </motion.div>
    </div>
  )
}

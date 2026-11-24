import { motion } from 'framer-motion'
import { ClipboardList, Code, Layers, BookOpen, ShieldCheck, Target } from 'lucide-react'
import { ease, fadeUp } from '../../animations/variants'
import { generalObjective, specificObjectives } from '../../data/content'
import type { SceneProps } from '../types'

const icons = [ClipboardList, Layers, Code, ShieldCheck, BookOpen]

const WIDTH = 1640
const colW = WIDTH / 5

export default function Scene07Objectives({ step }: SceneProps) {
  // step 0: objetivo general; steps 1..5: aparecen los objetivos específicos
  const shown = step
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[110px] grid w-[1640px] grid-cols-[300px_1fr] gap-14">
        <motion.div initial="hidden" animate="show">
          <motion.div variants={fadeUp} custom={0} className="eyebrow flex items-center gap-4 text-blue">
            <span className="tabular-nums">06</span>
            <span className="h-[2px] w-12 bg-current opacity-50" />
            Objetivos
          </motion.div>
          <motion.div variants={fadeUp} custom={1} className="font-display mt-6 text-[60px] font-extrabold leading-none text-ink">
            Objetivo
            <br />
            general
          </motion.div>
        </motion.div>
        <motion.div
          className="relative rounded-3xl bg-blue px-14 py-12 text-warm shadow-[0_30px_70px_-35px_rgba(31,78,140,0.8)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
            <motion.div
              className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/15 to-transparent"
              initial={{ x: '-120%', skewX: -20 }}
              animate={{ x: '320%' }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 1, repeat: Infinity, repeatDelay: 3.5 }}
            />
          </div>
          <Target size={40} className="spin-mid absolute right-10 top-10 opacity-40" />
          <p className="font-display max-w-[1150px] text-[44px] font-bold leading-[1.25]">{generalObjective}</p>
        </motion.div>
      </div>

      {/* Línea de tiempo de objetivos específicos */}
      <div className="absolute left-[140px] top-[480px] w-[1640px]">
        <div className="flex items-baseline justify-between">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3} className="font-display text-[30px] font-extrabold text-ink">
            Objetivos específicos
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3} className="text-[19px] text-mute">
            Seis meses de ejecución
          </motion.div>
        </div>
        <div className="relative mt-8 h-[4px] rounded bg-line">
          <motion.div
            className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-blue to-sage"
            animate={{ width: `${(shown / 5) * 100}%` }}
            transition={{ duration: 0.8, ease }}
          >
            {shown > 0 && <span className="ripple absolute -right-3 top-1/2 -mt-3 h-6 w-6 rounded-full bg-sage/60" />}
          </motion.div>
          {specificObjectives.map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-warm"
              style={{ left: colW * i + colW / 2 }}
              animate={{ backgroundColor: i < shown ? '#0f5c6b' : '#d9d5cc', scale: i === shown - 1 ? 1.25 : 1 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-[140px] top-[592px] grid w-[1640px] grid-cols-5 gap-6">
        {specificObjectives.map((o, i) => {
          const Icon = icons[i]
          const visible = i < shown
          return (
            <motion.div
              key={o.short}
              className="flex h-[380px] flex-col rounded-2xl border border-line bg-white px-6 pb-6 pt-7"
              initial={false}
              animate={{ opacity: visible ? 1 : 0.0, y: visible ? 0 : 60, rotateX: visible ? 0 : -35, scale: visible ? 1 : 0.9 }}
              whileHover={visible ? { y: -10, boxShadow: '0 30px 50px -30px rgba(15,92,107,0.6)' } : undefined}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              style={{ transformPerspective: 900 }}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-petrol-soft text-petrol">
                  <Icon size={24} />
                </span>
                <span className="rounded-full bg-pearl px-3 py-1 text-[15px] font-semibold text-ink-soft">{o.month}</span>
              </div>
              <div className="font-display mt-5 text-[25px] font-extrabold leading-tight text-ink">
                <span className="text-petrol">{i + 1}.</span> {o.short}
              </div>
              <p className="mt-3 text-[18px] leading-[1.45] text-ink-soft">{o.text}</p>
            </motion.div>
          )
        })}
      </div>
      {step === 0 && (
        <motion.div
          className="absolute left-[140px] top-[720px] w-[1640px] text-center text-[22px] text-mute"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.2 } }}
        >
          → avanzar para recorrer los cinco objetivos específicos
        </motion.div>
      )}
    </div>
  )
}

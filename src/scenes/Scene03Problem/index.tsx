import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { useDrawPaths } from '../../animations/gsap'
import { ease, fadeUp } from '../../animations/variants'
import { Counter } from '../../components/Counter'
import { SceneHeader, Source } from '../../components/SceneHeader'
import { causes, centralProblem, situations, stats } from '../../data/content'
import type { SceneProps } from '../types'

// Centro del diagrama de causas
const CX = 1330
const CY = 575

function CausesNetwork() {
  const ref = useRef<SVGSVGElement>(null)
  useDrawPaths(ref)
  const pts = causes.map((_, i) => {
    const a = (i / causes.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / 6
    return { x: CX + Math.cos(a) * 360, y: CY + Math.sin(a) * 250 }
  })
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <svg ref={ref} className="absolute inset-0" width="1920" height="1080">
        {pts.map((p, i) => (
          <path key={i} data-draw data-delay={0.2 + i * 0.12} data-dur="0.9" d={`M${p.x} ${p.y} L${CX} ${CY}`} stroke="#c8664b" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        ))}
        {pts.map((p, i) => (
          <path key={`f${i}`} className="flow-dash" d={`M${p.x} ${p.y} L${CX} ${CY}`} stroke="#c8664b" strokeWidth="3" fill="none" strokeOpacity="0.75" style={{ animationDelay: `${-i * 0.3}s` }} />
        ))}
        {pts.map((p, i) => (
          <circle key={`c${i}`} cx={p.x} cy={p.y} r="6" fill="#c8664b" />
        ))}
      </svg>
      {causes.map((c, i) => {
        const p = pts[i]
        return (
          <motion.div
            key={c.title}
            className="absolute w-[300px] -translate-x-1/2 rounded-2xl border border-line bg-warm/95 px-6 py-4 shadow-[0_14px_40px_-22px_rgba(14,42,71,0.45)]"
            style={{ left: p.x, top: p.y + (p.y < CY ? -122 : 18) }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: [0, -6] }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.12, y: { duration: 4 + (i % 3) * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 + i * 0.3 } }}
          >
            <div className="font-display text-[23px] font-bold text-ink">{c.title}</div>
            <div className="mt-1 text-[17px] leading-snug text-ink-soft">{c.text}</div>
          </motion.div>
        )
      })}
      {[0, 1, 2].map((k) => (
        <div key={k} className="ripple absolute rounded-full border-2 border-coral/50" style={{ left: CX - 125, top: CY - 125, width: 250, height: 250, animationDelay: `${1.2 + k * 0.93}s` }} />
      ))}
      <motion.div
        className="absolute grid h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink p-8 text-center shadow-[0_30px_60px_-20px_rgba(14,42,71,0.6)]"
        style={{ left: CX, top: CY }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 1.1 }}
      >
        <div>
          <div className="text-[14px] font-bold uppercase tracking-[0.2em] text-coral-soft">Problema central</div>
          <div className="font-display mt-2 text-[22px] font-bold leading-tight text-warm">Baja eficiencia en la gestión y seguimiento de los casos</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Magnitude() {
  return (
    <motion.div
      className="absolute left-[900px] top-[250px] w-[860px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.3 } }}
    >
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="eyebrow text-coral">
        Magnitud del fenómeno
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="font-display mt-4 text-[190px] font-extrabold leading-none tracking-[-0.04em] text-ink">
        <Counter value={stats.siuce.value} delay={0.6} />
      </motion.div>
      <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-4 text-[32px] leading-snug text-ink">
        {stats.siuce.label}, {stats.siuce.detail}.
      </motion.p>
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5} className="mt-3">
        <Source>{stats.siuce.source}</Source>
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={7} className="mt-14 rounded-2xl border-l-4 border-coral bg-coral-soft/60 px-8 py-6">
        <p className="text-[23px] leading-[1.45] text-ink">
          <b>Pereira, 24 de febrero de 2024.</b> Un estudiante de 13 años de la I.E. Alfredo García falleció tras ser agredido por un compañero durante la jornada académica, hecho que
          evidenció la urgencia de fortalecer la identificación, atención y seguimiento oportuno.
        </p>
        <Source className="mt-2 block">El Tiempo, 2024</Source>
      </motion.div>
    </motion.div>
  )
}

export default function Scene03Problem({ step }: SceneProps) {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[120px] w-[640px]">
        <SceneHeader n="02" label="Descripción del problema" tone="coral" titleClass="text-[60px]" title={<>Situaciones que exigen respuesta institucional</>} />
        <motion.ul initial="hidden" animate="show" className="mt-10 border-t border-line">
          {situations.map((s, i) => (
            <motion.li key={s} variants={fadeUp} custom={3 + i * 0.6} whileHover={{ x: 12 }} className="flex cursor-default items-baseline gap-5 border-b border-line py-[13px]">
              <span className="font-display w-8 text-[18px] font-bold tabular-nums text-coral">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[26px] font-medium text-ink">{s}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <AnimatePresence mode="wait">{step === 0 ? <Magnitude key="mag" /> : <CausesNetwork key="net" />}</AnimatePresence>

      <AnimatePresence>
        {step === 1 && (
          <motion.p
            className="absolute left-[880px] top-[110px] w-[900px] text-center text-[21px] italic text-ink-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1.6 } }}
            exit={{ opacity: 0 }}
          >
            “{centralProblem}”
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

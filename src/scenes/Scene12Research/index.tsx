import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ease, fadeUp } from '../../animations/variants'
import { SceneHeader, Source } from '../../components/SceneHeader'
import { concepts, research } from '../../data/content'
import type { SceneProps } from '../types'

const groupColor: Record<string, string> = { no: '#b9b4aa', parcial: '#d99a2b', corpus: '#0f5c6b' }

function StateOfArt() {
  const [sel, setSel] = useState('corpus')
  const g = research.categories.find((c) => c.key === sel)!
  let dotIndex = 0
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <div className="absolute left-[140px] top-[320px] w-[820px]">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="text-[20px] text-ink-soft">
          <b className="text-ink">20 estudios</b> · {research.criteria}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-2 flex flex-wrap gap-2">
          {research.databases.map((d) => (
            <span key={d} className="rounded-full bg-pearl px-3 py-1 text-[15px] font-medium text-ink-soft">
              {d}
            </span>
          ))}
        </motion.div>

        <div className="mt-8 grid grid-cols-3 gap-5">
          {research.categories.map((c) => {
            const active = c.key === sel
            return (
              <button
                key={c.key}
                onClick={() => setSel(c.key)}
                className="rounded-2xl border-2 p-5 text-left transition-colors duration-300"
                style={{ borderColor: active ? groupColor[c.key] : '#d9d5cc', background: active ? '#ffffff' : 'transparent' }}
                aria-pressed={active}
              >
                <div className="flex h-[74px] flex-wrap content-start gap-2">
                  {Array.from({ length: c.count }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="h-6 w-6 rounded-full"
                      style={{ background: groupColor[c.key] }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + dotIndex++ * 0.05, duration: 0.4, ease }}
                    />
                  ))}
                </div>
                <div className="font-display mt-3 text-[44px] font-extrabold leading-none" style={{ color: groupColor[c.key] === '#b9b4aa' ? '#6b7684' : groupColor[c.key] }}>
                  {c.count}
                </div>
                <div className="font-display mt-2 text-[20px] font-bold leading-tight text-ink">{c.title}</div>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={sel} className="mt-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="text-[19px] italic text-ink-soft">{g.why}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
              {g.items.map((it) => (
                <div key={it} className="text-[17px] leading-snug text-ink">
                  · {it}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute left-[1040px] top-[300px] w-[740px]">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="eyebrow !text-[16px] text-petrol">
          Aportes del corpus central
        </motion.div>
        <div className="mt-4 space-y-3">
          {research.highlights.map((h, i) => (
            <motion.div
              key={h.who}
              className="rounded-2xl border-l-4 border-petrol bg-white px-6 py-4"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -10, boxShadow: '0 20px 40px -26px rgba(15,92,107,0.55)' }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease }}
            >
              <div className="font-display text-[20px] font-extrabold text-ink">{h.who}</div>
              <div className="mt-1 text-[18px] leading-snug text-ink-soft">{h.what}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-5 rounded-2xl bg-ink px-7 py-5 text-warm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6, ease }}
        >
          <div className="text-[14px] font-bold uppercase tracking-[0.18em] text-sage-soft">Brecha identificada</div>
          <p className="mt-2 text-[19px] leading-[1.45]">{research.gap}</p>
        </motion.div>
        <Source className="mt-2 block !text-[14px]">Cifras reportadas por los estudios citados; no son resultados de este proyecto.</Source>
      </div>
    </motion.div>
  )
}

function Theory() {
  const CX = 960
  const CY = 640
  const pts = concepts.map((_, i) => {
    const a = (i / concepts.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8
    return { x: CX + Math.cos(a) * 560, y: CY + Math.sin(a) * 255 }
  })
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <svg className="absolute inset-0" width="1920" height="1080">
        {pts.map((p, i) => (
          <motion.line
            key={i}
            x1={CX}
            y1={CY}
            x2={p.x}
            y2={p.y}
            stroke="#0f5c6b"
            strokeOpacity="0.45"
            strokeWidth="2"
            className="flow-dash-slow"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.07 }}
          />
        ))}
      </svg>
      {[0, 1, 2].map((k) => (
        <div key={k} className="ripple absolute rounded-[48px] border-2 border-petrol/40" style={{ left: CX - 200, top: CY - 105, width: 400, height: 210, animationDelay: `${k * 0.93}s` }} />
      ))}
      <motion.div
        className="absolute flex h-[210px] w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[48px] bg-petrol px-8 text-center text-warm shadow-[0_30px_60px_-25px_rgba(15,92,107,0.7)]"
        style={{ left: CX, top: CY }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <div className="text-[14px] font-bold uppercase tracking-[0.2em] text-sage-soft">Marco teórico</div>
        <div className="font-display mt-2 text-[25px] font-extrabold leading-tight">Sistema de información web para la gestión de casos</div>
        <div className="mt-3 text-[16px] text-warm/80">React · Python · MySQL</div>
      </motion.div>
      {concepts.map((c, i) => (
        <motion.div
          key={c.name}
          className="absolute w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-white px-6 py-4 text-center shadow-[0_14px_30px_-22px_rgba(14,42,71,0.5)]"
          style={{ left: pts[i].x, top: pts[i].y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -9] }}
          whileHover={{ scale: 1.08 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease, y: { duration: 4 + (i % 3) * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 + i * 0.3 } }}
        >
          <div className="font-display text-[21px] font-extrabold leading-tight text-ink">{c.name}</div>
          <div className="mt-1 text-[15px] text-mute">{c.source}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Scene12Research({ step }: SceneProps) {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[110px] w-[1640px]">
        <AnimatePresence mode="wait">
          <motion.div key={step} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            {step === 0 ? (
              <SceneHeader n="11" label="Estado del arte" tone="petrol" titleClass="text-[58px]" title={<>Lo que la investigación ya muestra, y lo que falta</>} />
            ) : (
              <SceneHeader n="11" label="Marco teórico" tone="petrol" titleClass="text-[58px]" title={<>Conceptos que sostienen la propuesta</>} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">{step === 0 ? <StateOfArt key="s" /> : <Theory key="t" />}</AnimatePresence>
    </div>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { UserRound, School } from 'lucide-react'
import { ease } from '../../animations/variants'
import { Counter } from '../../components/Counter'
import { SceneHeader } from '../../components/SceneHeader'
import { advisor, costContingency, costs, costSubtotal, costTotal, methodology, specificObjectives, team } from '../../data/content'
import { fmtCOP } from '../../utils/format'
import type { SceneProps } from '../types'

/* ---------- Diagramas simples de cada componente metodológico ---------- */

function DiagPositivist() {
  const pts = [
    [20, 120],
    [70, 96],
    [120, 104],
    [170, 64],
    [220, 48],
  ]
  return (
    <svg viewBox="0 0 240 150" className="h-[150px] w-full">
      <path d="M10 140 H235 M10 140 V10" stroke="#d9d5cc" strokeWidth="2" fill="none" />
      <motion.polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke="#1f4e8c" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
      {pts.map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="7" fill="#1f4e8c" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.15 }} />
      ))}
    </svg>
  )
}

function DiagMixed() {
  return (
    <svg viewBox="0 0 240 150" className="h-[150px] w-full">
      <motion.circle cx="88" cy="75" r="62" fill="#0f5c6b" fillOpacity="0.16" stroke="#0f5c6b" strokeWidth="2.5" initial={{ x: -20, opacity: 0 }} animate={{ x: [0, 8], opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, x: { duration: 2.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.3 } }} />
      <motion.circle cx="152" cy="75" r="62" fill="#3f9a83" fillOpacity="0.16" stroke="#3f9a83" strokeWidth="2.5" initial={{ x: 20, opacity: 0 }} animate={{ x: [0, -8], opacity: 1 }} transition={{ duration: 0.8, delay: 0.5, x: { duration: 2.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.3 } }} />
      <text x="62" y="80" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0f5c6b">Cualitativo</text>
      <text x="180" y="80" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#3f9a83">Cuantitativo</text>
    </svg>
  )
}

function DiagApplied() {
  const steps = ['Necesidades', 'Requisitos', 'Sistema']
  return (
    <div className="flex h-[150px] flex-col justify-center gap-2">
      {steps.map((s, i) => (
        <motion.div key={s} className="flex items-center gap-3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.2 }}>
          <span className="h-9 rounded-lg" style={{ width: 60 + i * 50, background: ['#dbe6f3', '#a9c3e3', '#1f4e8c'][i] }} />
          <span className="text-[17px] font-semibold text-ink">{s}</span>
        </motion.div>
      ))}
    </div>
  )
}

function DiagScope() {
  const bars = [
    { t: 'Exploratorio', w: 45, c: '#a9c3e3' },
    { t: 'Descriptivo', w: 60, c: '#7fb59a' },
    { t: 'Correlacional', w: 100, c: '#0f5c6b' },
  ]
  return (
    <div className="flex h-[150px] flex-col justify-center gap-3">
      {bars.map((b, i) => (
        <div key={b.t}>
          <div className="text-[15px] font-semibold text-ink-soft">{b.t}</div>
          <motion.div className="mt-1 h-3 rounded-full" style={{ background: b.c }} initial={{ width: 0 }} animate={{ width: `${b.w}%` }} transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease }} />
        </div>
      ))}
    </div>
  )
}

const diagrams = [DiagPositivist, DiagMixed, DiagApplied, DiagScope]

function Method() {
  return (
    <motion.div className="absolute left-[140px] top-[380px] grid w-[1640px] grid-cols-4 gap-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
      {methodology.map((m, i) => {
        const D = diagrams[i]
        return (
          <motion.div
            key={m.key}
            className="flex h-[520px] flex-col rounded-3xl border border-line bg-white p-8"
            initial={{ opacity: 0, y: 80, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ y: -10, boxShadow: '0 30px 60px -36px rgba(14,42,71,0.6)' }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease }}
            style={{ transformPerspective: 1000 }}
          >
            <div className="text-[16px] font-bold uppercase tracking-[0.18em] text-mute">{m.label}</div>
            <div className="font-display mt-2 text-[44px] font-extrabold leading-none text-ink">{m.value}</div>
            <div className="mt-6 border-y border-line py-4">
              <D />
            </div>
            <p className="mt-5 text-[20px] leading-[1.45] text-ink-soft">{m.text}</p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

/* ---------- Aspectos administrativos ---------- */

function Admin() {
  const max = costs[0].value
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
      {/* Equipo */}
      <div className="absolute left-[140px] top-[330px] w-[520px]">
        <div className="font-display text-[26px] font-extrabold text-ink">Equipo de trabajo</div>
        <div className="mt-4 space-y-3">
          {team.map((t, i) => (
            <motion.div key={t.name} className="flex items-center gap-5 rounded-2xl bg-white px-6 py-4 ring-1 ring-line" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} whileHover={{ x: 10, scale: 1.02 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease }}>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blue text-warm">
                <UserRound size={26} />
              </span>
              <div>
                <div className="font-display text-[23px] font-extrabold text-ink">{t.name}</div>
                <div className="text-[17px] leading-snug text-ink-soft">{t.focus}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div className="mt-5 rounded-2xl border-2 border-dashed border-sage/60 px-6 py-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}>
          <div className="flex items-center gap-3 text-[14px] font-bold uppercase tracking-[0.18em] text-sage">
            <School size={18} /> Acompañamiento institucional
          </div>
          <div className="font-display mt-2 text-[23px] font-extrabold text-ink">{advisor.name}</div>
          <div className="text-[17px] text-ink-soft">{advisor.role}</div>
          <div className="mt-1 text-[16px] italic text-mute">{advisor.contribution}</div>
        </motion.div>
        <div className="mt-3 text-[15px] text-mute">Responsabilidades desarrolladas de manera colaborativa.</div>
      </div>

      {/* Cronograma */}
      <div className="absolute left-[740px] top-[330px] w-[1040px]">
        <div className="flex items-baseline justify-between">
          <div className="font-display text-[26px] font-extrabold text-ink">Cronograma · 6 meses</div>
        </div>
        <div className="mt-4 rounded-2xl bg-white p-5 ring-1 ring-line">
          <div className="grid grid-cols-[300px_repeat(6,1fr)] text-[15px] font-bold uppercase tracking-wider text-mute">
            <span />
            {[1, 2, 3, 4, 5, 6].map((m) => (
              <span key={m} className="text-center">
                Mes {m}
              </span>
            ))}
          </div>
          {specificObjectives.map((o, i) => (
            <div key={o.short} className="mt-2 grid grid-cols-[300px_repeat(6,1fr)] items-center">
              <span className="text-[18px] font-semibold text-ink">
                {i + 1}. {o.short}
              </span>
              <div className="relative col-span-6 h-9 rounded-md bg-[repeating-linear-gradient(90deg,#f3f1ec_0,#f3f1ec_calc(100%/6-2px),#faf7f2_calc(100%/6-2px),#faf7f2_calc(100%/6))]">
                <motion.div
                  className="absolute inset-y-1 rounded-md bg-gradient-to-r from-blue to-petrol"
                  style={{ left: `calc(${((o.months[0] - 1) / 6) * 100}% + 3px)` }}
                  initial={{ width: 0 }}
                  animate={{ width: `calc(${(o.months.length / 6) * 100}% - 6px)` }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.6, ease }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Costos */}
      <div className="absolute left-[740px] top-[690px] grid w-[1040px] grid-cols-[1fr_330px] gap-8">
        <div>
          <div className="font-display text-[26px] font-extrabold text-ink">Costos estimados</div>
          <div className="mt-3 space-y-1.5">
            {costs.map((c, i) => (
              <div key={c.item} className="grid grid-cols-[250px_1fr_100px] items-center gap-3">
                <span className="text-[16px] text-ink-soft">{c.item}</span>
                <div className="h-4 rounded-full bg-pearl">
                  <motion.div className="h-full rounded-full bg-sage" initial={{ width: 0 }} animate={{ width: `${(c.value / max) * 100}%` }} transition={{ delay: 0.6 + i * 0.08, duration: 0.7, ease }} />
                </div>
                <span className="text-right text-[16px] font-semibold tabular-nums text-ink">{fmtCOP(c.value)}</span>
              </div>
            ))}
          </div>
        </div>
        <motion.div className="flex flex-col justify-between rounded-3xl bg-ink px-7 py-6 text-warm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.6, ease }}>
          <div className="space-y-1 text-[16px] text-warm/75">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">{fmtCOP(costSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Imprevistos (10 %)</span>
              <span className="tabular-nums">{fmtCOP(costContingency)}</span>
            </div>
          </div>
          <div>
            <div className="text-[14px] font-bold uppercase tracking-[0.18em] text-sage-soft">Total estimado</div>
            <div className="font-display text-[46px] font-extrabold leading-none">
              $<Counter value={costTotal} delay={1.1} />
            </div>
            <div className="mt-1 text-[15px] text-warm/70">COP · prioriza software libre</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Scene14Methodology({ step }: SceneProps) {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[110px] w-[1640px]">
        <AnimatePresence mode="wait">
          <motion.div key={step} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            {step === 0 ? (
              <SceneHeader n="13" label="Metodología de investigación" tone="petrol" titleClass="text-[58px]" title={<>Cómo se estudia el problema</>} lead="Investigación aplicada con enfoque mixto, orientada a construir y validar el sistema." />
            ) : (
              <SceneHeader n="13" label="Aspectos administrativos" tone="petrol" titleClass="text-[58px]" title={<>Equipo, tiempo y recursos</>} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">{step === 0 ? <Method key="m" /> : <Admin key="a" />}</AnimatePresence>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Gavel } from 'lucide-react'
import { ease, fadeUp } from '../../animations/variants'
import { SceneHeader } from '../../components/SceneHeader'
import { regulations, ruta, situationTypes } from '../../data/content'

const CX = 1430
const CY = 470
const R = 200
const rutaColors = ['#3f9a83', '#0f5c6b', '#1f4e8c', '#d99a2b']
const typeColors = ['#d99a2b', '#c8664b', '#8f3b2a']

export default function Scene11Regulations() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[110px] w-[760px]">
        <SceneHeader n="10" label="Marco normativo y conceptual" tone="petrol" titleClass="text-[58px]" title={<>La norma como guía del proceso</>} />
      </div>

      {/* Normas */}
      <div className="absolute left-[140px] top-[330px] w-[720px] space-y-5">
        {regulations.map((r, i) => {
          const [kind, num, , year] = r.id.split(' ')
          return (
            <motion.div
              key={r.id}
              className="flex gap-7 rounded-2xl border border-line bg-white p-7"
              initial={{ opacity: 0, x: -60, rotateY: 25 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              whileHover={{ x: 10, boxShadow: '0 24px 40px -28px rgba(15,92,107,0.6)' }}
              transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.15 }}
              style={{ transformPerspective: 1000 }}
            >
              <div className="flex w-[150px] shrink-0 flex-col items-start border-r border-line pr-6">
                <Gavel size={26} className="text-petrol" />
                <div className="mt-3 text-[16px] font-bold uppercase tracking-[0.16em] text-mute">{kind}</div>
                <div className="font-display text-[44px] font-extrabold leading-none text-ink">{num}</div>
                <div className="font-display text-[22px] font-bold text-petrol">{year}</div>
              </div>
              <p className="self-center text-[21px] leading-[1.45] text-ink">{r.text}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Ruta de Atención Integral */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} custom={2} className="absolute text-center" style={{ left: CX - 160, top: CY - 50, width: 320 }}>
        <div className="text-[15px] font-bold uppercase tracking-[0.18em] text-mute">Ley 1620 · Decreto 1965</div>
        <div className="font-display mt-1 text-[30px] font-extrabold leading-tight text-ink">Ruta de Atención Integral</div>
      </motion.div>
      <svg className="absolute inset-0" width="1920" height="1080">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#6b7684" />
          </marker>
        </defs>
        {ruta.map((_, i) => {
          const a0 = (i / 4) * Math.PI * 2 - Math.PI / 2 + 0.38
          const a1 = ((i + 1) / 4) * Math.PI * 2 - Math.PI / 2 - 0.38
          const p = (a: number) => `${CX + Math.cos(a) * R} ${CY + Math.sin(a) * R}`
          return (
            <motion.path
              key={i}
              d={`M${p(a0)} A${R} ${R} 0 0 1 ${p(a1)}`}
              fill="none"
              stroke="#6b7684"
              strokeWidth="2.5"
              markerEnd="url(#arr)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.25 }}
            />
          )
        })}
      </svg>
      <svg className="spin-mid pointer-events-none absolute" style={{ left: CX - R - 20, top: CY - R - 20 }} width={2 * R + 40} height={2 * R + 40}>
        <circle cx={R + 20} cy={20} r="9" fill="#0f5c6b" />
        <circle cx={R + 20} cy={20} r="16" fill="#0f5c6b" fillOpacity="0.15" />
      </svg>
      {ruta.map((r, i) => {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2
        return (
          <motion.div
            key={r}
            className="absolute flex h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-center shadow-[0_16px_30px_-16px_rgba(14,42,71,0.5)]"
            style={{ left: CX + Math.cos(a) * R, top: CY + Math.sin(a) * R, background: rutaColors[i] }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease, delay: 0.6 + i * 0.25 }}
          >
            <span className="ripple absolute inset-0 rounded-full border-4" style={{ borderColor: rutaColors[i], animationDelay: `${1.5 + i * 0.7}s` }} />
            <span className="font-display px-2 text-[18px] font-extrabold leading-tight text-warm">{r}</span>
          </motion.div>
        )
      })}

      {/* Clasificación de situaciones */}
      <motion.div className="absolute left-[1000px] top-[740px] w-[780px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.7, ease }}>
        <div className="flex items-baseline justify-between">
          <div className="font-display text-[24px] font-extrabold text-ink">Clasificación de situaciones</div>
          <div className="text-[16px] text-mute">Congreso de Colombia, 2013</div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {situationTypes.map((t, i) => (
            <motion.div key={t.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 + i * 0.15, duration: 0.5 }} whileHover={{ y: -6 }} className="rounded-xl px-4 py-3" style={{ background: `${typeColors[i]}1f`, borderTop: `5px solid ${typeColors[i]}` }}>
              <div className="font-display text-[22px] font-extrabold" style={{ color: typeColors[i] }}>
                {t.type}
              </div>
              <div className="mt-1 text-[16px] leading-snug text-ink">{t.text}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-[16px] leading-snug text-ink-soft">
          La clasificación la realiza el Coordinador de Convivencia; el sistema propuesto consulta la normativa aplicable y genera guías de actuación por rol.
        </p>
      </motion.div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Bell, ClipboardList, FileText, FilePlus, Flag, Route, Split, Tags, UserRound, type LucideIcon } from 'lucide-react'
import { ease } from '../../animations/variants'
import { SceneHeader } from '../../components/SceneHeader'
import { workflow } from '../../data/content'
import type { SceneProps } from '../types'

const icons: LucideIcon[] = [Bell, FilePlus, Tags, UserRound, ClipboardList, Route, Flag]
const LEFT = 140
const W = 1640
const N = workflow.length
const COL = W / N
const NODE_Y = 395

export default function Scene10Workflow({ step }: SceneProps) {
  const last = step
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[110px] flex w-[1640px] items-end justify-between">
        <SceneHeader n="09" label="Flujo de gestión y seguimiento" tone="blue" titleClass="text-[60px]" title={<>Del reporte al cierre, en un solo expediente</>} />
      </div>

      {/* Conectores */}
      <svg className="absolute inset-0" width="1920" height="1080">
        {workflow.slice(0, -1).map((_, i) => {
          const x1 = LEFT + COL * i + COL / 2 + 52
          const x2 = LEFT + COL * (i + 1) + COL / 2 - 52
          return (
            <g key={i}>
              {i < last && <line className="flow-dash" x1={x1} y1={NODE_Y + 10} x2={x2} y2={NODE_Y + 10} stroke="#3f9a83" strokeWidth="2" />}
              <line x1={x1} y1={NODE_Y} x2={x2} y2={NODE_Y} stroke="#d9d5cc" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
              <motion.line
                x1={x1}
                y1={NODE_Y}
                x2={x2}
                y2={NODE_Y}
                stroke="#1f4e8c"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: i < last ? 1 : 0 }}
                transition={{ duration: 0.5, ease }}
              />
            </g>
          )
        })}
      </svg>

      {/* El expediente viaja hasta la etapa activa */}
      <motion.div
        className="absolute z-10 grid h-14 w-14 place-items-center rounded-xl bg-sage text-warm shadow-[0_14px_30px_-10px_rgba(63,154,131,0.8)]"
        initial={false}
        animate={{ left: LEFT + COL * last + COL / 2 - 28, top: [NODE_Y - 150, NODE_Y - 160, NODE_Y - 150] }}
        transition={{ left: { type: 'spring', stiffness: 90, damping: 14 }, top: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <FileText size={28} />
        <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-sage" />
      </motion.div>
      {workflow.map((w, i) => {
        const Icon = icons[i]
        const on = i <= last
        const current = i === last
        const cx = LEFT + COL * i + COL / 2
        return (
          <div key={w.key} className="absolute flex w-[226px] -translate-x-1/2 flex-col items-center text-center" style={{ left: cx, top: NODE_Y - 48 }}>
            <motion.span
              className="relative grid h-[96px] w-[96px] place-items-center rounded-full border-4"
              animate={{
                backgroundColor: current ? '#1f4e8c' : on ? '#dbe6f3' : '#faf7f2',
                borderColor: on ? '#1f4e8c' : '#d9d5cc',
                color: current ? '#faf7f2' : on ? '#1f4e8c' : '#b9b4aa',
                scale: current ? 1.1 : 1,
              }}
              transition={{ duration: 0.5, ease }}
            >
              {current && <span className="ripple absolute inset-0 rounded-full border-4 border-blue/60" />}
              <Icon size={38} strokeWidth={1.8} />
              <span className="absolute -top-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-warm text-[15px] font-bold text-ink ring-2 ring-line">{i + 1}</span>
            </motion.span>
            <motion.div animate={{ opacity: on ? 1 : 0.35 }} className="font-display mt-5 text-[24px] font-extrabold leading-tight text-ink">
              {w.label}
            </motion.div>
            <motion.p animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }} transition={{ duration: 0.5 }} className="mt-2 text-[17px] leading-snug text-ink-soft">
              {w.text}
            </motion.p>
          </div>
        )
      })}

      {/* Actores que intervienen en cada etapa */}
      {workflow.map((w, i) => {
        const on = i <= last
        const cx = LEFT + COL * i + COL / 2
        const parallel = w.actors.length > 2
        return (
          <motion.div
            key={`a-${w.key}`}
            className="absolute flex w-[220px] -translate-x-1/2 flex-col items-center gap-1.5"
            style={{ left: cx, top: 676 }}
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
            transition={{ duration: 0.5, ease, delay: on ? 0.2 : 0 }}
          >
            {w.actors.length === 0 && <span className="rounded-full border border-dashed border-blue/40 px-3 py-1 text-[15px] font-semibold text-blue">Sistema</span>}
            {w.actors.map((a) => (
              <span key={a} className="whitespace-nowrap rounded-full bg-pearl px-3 py-1 text-[15px] font-semibold text-ink-soft">
                {a}
              </span>
            ))}
            {parallel && (
              <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[14px] font-bold uppercase tracking-[0.12em] text-sage">
                <Split size={16} /> sucesivas o paralelas
              </span>
            )}
          </motion.div>
        )
      })}

      <div className="absolute left-[140px] top-[652px] w-[1640px] border-t border-dashed border-line" />
      <div className="absolute left-[140px] top-[660px] text-[14px] font-bold uppercase tracking-[0.16em] text-mute">Actores</div>

      {/* Expediente digital que acompaña todas las etapas */}
      <div className="absolute left-[140px] top-[866px] w-[1640px]">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-display text-[22px] font-extrabold text-blue">Expediente digital · código único de seguimiento</span>
          <span className="text-[18px] font-semibold text-ink-soft">Historial cronológico de actuaciones</span>
        </div>
        <div className="relative h-[30px] overflow-hidden rounded-full bg-pearl">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue to-petrol"
            animate={{ width: `${((last + 0.5) / N) * 100}%` }}
            transition={{ duration: 0.8, ease }}
          />
          {workflow.map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm"
              style={{ left: COL * i + COL / 2 }}
              animate={{ opacity: i <= last ? 1 : 0, scale: i === last ? [1, 1.8, 1] : 1 }}
              transition={{ duration: 0.6 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

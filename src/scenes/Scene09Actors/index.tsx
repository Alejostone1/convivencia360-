import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Brain, ClipboardList, Landmark, Puzzle, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { ease, fadeUp } from '../../animations/variants'
import { roles, type RoleKey } from '../../data/content'

const meta: Record<RoleKey, { Icon: LucideIcon; color: string }> = {
  convivencia: { Icon: ShieldCheck, color: '#1f4e8c' },
  academico: { Icon: BookOpen, color: '#0f5c6b' },
  psico: { Icon: Brain, color: '#3f9a83' },
  rector: { Icon: Landmark, color: '#0e2a47' },
  director: { Icon: ClipboardList, color: '#d99a2b' },
  apoyo: { Icon: Puzzle, color: '#c8664b' },
}

const CARD_W = 390
const CARD_H = 128
const rowsY = [350, 540, 730]
const LX = 140
const RX = 1920 - 140 - CARD_W
// Expediente central
const EX = 660
const EW = 600
const EY = 330
const EH = 560

export default function Scene09Actors() {
  const [sel, setSel] = useState<RoleKey>('convivencia')
  const role = roles.find((r) => r.key === sel)!
  const m = meta[sel]

  const placed = roles.map((r, i) => {
    const left = i < 3
    const y = rowsY[i % 3]
    return { r, left, x: left ? LX : RX, y }
  })

  return (
    <div className="absolute inset-0">
      <motion.div initial="hidden" animate="show" className="absolute left-[140px] top-[110px] w-[1640px] text-center">
        <motion.div variants={fadeUp} custom={0} className="eyebrow flex items-center justify-center gap-4 text-blue">
          <span>08</span>
          <span className="h-[2px] w-12 bg-current opacity-50" />
          Actores institucionales
        </motion.div>
        <motion.h2 variants={fadeUp} custom={1} className="font-display mt-4 text-[54px] font-extrabold leading-tight text-ink">
          Ningún caso queda en manos de un único rol
        </motion.h2>
      </motion.div>

      {/* Conexiones de cada rol con el expediente */}
      <svg className="absolute inset-0" width="1920" height="1080">
        {placed.map(({ r, left, x, y }, i) => {
          const sx = left ? x + CARD_W : x
          const sy = y + CARD_H / 2
          const tx = left ? EX : EX + EW
          const ty = EY + 140 + (i % 3) * 140
          const mx = (sx + tx) / 2
          const active = r.key === sel
          return (
            <motion.path
              key={r.key}
              d={`M${sx} ${sy} C${mx} ${sy}, ${mx} ${ty}, ${tx} ${ty}`}
              fill="none"
              stroke={meta[r.key].color}
              strokeWidth={active ? 4 : 2}
              strokeDasharray={active ? '0' : '6 8'}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: active ? 0.95 : 0.35 }}
              transition={{ duration: 0.9, ease, delay: 0.3 + i * 0.08 }}
            />
          )
        })}
        {placed.map(({ r, left, x, y }, i) => {
          if (r.key !== sel) return null
          const sx = left ? x + CARD_W : x
          const sy = y + CARD_H / 2
          const tx = left ? EX : EX + EW
          const ty = EY + 140 + (i % 3) * 140
          const mx = (sx + tx) / 2
          const d = `M${sx} ${sy} C${mx} ${sy}, ${mx} ${ty}, ${tx} ${ty}`
          return (
            <g key={`flow-${r.key}`}>
              <path className="flow-dash" d={d} fill="none" stroke="#faf7f2" strokeWidth="2.5" />
              {[0, 0.5].map((o) => (
                <circle key={o} r="7" fill={meta[r.key].color}>
                  <animateMotion dur="1.6s" begin={`${o * 1.6}s`} repeatCount="indefinite" path={d} />
                </circle>
              ))}
            </g>
          )
        })}
      </svg>

      {placed.map(({ r, left, x, y }, i) => {
        const { Icon, color } = meta[r.key]
        const active = r.key === sel
        return (
          <motion.button
            key={r.key}
            onClick={() => setSel(r.key)}
            className="absolute flex items-center gap-5 rounded-2xl border-2 px-6 text-left outline-none transition-colors duration-300"
            style={{ left: x, top: y, width: CARD_W, height: CARD_H, borderColor: active ? color : '#d9d5cc', background: active ? '#ffffff' : 'rgba(250,247,242,0.9)', flexDirection: left ? 'row' : 'row-reverse', textAlign: left ? 'left' : 'right' }}
            initial={{ opacity: 0, x: left ? -30 : 30 }}
            animate={{ opacity: 1, x: 0, scale: active ? 1.04 : 1 }}
            whileHover={{ scale: 1.06, x: left ? 8 : -8 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.6, ease, delay: active ? 0 : 0.2 + i * 0.08 }}
            aria-pressed={active}
          >
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl" style={{ background: active ? color : '#ece9e3', color: active ? '#faf7f2' : color }}>
              <Icon size={30} strokeWidth={1.8} />
            </span>
            <span className="flex-1">
              <span className="font-display block text-[23px] font-extrabold leading-tight text-ink">{r.name}</span>
              <span className="mt-1 block text-[16px] leading-snug text-ink-soft">{r.tagline}</span>
            </span>
          </motion.button>
        )
      })}

      {/* Expediente digital: muestra el aporte del rol seleccionado */}
      <motion.div
        className="absolute"
        style={{ left: EX, top: EY - 34, width: EW }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <div className="ml-8 flex h-[34px] w-[260px] items-center rounded-t-2xl px-5 text-[15px] font-bold uppercase tracking-[0.16em] text-warm transition-colors duration-500" style={{ background: m.color }}>
          Expediente digital
        </div>
        <div className="relative overflow-hidden rounded-3xl rounded-tl-none bg-white shadow-[0_40px_80px_-35px_rgba(14,42,71,0.5)] ring-1 ring-line" style={{ height: EH }}>
          <AnimatePresence mode="wait">
            <motion.div key={sel} className="p-10" initial={{ opacity: 0, rotateY: -25, x: 40 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} exit={{ opacity: 0, rotateY: 20, x: -40 }} transition={{ duration: 0.45, ease }} style={{ transformPerspective: 1200 }}>
              <div className="text-[16px] font-semibold uppercase tracking-[0.18em]" style={{ color: m.color }}>
                Vista y aporte del rol
              </div>
              <div className="font-display mt-2 text-[34px] font-extrabold leading-tight text-ink">{role.name}</div>
              <ul className="mt-6 space-y-3.5">
                {role.duties.map((d, i) => (
                  <motion.li key={d} className="flex gap-4 text-[20px] leading-[1.38] text-ink" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
                    <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: m.color }} />
                    {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.p
        className="absolute left-[140px] top-[930px] w-[1640px] text-center text-[19px] text-mute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Seleccione un rol · Cada actor accede únicamente a las funciones asignadas a su rol (control de acceso basado en roles)
      </motion.p>
    </div>
  )
}

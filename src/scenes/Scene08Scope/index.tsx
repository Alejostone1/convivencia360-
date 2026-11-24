import { AnimatePresence, motion } from 'framer-motion'
import { Bell, ChartColumn, FolderOpen, KeyRound, Route, Scale, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDrawPaths } from '../../animations/gsap'
import { ease } from '../../animations/variants'
import { SceneHeader } from '../../components/SceneHeader'
import { modules, type ModuleKey } from '../../data/content'

const icons: Record<ModuleKey, LucideIcon> = { auth: KeyRound, cases: FolderOpen, norms: Scale, tracking: Route, reports: ChartColumn, notify: Bell }
const colors = ['#1f4e8c', '#0f5c6b', '#3f9a83', '#1f4e8c', '#0f5c6b', '#3f9a83']

const CX = 640
const CY = 570
const R = 330

export default function Scene08Scope() {
  const [sel, setSel] = useState(0)
  const [auto, setAuto] = useState(true)
  const svg = useRef<SVGSVGElement>(null)
  useDrawPaths(svg)

  // Recorre los módulos automáticamente hasta que el expositor elige uno.
  useEffect(() => {
    if (!auto) return
    const id = window.setInterval(() => setSel((s) => (s + 1) % modules.length), 4500)
    return () => window.clearInterval(id)
  }, [auto])

  const pts = modules.map((_, i) => {
    const a = (i / modules.length) * Math.PI * 2 - Math.PI / 2
    return { x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R }
  })
  const m = modules[sel]
  const SelIcon = icons[m.key]

  return (
    <div className="absolute inset-0">
      <svg ref={svg} className="absolute inset-0" width="1920" height="1080">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#0e2a47" strokeOpacity="0.08" strokeWidth="2" />
        {pts.map((p, i) => (
          <g key={i}>
            <path data-draw data-delay={0.4 + i * 0.1} d={`M${CX} ${CY} L${p.x} ${p.y}`} stroke={colors[i]} strokeOpacity={i === sel ? 0.9 : 0.25} strokeWidth={i === sel ? 4 : 2} fill="none" />
            <path className="flow-dash-slow" d={`M${CX} ${CY} L${p.x} ${p.y}`} stroke={colors[i]} strokeOpacity="0.35" strokeWidth="2" fill="none" />
            {i === sel && (
              <motion.circle
                key={`pulse-${sel}`}
                r="7"
                fill={colors[i]}
                initial={{ cx: CX, cy: CY, opacity: 0 }}
                animate={{ cx: [CX, p.x], cy: [CY, p.y], opacity: [0, 1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </g>
        ))}
      </svg>

      {[0, 1, 2].map((k) => (
        <div key={k} className="ripple absolute rounded-full border-2 border-ink/25" style={{ left: CX - 120, top: CY - 120, width: 240, height: 240, animationDelay: `${k * 0.93}s` }} />
      ))}
      <svg className="spin-mid pointer-events-none absolute" style={{ left: CX - 150, top: CY - 150 }} width="300" height="300">
        <circle cx="150" cy="150" r="142" fill="none" stroke="#0f5c6b" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 10" />
        <circle cx="292" cy="150" r="6" fill="#3f9a83" />
      </svg>
      {/* Núcleo */}
      <motion.div
        className="absolute grid h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-center shadow-[0_30px_60px_-20px_rgba(14,42,71,0.55)]"
        style={{ left: CX, top: CY }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <div className="font-display px-6 text-[25px] font-extrabold leading-tight tracking-wide text-warm">
          GESTIÓN
          <br />
          INTEGRAL
          <br />
          DE CASOS
        </div>
      </motion.div>

      {modules.map((mod, i) => {
        const Icon = icons[mod.key]
        const active = i === sel
        const p = pts[i]
        return (
          <motion.button
            key={mod.key}
            onClick={() => {
              setSel(i)
              setAuto(false)
            }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 outline-none"
            style={{ left: p.x, top: p.y }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: active ? 1.1 : 1, y: [0, -7] }}
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, ease, delay: active ? 0 : 0.6 + i * 0.1, y: { duration: 4 + (i % 3) * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 + i * 0.3 } }}
            aria-pressed={active}
          >
            <span
              className="grid h-[96px] w-[96px] place-items-center rounded-full border-4 transition-colors duration-500"
              style={{ background: active ? colors[i] : '#ffffff', borderColor: colors[i], color: active ? '#faf7f2' : colors[i] }}
            >
              <Icon size={40} strokeWidth={1.7} />
            </span>
            <span className={`font-display w-[220px] rounded-full px-3 py-1 text-center text-[20px] font-bold leading-tight ${active ? 'text-ink' : 'text-ink-soft'}`} style={{ background: 'rgba(250,247,242,0.92)' }}>
              {mod.name}
            </span>
          </motion.button>
        )
      })}

      {/* Panel de detalle */}
      <div className="absolute left-[1140px] top-[120px] w-[660px]">
        <SceneHeader n="07" label="Alcance del proyecto" tone="petrol" titleClass="text-[62px]" title={<>Seis módulos, un mismo expediente</>} />
        <AnimatePresence mode="wait">
          <motion.div
            key={m.key}
            className="mt-12 rounded-3xl border border-line bg-white p-10 shadow-[0_30px_60px_-40px_rgba(14,42,71,0.5)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="flex items-center gap-5">
              <span className="grid h-16 w-16 place-items-center rounded-2xl text-warm" style={{ background: colors[sel] }}>
                <SelIcon size={30} />
              </span>
              <div>
                <div className="text-[17px] font-semibold tracking-wide text-mute">Módulo {m.n}</div>
                <div className="font-display text-[32px] font-extrabold leading-tight text-ink">{m.name}</div>
              </div>
            </div>
            <p className="mt-6 text-[23px] leading-[1.45] text-ink">{m.summary}</p>
            <ul className="mt-6 space-y-3">
              {m.features.map((f) => (
                <li key={f} className="flex gap-4 text-[21px] leading-snug text-ink-soft">
                  <span className="mt-[10px] h-2 w-2 shrink-0 rounded-full" style={{ background: colors[sel] }} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex gap-2">
          {modules.map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-full transition-colors duration-500" style={{ background: i === sel ? colors[i] : '#d9d5cc' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

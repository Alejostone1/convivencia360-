import { motion } from 'framer-motion'
import { Atom, Database, Monitor, Server, type LucideIcon } from 'lucide-react'
import { ease, fadeUp } from '../../animations/variants'
import { SceneHeader, Source } from '../../components/SceneHeader'
import { architecture } from '../../data/content'

const icons: LucideIcon[] = [Monitor, Atom, Server, Database]
const colors = ['#6b7684', '#1f4e8c', '#0f5c6b', '#3f9a83']
const protocols = ['HTTP / HTTPS', 'API REST', 'SQL']

const X = 960
const W = 820
const H = 150
const GAP = 58
const TOP = 200
const layerY = (i: number) => TOP + i * (H + GAP)
const LINE_X = X + 110

export default function Scene13Architecture() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[110px] w-[700px]">
        <SceneHeader n="12" label="Arquitectura tecnológica" tone="blue" titleClass="text-[58px]" title={<>Cliente-servidor, en tres capas desacopladas</>} />
        <motion.p initial="hidden" animate="show" variants={fadeUp} custom={3} className="mt-8 text-[24px] leading-[1.5] text-ink-soft">
          Presentación, lógica de negocio y persistencia interactúan mediante servicios web y protocolos estandarizados.
        </motion.p>
        <motion.ul initial="hidden" animate="show" className="mt-8 space-y-4">
          {['Centralizar la información institucional', 'Acceso concurrente desde cualquier navegador', 'Administración segura de permisos por rol'].map((t, i) => (
            <motion.li key={t} variants={fadeUp} custom={4 + i * 0.5} className="flex items-center gap-4 text-[23px] font-semibold text-ink">
              <span className="h-2.5 w-8 rounded-full bg-gradient-to-r from-blue to-sage" />
              {t}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={6} className="mt-8">
          <Source>Acosta Núñez, 2021; Abduraham et al., 2026</Source>
        </motion.div>
      </div>

      {/* Flujo de información entre capas */}
      <svg className="absolute inset-0" width="1920" height="1080">
        {protocols.map((_, i) => {
          const y1 = layerY(i) + H
          const y2 = layerY(i + 1)
          return (
            <g key={i}>
              <motion.line x1={LINE_X} x2={LINE_X} y1={y1} y2={y2} stroke="#1f4e8c" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 + i * 0.3, duration: 0.5 }} />
              <motion.line x1={LINE_X + 34} x2={LINE_X + 34} y1={y1} y2={y2} stroke="#3f9a83" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 + i * 0.3, duration: 0.5 }} />
              {/* solicitud (baja) */}
              <motion.circle
                cx={LINE_X}
                r="6"
                fill="#1f4e8c"
                animate={{ cy: [y1, y2], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 1.6 + i * 0.4, repeatDelay: 0.8, ease: 'easeInOut' }}
              />
              {/* respuesta (sube) */}
              <motion.circle
                cx={LINE_X + 34}
                r="6"
                fill="#3f9a83"
                animate={{ cy: [y2, y1], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 2.4 + (2 - i) * 0.4, repeatDelay: 0.8, ease: 'easeInOut' }}
              />
            </g>
          )
        })}
      </svg>
      {protocols.map((p, i) => (
        <motion.span
          key={p}
          className="absolute -translate-y-1/2 rounded-full bg-warm px-3 py-0.5 text-[16px] font-bold tracking-wide text-ink-soft ring-1 ring-line"
          style={{ left: LINE_X + 60, top: layerY(i) + H + GAP / 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.3 }}
        >
          {p}
        </motion.span>
      ))}
      <motion.div className="absolute flex items-center gap-5 text-[15px] font-semibold text-mute" style={{ left: X + W - 330, top: TOP - 46 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue" /> solicitud
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sage" /> respuesta
        </span>
      </motion.div>

      {architecture.map((l, i) => {
        const Icon = icons[i]
        const isUser = i === 0
        return (
          <motion.div
            key={l.key}
            className={`absolute flex items-center gap-7 rounded-3xl px-8 ${isUser ? 'border-2 border-dashed border-line bg-warm/80' : 'bg-white shadow-[0_24px_50px_-30px_rgba(14,42,71,0.5)] ring-1 ring-line'}`}
            initial={{ opacity: 0, x: 120, rotateX: 30 }}
            animate={{ opacity: 1, x: 0, rotateX: 0 }}
            whileHover={{ scale: 1.03, x: -8 }}
            transition={{ duration: 0.9, ease, delay: 0.3 + i * 0.18 }}
            style={{ left: X, top: layerY(i), width: W, height: H, transformPerspective: 1200 }}
          >
            <span className="grid h-[84px] w-[84px] shrink-0 place-items-center rounded-2xl text-warm" style={{ background: colors[i] }}>
              <span className={i === 1 ? 'spin-mid inline-flex' : i === 3 ? 'float inline-flex' : 'inline-flex'}>
                <Icon size={40} strokeWidth={1.7} />
              </span>
            </span>
            <div className="w-[230px] shrink-0">
              <div className="text-[15px] font-bold uppercase tracking-[0.14em] text-mute">{l.layer}</div>
              <div className={`font-display font-extrabold leading-tight ${isUser ? 'text-[30px]' : 'text-[40px]'}`} style={{ color: isUser ? '#0e2a47' : colors[i] }}>
                {l.tech}
              </div>
            </div>
            <p className="text-[19px] leading-[1.4] text-ink-soft">{l.role}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

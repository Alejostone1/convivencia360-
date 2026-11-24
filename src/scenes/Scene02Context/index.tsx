import { motion } from 'framer-motion'
import { Activity, Brain, HeartHandshake, Users } from 'lucide-react'
import { ease, fadeUp } from '../../animations/variants'
import { SceneHeader, Source } from '../../components/SceneHeader'

const CX = 1300
const CY = 560

const dims = [
  { label: 'Física', Icon: Activity, color: '#1f4e8c', soft: '#dbe6f3', a: -135 },
  { label: 'Psicológica', Icon: Brain, color: '#0f5c6b', soft: '#d6e9ea', a: -45 },
  { label: 'Emocional', Icon: HeartHandshake, color: '#3f9a83', soft: '#dcefe6', a: 45 },
  { label: 'Social', Icon: Users, color: '#d99a2b', soft: '#f7ead2', a: 135 },
]

function arcPath(r1: number, r2: number, a0: number, a1: number) {
  const p = (r: number, a: number) => [CX + r * Math.cos((a * Math.PI) / 180), CY + r * Math.sin((a * Math.PI) / 180)]
  const [x0, y0] = p(r2, a0)
  const [x1, y1] = p(r2, a1)
  const [x2, y2] = p(r1, a1)
  const [x3, y3] = p(r1, a0)
  return `M${x0} ${y0} A${r2} ${r2} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r1} ${r1} 0 0 0 ${x3} ${y3} Z`
}

export default function Scene02Context() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[130px] w-[760px]">
        <SceneHeader
          n="01"
          label="Contexto educativo"
          tone="petrol"
          title={
            <>
              Formar es más que
              <br />
              <span className="text-petrol">enseñar contenidos.</span>
            </>
          }
        />
        <motion.blockquote initial="hidden" animate="show" variants={fadeUp} custom={3} className="mt-10 max-w-[660px] border-l-4 border-sage pl-8 text-[28px] leading-[1.42] text-ink">
          Las instituciones educativas desempeñan un papel fundamental en la formación integral de los estudiantes, no solo desde el ámbito académico, sino también en la
          promoción de ambientes seguros.
        </motion.blockquote>
        <motion.p initial="hidden" animate="show" variants={fadeUp} custom={5} className="mt-10 max-w-[660px] text-[26px] leading-[1.45] text-ink-soft">
          El bienestar estudiantil abarca el <b className="text-ink">equilibrio físico, psicológico, emocional y social</b> necesario para el aprendizaje y la permanencia escolar.
        </motion.p>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={6} className="mt-5">
          <Source>Zenteno-Osorio & Leal-Soto, 2023; Ghasemisarukolai et al., 2026</Source>
        </motion.div>
      </div>

      {[0, 1].map((k) => (
        <div key={k} className="ripple absolute rounded-full border-2 border-petrol/30" style={{ left: CX - 140, top: CY - 140, width: 280, height: 280, animationDelay: `${k * 1.4}s` }} />
      ))}
      {/* Diagrama: el estudiante en el centro de sus dimensiones y de su entorno educativo */}
      <svg className="absolute inset-0" width="1920" height="1080" viewBox="0 0 1920 1080">
        <motion.circle
          cx={CX}
          cy={CY}
          r={370}
          fill="none"
          stroke="#0f5c6b"
          strokeOpacity="0.25"
          strokeDasharray="4 10"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        />
        {dims.map((d, i) => (
          <motion.path
            key={d.label}
            d={arcPath(150, 290, d.a - 43, d.a + 43)}
            fill={d.soft}
            stroke={d.color}
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
            transition={{ duration: 0.8, ease, delay: 0.5 + i * 0.15 }}
          />
        ))}
        <g className="spin-mid" style={{ transformBox: 'view-box', transformOrigin: `${CX}px ${CY}px` }}>
          {[0, 120, 240].map((a) => (
            <circle key={a} cx={CX + 370 * Math.cos((a * Math.PI) / 180)} cy={CY + 370 * Math.sin((a * Math.PI) / 180)} r="7" fill="#3f9a83" fillOpacity="0.8" />
          ))}
        </g>
        <g className="spin-rev" style={{ transformBox: 'view-box', transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX} cy={CY} r={310} fill="none" stroke="#1f4e8c" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="2 14" />
        </g>
        <motion.circle cx={CX} cy={CY} r={128} fill="#0e2a47" initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ transformOrigin: `${CX}px ${CY}px` }} transition={{ duration: 0.8, ease, delay: 0.3 }} />
        {/* estudiante */}
        <g transform={`translate(${CX} ${CY})`}>
          <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
            <circle cx="0" cy="-34" r="24" fill="#faf7f2" />
            <path d="M-40 38 V18 a40 30 0 0 1 80 0 V38 Z" fill="#faf7f2" />
            <path d="M-30 -62 L0 -76 L30 -62 L0 -48 Z" fill="#3f9a83" />
          </motion.g>
        </g>
        <motion.text x={CX} y={CY + 100} textAnchor="middle" className="font-display" fontSize="20" fontWeight="800" fill="#faf7f2" letterSpacing="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          ESTUDIANTE
        </motion.text>
      </svg>

      {dims.map((d, i) => {
        const r = 220
        const x = CX + r * Math.cos((d.a * Math.PI) / 180)
        const y = CY + r * Math.sin((d.a * Math.PI) / 180)
        return (
          <motion.div
            key={d.label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [0.5, 1.15, 1] }}
            transition={{ delay: 0.9 + i * 0.15, duration: 0.8 }}
          >
            <d.Icon size={36} color={d.color} strokeWidth={1.8} />
            <span className="font-display text-[24px] font-bold" style={{ color: d.color }}>
              {d.label}
            </span>
          </motion.div>
        )
      })}

      {/* Entorno educativo alrededor */}
      {[
        { t: 'Aula', a: -90 },
        { t: 'Docentes', a: 0 },
        { t: 'Familia', a: 90 },
        { t: 'Institución', a: 180 },
      ].map((e, i) => {
        const x = CX + 370 * Math.cos((e.a * Math.PI) / 180)
        const y = CY + 370 * Math.sin((e.a * Math.PI) / 180)
        return (
          <motion.span
            key={e.t}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-petrol/30 bg-warm px-5 py-2 text-[20px] font-semibold text-petrol"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8] }}
            transition={{ delay: 1.4 + i * 0.1, duration: 0.6, ease, y: { duration: 4 + (i % 3) * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 + i * 0.3 } }}
          >
            {e.t}
          </motion.span>
        )
      })}
      <motion.div
        className="absolute text-center text-[18px] uppercase tracking-[0.2em] text-mute"
        style={{ left: CX - 200, width: 400, top: CY + 410 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Entorno educativo
      </motion.div>
    </div>
  )
}

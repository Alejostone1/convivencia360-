import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, FileText, FolderOpen, History, ListChecks, UserRound, Database } from 'lucide-react'
import { ease, fadeUp } from '../../animations/variants'
import { SceneHeader } from '../../components/SceneHeader'
import type { SceneProps } from '../types'

const before = ['Documentación dispersa', 'Registros manuales', 'Información fragmentada', 'Seguimiento desorganizado']

const proposal = [
  { t: 'Expedientes digitales', Icon: FolderOpen },
  { t: 'Información centralizada', Icon: Database },
  { t: 'Responsables identificados', Icon: UserRound },
  { t: 'Historial de actuaciones', Icon: History },
  { t: 'Seguimiento organizado', Icon: ListChecks },
]

// Fragmentos de información dispersa (ilustrativos)
const papers = [
  { t: 'Registro manual', x: 960, y: 250, r: -8 },
  { t: 'Formato físico', x: 1330, y: 200, r: 6 },
  { t: 'Mensaje aislado', x: 1600, y: 330, r: -4 },
  { t: 'Acta sin vínculo', x: 1050, y: 520, r: 5 },
  { t: 'Nota suelta', x: 1460, y: 590, r: -10 },
  { t: 'Seguimiento incompleto', x: 980, y: 790, r: -3 },
  { t: 'Documento disperso', x: 1400, y: 820, r: 8 },
]

const EX = 1340
const EY = 590

export default function Scene04Solution({ step }: SceneProps) {
  const merged = step >= 1
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[120px] w-[640px]">
        <SceneHeader
          n="03"
          label="La necesidad de una solución"
          tone="blue"
          titleClass="text-[62px]"
          title={
            <>
              De la dispersión
              <br />a la <span className="text-blue">centralización</span>
            </>
          }
        />
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3} className="mt-12">
          <div className="eyebrow text-coral">Antes</div>
          <ul className="mt-4 space-y-3">
            {before.map((b) => (
              <li key={b} className={`flex items-center gap-4 text-[28px] transition-colors duration-700 ${merged ? 'text-mute line-through decoration-coral/50' : 'text-ink'}`}>
                <span className="h-3 w-3 rotate-45 border-2 border-coral" />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.p initial="hidden" animate="show" variants={fadeUp} custom={5} className="mt-12 text-[20px] leading-relaxed text-mute">
          La propuesta describe lo que el sistema busca habilitar; sus efectos se evaluarán en el desarrollo del proyecto.
        </motion.p>
      </div>

      {/* líneas rotas entre fragmentos */}
      <motion.svg className="absolute inset-0" width="1920" height="1080" animate={{ opacity: merged ? 0 : 1 }} transition={{ duration: 0.5 }}>
        {papers.slice(0, -1).map((p, i) => {
          const q = papers[i + 1]
          return <line key={i} x1={p.x + 110} y1={p.y + 40} x2={q.x + 110} y2={q.y + 40} stroke="#c8664b" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 14" />
        })}
      </motion.svg>

      {papers.map((p, i) => (
        <motion.div
          key={p.t}
          className="absolute flex w-[230px] items-center gap-3 rounded-lg border border-line bg-white px-4 py-4 shadow-[0_10px_26px_-14px_rgba(14,42,71,0.4)]"
          initial={{ opacity: 0, x: p.x, y: p.y + 30, rotate: p.r }}
          animate={
            merged
              ? { opacity: 0, x: EX - 115, y: EY - 180, rotate: 0, scale: 0.4, transition: { duration: 0.8, ease, delay: i * 0.05 } }
              : {
                  opacity: 1,
                  x: [p.x, p.x + (i % 2 ? 8 : -8)],
                  y: [p.y, p.y - 12],
                  rotate: [p.r, p.r + (i % 2 ? -3 : 3)],
                  scale: 1,
                  transition: {
                    duration: 0.7,
                    ease,
                    delay: 0.3 + i * 0.08,
                    x: { duration: 3 + (i % 3), repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                    y: { duration: 2.6 + (i % 4) * 0.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                    rotate: { duration: 3.4 + (i % 2), repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                  },
                }
          }
          style={{ left: 0, top: 0 }}
        >
          <FileText size={26} className="shrink-0 text-coral" />
          <div className="flex-1">
            <div className="text-[17px] font-semibold text-ink">{p.t}</div>
            <div className="mt-1.5 h-1.5 w-3/4 rounded bg-pearl" />
            <div className="mt-1 h-1.5 w-1/2 rounded bg-pearl" />
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {merged && (
          <motion.div
            className="absolute w-[640px] -translate-x-1/2 -translate-y-1/2"
            style={{ left: EX, top: EY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease, delay: 0.45 } }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="ml-6 h-9 w-56 rounded-t-2xl bg-blue" />
            <div className="rounded-3xl rounded-tl-none bg-white p-10 shadow-[0_40px_80px_-30px_rgba(14,42,71,0.45)] ring-1 ring-line">
              <div className="flex flex-col items-start gap-3">
                <div>
                  <div className="eyebrow text-sage">Propuesta</div>
                  <div className="font-display mt-2 text-[42px] font-extrabold text-ink">Expediente digital</div>
                </div>
                <span className="rounded-full bg-blue-soft px-4 py-1.5 text-[16px] font-semibold text-blue">Código único de seguimiento</span>
              </div>
              <ul className="mt-8 space-y-2">
                {proposal.map(({ t, Icon }, i) => (
                  <motion.li
                    key={t}
                    className="flex items-center gap-5 rounded-xl px-4 py-3 odd:bg-warm"
                    whileHover={{ x: 10, backgroundColor: '#dcefe6' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 0.5, ease }}
                  >
                    <Icon size={28} className="text-petrol" strokeWidth={1.8} />
                    <span className="flex-1 text-[27px] font-semibold text-ink">{t}</span>
                    <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1.2 + i * 0.12, type: 'spring', stiffness: 300, damping: 14 }}>
                      <CircleCheck size={26} className="text-sage" />
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

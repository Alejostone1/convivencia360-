import { motion } from 'framer-motion'
import { Bell, FolderOpen, GraduationCap, HeartHandshake, Monitor, Users } from 'lucide-react'
import { ease, fadeUp } from '../../animations/variants'
import { project } from '../../data/content'
import { SchoolIllustration } from './SchoolIllustration'

const nodes = [
  { Icon: GraduationCap, label: 'Estudiantes', color: '#1f4e8c' },
  { Icon: Users, label: 'Docentes', color: '#0f5c6b' },
  { Icon: HeartHandshake, label: 'Bienestar', color: '#3f9a83' },
  { Icon: FolderOpen, label: 'Expediente', color: '#1f4e8c' },
  { Icon: Bell, label: 'Comunicación', color: '#0f5c6b' },
  { Icon: Monitor, label: 'Tecnología', color: '#3f9a83' },
]

const CX = 1440
const CY = 560
const R = 380

function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`inline-block ${className ?? ''}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: '0.9em', opacity: 0, rotateX: -70 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.9, ease, delay: delay + i * 0.045 }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Scene01Cover() {
  return (
    <div className="absolute inset-0">
      {/* Halo luminoso tras la ilustración */}
      {[0, 1, 2].map((k) => (
        <div
          key={k}
          className="ripple absolute rounded-full border-2 border-sage/40"
          style={{ left: CX - 230, top: CY - 230, width: 460, height: 460, animationDelay: `${k * 0.93}s` }}
        />
      ))}
      <motion.div
        animate={{ scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute rounded-full"
        style={{ left: CX - 380, top: CY - 380, width: 760, height: 760, background: 'radial-gradient(circle, rgba(220,239,230,0.9) 0%, rgba(219,230,243,0.55) 45%, rgba(250,247,242,0) 70%)' }}
      />

      <motion.div
        className="absolute"
        style={{ left: CX - 240, top: CY - 200, width: 480 }}
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.5 }}
      >
        <div className="float-slow">
          <SchoolIllustration />
        </div>
      </motion.div>

      {/* Actores y elementos que orbitan alrededor de la institución */}
      <motion.div
        className="absolute"
        style={{ left: CX, top: CY, width: 0, height: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
      >
        {nodes.map(({ Icon, label, color }, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2
          return (
            <div key={label} className="absolute" style={{ left: Math.cos(a) * R, top: Math.sin(a) * R }}>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, ease: 'linear', repeat: Infinity }}
                className="-translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10] }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease, delay: 1 + i * 0.12, y: { duration: 4 + (i % 3) * 0.7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1.5 + i * 0.3 } }}
                  className="flex items-center gap-3 rounded-full border border-line bg-warm py-2 pl-2 pr-5 shadow-[0_12px_30px_-14px_rgba(14,42,71,0.35)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full text-warm" style={{ background: color }}>
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-[19px] font-bold text-ink">{label}</span>
                </motion.div>
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Bloque tipográfico */}
      <div className="absolute left-[140px] top-[150px] w-[860px]">
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0} className="eyebrow flex items-center gap-4 text-petrol">
          <span className="h-[2px] w-12 bg-current" />
          {project.institution}
        </motion.div>

        <h1 className="font-display mt-10 font-extrabold leading-[0.92] text-ink" style={{ perspective: 800 }}>
          <Letters text="CONVIVENCIA" delay={0.25} className="text-[104px] tracking-[-0.035em]" />
          <br />
          <span className="flex items-baseline gap-6">
            <Letters text="360" delay={0.8} className="shimmer-text bg-gradient-to-r from-blue via-sage to-blue bg-clip-text text-[190px] tracking-[-0.04em] text-transparent" />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease, delay: 1.3 }}
              className="mb-8 h-[6px] flex-1 origin-left rounded-full bg-gradient-to-r from-sage/80 to-transparent"
            />
          </span>
        </h1>

        <motion.p initial="hidden" animate="show" variants={fadeUp} custom={7} className="mt-8 max-w-[760px] text-[28px] leading-[1.38] text-ink-soft">
          {project.officialTitle}.
        </motion.p>

        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={10} className="mt-14 flex items-center gap-10">
          {project.authors.map((a) => (
            <div key={a} className="font-display text-[26px] font-bold text-ink">
              {a}
            </div>
          ))}
        </motion.div>
        <motion.div initial="hidden" animate="show" variants={fadeUp} custom={11} className="mt-3 text-[22px] text-mute">
          {project.program} · {project.place}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-[34px] left-[140px] flex items-center gap-3 text-[17px] text-mute"
      >
        <span className="rounded-md border border-line px-2 py-0.5 font-semibold text-ink-soft">→</span>
        para comenzar la sustentación
      </motion.div>
    </div>
  )
}

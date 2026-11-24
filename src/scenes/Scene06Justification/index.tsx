import { motion } from 'framer-motion'
import { ArrowDown, Clock, Archive, ClipboardList, ChartColumn } from 'lucide-react'
import { ease, fadeUp } from '../../animations/variants'
import { Counter } from '../../components/Counter'
import { SceneHeader, Source } from '../../components/SceneHeader'
import { justification, stats } from '../../data/content'

const icons = [Clock, Archive, ClipboardList, ChartColumn]

export default function Scene06Justification() {
  const p = stats.procuraduria
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[140px] top-[110px] flex w-[1640px] items-end justify-between">
        <SceneHeader
          n="05"
          label="Justificación"
          tone="sage"
          titleClass="text-[62px]"
          title={
            <>
              Revertir cada causa, <span className="text-sage">producir el beneficio opuesto</span>
            </>
          }
        />
      </div>

      {/* Efecto actual → dimensión que la propuesta fortalece */}
      <div className="absolute left-[140px] top-[300px] grid w-[1640px] grid-cols-4 gap-8">
        {justification.map((j, i) => {
          const Icon = icons[i]
          return (
            <motion.div key={j.key} initial="hidden" animate="show" className="flex flex-col">
              <motion.div variants={fadeUp} custom={2 + i * 0.6} className="h-[128px] rounded-2xl bg-coral-soft/70 px-6 py-5">
                <div className="text-[14px] font-bold uppercase tracking-[0.18em] text-coral">Efecto actual</div>
                <div className="font-display mt-2 text-[24px] font-bold leading-tight text-ink">{j.effect}</div>
              </motion.div>
              <motion.div
                className="flex justify-center py-2 text-mute"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
              >
                <ArrowDown size={30} className="nudge" style={{ animationDelay: `${i * 0.2}s` }} />
              </motion.div>
              <motion.div
                className="flex flex-1 flex-col rounded-2xl border-2 border-sage/40 bg-white px-6 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: '0 30px 50px -28px rgba(63,154,131,0.6)', borderColor: '#3f9a83' }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.7, ease }}
              >
                <div className="flex items-center gap-3">
                  <motion.span
                    className="grid h-12 w-12 place-items-center rounded-xl bg-sage text-warm"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 1.3 + i * 0.15, type: 'spring', stiffness: 200, damping: 12 }}
                  >
                    <Icon size={24} />
                  </motion.span>
                  <span className="font-display text-[19px] font-extrabold tabular-nums text-sage">0{i + 1}</span>
                </div>
                <div className="font-display mt-4 text-[27px] font-extrabold leading-tight text-ink">{j.dimension}</div>
                <p className="mt-3 flex-1 text-[18px] leading-[1.45] text-ink-soft">{j.detail}</p>
                <Source className="mt-3 !text-[15px]">{j.source}</Source>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Cifras documentadas, atribuidas a su fuente */}
      <motion.div
        className="absolute left-[140px] top-[812px] grid w-[1640px] grid-cols-[1.25fr_1fr] gap-12 border-t-2 border-ink/10 pt-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="flex items-start gap-8">
          <div className="font-display text-[76px] font-extrabold leading-none text-ink">
            <Counter value={p.value} delay={2} />
          </div>
          <div className="flex-1 pt-1">
            <div className="text-[21px] leading-snug text-ink">{p.label}</div>
            <div className="mt-3 flex h-4 w-full overflow-hidden rounded-full">
              <motion.div className="h-full bg-amber" initial={{ width: 0 }} animate={{ width: `${(p.typeII / p.value) * 100}%` }} transition={{ delay: 2.2, duration: 1.2, ease }} />
              <motion.div className="h-full bg-coral" initial={{ width: 0 }} animate={{ width: `${(p.typeIII / p.value) * 100}%` }} transition={{ delay: 2.6, duration: 1, ease }} />
            </div>
            <div className="mt-2 flex justify-between text-[17px]">
              <span className="font-semibold text-amber">6.185 tipo II</span>
              <span className="font-semibold text-coral">3.510 tipo III</span>
              <Source className="!text-[15px]">{p.source}</Source>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-8">
          <div className="font-display text-[76px] font-extrabold leading-none text-ink">
            <Counter value={stats.bogota.value} delay={2.3} />
          </div>
          <div className="flex-1 pt-1">
            <div className="text-[21px] leading-snug text-ink">alertas en colegios de Bogotá, 1.er semestre de 2024</div>
            <div className="mt-2 text-[19px] text-ink-soft">
              Promedio de <b className="text-ink">77 casos diarios</b>
            </div>
            <Source className="!text-[15px]">{stats.bogota.source}</Source>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

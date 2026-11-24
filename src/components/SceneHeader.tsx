import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { SplitText } from '../animations/SplitText'
import { ease, fadeUp } from '../animations/variants'

type Props = {
  n: string
  label: string
  title: ReactNode
  lead?: ReactNode
  tone?: 'blue' | 'petrol' | 'sage' | 'coral'
  className?: string
  titleClass?: string
}

const toneClass = {
  blue: 'text-blue',
  petrol: 'text-petrol',
  sage: 'text-sage',
  coral: 'text-coral',
}

/** Cabecera editorial común: número de capítulo, rótulo, título y bajada. */
export function SceneHeader({ n, label, title, lead, tone = 'blue', className = '', titleClass = 'text-[76px]' }: Props) {
  return (
    <motion.header initial="hidden" animate="show" className={className}>
      <motion.div variants={fadeUp} custom={0} className={`eyebrow flex items-center gap-4 ${toneClass[tone]}`}>
        <span className="tabular-nums">{n}</span>
        <motion.span
          className="h-[2px] w-12 origin-left bg-current opacity-50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        />
        <span>{label}</span>
      </motion.div>
      <h2 className={`font-display mt-6 font-extrabold leading-[1.04] text-ink ${titleClass}`}>
        <SplitText delay={0.2}>{title}</SplitText>
      </h2>
      {lead && (
        <motion.p variants={fadeUp} custom={6} className="mt-6 max-w-[900px] text-[28px] leading-[1.4] text-ink-soft">
          {lead}
        </motion.p>
      )}
    </motion.header>
  )
}

export function Source({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`text-[18px] font-medium text-mute ${className}`}>{children}</span>
}

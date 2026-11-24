import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, Minimize } from 'lucide-react'
import { pad2 } from '../utils/format'

type Props = {
  index: number
  total: number
  step: number
  steps: number
  title: string
  elapsed: string
  isFull: boolean
  idle: boolean
  onPrev: () => void
  onNext: () => void
  onMenu: () => void
  onFullscreen: () => void
}

/** Barra inferior discreta: progreso, escena actual, cronómetro y accesos rápidos. */
export function Controls(p: Props) {
  const progress = (p.index + (p.steps > 1 ? p.step / p.steps : 0)) / (p.total - 1 || 1)
  const btn =
    'grid h-11 w-11 place-items-center rounded-full text-ink-soft transition hover:bg-ink/8 hover:text-ink focus-visible:outline-2 focus-visible:outline-blue'
  return (
    <>
      {/* progreso */}
      <div className="absolute inset-x-0 bottom-0 h-[5px] bg-ink/6">
        <div className="h-full bg-gradient-to-r from-blue via-petrol to-sage transition-[width] duration-700 ease-out" style={{ width: `${Math.min(progress, 1) * 100}%` }} />
      </div>

      <div
        className={`absolute bottom-6 right-8 flex items-center gap-1 rounded-full border border-line/70 bg-warm/85 px-2 py-1.5 shadow-[0_8px_30px_-12px_rgba(14,42,71,0.25)] backdrop-blur transition-opacity duration-500 ${p.idle ? 'opacity-0' : 'opacity-100'}`}
      >
        <button className={btn} onClick={p.onPrev} aria-label="Anterior" title="Anterior (←)">
          <ChevronLeft size={22} />
        </button>
        <div className="flex min-w-[260px] items-baseline gap-3 px-3">
          <span className="font-display text-[20px] font-bold tabular-nums text-ink">
            {pad2(p.index + 1)}
            <span className="text-mute">/{pad2(p.total)}</span>
          </span>
          <span className="max-w-[230px] truncate text-[16px] text-ink-soft">{p.title}</span>
        </div>
        {p.steps > 1 && (
          <div className="mr-2 flex gap-1" aria-label="Pasos de la escena">
            {Array.from({ length: p.steps }).map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i <= p.step ? 'bg-petrol' : 'bg-line'}`} />
            ))}
          </div>
        )}
        <span className="px-2 text-[16px] tabular-nums text-mute" title="Tiempo de exposición">
          {p.elapsed}
        </span>
        <button className={btn} onClick={p.onNext} aria-label="Siguiente" title="Siguiente (→ / Espacio)">
          <ChevronRight size={22} />
        </button>
        <span className="mx-1 h-6 w-px bg-line" />
        <button className={btn} onClick={p.onMenu} aria-label="Índice de escenas" title="Índice (M)">
          <LayoutGrid size={20} />
        </button>
        <button className={btn} onClick={p.onFullscreen} aria-label="Pantalla completa" title="Pantalla completa (F)">
          {p.isFull ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </>
  )
}

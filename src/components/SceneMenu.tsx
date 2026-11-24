import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { ease } from '../animations/variants'
import { pad2 } from '../utils/format'

type Item = { title: string; chapter: string }

/** Índice de escenas con acceso rápido. Se abre con M o con el botón de cuadrícula. */
export function SceneMenu({ open, items, current, onSelect, onClose }: { open: boolean; items: Item[]; current: number; onSelect: (i: number) => void; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 bg-ink/35 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.nav
            className="absolute inset-y-0 right-0 flex w-[760px] flex-col bg-warm px-16 py-14 shadow-2xl"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.5, ease } }}
            exit={{ x: 80, opacity: 0, transition: { duration: 0.3 } }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Índice de la presentación"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow text-petrol">Índice</div>
                <div className="font-display mt-2 text-[40px] font-extrabold">Convivencia 360</div>
              </div>
              <button onClick={onClose} className="grid h-12 w-12 place-items-center rounded-full hover:bg-ink/8" aria-label="Cerrar índice">
                <X size={26} />
              </button>
            </div>
            <ol className="mt-8 grid flex-1 grid-cols-1 content-start gap-1">
              {items.map((it, i) => (
                <li key={i}>
                  <button
                    onClick={() => onSelect(i)}
                    className={`group flex w-full items-baseline gap-5 rounded-xl px-4 py-[9px] text-left transition ${i === current ? 'bg-blue text-warm' : 'hover:bg-pearl'}`}
                  >
                    <span className={`font-display w-10 text-[20px] font-bold tabular-nums ${i === current ? 'text-warm/70' : 'text-mute'}`}>{pad2(i + 1)}</span>
                    <span className="font-display flex-1 text-[23px] font-semibold">{it.title}</span>
                    <span className={`text-[15px] uppercase tracking-[0.14em] ${i === current ? 'text-warm/70' : 'text-mute'}`}>{it.chapter}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-5 text-[16px] text-mute">
              <span><b className="text-ink">→ / Espacio</b> avanzar</span>
              <span><b className="text-ink">←</b> retroceder</span>
              <span><b className="text-ink">Inicio / Fin</b> primera / última</span>
              <span><b className="text-ink">F</b> pantalla completa</span>
              <span><b className="text-ink">M</b> índice</span>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { sceneVariants } from './animations/variants'
import { pointer } from './animations/pointer'
import { Ambient } from './components/Ambient'
import { Controls } from './components/Controls'
import { SceneWipe } from './components/SceneWipe'
import { Orbit } from './components/Orbit'
import { SceneMenu } from './components/SceneMenu'
import { useElapsed } from './hooks/useElapsed'
import { useFullscreen } from './hooks/useFullscreen'
import { STAGE_H, STAGE_W, useStageScale } from './hooks/useStageScale'
import { scenes } from './scenes'

type Pos = { index: number; step: number; dir: number }

const clampIndex = (i: number) => Math.max(0, Math.min(scenes.length - 1, i))

function readHash(): Pos {
  const m = window.location.hash.match(/^#\/(\d+)/)
  const index = m ? clampIndex(Number(m[1]) - 1) : 0
  return { index, step: 0, dir: 1 }
}

export default function App() {
  const scale = useStageScale()
  const { isFull, toggle: toggleFull, exit: exitFull } = useFullscreen()
  const elapsed = useElapsed()
  const [pos, setPos] = useState<Pos>(readHash)
  const [menu, setMenu] = useState(false)
  const [idle, setIdle] = useState(false)
  const idleTimer = useRef<number | undefined>(undefined)

  // La escena visible cambia cuando la cortinilla ya cubre el escenario,
  // para que las animaciones de entrada se vean completas al descubrirse.
  const [shown, setShown] = useState(pos.index)
  const [wipe, setWipe] = useState<{ key: number; dir: number; index: number } | null>(null)
  const shownStep = useRef(pos.step)
  useEffect(() => {
    if (pos.index === shown) return
    const key = Date.now()
    setWipe({ key, dir: pos.dir, index: pos.index })
    const t1 = window.setTimeout(() => setShown(pos.index), 420)
    const t2 = window.setTimeout(() => setWipe((w) => (w && w.key === key ? null : w)), 1200)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos.index])
  if (shown === pos.index) shownStep.current = pos.step

  // Parallax: posición normalizada del puntero
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x.set((e.clientX / window.innerWidth) * 2 - 1)
      pointer.y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const scene = scenes[pos.index]
  const view = scenes[shown]

  const next = useCallback(() => {
    setPos((p) => {
      const s = scenes[p.index]
      if (p.step < s.steps - 1) return { ...p, step: p.step + 1, dir: 1 }
      if (p.index < scenes.length - 1) return { index: p.index + 1, step: 0, dir: 1 }
      return p
    })
  }, [])

  const prev = useCallback(() => {
    setPos((p) => {
      if (p.step > 0) return { ...p, step: p.step - 1, dir: -1 }
      if (p.index > 0) {
        const i = p.index - 1
        return { index: i, step: scenes[i].steps - 1, dir: -1 }
      }
      return p
    })
  }, [])

  const goTo = useCallback((i: number) => {
    setPos((p) => ({ index: clampIndex(i), step: 0, dir: i >= p.index ? 1 : -1 }))
    setMenu(false)
  }, [])

  // Sincroniza la URL (#/n) para poder recargar o compartir una escena concreta.
  useEffect(() => {
    const h = `#/${pos.index + 1}`
    if (window.location.hash !== h) window.history.replaceState(null, '', h)
  }, [pos.index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const target = e.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          if (!menu) next()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          if (!menu) prev()
          break
        case 'Home':
          e.preventDefault()
          goTo(0)
          break
        case 'End':
          e.preventDefault()
          goTo(scenes.length - 1)
          break
        case 'f':
        case 'F':
          toggleFull()
          break
        case 'm':
        case 'M':
          setMenu((v) => !v)
          break
        case 'Escape':
          if (menu) setMenu(false)
          else exitFull()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, goTo, toggleFull, exitFull, menu])

  // Oculta los controles tras unos segundos sin mover el ratón (modo proyección).
  useEffect(() => {
    const wake = () => {
      setIdle(false)
      window.clearTimeout(idleTimer.current)
      idleTimer.current = window.setTimeout(() => setIdle(true), 3500)
    }
    wake()
    window.addEventListener('mousemove', wake)
    return () => {
      window.removeEventListener('mousemove', wake)
      window.clearTimeout(idleTimer.current)
    }
  }, [])

  const Scene = view.Component

  return (
    <div className="grid h-full w-full place-items-center overflow-hidden" style={{ cursor: idle ? 'none' : 'auto' }}>
      <div style={{ width: STAGE_W * scale, height: STAGE_H * scale }} className="relative">
        <div
          className="paper-grain absolute left-0 top-0 origin-top-left overflow-hidden bg-warm"
          style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
          data-stage
        >
          <Ambient tone={view.tone} />
          <Orbit pose={view.orbit} />

          <AnimatePresence initial={false} custom={pos.dir}>
            <motion.section
              key={view.id}
              className="absolute inset-0"
              custom={pos.dir}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              aria-label={view.title}
              data-scene={view.id}
            >
              <Scene step={shownStep.current} />
            </motion.section>
          </AnimatePresence>

          {wipe && <SceneWipe key={wipe.key} dir={wipe.dir} n={String(wipe.index + 1).padStart(2, '0')} title={scenes[wipe.index].title} />}

          <Controls
            index={pos.index}
            total={scenes.length}
            step={pos.step}
            steps={scene.steps}
            title={scene.title}
            elapsed={elapsed}
            isFull={isFull}
            idle={idle && !menu}
            onPrev={prev}
            onNext={next}
            onMenu={() => setMenu(true)}
            onFullscreen={toggleFull}
          />

          <SceneMenu
            open={menu}
            items={scenes.map((s) => ({ title: s.title, chapter: s.chapter }))}
            current={pos.index}
            onSelect={goTo}
            onClose={() => setMenu(false)}
          />
        </div>
      </div>
    </div>
  )
}

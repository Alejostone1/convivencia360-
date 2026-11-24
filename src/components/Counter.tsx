import { useCountUp } from '../animations/gsap'

export function Counter({ value, delay, duration, className }: { value: number; delay?: number; duration?: number; className?: string }) {
  const ref = useCountUp(value, { delay, duration })
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      0
    </span>
  )
}

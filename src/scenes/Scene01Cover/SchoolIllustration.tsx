import { useRef } from 'react'
import { useDrawPaths } from '../../animations/gsap'

/** Ilustración lineal de una institución educativa, con trazo que se dibuja al entrar. */
export function SchoolIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  useDrawPaths(ref)
  const stroke = { fill: 'none', stroke: '#0e2a47', strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg ref={ref} viewBox="0 0 540 420" className="h-auto w-full">
      {/* suelo */}
      <ellipse cx="270" cy="372" rx="250" ry="26" fill="#dbe6f3" opacity="0.7" />
      {/* cuerpo central */}
      <rect x="170" y="150" width="200" height="210" rx="4" fill="#faf7f2" />
      <path data-draw data-delay="0.6" d="M170 360 V150 H370 V360" {...stroke} />
      {/* frontón */}
      <path d="M150 154 L270 74 L390 154 Z" fill="#1f4e8c" />
      <path data-draw data-delay="0.9" d="M150 154 L270 74 L390 154 Z" {...stroke} />
      <circle cx="270" cy="124" r="18" fill="#faf7f2" />
      <path d="M270 112 v12 l8 6" stroke="#1f4e8c" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* bandera */}
      <path data-draw data-delay="1.2" d="M270 74 V30" {...stroke} />
      <path className="flag" d="M270 32 h34 l-8 9 l8 9 h-34 z" fill="#3f9a83" />
      {/* alas */}
      <rect x="60" y="210" width="110" height="150" fill="#faf7f2" />
      <rect x="370" y="210" width="110" height="150" fill="#faf7f2" />
      <path data-draw data-delay="1.0" d="M170 210 H60 V360 M370 210 H480 V360" {...stroke} />
      <path d="M54 210 H176 M364 210 H486" stroke="#0f5c6b" strokeWidth="6" strokeLinecap="round" />
      {/* ventanas */}
      {[80, 120].map((x) => [235, 290].map((y) => <rect key={`l${x}${y}`} x={x} y={y} width="26" height="34" rx="3" fill="#d6e9ea" stroke="#0f5c6b" strokeWidth="1.6" />))}
      {[394, 434].map((x) => [235, 290].map((y) => <rect key={`r${x}${y}`} x={x} y={y} width="26" height="34" rx="3" fill="#d6e9ea" stroke="#0f5c6b" strokeWidth="1.6" />))}
      {[194, 256, 318].map((x) => <rect key={`c${x}`} x={x} y="176" width="28" height="40" rx="3" fill="#dbe6f3" stroke="#1f4e8c" strokeWidth="1.6" />)}
      {/* puerta */}
      <path d="M244 360 V286 a26 26 0 0 1 52 0 V360 Z" fill="#0f5c6b" />
      <path d="M270 262 V360" stroke="#faf7f2" strokeWidth="1.6" />
      {/* escalones */}
      <path data-draw data-delay="1.4" d="M226 360 H314 M216 368 H324" {...stroke} />
      {/* árboles */}
      <circle cx="30" cy="318" r="26" fill="#3f9a83" opacity="0.85" />
      <path d="M30 330 V362" stroke="#0e2a47" strokeWidth="2.4" />
      <circle cx="512" cy="322" r="22" fill="#3f9a83" opacity="0.7" />
      <path d="M512 332 V362" stroke="#0e2a47" strokeWidth="2.4" />
      {/* personas */}
      {[
        { x: 120, c: '#1f4e8c', h: 1 },
        { x: 148, c: '#d99a2b', h: 0.82 },
        { x: 400, c: '#3f9a83', h: 0.86 },
        { x: 428, c: '#0f5c6b', h: 1.05 },
      ].map((p) => (
        <g key={p.x} transform={`translate(${p.x} ${372 - 52 * p.h}) scale(${p.h})`}>
          <circle cx="0" cy="8" r="8" fill={p.c} />
          <path d="M-11 52 V28 a11 11 0 0 1 22 0 V52 Z" fill={p.c} />
        </g>
      ))}
    </svg>
  )
}

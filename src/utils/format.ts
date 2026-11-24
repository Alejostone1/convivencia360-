export const fmtInt = (n: number) => Math.round(n).toLocaleString('es-CO')
export const fmtCOP = (n: number) => `$${fmtInt(n)}`
export const pad2 = (n: number) => String(n).padStart(2, '0')

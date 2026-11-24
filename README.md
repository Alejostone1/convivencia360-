# CONVIVENCIA 360 · Presentación de sustentación

Presentación web inmersiva del proyecto **"Desarrollo de un sistema de información web para la gestión y seguimiento de casos de bienestar y convivencia estudiantil en instituciones educativas"** (Sebastián Patiño, Kevin Quiroga, Sophia Vanegas · Universidad Católica de Pereira · Pereira, octubre de 2026).

**En línea:** https://convivencia360-alpha.vercel.app

Es solo la presentación académica: no incluye simulador, backend ni módulos funcionales de la plataforma.

## Requisitos

- Node.js 20 o superior (probado con Node 24)
- npm

## Ejecución

```powershell
cd convivencia360
npm install
npm run dev
```

Abrir `http://localhost:5173`. Para la sustentación, pulsar **F** (pantalla completa).

Versión de producción (carpeta `dist/`, funciona sin internet; las fuentes van incluidas):

```powershell
npm run build
npm run preview
```

## Controles

| Tecla | Acción |
|---|---|
| → · Espacio · AvPág | Avanzar (primero los pasos internos de la escena, luego la siguiente escena) |
| ← · RePág | Retroceder |
| Inicio / Fin | Primera / última escena |
| F | Pantalla completa |
| M | Índice de escenas (acceso rápido) |
| Esc | Cerrar índice o salir de pantalla completa |

- La barra inferior muestra escena, pasos, cronómetro de la exposición, índice y pantalla completa. Se oculta sola tras 3,5 s sin mover el ratón.
- La URL refleja la escena (`#/7`), así que al recargar se vuelve a la misma escena.
- Escenas con pasos internos: 03 (2), 04 (2), 07 (6), 10 (7), 12 (2), 14 (2).
- Escenas interactivas: 08 (clic en un módulo; si no se toca, recorre los módulos solo), 09 (clic en un rol), 12 (clic en una categoría de antecedentes).

## Estructura

```
src/
  App.tsx                 Escenario 1920×1080 escalado, navegación, teclado, URL
  animations/             Variantes de Framer Motion y utilidades GSAP (contadores, trazos SVG)
  components/             Orbit (hilo visual "360"), Controls, SceneMenu, SceneHeader, Counter
  data/content.ts         Todo el contenido académico extraído del PDF (fuente única)
  hooks/                  Escalado del lienzo, pantalla completa, cronómetro
  scenes/Scene01Cover … Scene15Closing   Una carpeta por escena
  scenes/index.ts         Orden, número de pasos y posición del anillo por escena
  styles/index.css        Tailwind v4 + paleta e identidad visual
  utils/format.ts         Formato de números y moneda (es-CO)
```

Para corregir un texto, editar `src/data/content.ts`; las escenas leen de ahí.

## Diseño

- Lienzo fijo de 1920×1080 escalado para que quepa entero en cualquier pantalla (portátil, proyector, tableta), sin scroll ni recortes.
- Paleta: azul institucional `#1F4E8C`, azul petróleo `#0F5C6B`, verde suave `#3F9A83`, blanco cálido `#FAF7F2`, gris perla `#ECE9E3`; ámbar y coral solo como acentos (problemática, severidad).
- Tipografía: Manrope (títulos) e Inter (texto), incluidas localmente.
- Hilo conductor: el anillo "360" persiste entre escenas y se desplaza, escala y gira en cada transición.
- Movimiento: cortinilla cinematográfica entre escenas, atmósfera viva (luces que derivan, partículas, parallax con el puntero), títulos revelados palabra por palabra, flujos de datos animados en los diagramas, ondas, flotación continua y respuesta al pasar el puntero.
- Ilustraciones propias en SVG (institución, diagramas, flujo, arquitectura); no hay fotografías de stock.

## Control de calidad realizado

Pruebas con Playwright a 1920×1080, 1366×768 y 1024×768: recorrido completo de las 30 posiciones (escenas y pasos), teclas → ← Espacio Inicio Fin M, salto desde el índice, retroceso al último paso de la escena anterior, selección de roles, detección de elementos fuera del lienzo (ninguno) y consola (sin errores ni advertencias). Las capturas están en `../qa-capturas/`.

Consulte `INCONSISTENCIAS.md` para las observaciones sobre el documento fuente.

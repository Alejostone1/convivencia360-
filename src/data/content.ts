/**
 * Contenido académico de la presentación.
 * Fuente única: documento "Desarrollo de un sistema de información web para la gestión y
 * seguimiento de casos de bienestar y convivencia estudiantil en instituciones educativas"
 * (Universidad Católica de Pereira, octubre 2026). Los textos citados conservan la redacción
 * oficial; los resúmenes se marcan como tales en los componentes.
 */

export const project = {
  concept: 'CONVIVENCIA 360',
  officialTitle:
    'Desarrollo de un sistema de información web para la gestión y seguimiento de casos de bienestar y convivencia estudiantil en instituciones educativas',
  authors: ['Sebastián Patiño', 'Kevin Quiroga', 'Sophia Vanegas'],
  institution: 'Universidad Católica de Pereira',
  program: 'Ingeniería en Sistemas y Telecomunicaciones',
  place: 'Pereira, octubre de 2026',
}

export const situations = [
  'Acoso escolar (bullying)',
  'Ciberacoso',
  'Violencia física y psicológica',
  'Maltrato intrafamiliar',
  'Consumo de sustancias psicoactivas (SPA)',
  'Problemas de convivencia',
  'Afectaciones a la salud mental',
  'Intentos de deserción escolar',
]

/** Causas que el documento identifica y que confluyen en el problema central (sección 1). */
export const causes = [
  { title: 'Procesos manuales', text: 'Registro y seguimiento manual de los casos', source: 'BID, 2023' },
  { title: 'Información dispersa', text: 'Datos repartidos en múltiples documentos', source: 'MEN, 2026' },
  { title: 'Comunicación fragmentada', text: 'Entre docentes, orientadores, coordinadores y directivos', source: 'Congreso de Colombia, 2013' },
  { title: 'Desconocimiento de protocolos', text: 'Desconocimiento generalizado de la Ley 1620 por parte de docentes', source: 'Bocanegra Acosta & Herrera Castillo, 2018' },
  { title: 'Falta de estandarización', text: 'La atención depende del criterio individual de cada actor', source: 'Canabal Guzmán, 2026' },
  { title: 'Falta de trazabilidad', text: 'Sin monitoreo del estado de los casos ni de las actuaciones', source: 'MEN, 2026' },
]

export const centralProblem =
  'Baja eficiencia en la gestión y seguimiento de los casos institucionales críticos en las instituciones educativas.'

export const researchQuestion =
  '¿Es posible desarrollar un sistema de información web que permita optimizar la gestión y el seguimiento de los casos que afectan el bienestar estudiantil en las instituciones educativas mediante la centralización del registro, control y monitoreo de la información?'

export const justification = [
  {
    key: 'oportunidad',
    dimension: 'Oportunidad en la atención',
    effect: 'Demoras en la atención de los casos',
    detail: 'La ausencia de herramientas adecuadas retrasa la respuesta institucional frente a situaciones que requieren intervención oportuna.',
    source: 'Banco Interamericano de Desarrollo, 2023',
  },
  {
    key: 'conservacion',
    dimension: 'Conservación de la información',
    effect: 'Pérdida de información e informes incompletos',
    detail: 'Sin trazabilidad, la información de los casos queda expuesta a extraviarse o registrarse de manera parcial.',
    source: 'Ministerio de Educación Nacional, 2020',
  },
  {
    key: 'protocolos',
    dimension: 'Aplicación de protocolos',
    effect: 'Incumplimiento de protocolos',
    detail: 'Sin herramientas que guíen la Ley 1620 y el Decreto 1965 de 2013, las intervenciones pueden ser inconsistentes o incompletas.',
    source: 'Congreso de Colombia, 2013',
  },
  {
    key: 'decisiones',
    dimension: 'Toma de decisiones institucionales',
    effect: 'Dificultad para decidir con evidencia',
    detail: 'El art. 4 de la Ley 1620 establece que estadísticas e informes deben servir de base para reorientar las estrategias de convivencia.',
    source: 'Congreso de Colombia, 2013',
  },
]

export const stats = {
  siuce: { value: 13429, label: 'casos registrados en el SIUCE entre 2020 y junio de 2025', detail: 'asociados a acoso escolar, ciberacoso y agresión escolar en el país', source: 'Ministerio de Educación Nacional, 2025' },
  procuraduria: { value: 9695, typeII: 6185, typeIII: 3510, label: 'situaciones de violencia escolar registradas en 2023', source: 'Procuraduría General de la Nación, 2024' },
  bogota: { value: 13864, perDay: 77, label: 'alertas por violencia y abuso en instituciones educativas de Bogotá, primer semestre de 2024', source: 'Secretaría de Educación del Distrito, 2024' },
}

export const generalObjective =
  'Desarrollar un sistema de información web para la gestión y seguimiento de casos de bienestar y convivencia estudiantil en instituciones educativas.'

export const specificObjectives = [
  {
    short: 'Requerimientos',
    month: 'Mes 1',
    months: [1],
    text: 'Definir los requerimientos funcionales y no funcionales del sistema de información web, mediante el levantamiento de información con los actores institucionales.',
  },
  {
    short: 'Arquitectura e interfaces',
    month: 'Mes 2',
    months: [2],
    text: 'Diseñar la arquitectura del sistema, sus componentes y las interfaces de usuario, definiendo el modelo de base de datos y los flujos de interacción entre los distintos roles institucionales.',
  },
  {
    short: 'Codificación de módulos',
    month: 'Meses 3–4',
    months: [3, 4],
    text: 'Codificar los módulos del sistema con base en los requerimientos definidos, incluyendo la gestión de casos, la aplicación de los protocolos institucionales y la generación de reportes e indicadores.',
  },
  {
    short: 'Pruebas',
    month: 'Mes 5',
    months: [5],
    text: 'Realizar un proceso de testing que incluya pruebas de sistema y de aceptación, verificando el funcionamiento de cada módulo y la información registrada.',
  },
  {
    short: 'Documentación',
    month: 'Mes 6',
    months: [6],
    text: 'Documentar el sistema desarrollado mediante manuales técnicos y de usuarios dirigidos a los actores institucionales encargados de la gestión de los casos.',
  },
]

export type ModuleKey = 'auth' | 'cases' | 'norms' | 'tracking' | 'reports' | 'notify'

export const modules: { key: ModuleKey; n: string; name: string; summary: string; features: string[] }[] = [
  {
    key: 'auth',
    n: '4.1',
    name: 'Usuarios y autenticación',
    summary: 'Control de acceso: cada actor accede solo a las funciones de su rol.',
    features: ['Inicio de sesión con credenciales institucionales', 'Gestión de perfil personal', 'Recuperación y cambio de contraseña', 'Panel de control adaptado al rol'],
  },
  {
    key: 'cases',
    n: '4.2',
    name: 'Registro y gestión de casos',
    summary: 'Ciclo de vida completo del caso, desde su creación hasta su cierre o escalamiento.',
    features: ['Expedientes digitales con código único', 'Clasificación del caso por tipo', 'Datos del estudiante y posibles testigos', 'Documentos, evidencias y soportes'],
  },
  {
    key: 'norms',
    n: '4.3',
    name: 'Normativa y generación de informes',
    summary: 'Base de conocimiento que orienta al actor de la etapa activa sobre el procedimiento.',
    features: ['Ley 1620, Decreto 1965, Decreto 1421 y protocolos', 'Consulta de la normativa aplicable', 'Guías de actuación según el rol', 'Informe estructurado exportable en PDF'],
  },
  {
    key: 'tracking',
    n: '4.4',
    name: 'Seguimiento y escalamiento',
    summary: 'Controla el avance del caso: qué actuaciones se registraron y cuáles siguen pendientes.',
    features: ['Actuaciones pendientes y responsables', 'Alertas por tiempo de respuesta excedido', 'Escalamiento a rectoría o entidades externas', 'Cierre condicionado a actuaciones obligatorias'],
  },
  {
    key: 'reports',
    n: '4.5',
    name: 'Reportes e indicadores',
    summary: 'Información estadística para el análisis institucional y la toma de decisiones.',
    features: ['Dashboard de convivencia escolar', 'Tendencias y reincidencia', 'Tiempos de respuesta por rol', 'Exportación en PDF y Excel'],
  },
  {
    key: 'notify',
    n: '4.6',
    name: 'Notificaciones y comunicación',
    summary: 'Avisos a los actores según el tipo y el estado de cada caso.',
    features: ['Notificaciones personalizadas por tipo de caso y estado (4.1)', 'Alertas automáticas por vencimiento de tiempos (4.4)'],
  },
]

export type RoleKey = 'convivencia' | 'academico' | 'psico' | 'rector' | 'director' | 'apoyo'

export const roles: { key: RoleKey; name: string; tagline: string; duties: string[] }[] = [
  {
    key: 'convivencia',
    name: 'Coordinador de Convivencia',
    tagline: 'Lidera la Ruta de Atención Integral y administra el sistema',
    duties: [
      'Revisión y análisis de los casos reportados por los docentes',
      'Clasificación del nivel de atención del caso (leve, moderado, grave)',
      'Definición de las primeras acciones y asignación de responsables',
      'Derivación al psicorientador, psicólogo, director de grupo, docente de apoyo o rector',
      'Seguimiento del cumplimiento de los tiempos de respuesta institucionales',
      'Administración del sistema: usuarios, roles, permisos, base normativa, respaldos y auditoría',
    ],
  },
  {
    key: 'academico',
    name: 'Coordinador Académico',
    tagline: 'Aporta la perspectiva académica del estudiante',
    duties: [
      'Seguimiento del desempeño académico (asistencia, rendimiento, comportamiento en aula)',
      'Aporte al expediente: afectación del rendimiento, riesgo de deserción escolar',
      'Consulta del historial académico para la valoración integral del caso',
      'Comunicación con los docentes de las áreas',
      'Registro de recomendaciones o ajustes académicos',
    ],
  },
  {
    key: 'psico',
    name: 'Psicorientador / Psicólogo',
    tagline: 'Valoración profesional y plan de intervención',
    duties: [
      'Registro de entrevistas y valoraciones profesionales',
      'Definición de recomendaciones y plan de intervención',
      'Registro de sesiones de seguimiento y evolución del caso',
      'Notas clínicas y documentos de soporte al expediente',
      'Cierre técnico del caso con dictamen profesional',
    ],
  },
  {
    key: 'rector',
    name: 'Rector',
    tagline: 'Autoriza, reporta y escala cuando la normativa lo exige',
    duties: [
      'Revisión del historial completo del expediente digital',
      'Autorización de actuaciones administrativas o disciplinarias',
      'Reportes institucionales para entidades externas',
      'Escalamiento a autoridades superiores cuando la normativa lo exija',
      'Consulta de indicadores consolidados de convivencia escolar',
    ],
  },
  {
    key: 'director',
    name: 'Director de Grupo',
    tagline: 'Primer punto de contacto del estudiante',
    duties: [
      'Responsable directo y primer punto de contacto del estudiante en su grupo',
      'Reporte y seguimiento cercano de la situación del estudiante',
      'Comunicación con acudientes o familia sobre el proceso',
      'Consulta del estado del caso de los estudiantes de su grupo',
      'Aporte de información contextual: dinámica de grupo, relaciones entre pares, entorno familiar',
    ],
  },
  {
    key: 'apoyo',
    name: 'Docente de Apoyo',
    tagline: 'Acompañamiento pedagógico e inclusión (PIAR)',
    duties: [
      'Informe y seguimiento pedagógico de estudiantes con discapacidad o NEE',
      'Elaboración y actualización del PIAR, conforme al Decreto 1421 de 2017',
      'Acompañamiento pedagógico a los docentes de aula',
      'Registro de ajustes razonables y estrategias pedagógicas',
      'Aporte desde el apoyo pedagógico, diferenciado del componente clínico',
    ],
  },
]

export const workflow = [
  { key: 'reporte', label: 'Reporte', text: 'Un docente o el director de grupo reporta la situación', actors: ['Director de Grupo', 'Docentes'] },
  { key: 'registro', label: 'Registro', text: 'Se crea el expediente digital con código único de seguimiento', actors: [] as string[] },
  { key: 'clasificacion', label: 'Clasificación', text: 'Tipo de caso y nivel de atención; consulta de la normativa aplicable', actors: ['Coordinador de Convivencia'] },
  { key: 'asignacion', label: 'Asignación', text: 'Primeras acciones, responsables y derivación', actors: ['Coordinador de Convivencia'] },
  { key: 'actuaciones', label: 'Actuaciones', text: 'Aportes sucesivos o paralelos de los distintos actores', actors: ['Psicorientador', 'Coord. Académico', 'Docente de Apoyo', 'Director de Grupo'] },
  { key: 'seguimiento', label: 'Seguimiento', text: 'Actuaciones pendientes, responsables y alertas por tiempos', actors: ['Coordinador de Convivencia'] },
  { key: 'cierre', label: 'Cierre o escalamiento', text: 'Cierre condicionado a actuaciones obligatorias, o escalamiento a rectoría / entidades externas', actors: ['Psicorientador', 'Rector'] },
]

export const regulations = [
  { id: 'Ley 1620 de 2013', text: 'Crea el Sistema Nacional de Convivencia Escolar y establece mecanismos para la identificación, atención y seguimiento de las situaciones que afectan la convivencia.' },
  { id: 'Decreto 1965 de 2013', text: 'Junto con la Ley 1620, establece la Ruta de Atención Integral para la Convivencia Escolar y la clasificación de situaciones.' },
  { id: 'Decreto 1421 de 2017', text: 'Educación inclusiva: Plan Individual de Ajustes Razonables (PIAR) para estudiantes con discapacidad o necesidades educativas especiales.' },
]

export const ruta = ['Promoción', 'Prevención', 'Atención', 'Seguimiento']

export const situationTypes = [
  { type: 'Tipo I', text: 'Conflictos manejados inadecuadamente' },
  { type: 'Tipo II', text: 'Agresiones escolares, bullying y ciberacosos repetitivos que no constituyen delito' },
  { type: 'Tipo III', text: 'Conductas constitutivas de presuntos delitos' },
]

export const research = {
  databases: ['Google Scholar', 'SciELO', 'Saber UCV', 'Ciencia Latina', 'BID', 'Repositorio UNAD', 'SIRED Univ. de Nariño'],
  criteria: 'Estudios verificables · 2021–2026 · español e inglés',
  categories: [
    {
      key: 'no',
      title: 'No sirven directamente al alcance',
      count: 4,
      why: 'Universidad, egresados o consejería sin flujos de convivencia escolar',
      items: ['Murillo-Vargas et al. (2021)', 'Univ. de Nariño – SIRED (2025)', 'Balmores et al. (2024)', 'Peralta & Ramirez (2026)'],
    },
    {
      key: 'parcial',
      title: 'Sirven parcialmente',
      count: 6,
      why: 'Sustento teórico y procedimental, sin plataforma web de gestión de casos',
      items: ['Fernández Suárez et al. (2024)', 'Arias Arias (2023)', 'Ghasemisarukolai et al. (2026)', 'Medina Carbajal & Ortega Cabrejos (2025)', 'Nygaard et al. (2024)', 'Keeton et al. (2024)'],
    },
    {
      key: 'corpus',
      title: 'Corpus central',
      count: 10,
      why: 'Articulan la variable tecnológica y la variable educativa y psicosocial',
      items: ['Canabal Guzmán et al. (2026)', 'Zenteno-Osorio & Leal-Soto (2023)', 'Acosta Núñez (2021)', 'Arias Ortiz et al. – BID (2023)', 'Evans et al. (2022)', 'Terán-Tejada et al. (2023)', 'Astuti et al. (2026)', 'Meyer et al. (2025)', 'Abduraham et al. (2026)', 'Yulianto & Khoirunnisya (2026)'],
    },
  ],
  highlights: [
    { who: 'Canabal Guzmán et al. (2026)', what: 'Antecedente nacional más cercano: plataforma de alertas tempranas que estandariza protocolos (Montería).' },
    { who: 'Acosta Núñez (2021)', what: 'Sistema web de convivencia y observador del estudiante en una institución oficial colombiana.' },
    { who: 'Terán-Tejada et al. (2023)', what: 'Reportan +50 % de casos atendidos y 40,42 % de optimización del tiempo de registro y gestión.' },
    { who: 'Yulianto & Khoirunnisya (2026)', what: 'Reportan reducción de 2–3 días hábiles a 3–5 horas en la atención de casos.' },
  ],
  gap: 'Persiste en Colombia la necesidad de un sistema que unifique el flujo multiactor de los seis roles, la guía normativa y el control de tiempos con escalamiento e indicadores.',
}

export const concepts = [
  { name: 'Sistemas de Información y Gestión Educativa (SIGED)', source: 'BID, 2023' },
  { name: 'Bienestar estudiantil y MTSS', source: 'Evans et al., 2022; Nygaard et al., 2024' },
  { name: 'Convivencia escolar y Ruta de Atención Integral', source: 'Ley 1620 y Decreto 1965 de 2013' },
  { name: 'Gestión digital de casos', source: 'Terán-Tejada et al., 2023' },
  { name: 'Trazabilidad', source: 'Acosta Núñez, 2021; Keeton et al., 2024' },
  { name: 'Control de acceso basado en roles (RBAC)', source: 'Abduraham et al., 2026' },
  { name: 'Alertas tempranas', source: 'Canabal Guzmán et al., 2026' },
  { name: 'Educación inclusiva y PIAR', source: 'Decreto 1421 de 2017; Meyer et al., 2025' },
]

export const architecture = [
  { key: 'user', layer: 'Usuario', tech: 'Navegador web', role: 'Los seis roles institucionales acceden desde cualquier navegador' },
  { key: 'front', layer: 'Frontend · Presentación', tech: 'React', role: 'Dashboards por rol, formularios de registro y escalamiento, filtros y gráficas de indicadores' },
  { key: 'api', layer: 'Backend · API y lógica de negocio', tech: 'Python', role: 'API REST, autenticación, control de acceso por roles, alertas por tiempos e informes PDF y Excel' },
  { key: 'db', layer: 'Persistencia', tech: 'MySQL', role: 'Repositorio único: usuarios, roles, expedientes, actuaciones, PIAR, anexos y auditoría' },
]

export const methodology = [
  { key: 'paradigma', label: 'Paradigma', value: 'Positivista', text: 'Estudio sistemático a partir de la recolección y el análisis de información verificable.' },
  { key: 'enfoque', label: 'Enfoque', value: 'Mixto', text: 'Cualitativo (entrevistas, observación) + cuantitativo (encuestas, tiempos de atención).' },
  { key: 'proposito', label: 'Propósito', value: 'Aplicado', text: 'Usar el conocimiento para proponer una solución tecnológica a un problema concreto.' },
  { key: 'alcance', label: 'Alcance', value: 'Correlacional', text: 'Principalmente correlacional, complementado con componentes exploratorios y descriptivos.' },
]

export const team = [
  { name: 'Sophia Vanegas', focus: 'Análisis y levantamiento de requerimientos' },
  { name: 'Sebastián Patiño', focus: 'Diseño del sistema, arquitectura y modelado de la base de datos' },
  { name: 'Kevin Quiroga', focus: 'Desarrollo e integración de módulos, apoyo en pruebas y documentación' },
]

export const advisor = {
  name: 'Elder Vanegas Marín',
  role: 'Coordinador de convivencia · Institución Educativa Boyacá',
  contribution: 'Orientador institucional: procesos, protocolos y requerimientos reales',
}

export const costs = [
  { item: 'Hosting', value: 450000 },
  { item: 'Conectividad a internet', value: 150000 },
  { item: 'Almacenamiento y copias de seguridad', value: 120000 },
  { item: 'Transporte', value: 100000 },
  { item: 'Dominio web', value: 80000 },
  { item: 'Papelería e impresiones', value: 50000 },
]
export const costSubtotal = 950000
export const costContingency = 95000
export const costTotal = 1045000

export const closingIdeas = [
  'Centralización de la información',
  'Organización de expedientes',
  'Seguimiento de actuaciones',
  'Coordinación institucional',
  'Apoyo a la toma de decisiones',
  'Protección del bienestar estudiantil',
]

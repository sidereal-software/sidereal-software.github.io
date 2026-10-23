import type { TelescopeKey } from '@/content/images'

// Years are best guesses from cv.md and repo history; edit them here only.
export interface Period {
  from: number
  to: number | 'present'
  fromMonth?: string
  toMonth?: string
}

export function formatPeriod({ from, to, fromMonth, toMonth }: Period) {
  const start = fromMonth ? `${fromMonth} ${from}` : `${from}`
  const end = to === 'present' ? 'present' : toMonth ? `${toMonth} ${to}` : `${to}`
  return `${start} - ${end}`
}

export interface CaseStudy {
  name: string
  role: string
  org: string
  period: Period
  problem: string
  approach: string
  outcome: string
  telescope: TelescopeKey
  links: { label: string; href: string }[]
}

export const caseStudies: CaseStudy[] = [
  {
    name: 'GOATS',
    role: 'Principal Engineer & Architect',
    org: 'NSF NOIRLab / Gemini Observatory',
    period: { from: 2023, fromMonth: 'Jul', to: 2025, toMonth: 'Dec' },
    problem:
      'Time-domain astronomers juggled separate tools for alerts, triggering, data retrieval, and reduction. When following up a transient event, every lost hour costs science.',
    approach:
      'I architected an end-to-end web platform on Django, TOM Toolkit, and WebSockets: target ingestion, target-of-opportunity triggering, automated data retrieval, and real-time reduction in one application.',
    outcome:
      'Astronomers go from an incoming alert to calibrated Gemini data inside a single browser tab.',
    telescope: 'gemini-north',
    links: [
      { label: 'GitHub: GOATS', href: 'https://github.com/gemini-hlsw/goats' },
      { label: 'SPIE 2026 paper', href: 'https://doi.org/10.1117/12.3104316' },
    ],
  },
  {
    name: 'pyINDI',
    role: 'Frontend Lead',
    org: 'MMT & Steward Observatories',
    period: { from: 2020, to: 2022 },
    problem:
      'Writing INDI instrument drivers was slow, and desktop-bound control GUIs kept operators tied to the control room. Staff needed to command telescopes from anywhere, including a phone.',
    approach:
      'I co-developed a pure-Python implementation of the INDI protocol on asyncio and led the frontend: web tooling that auto-generates responsive control GUIs straight from INDI device properties. Presented at SPIE 2022.',
    outcome:
      'Faster driver development and browser control panels that work from a phone, in service at the MMT, Bok, and Kuiper telescopes.',
    telescope: 'bok',
    links: [
      { label: 'GitHub: pyINDI', href: 'https://github.com/MMTObservatory/pyINDI' },
      { label: 'SPIE 2022 paper', href: 'https://doi.org/10.1117/12.2630471' },
    ],
  },
]

export interface CareerEntry {
  org: string
  role: string
  period: Period
  summary: string
  telescope?: TelescopeKey
  links?: { label: string; href: string }[]
}

export const career: CareerEntry[] = [
  {
    org: 'NSF NOIRLab / Gemini Observatory',
    role: 'Software Engineer III',
    period: { from: 2023, to: 'present' },
    summary:
      'I lead GPP Resource and the GPP Client, led GOATS from 2023 to 2025, and moved the DRAGONS data-reduction pipeline into the browser.',
    links: [
      { label: 'GPP Client', href: 'https://github.com/gemini-hlsw/gpp-client' },
      { label: 'DRAGONS', href: 'https://github.com/GeminiDRSoftware/DRAGONS' },
    ],
  },
  {
    org: 'Caltech / IPAC',
    role: 'Application Developer',
    period: { from: 2021, to: 2023 },
    summary: "Production data-processing pipelines for NASA's SPHEREx mission.",
    telescope: 'spherex',
  },
  {
    org: 'Steward Observatory',
    role: 'R&D Software Engineer III',
    period: { from: 2019, to: 2021 },
    summary:
      'Telescope automation from dome and mirror-cover control to the web interfaces operators use. Where pyINDI began.',
    telescope: 'vatt',
  },
  {
    org: 'Steward Observatory',
    role: 'Technical Services Specialist',
    period: { from: 2017, to: 2019 },
    summary: 'Commissioned the Chimera photometer on the Kuiper 61" through first light.',
  },
  {
    org: 'Northern Arizona University & Lowell Observatory',
    role: 'Graduate Researcher',
    period: { from: 2015, to: 2017 },
    summary:
      'Led the robotic retrofit of the LONEOS 0.6 m into an asteroid follow-up telescope and observed near-Earth objects on the Perkins 72".',
    telescope: 'ldt',
  },
]

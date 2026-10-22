// PROTOTYPE - throwaway. DRAFT marks wording Dan has not approved yet.

export const kickers = {
  A: 'Software that does the heavy lifting', // DRAFT
  B: 'Built for the heavy lifting', // DRAFT
  C: 'Heavy lifting, on every night shift', // DRAFT
} as const

export const hero = {
  h1: 'Production software for observatories, missions, and research teams.',
  lede: 'I build the systems behind modern astronomy, from instrument control to real-time data platforms, and bring the same engineering to every science.', // DRAFT (first-person rewrite)
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'See the work', href: '#work' },
  imageCaption: 'M27, the Dumbbell Nebula', // credit comes from images.ts
}

export const institutions = [
  'NSF NOIRLab',
  'Gemini Observatory',
  'Caltech / IPAC',
  'NASA SPHEREx',
  'Steward Observatory',
  'Lowell Observatory',
  'Northern Arizona University',
]

export const nav = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
]

// DRAFT: six services folded into four.
export const services = [
  {
    title: 'Observatory & instrument control',
    description:
      'Telescope automation, instrument drivers over INDI and serial or network links, and the operator interfaces that run them.',
  },
  {
    title: 'Data pipelines & backends',
    description:
      'Processing pipelines that turn raw frames into science-ready data, and the databases and services behind them.',
  },
  {
    title: 'Scientific web platforms',
    description:
      'Django and TOM Toolkit platforms, data portals, and React interfaces with live updates for working scientists.',
  },
  {
    title: 'Python libraries & APIs',
    description:
      'Typed SDKs, REST and GraphQL clients, and packages released to PyPI and conda-forge.',
  },
]

export const servicesAside = {
  title: "Don't write software? That's the point.", // existing heading
  body: 'If you can describe the problem, I can build the app that removes it. ARK began that way: wildlife professionals needed their record keeping to be easier.', // DRAFT (tightened)
}

export const stack = [
  'Python',
  'TypeScript',
  'C/C++',
  'Django',
  'FastAPI',
  'React',
  'GraphQL',
  'PostgreSQL',
  'WebSockets',
  'Astropy',
  'DRAGONS',
  'TOM Toolkit',
  'INDI',
  'conda-forge',
  'Docker',
  'GitHub Actions',
]

export interface CaseStudy {
  name: string
  role: string
  org: string
  period: string
  problem: string
  approach: string
  outcome: string
  telescopes: string[] // image keys from images.ts
  links: { label: string; href: string; github?: boolean }[]
}

export const caseStudies: CaseStudy[] = [
  {
    name: 'GOATS',
    role: 'Principal Engineer & Architect',
    org: 'NSF NOIRLab / Gemini Observatory',
    period: 'Jul 2023 - Dec 2025',
    problem:
      'Time-domain astronomers juggled separate tools for alerts, triggering, data retrieval, and reduction. When following up a transient event, every lost hour costs science.',
    approach:
      'I architected an end-to-end web platform on Django, TOM Toolkit, and WebSockets: target ingestion, target-of-opportunity triggering, automated data retrieval, and real-time reduction in one application.',
    outcome:
      'Astronomers go from an incoming alert to calibrated Gemini data inside a single browser tab.',
    telescopes: ['gemini-north', 'gemini-south'],
    links: [
      { label: 'GOATS', href: 'https://github.com/gemini-hlsw/goats', github: true },
      { label: 'SPIE 2026 paper', href: 'https://doi.org/10.1117/12.3104316' },
    ],
  },
  {
    name: 'pyINDI',
    role: 'Frontend Lead',
    org: 'MMT & Steward Observatories',
    period: '2019 - 2022', // DRAFT: dates inferred from Steward tenure and SPIE 2022; confirm
    problem:
      'Writing INDI instrument drivers was slow, and desktop-bound control GUIs kept operators tied to the control room. Staff needed to command telescopes from anywhere, including a phone.',
    approach:
      'I co-developed a pure-Python implementation of the INDI protocol on asyncio and led the frontend: web tooling that auto-generates responsive control GUIs straight from INDI device properties. Presented at SPIE 2022.',
    outcome:
      'Faster driver development and browser control panels that work from a phone, in service at the MMT, Bok, and Kuiper telescopes.',
    telescopes: ['mmt', 'bok', 'kuiper'],
    links: [
      { label: 'pyINDI', href: 'https://github.com/MMTObservatory/pyINDI', github: true },
      { label: 'SPIE 2022 paper', href: 'https://doi.org/10.1117/12.2630471' },
    ],
  },
]

export interface CareerEntry {
  org: string
  role: string
  period: string
  summary: string
  telescopes: string[]
}

// DRAFT: compact list. The two earliest entries are new to the site (from cv.md).
export const career: CareerEntry[] = [
  {
    org: 'NSF NOIRLab / Gemini Observatory',
    role: 'Software Engineer III',
    period: '2023 - present',
    summary:
      'Lead GPP Resource and the GPP Client; led GOATS from 2023 to 2025 and moved the DRAGONS reduction pipeline into the browser.',
    telescopes: ['gemini-north', 'gemini-south'],
  },
  {
    org: 'Caltech / IPAC',
    role: 'Application Developer',
    period: '2021 - 2023',
    summary: "Production data-processing pipelines for NASA's SPHEREx mission.",
    telescopes: ['spherex'],
  },
  {
    org: 'Steward Observatory',
    role: 'R&D Software Engineer III',
    period: '2019 - 2021',
    summary:
      'Telescope automation from dome and mirror-cover control to operator web interfaces. Where pyINDI began.',
    telescopes: ['kuiper', 'bok', 'vatt', 'mmt'],
  },
  {
    org: 'Steward Observatory',
    role: 'Technical Services Specialist',
    period: '2017 - 2019',
    summary: 'Commissioned the Chimera photometer on the Kuiper 61" through first light.',
    telescopes: ['kuiper'],
  },
  {
    org: 'Northern Arizona University & Lowell Observatory',
    role: 'Graduate Researcher',
    period: '2015 - 2017',
    summary:
      'Led the robotic retrofit of the LONEOS 0.6 m into an asteroid follow-up telescope; observed near-Earth objects on the Perkins 72".',
    telescopes: ['loneos', 'perkins', 'ldt'],
  },
]

// DRAFT: the modest publications line.
export const publications = [
  {
    label: 'SPIE 2026 - GOATS (first author)',
    href: 'https://doi.org/10.1117/12.3104316',
  },
  { label: 'ApJS 285, 67 (2026) - SPHEREx pipeline', href: '' },
  { label: 'SPIE 2022 - pyINDI', href: 'https://doi.org/10.1117/12.2630471' },
]

// DRAFT: the evergreen GitHub line that replaces the Projects section.
export const building = {
  text: "What I'm building next lives in the open.",
  href: 'https://github.com/sidereal-software',
  linkLabel: 'github.com/sidereal-software',
}

// Verbatim. Do not edit without Dan's approval (see CLAUDE.md).
export const testimonials = [
  {
    quote:
      'He has an eye for GUIs and graphical design that I have never seen equaled... Everything he touched became instantly improved.',
    name: 'Chris Johnson',
    title: 'Lead Software Engineer, Mountain Operations',
    org: 'Steward Observatory',
  },
  {
    quote:
      'What truly sets Dan apart is his innate ability to present solutions when faced with challenges... He consistently met deadlines and exceeded expectations, thriving under pressure while delivering exceptional results.',
    name: 'Scott Swindell',
    title: 'Software Engineer',
    org: 'Steward Observatory',
  },
  {
    quote:
      'The range of skills that Dan mastered to complete this project is really astounding... Not only did Dan essentially complete the project, but he made it look easy.',
    name: 'David Trilling',
    title: 'Professor & Chair, Astronomy & Planetary Science',
    org: 'Northern Arizona University',
  },
  {
    quote:
      "He is attentive, well-spoken, and responsive... I have learned from him the practice of trying to 'always leave code better than when you found it.'",
    name: 'Christina Nelson',
    title: 'Application Developer, SPHEREx',
    org: 'Caltech / IPAC',
  },
]

export const about = {
  pullQuote: 'I build the tools I wished I had at 3 a.m. on the mountain.',
  // DRAFT: tightened; adds MS Applied Physics (NAU).
  paragraphs: [
    "I've spent my career inside observatories, not just writing code for them: over 150 nights at the telescope, mountain operations at Steward Observatory, and an MS in Applied Physics from Northern Arizona University.",
    "Today I'm a software engineer at NSF NOIRLab supporting the international Gemini Observatory. Sidereal Software is where that experience goes to work for teams who need production software shaped around how they actually operate.",
  ],
  name: 'Dan Avner',
  title: 'Founder & Principal Engineer',
  links: [
    { label: 'danavner.com', href: 'https://www.danavner.com' },
    { label: 'GitHub', href: 'https://github.com/davner' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/danavner' },
  ],
}

export const process = [
  {
    title: 'Intro call',
    description:
      'A conversation about your problem, constraints, and timeline. No cost, no obligation.',
  },
  {
    title: 'Scoped proposal',
    description: 'A written plan with deliverables, milestones, and a clear price.',
  },
  {
    title: 'Build',
    description: 'Iterative development with tests, documentation, and regular demos.',
  },
  {
    title: 'Handover',
    description: 'Your team owns the result: deployed, documented, and maintainable.',
  },
]

export const faqs = [
  {
    question: 'What kinds of projects are a good fit?',
    answer:
      'Observatory control systems, data-processing pipelines, and scientific web platforms are what I build most, but any science with a software problem is a good fit: ARK exists because wildlife professionals needed better record keeping. I take on new builds and modernizations of systems you already run.',
  },
  {
    question: 'Where are you based, and do you work remotely?',
    answer:
      'I am based in Los Angeles, California (Pacific Time) and work fully remotely. Most of my career has been spent shipping production systems for observatories and teams spread across sites and time zones.',
  },
  {
    question: 'How are engagements structured?',
    answer:
      'Every project starts with a free intro call, after which I send a written proposal with deliverables, milestones, and a clear price. I take both fixed-scope projects and ongoing support arrangements.',
  },
  {
    question: 'We already have a codebase. Is that a problem?',
    answer:
      'That is the normal case. Most of my engagements start inside an existing system: rescuing a pipeline, modernizing an interface, or extending a platform without breaking operations.',
  },
  {
    question: 'Who owns the work?',
    answer:
      'You do. I hand over every deliverable documented and tested, and open-sourcing components can be part of the plan when it benefits your project.',
  },
]

export const contact = {
  title: 'Start a project',
  description:
    'Tell me about your observatory, your lab, your field work, or the tool your team needs.',
  status: 'Currently taking on new projects',
  fields: ['Name', 'Email', 'Organization (optional)', 'Message'],
  submit: 'Send message',
  location: 'Los Angeles, California · Remote',
}

export const footer = {
  line: 'Sidereal Software · Los Angeles, California',
  tagline: 'Engineering the night sky',
}

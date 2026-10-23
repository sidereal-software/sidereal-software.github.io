import { mergeWorks, type Work } from '@/lib/orcid.js'

import generated from './publications.generated.json'

export type { Work }

export interface FeaturedPublication extends Work {
  label: string
  link: string
}

// Hand-curated: these stay featured even while ORCID lags behind them.
export const featuredPublications: FeaturedPublication[] = [
  {
    label: 'SPIE 2026 - GOATS (first author)',
    title:
      'GOATS: a Gemini end-to-end platform for time-domain and multimessenger follow-up',
    year: 2026,
    venue: 'Software and Cyberinfrastructure for Astronomy IX',
    type: 'conference-paper',
    link: 'https://doi.org/10.1117/12.3104316',
  },
  {
    label: 'ApJS 285, 67 (2026) - SPHEREx pipeline',
    title: 'The SPHEREx Image and Spectrophotometry Processing Pipeline',
    year: 2026,
    venue: 'The Astrophysical Journal Supplement Series',
    type: 'journal-article',
    link: 'https://doi.org/10.3847/1538-4365/ae8843',
  },
  {
    label: 'SPIE 2022 - pyINDI',
    title:
      'Rapid and painless development of python INDI drivers to elegant and responsive web GUIs',
    year: 2022,
    venue: 'Software and Cyberinfrastructure for Astronomy VII',
    type: 'conference-paper',
    link: 'https://doi.org/10.1117/12.2630471',
  },
]

export const publicationProfiles = [
  { label: 'ORCID', href: 'https://orcid.org/0009-0006-3587-3380' },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=B0HllkYAAAAJ',
  },
]

export const allPublications: Work[] = mergeWorks(
  generated.works,
  featuredPublications.map(({ label: _label, ...work }) => work),
)

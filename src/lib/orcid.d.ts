export interface Work {
  title: string
  year?: number
  venue?: string
  type?: string
  link?: string
}

export function parseWorks(response: unknown): Work[]

/** Deduplicates by normalized title, preferring a DOI link, and sorts newest first. */
export function mergeWorks(...lists: Work[][]): Work[]

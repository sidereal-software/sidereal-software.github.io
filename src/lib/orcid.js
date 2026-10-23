// Plain JavaScript so the sync script runs on Node without a TypeScript step.

export function parseWorks(response) {
  return mergeWorks(
    response.group.flatMap((group) => group['work-summary'].flatMap(toWork)),
  )
}

export function mergeWorks(...lists) {
  const byTitle = new Map()
  for (const work of lists.flat()) {
    const key = normalizeTitle(work.title)
    const kept = byTitle.get(key)
    if (!kept || (!hasDoi(kept) && hasDoi(work))) byTitle.set(key, work)
  }
  return [...byTitle.values()].sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
}

function normalizeTitle(title) {
  return title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

const hasDoi = (work) => work.link?.startsWith('https://doi.org/') ?? false

function toWork(summary) {
  const title = summary.title?.title?.value?.trim()
  if (!title) return []
  const work = { title }
  const year = Number(summary['publication-date']?.year?.value)
  if (year) work.year = year
  const venue = summary['journal-title']?.value?.trim()
  if (venue) work.venue = venue
  work.type = summary.type
  const link = doiLink(summary) ?? summary.url?.value
  if (link) work.link = link
  return [work]
}

function doiLink(summary) {
  const id = summary['external-ids']?.['external-id']?.find(
    (externalId) => externalId['external-id-type'] === 'doi',
  )
  const doi = id?.['external-id-value']
    ?.trim()
    .replace(/^(https?:\/\/(dx\.)?doi\.org\/|doi:)/i, '')
  return doi ? `https://doi.org/${doi}` : undefined
}

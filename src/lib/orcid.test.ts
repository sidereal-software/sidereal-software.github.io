import { describe, expect, it } from 'vitest'

import fixture from '@/test/fixtures/orcid-works.json'

import { parseWorks } from './orcid.js'

describe('parseWorks on the recorded ORCID response', () => {
  const works = parseWorks(fixture)

  it('turns each work into a record with title, year, venue and type', () => {
    expect(works).toContainEqual({
      title:
        'Rapid and painless development of python INDI drivers to elegant and responsive web GUIs',
      year: 2022,
      venue: 'Software and Cyberinfrastructure for Astronomy VII',
      type: 'conference-paper',
    })
  })

  it('orders works newest first', () => {
    expect(works[0].year).toBe(2022)
    expect(works.at(-1)?.year).toBe(2014)
    const years = works.map((work) => work.year ?? 0)
    expect(years).toEqual([...years].sort((a, b) => b - a))
  })

  it('leaves the link out when ORCID has neither a DOI nor a URL', () => {
    expect(works.every((work) => !('link' in work))).toBe(true)
  })
})

const base = fixture.group[0]['work-summary'][0]

function responseOf(...overrides: Record<string, unknown>[]) {
  return {
    group: overrides.map((override) => ({
      'work-summary': [{ ...base, ...override }],
    })),
  }
}

const doi = (value: string) => ({
  'external-ids': {
    'external-id': [
      {
        'external-id-type': 'doi',
        'external-id-value': value,
        'external-id-url': null,
        'external-id-relationship': 'self',
      },
    ],
  },
})

describe('parseWorks deduplication', () => {
  it('keeps the Pomenis and Chimera pairs, whose titles differ in words', () => {
    const works = parseWorks(fixture)
    expect(works).toHaveLength(19)
    expect(works.filter((work) => work.title.startsWith('Pomenis'))).toHaveLength(2)
    expect(works.filter((work) => work.title.startsWith('Chimera'))).toHaveLength(2)
  })

  const plain = { title: { title: { value: 'Pomenis: a small  portable astrograph.' } } }
  const withDoi = {
    title: { title: { value: 'POMENIS - A Small Portable Astrograph' } },
    ...doi('10.1/a'),
  }

  for (const [position, entries] of [
    ['first', [withDoi, plain]],
    ['second', [plain, withDoi]],
  ] as const) {
    it(`collapses titles equal up to case, spacing and punctuation, keeping the DOI listed ${position}`, () => {
      const works = parseWorks(responseOf(...entries))
      expect(works).toHaveLength(1)
      expect(works[0].link).toBe('https://doi.org/10.1/a')
    })
  }

  it('prefers the DOI version among the sources ORCID groups into one work', () => {
    const [group] = responseOf(plain).group
    const works = parseWorks({
      group: [{ 'work-summary': [...group['work-summary'], { ...base, ...withDoi }] }],
    })
    expect(works).toHaveLength(1)
    expect(works[0].link).toBe('https://doi.org/10.1/a')
  })
})

describe('parseWorks with incomplete records', () => {
  const titled = (value: string) => ({ title: { title: { value } } })

  it('omits the year when the date or its year is missing and lists those works last', () => {
    const works = parseWorks(
      responseOf(
        { ...titled('No date'), 'publication-date': null },
        { ...titled('Dated'), 'publication-date': { year: { value: '2019' } } },
        {
          ...titled('No year'),
          'publication-date': { year: null, month: null, day: null },
        },
      ),
    )
    expect(works.map((work) => work.title)).toEqual(['Dated', 'No date', 'No year'])
    expect(works[1]).not.toHaveProperty('year')
    expect(works[2]).not.toHaveProperty('year')
  })

  it('omits the venue when ORCID has no journal title', () => {
    const [work] = parseWorks(responseOf({ 'journal-title': null }))
    expect(work).not.toHaveProperty('venue')
    expect(work.title).toBe(base.title.title.value)
  })

  it('skips a work with no title', () => {
    expect(parseWorks(responseOf({ title: null }, titled('Kept')))).toEqual([
      expect.objectContaining({ title: 'Kept' }),
    ])
  })

  it('returns no works for an empty record', () => {
    expect(parseWorks({ group: [] })).toEqual([])
  })
})

describe('parseWorks links', () => {
  it('links to the DOI when ORCID carries one', () => {
    const [work] = parseWorks(
      responseOf({
        ...doi('10.1117/12.2630471'),
        url: { value: 'https://example.org/paper' },
      }),
    )
    expect(work.link).toBe('https://doi.org/10.1117/12.2630471')
  })

  it('falls back to the work URL when there is no DOI', () => {
    const [work] = parseWorks(responseOf({ url: { value: 'https://example.org/paper' } }))
    expect(work.link).toBe('https://example.org/paper')
  })

  it('ignores identifiers that are not DOIs', () => {
    const [work] = parseWorks(
      responseOf({
        'external-ids': {
          'external-id': [
            {
              'external-id-type': 'bibcode',
              'external-id-value': '2022SPIE12189E..0XS',
              'external-id-url': null,
              'external-id-relationship': 'self',
            },
          ],
        },
      }),
    )
    expect(work).not.toHaveProperty('link')
  })
})

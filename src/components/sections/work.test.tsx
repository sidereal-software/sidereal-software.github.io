import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Work } from './work'

function publications() {
  render(<Work />)
  return screen.getByRole('region', { name: 'Publications' })
}

describe('Work publications', () => {
  it('features three papers, each linking to its DOI', () => {
    const block = publications()
    for (const [name, href] of [
      [/GOATS/, 'https://doi.org/10.1117/12.3104316'],
      [/SPHEREx/, 'https://doi.org/10.3847/1538-4365/ae8843'],
      [/pyINDI/, 'https://doi.org/10.1117/12.2630471'],
    ] as const) {
      expect(within(block).getByRole('link', { name })).toHaveAttribute('href', href)
    }
  })

  it('links to the ORCID and Google Scholar profiles', () => {
    const block = publications()
    expect(within(block).getByRole('link', { name: /ORCID/ })).toHaveAttribute(
      'href',
      'https://orcid.org/0009-0006-3587-3380',
    )
    expect(within(block).getByRole('link', { name: /Google Scholar/ })).toHaveAttribute(
      'href',
      'https://scholar.google.com/citations?user=B0HllkYAAAAJ',
    )
  })

  it('expands a full list holding ORCID works and featured papers ORCID lacks', () => {
    const block = publications()
    const toggle = within(block).getByRole('button', { name: /all publications/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(
      within(block).queryByText(/common origin for dynamically associated/),
    ).not.toBeVisible()

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    const list = within(block).getByRole('list', { name: /all publications/i })
    expect(
      within(list).getByText(
        'A common origin for dynamically associated near-Earth asteroid pairs',
      ),
    ).toBeVisible()
    expect(
      within(list).getAllByText(
        'GOATS: a Gemini end-to-end platform for time-domain and multimessenger follow-up',
      ),
    ).toHaveLength(1)
    expect(
      within(list).getByText(
        'The SPHEREx Image and Spectrophotometry Processing Pipeline',
      ),
    ).toBeVisible()
  })

  it('lists a paper ORCID has without a DOI once, under the featured DOI', () => {
    const block = publications()
    fireEvent.click(within(block).getByRole('button', { name: /all publications/i }))
    const list = within(block).getByRole('list', { name: /all publications/i })
    const pyindi = within(list).getAllByRole('link', {
      name: /python INDI drivers/,
    })
    expect(pyindi).toHaveLength(1)
    expect(pyindi[0]).toHaveAttribute('href', 'https://doi.org/10.1117/12.2630471')
  })
})

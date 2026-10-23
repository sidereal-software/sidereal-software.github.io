import { describe, expect, it } from 'vitest'

// index.html is outside the React tree, so component tests never touch it. These
// assertions guard the tags that are easy to drop by accident and silent when lost.
import html from '../index.html?raw'
import { heroImage } from '@/content/images'

const doc = new DOMParser().parseFromString(html, 'text/html')

function structuredData() {
  const script = doc.querySelector('script[type="application/ld+json"]')
  return JSON.parse(script?.textContent ?? '{}')
}

describe('index.html', () => {
  it('loads GoatCounter analytics for this site', () => {
    const script = doc.querySelector('script[data-goatcounter]')
    expect(script?.getAttribute('data-goatcounter')).toBe(
      'https://siderealsoftware.goatcounter.com/count',
    )
    expect(script?.getAttribute('src')).toBe('https://gc.zgo.at/count.js')
  })

  it('is dark-only with no theme switching script', () => {
    expect(doc.documentElement.classList.contains('dark')).toBe(true)
    expect(doc.querySelector('meta[name="color-scheme"]')?.getAttribute('content')).toBe(
      'dark',
    )
    const inlineScripts = [...doc.querySelectorAll('script:not([src])')].filter(
      (script) => script.getAttribute('type') !== 'application/ld+json',
    )
    expect(inlineScripts).toHaveLength(0)
    expect(html).not.toContain('localStorage')
  })

  it('carries the tagline in the title and structured data', () => {
    expect(doc.title).toBe('Sidereal Software | Software that does the heavy lifting')
    expect(structuredData().slogan).toBe('Software that does the heavy lifting')
  })

  it('links the founder to ORCID and Google Scholar', () => {
    expect(structuredData().founder.sameAs).toEqual(
      expect.arrayContaining([
        'https://orcid.org/0009-0006-3587-3380',
        'https://scholar.google.com/citations?user=B0HllkYAAAAJ',
      ]),
    )
  })

  it('declares the social preview image', () => {
    expect(doc.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://sidereal.software/og.png',
    )
  })

  it('preloads the hero image with the same candidates and sizes as the img', () => {
    const preload = doc.querySelector('link[rel="preload"][as="image"]')
    expect(preload?.getAttribute('fetchpriority')).toBe('high')
    expect(preload?.getAttribute('imagesrcset')).toBe(
      '/src/assets/images/m27-1200.jpg 1200w, /src/assets/images/m27.jpg 2400w',
    )
    expect(preload?.getAttribute('imagesizes')).toBe(heroImage.sizes)
  })
})

import { describe, expect, it } from 'vitest'

// index.html is outside the React tree, so component tests never touch it. These
// assertions guard the tags that are easy to drop by accident and silent when lost.
import html from '../index.html?raw'

describe('index.html', () => {
  it('loads GoatCounter analytics for this site', () => {
    expect(html).toContain(
      'data-goatcounter="https://siderealsoftware.goatcounter.com/count"',
    )
    expect(html).toContain('src="https://gc.zgo.at/count.js"')
  })

  it('applies the stored theme before first paint', () => {
    expect(html).toContain("localStorage.getItem('theme')")
  })

  it('declares the social preview image', () => {
    expect(html).toContain(
      '<meta property="og:image" content="https://sidereal.software/og.png" />',
    )
  })
})

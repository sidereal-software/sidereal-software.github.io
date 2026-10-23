import { describe, expect, it } from 'vitest'

import { fitFontSize } from './fit-text'

describe('fitFontSize', () => {
  it('scales the font so the text spans the container', () => {
    expect(
      fitFontSize({ fontSize: 100, textWidth: 400, containerWidth: 1000, cap: 1000 }),
    ).toBe(250)
  })

  it('rounds down so the text never overflows', () => {
    expect(
      fitFontSize({ fontSize: 100, textWidth: 300, containerWidth: 1000, cap: 1000 }),
    ).toBe(333.3)
  })

  it('stops at the cap', () => {
    expect(
      fitFontSize({ fontSize: 100, textWidth: 400, containerWidth: 1000, cap: 160 }),
    ).toBe(160)
  })

  it('declines to size text it cannot measure', () => {
    expect(
      fitFontSize({ fontSize: 100, textWidth: 0, containerWidth: 1000, cap: 160 }),
    ).toBeNull()
    expect(
      fitFontSize({ fontSize: 100, textWidth: 400, containerWidth: 0, cap: 160 }),
    ).toBeNull()
  })
})

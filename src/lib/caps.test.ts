import { describe, expect, it } from 'vitest'

import { capsSegments } from './caps'

describe('capsSegments', () => {
  it('keeps only the mixed-case acronym out of the uppercase run', () => {
    expect(capsSegments('Python libraries & APIs')).toEqual([
      { text: 'Python libraries & ', keepCase: false },
      { text: 'APIs', keepCase: true },
    ])
  })

  it('keeps mixed-case names such as pyINDI and GitHub', () => {
    expect(capsSegments('pyINDI on GitHub').filter((s) => s.keepCase)).toEqual([
      { text: 'pyINDI', keepCase: true },
      { text: 'GitHub', keepCase: true },
    ])
  })

  it('leaves all-caps acronyms and plain words to the transform', () => {
    expect(capsSegments('INDI drivers')).toEqual([
      { text: 'INDI drivers', keepCase: false },
    ])
    expect(capsSegments('')).toEqual([])
  })
})

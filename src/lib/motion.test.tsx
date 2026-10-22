import { animated, Globals } from '@react-spring/web'
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { followReducedMotion, useStaggerIn } from '@/lib/motion'

function mediaQuery(matches: boolean) {
  const listeners = new Set<(event: { matches: boolean }) => void>()
  const query = {
    matches,
    addEventListener: (_: string, listener: (event: { matches: boolean }) => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: (event: { matches: boolean }) => void) =>
      listeners.delete(listener),
    change(next: boolean) {
      query.matches = next
      for (const listener of listeners) listener({ matches: next })
    },
  }
  return query
}

function Items() {
  const trail = useStaggerIn(2, true)
  return (
    <ul>
      {trail.map((style, index) => (
        <animated.li key={index} style={style}>
          item {index}
        </animated.li>
      ))}
    </ul>
  )
}

describe('motion', () => {
  beforeEach(() => Globals.assign({ skipAnimation: false }))
  afterEach(() => Globals.assign({ skipAnimation: true }))

  it('settles springs at their end state under reduced motion', () => {
    const query = mediaQuery(true)
    const stop = followReducedMotion(() => query as unknown as MediaQueryList)
    render(<Items />)
    for (const item of screen.getAllByRole('listitem')) {
      expect(item.style.opacity).toBe('1')
      expect(item.style.transform).toBe('none')
    }
    stop()
  })

  it('animates when motion is allowed and follows later changes', () => {
    const query = mediaQuery(false)
    const stop = followReducedMotion(() => query as unknown as MediaQueryList)
    expect(Globals.skipAnimation).toBe(false)
    query.change(true)
    expect(Globals.skipAnimation).toBe(true)
    stop()
    query.change(false)
    expect(Globals.skipAnimation).toBe(true)
  })
})

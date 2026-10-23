import { animated, Globals } from '@react-spring/web'
import { act, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { followReducedMotion, useStaggerIn, useStaggerOnEntry } from '@/lib/motion'

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

let report: (isIntersecting: boolean) => void

class ObserverDouble {
  constructor(callback: IntersectionObserverCallback) {
    report = (isIntersecting) =>
      act(() =>
        callback(
          [{ isIntersecting } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        ),
      )
  }
  observe() {}
  disconnect() {}
}

function Row() {
  const { ref, trail } = useStaggerOnEntry<HTMLOListElement>(3)
  return (
    <ol ref={ref}>
      {trail.map((style, index) => (
        <animated.li key={index} style={style}>
          step {index}
        </animated.li>
      ))}
    </ol>
  )
}

const opacities = () =>
  screen.getAllByRole('listitem').map((item) => Number(item.style.opacity))

describe('useStaggerOnEntry', () => {
  const realObserver = window.IntersectionObserver
  beforeEach(() => {
    window.IntersectionObserver = ObserverDouble as unknown as typeof IntersectionObserver
    Globals.assign({ skipAnimation: false })
  })
  afterEach(() => {
    // @ts-expect-error jsdom has no IntersectionObserver to restore
    if (realObserver === undefined) delete window.IntersectionObserver
    else window.IntersectionObserver = realObserver
    Globals.assign({ skipAnimation: true })
  })

  it('shows the row if the observer never reports', () => {
    render(<Row />)
    expect(opacities()).toEqual([1, 1, 1])
  })

  it('shows the row in a browser without IntersectionObserver', () => {
    // @ts-expect-error simulating a browser that lacks the API
    delete window.IntersectionObserver
    render(<Row />)
    expect(opacities()).toEqual([1, 1, 1])
  })

  it('leaves a row that starts in view alone', () => {
    render(<Row />)
    report(true)
    expect(opacities()).toEqual([1, 1, 1])
  })

  it('hides a row below the fold and settles it in view on entry', async () => {
    render(<Row />)
    report(false)
    await waitFor(() => expect(opacities()).toEqual([0, 0, 0]))
    report(true)
    await waitFor(() => expect(opacities()).toEqual([1, 1, 1]))
    for (const item of screen.getAllByRole('listitem')) {
      expect(item.style.transform).toBe('none')
    }
  })

  it('never hides the row under reduced motion', async () => {
    Globals.assign({ skipAnimation: true })
    render(<Row />)
    report(false)
    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(opacities()).toEqual([1, 1, 1])
  })

  it('rises in sequence, first item leading', async () => {
    render(<Row />)
    report(false)
    report(true)
    await waitFor(() => {
      const [first, , last] = opacities()
      expect(first).toBeGreaterThan(0.3)
      expect(last).toBeLessThan(first)
    })
    await waitFor(() => expect(opacities()).toEqual([1, 1, 1]), { timeout: 3000 })
  })
})

describe('motion', () => {
  beforeEach(() => Globals.assign({ skipAnimation: false }))
  afterEach(() => Globals.assign({ skipAnimation: true }))

  it('settles springs at their end state under reduced motion', () => {
    const query = mediaQuery(true)
    const stop = followReducedMotion(() => query as unknown as MediaQueryList)
    render(<Items />)
    for (const item of screen.getAllByRole('listitem')) {
      expect(item).toBeVisible()
      expect(item.style.transform).toBe('none')
    }
    stop()
  })

  it('staggers items in already visible, so a spring that never runs hides nothing', async () => {
    const stop = followReducedMotion(() => mediaQuery(false) as unknown as MediaQueryList)
    render(<Items />)
    const items = screen.getAllByRole('listitem')
    for (const item of items) {
      expect(item.style.opacity).not.toBe('0')
      expect(item.style.transform).toMatch(/^translate3d\(0,\s?[1-9][\d.]*px,\s?0\)$/)
    }
    await waitFor(
      () => {
        for (const item of items) expect(item.style.transform).toBe('none')
      },
      { timeout: 3000 },
    )
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

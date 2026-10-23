import { useEffect, useRef } from 'react'
import { Globals, useSpring, useSprings, useTrail } from '@react-spring/web'

// Damping ratios near 0.9: a soft settle with no visible bounce.
export const springs = {
  settle: { tension: 280, friction: 30 },
  press: { tension: 520, friction: 40 },
} as const

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export function followReducedMotion(
  matchMedia: (query: string) => MediaQueryList = window.matchMedia.bind(window),
) {
  const query = matchMedia(reducedMotionQuery)
  const sync = (event: { matches: boolean }) =>
    Globals.assign({ skipAnimation: event.matches })
  sync(query)
  query.addEventListener('change', sync)
  return () => query.removeEventListener('change', sync)
}

export function usePress() {
  const [style, api] = useSpring(() => ({ scale: 1, config: springs.press }))
  const release = () => api.start({ scale: 1 })
  return {
    style,
    bind: {
      onPointerDown: () => api.start({ scale: 0.97 }),
      onPointerUp: release,
      onPointerLeave: release,
      onBlur: release,
    },
  }
}

// Rises without fading, so content stays readable even if the spring never runs.
export function useStaggerIn(count: number, active: boolean) {
  return useTrail(count, {
    from: { y: 12 },
    to: { y: active ? 0 : 12 },
    config: springs.settle,
  })
}

const risen = { opacity: 1, y: 0 }
const lowered = { opacity: 0, y: 24 }

// Starts visible and hides only once the row is known to be below the fold, so a spring that never runs never hides content.
export function useStaggerOnEntry<T extends Element>(count: number) {
  const ref = useRef<T>(null)
  const [trail, api] = useSprings(count, () => ({ ...risen, config: springs.settle }))

  useEffect(() => {
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) return
    let waiting = false
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || Globals.skipAnimation) {
        if (waiting) api.start((index) => ({ ...risen, delay: index * 90 }))
        observer.disconnect()
      } else if (!waiting) {
        waiting = true
        api.set(lowered)
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [api])

  return { ref, trail }
}

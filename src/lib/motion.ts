import { Globals, useSpring, useTrail } from '@react-spring/web'

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

export function useStaggerIn(count: number, active: boolean) {
  return useTrail(count, {
    from: { opacity: 0, y: 12 },
    to: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    config: springs.settle,
  })
}

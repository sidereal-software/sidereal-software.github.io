import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinklePhase: number
  twinkleSpeed: number
  driftSpeed: number
}

const STAR_DENSITY = 0.00012

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let width = 0
    let height = 0
    let animationFrame = 0

    const createStars = () => {
      const count = Math.round(width * height * STAR_DENSITY)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.1 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        driftSpeed: Math.random() * 0.04 + 0.01,
      }))
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createStars()
      if (reducedMotion) draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#fff'
      for (const star of stars) {
        const twinkle = reducedMotion ? 0 : Math.sin(star.twinklePhase) * 0.25
        ctx.globalAlpha = Math.max(0.05, star.baseAlpha + twinkle)
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = () => {
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed
        star.y += star.driftSpeed
        if (star.y > height + 2) {
          star.y = -2
          star.x = Math.random() * width
        }
      }
      draw()
      animationFrame = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reducedMotion) animationFrame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}

import { useLayoutEffect, useRef, useState } from 'react'

interface FitInput {
  fontSize: number
  textWidth: number
  containerWidth: number
  cap: number
}

export function fitFontSize({ fontSize, textWidth, containerWidth, cap }: FitInput) {
  if (textWidth <= 0 || containerWidth <= 0) return null
  const fitted = Math.floor(((fontSize * containerWidth) / textWidth) * 10) / 10
  return Math.min(cap, fitted)
}

function innerWidth(element: HTMLElement) {
  const style = getComputedStyle(element)
  return (
    element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
  )
}

export function useFitText<
  Container extends HTMLElement = HTMLElement,
  Text extends HTMLElement = HTMLSpanElement,
>(capRem: number) {
  const containerRef = useRef<Container>(null)
  const textRef = useRef<Text>(null)
  const [fitted, setFitted] = useState(false)

  useLayoutEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return
    let disposed = false

    const fit = () => {
      if (disposed) return
      const width = innerWidth(container)
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
      // Glyph widths do not scale perfectly linearly, so re-check after each resize.
      for (let pass = 0; pass < 3; pass++) {
        const size = fitFontSize({
          fontSize: parseFloat(getComputedStyle(text).fontSize),
          textWidth: text.getBoundingClientRect().width,
          containerWidth: width,
          cap: capRem * rem,
        })
        if (size === null) return
        text.style.fontSize = `${size}px`
        if (text.getBoundingClientRect().width <= width) break
      }
      setFitted(true)
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(container)
    const fonts = document.fonts as FontFaceSet | undefined
    fonts?.ready.then(fit)
    fonts?.addEventListener('loadingdone', fit)
    return () => {
      disposed = true
      observer.disconnect()
      fonts?.removeEventListener('loadingdone', fit)
    }
  }, [capRem])

  return { containerRef, textRef, fitted }
}

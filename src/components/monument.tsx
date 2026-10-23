import type { CSSProperties } from 'react'

import { Caps } from '@/components/caps'
import { useFitText } from '@/lib/fit-text'
import { cn } from '@/lib/utils'

interface MonumentProps {
  /** A newline starts a second line; the widest line fills the container. */
  children: string
  as?: 'h2' | 'h3' | 'p'
  /** Keeps authored casing for a proper-name title; mixed-case acronyms survive uppercase anyway. */
  properName?: boolean
  /** Upper bound on the font size, in rem. */
  cap?: number
  className?: string
}

export function Monument({
  children,
  as: Tag = 'h2',
  properName = false,
  cap = 20,
  className,
}: MonumentProps) {
  const { containerRef, textRef, fitted } = useFitText<HTMLHeadingElement>(cap)
  const lines = children.split('\n')
  const style = {
    '--monument-len': Math.max(...lines.map((line) => line.length)),
    '--monument-cap': `${cap}rem`,
  } as CSSProperties

  return (
    <Tag
      ref={containerRef}
      data-monument={fitted ? 'fitted' : 'pending'}
      className={cn('monument reveal', !properName && 'uppercase', className)}
      style={style}>
      <span ref={textRef} aria-hidden={lines.length > 1 || undefined}>
        {properName ? children : <Caps>{children}</Caps>}
      </span>
      {/* Accessible names keep a raw newline in some engines, so multi-line titles read from a spaced copy. */}
      {lines.length > 1 && <span className="sr-only">{lines.join(' ')}</span>}
    </Tag>
  )
}

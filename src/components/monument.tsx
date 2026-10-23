import { Caps } from '@/components/caps'
import { cn } from '@/lib/utils'

interface MonumentProps {
  children: string
  as?: 'h2' | 'h3' | 'p'
  /** Keeps authored casing for a proper-name title; mixed-case acronyms survive uppercase anyway. */
  properName?: boolean
  className?: string
}

export function Monument({
  children,
  as: Tag = 'h2',
  properName = false,
  className,
}: MonumentProps) {
  return (
    <Tag
      className={cn(
        'font-display reveal leading-none font-bold tracking-[0.01em] text-balance',
        // Case-study names sit one step under the section titles they belong to, and their caller sets the gap above.
        Tag === 'h3'
          ? 'text-[clamp(2.25rem,5vw,4.25rem)]'
          : 'mb-8 text-[clamp(2.5rem,5.5vw,4.75rem)] md:mb-12',
        !properName && 'uppercase',
        className,
      )}>
      {/* Padding in em keeps descenders such as pyINDI's inside a clipping parent. */}
      <span className="inline-block pb-[0.12em]">
        {properName ? children : <Caps>{children}</Caps>}
      </span>
    </Tag>
  )
}

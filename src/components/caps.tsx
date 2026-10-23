import { capsSegments } from '@/lib/caps'

/** Text for an uppercase context: mixed-case acronyms such as "APIs" keep their authored casing. */
export function Caps({ children }: { children: string }) {
  return capsSegments(children).map((segment, index) =>
    segment.keepCase ? (
      <span key={index} style={{ textTransform: 'none' }}>
        {segment.text}
      </span>
    ) : (
      segment.text
    ),
  )
}

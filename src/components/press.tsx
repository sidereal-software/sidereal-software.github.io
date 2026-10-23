import type { ComponentProps } from 'react'
import { animated } from '@react-spring/web'

import { usePress } from '@/lib/motion'

export function PressLink(props: ComponentProps<typeof animated.a>) {
  const { style, bind } = usePress()
  return <animated.a {...props} style={style} {...bind} />
}

export function PressButton(props: ComponentProps<typeof animated.button>) {
  const { style, bind } = usePress()
  return <animated.button type="button" {...props} style={style} {...bind} />
}

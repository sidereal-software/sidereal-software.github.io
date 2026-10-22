// PROTOTYPE - throwaway. Three redesign directions on the home route, switched by ?variant=.
import { useEffect, useState, type ReactNode } from 'react'

import { PrototypeSwitcher, type VariantOption } from './switcher'
import { VariantA } from './variant-a'
import { VariantB } from './variant-b'
import { VariantC } from './variant-c'

const variants: VariantOption[] = [
  { key: 'current', name: 'Live site' },
  { key: 'A', name: 'Monolith' },
  { key: 'B', name: 'Signal' },
  { key: 'C', name: 'Console' },
]

function readVariant() {
  return new URLSearchParams(window.location.search).get('variant')
}

export default function RedesignPrototype({ current }: { current: ReactNode }) {
  const [variant, setVariant] = useState(() => readVariant() ?? 'current')

  useEffect(() => {
    const onPop = () => setVariant(readVariant() ?? 'current')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const change = (key: string) => {
    const url = new URL(window.location.href)
    if (key === 'current') url.searchParams.delete('variant')
    else url.searchParams.set('variant', key)
    url.hash = ''
    window.history.replaceState(null, '', url)
    window.scrollTo(0, 0)
    setVariant(key)
  }

  return (
    <>
      {variant === 'A' && <VariantA />}
      {variant === 'B' && <VariantB />}
      {variant === 'C' && <VariantC />}
      {!['A', 'B', 'C'].includes(variant) && current}
      <PrototypeSwitcher variants={variants} current={variant} onChange={change} />
    </>
  )
}

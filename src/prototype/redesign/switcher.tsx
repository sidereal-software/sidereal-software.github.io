// PROTOTYPE - throwaway variant switcher, dev builds only.
import { useEffect } from 'react'

export interface VariantOption {
  key: string
  name: string
}

export function PrototypeSwitcher({
  variants,
  current,
  onChange,
}: {
  variants: VariantOption[]
  current: string
  onChange: (key: string) => void
}) {
  const index = Math.max(
    0,
    variants.findIndex((v) => v.key === current),
  )
  const step = (delta: number) =>
    onChange(variants[(index + delta + variants.length) % variants.length].key)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.closest(
          'input, textarea, select, [contenteditable=""], [contenteditable="true"]',
        ) ||
          target.isContentEditable)
      )
        return
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const label = variants[index]
  return (
    <div
      role="toolbar"
      aria-label="Prototype variant switcher"
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2147483647,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: 4,
        borderRadius: 999,
        background: '#fff',
        color: '#111',
        font: '600 13px/1 ui-sans-serif, system-ui, sans-serif',
        boxShadow: '0 0 0 2px #111, 0 8px 24px rgba(0,0,0,.5)',
      }}>
      <SwitcherButton label="Previous variant" onClick={() => step(-1)}>
        ←
      </SwitcherButton>
      <span style={{ padding: '0 10px', whiteSpace: 'nowrap' }}>
        {label.key} · {label.name}
      </span>
      <SwitcherButton label="Next variant" onClick={() => step(1)}>
        →
      </SwitcherButton>
    </div>
  )
}

function SwitcherButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        borderRadius: 999,
        border: 0,
        background: '#111',
        color: '#fff',
        cursor: 'pointer',
        font: 'inherit',
      }}>
      {children}
    </button>
  )
}

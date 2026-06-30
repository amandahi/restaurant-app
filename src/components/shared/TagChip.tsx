import type { VisitTag } from '../../types/restaurant'
import { VISIT_TAG_LABELS } from '../../types/restaurant'

interface TagChipProps {
  tag: VisitTag
  selected?: boolean
  onClick?: () => void
}

export function TagChip({ tag, selected = false, onClick }: TagChipProps) {
  const label = VISIT_TAG_LABELS[tag]
  const className = `inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
    selected ? 'bg-[var(--accent)] text-white' : 'bg-stone-100 text-stone-600'
  }`

  if (!onClick) {
    return <span className={className}>{label}</span>
  }

  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={`${className} touch-manipulation`}>
      {label}
    </button>
  )
}

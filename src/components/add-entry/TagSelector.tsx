import { VISIT_TAGS, type VisitTag } from '../../types/restaurant'
import { TagChip } from '../shared/TagChip'

interface TagSelectorProps {
  selected: VisitTag[]
  onToggle: (tag: VisitTag) => void
}

export function TagSelector({ selected, onToggle }: TagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {VISIT_TAGS.map((tag) => (
        <TagChip key={tag} tag={tag} selected={selected.includes(tag)} onClick={() => onToggle(tag)} />
      ))}
    </div>
  )
}

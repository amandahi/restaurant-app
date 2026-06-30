import { Search } from 'lucide-react'
import { VISIT_TAGS, type VisitTag } from '../../types/restaurant'
import { TagChip } from '../shared/TagChip'

interface SearchFilterBarProps {
  query: string
  onQueryChange: (query: string) => void
  selectedTags: VisitTag[]
  onToggleTag: (tag: VisitTag) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
}

export function SearchFilterBar({
  query,
  onQueryChange,
  selectedTags,
  onToggleTag,
  minRating,
  onMinRatingChange,
}: SearchFilterBarProps) {
  return (
    <div className="space-y-3 px-4 pb-3 pt-3">
      <div className="flex items-center gap-2 rounded-xl bg-stone-100 px-3 py-2">
        <Search size={18} className="text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search restaurants..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {VISIT_TAGS.map((tag) => (
          <TagChip key={tag} tag={tag} selected={selectedTags.includes(tag)} onClick={() => onToggleTag(tag)} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-stone-500">Min rating</span>
        {[0, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onMinRatingChange(value)}
            className={`rounded-full px-3 py-1 text-sm font-medium touch-manipulation ${
              minRating === value ? 'bg-[var(--accent)] text-white' : 'bg-stone-100 text-stone-600'
            }`}
          >
            {value === 0 ? 'Any' : `${value}+`}
          </button>
        ))}
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { EntryFeed } from '../components/feed/EntryFeed'
import { SearchFilterBar } from '../components/search/SearchFilterBar'
import { useRestaurantEntries } from '../hooks/useRestaurantEntries'
import type { VisitTag } from '../types/restaurant'

export function FeedPage() {
  const [query, setQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<VisitTag[]>([])
  const [minRating, setMinRating] = useState(0)

  const filters = useMemo(
    () => ({ query, tags: selectedTags, minRating: minRating || undefined }),
    [query, selectedTags, minRating],
  )

  const { entries, loading } = useRestaurantEntries(filters)

  function toggleTag(tag: VisitTag) {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div>
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        minRating={minRating}
        onMinRatingChange={setMinRating}
      />
      <EntryFeed entries={entries} loading={loading} />
    </div>
  )
}

import type { RestaurantEntry } from '../../types/restaurant'
import { EmptyState } from '../shared/EmptyState'
import { EntryCard } from './EntryCard'

interface EntryFeedProps {
  entries: RestaurantEntry[]
  loading?: boolean
}

export function EntryFeed({ entries, loading }: EntryFeedProps) {
  if (loading) {
    return <EmptyState title="Loading visits..." />
  }

  if (entries.length === 0) {
    return <EmptyState title="No visits yet" description="Tap + to log your first restaurant visit." />
  }

  return (
    <div className="divide-y divide-gray-100">
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

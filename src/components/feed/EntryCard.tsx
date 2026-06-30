import { Link } from 'react-router-dom'
import type { RestaurantEntry } from '../../types/restaurant'
import { formatVisitDate } from '../../utils/date'
import { StarRating } from '../shared/StarRating'

interface EntryCardProps {
  entry: RestaurantEntry
}

export function EntryCard({ entry }: EntryCardProps) {
  const keyNote = entry.dishes[0]?.name ?? entry.notes ?? ''

  return (
    <Link
      to={`/entry/${entry.id}`}
      className="flex gap-3 px-4 py-3 active:bg-gray-50 touch-manipulation"
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {entry.photoUrl ? (
          <img src={entry.photoUrl} alt={entry.restaurantName} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold text-gray-900">{entry.restaurantName}</p>
          <span className="shrink-0 text-xs text-gray-400">{formatVisitDate(entry.visitDate)}</span>
        </div>
        <StarRating rating={entry.rating} size={14} />
        {keyNote && <p className="mt-0.5 truncate text-sm text-gray-500">{keyNote}</p>}
      </div>
    </Link>
  )
}

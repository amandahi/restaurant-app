import { Film } from 'lucide-react'
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
      className="flex gap-3 px-4 py-3 active:bg-stone-50 touch-manipulation md:flex-col md:gap-0 md:overflow-hidden md:rounded-xl md:border md:border-stone-200 md:px-0 md:py-0 md:transition-shadow md:hover:shadow-md md:active:bg-transparent"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-stone-100 md:h-40 md:w-full md:rounded-none">
        {entry.photoUrl ? (
          <img src={entry.photoUrl} alt={entry.restaurantName} className="h-full w-full object-cover" />
        ) : (
          <img src="/fallback-dish.svg" alt="" className="h-full w-full object-cover" />
        )}
        {entry.gif && (
          <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-stone-900/70 text-white">
            <Film size={12} />
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1 md:px-4 md:py-3">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold text-stone-900">{entry.restaurantName}</p>
          <span className="shrink-0 text-xs text-stone-400">{formatVisitDate(entry.visitDate)}</span>
        </div>
        <StarRating rating={entry.rating} size={14} />
        {keyNote && <p className="mt-0.5 truncate text-sm text-stone-500">{keyNote}</p>}
      </div>
    </Link>
  )
}

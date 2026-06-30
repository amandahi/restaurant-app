import { Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { RestaurantEntry } from '../../types/restaurant'
import { formatVisitDate } from '../../utils/date'
import { EmptyState } from '../shared/EmptyState'
import { StarRating } from '../shared/StarRating'

interface RecommendListProps {
  entries: RestaurantEntry[]
}

async function handleShare(entry: RestaurantEntry) {
  const text = `${entry.restaurantName} (${entry.rating}★) — ${entry.dishes[0]?.name ?? entry.notes ?? ''}`
  if (navigator.share) {
    try {
      await navigator.share({ title: entry.restaurantName, text })
    } catch {
      // user cancelled share, ignore
    }
    return
  }
  await navigator.clipboard.writeText(text)
  alert('Copied to clipboard!')
}

export function RecommendList({ entries }: RecommendListProps) {
  if (entries.length === 0) {
    return <EmptyState title="No top picks yet" description="Rate some visits highly to see them here." />
  }

  return (
    <div className="divide-y divide-stone-100 md:grid md:grid-cols-2 md:gap-4 md:divide-y-0 lg:grid-cols-3">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="flex items-center gap-3 px-4 py-3 md:rounded-xl md:border md:border-stone-200 md:px-4 md:py-3"
        >
          <Link to={`/entry/${entry.id}`} className="min-w-0 flex-1 touch-manipulation">
            <p className="truncate font-semibold text-stone-900">{entry.restaurantName}</p>
            <StarRating rating={entry.rating} size={14} />
            <p className="mt-0.5 truncate text-sm text-stone-500">{formatVisitDate(entry.visitDate)}</p>
          </Link>
          <button
            type="button"
            onClick={() => handleShare(entry)}
            aria-label={`Share ${entry.restaurantName}`}
            className="shrink-0 rounded-full p-2 text-stone-500 touch-manipulation"
          >
            <Share2 size={20} />
          </button>
        </div>
      ))}
    </div>
  )
}

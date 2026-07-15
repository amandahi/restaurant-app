import { Pencil, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { restaurantService } from '../../services/restaurantService'
import type { RestaurantEntry } from '../../types/restaurant'
import { formatVisitDate } from '../../utils/date'
import { GiphyAttribution } from '../shared/GiphyAttribution'
import { StarRating } from '../shared/StarRating'
import { TagChip } from '../shared/TagChip'

interface EntryDetailProps {
  entry: RestaurantEntry
}

export function EntryDetail({ entry }: EntryDetailProps) {
  const navigate = useNavigate()

  async function handleDelete() {
    if (!window.confirm('Delete this visit?')) return
    await restaurantService.delete(entry.id)
    navigate('/')
  }

  return (
    <div className="md:flex md:items-start md:gap-10">
      {entry.photoUrl && (
        <img
          src={entry.photoUrl}
          alt={entry.restaurantName}
          className="h-56 w-full object-cover md:h-80 md:w-80 md:shrink-0 md:rounded-xl"
        />
      )}
      <div className="space-y-4 px-4 py-4 md:flex-1 md:px-0 md:py-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold text-stone-900 md:text-2xl">{entry.restaurantName}</h2>
            <p className="text-sm text-stone-400">{formatVisitDate(entry.visitDate)}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              to={`/entry/${entry.id}/edit`}
              className="rounded-lg border border-stone-200 p-2 text-stone-500 hover:text-stone-900"
              aria-label="Edit visit"
            >
              <Pencil size={16} />
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg border border-stone-200 p-2 text-stone-500 hover:text-red-600"
              aria-label="Delete visit"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <StarRating rating={entry.rating} size={22} />

        {entry.dishes.length > 0 && (
          <div>
            <h3 className="mb-1 text-sm font-medium text-stone-700">Dishes</h3>
            <ul className="list-inside list-disc text-sm text-stone-600">
              {entry.dishes.map((dish) => (
                <li key={dish.id}>
                  {dish.name}
                  {dish.notes && <span className="text-stone-400"> — {dish.notes}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <TagChip key={tag} tag={tag} selected />
            ))}
          </div>
        )}

        {entry.notes && (
          <div>
            <h3 className="mb-1 text-sm font-medium text-stone-700">Notes</h3>
            <p className="text-sm text-stone-600">{entry.notes}</p>
          </div>
        )}

        {entry.fullReview && (
          <div className="hidden md:block">
            <h3 className="mb-1 text-sm font-medium text-stone-700">Full review</h3>
            <p className="max-w-2xl whitespace-pre-line text-sm leading-relaxed text-stone-600">
              {entry.fullReview}
            </p>
          </div>
        )}

        {entry.gif && (
          <div>
            <img src={entry.gif.url} alt={entry.gif.title ?? 'Attached GIF'} className="max-w-xs rounded-xl" />
            <GiphyAttribution className="mt-1" />
          </div>
        )}
      </div>
    </div>
  )
}

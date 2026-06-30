import type { RestaurantEntry } from '../../types/restaurant'
import { formatVisitDate } from '../../utils/date'
import { StarRating } from '../shared/StarRating'
import { TagChip } from '../shared/TagChip'

interface EntryDetailProps {
  entry: RestaurantEntry
}

export function EntryDetail({ entry }: EntryDetailProps) {
  return (
    <div>
      {entry.photoUrl && (
        <img src={entry.photoUrl} alt={entry.restaurantName} className="h-56 w-full object-cover" />
      )}
      <div className="space-y-4 px-4 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{entry.restaurantName}</h2>
          <p className="text-sm text-gray-400">{formatVisitDate(entry.visitDate)}</p>
        </div>

        <StarRating rating={entry.rating} size={22} />

        {entry.dishes.length > 0 && (
          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-700">Dishes</h3>
            <ul className="list-inside list-disc text-sm text-gray-600">
              {entry.dishes.map((dish) => (
                <li key={dish.id}>
                  {dish.name}
                  {dish.notes && <span className="text-gray-400"> — {dish.notes}</span>}
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
            <h3 className="mb-1 text-sm font-medium text-gray-700">Notes</h3>
            <p className="text-sm text-gray-600">{entry.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

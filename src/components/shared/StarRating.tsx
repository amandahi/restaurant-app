import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  readOnly?: boolean
  onChange?: (rating: 1 | 2 | 3 | 4 | 5) => void
  size?: number
}

export function StarRating({ rating, readOnly = true, onChange, size = 18 }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5] as const

  return (
    <div className="flex items-center gap-0.5" role={readOnly ? undefined : 'radiogroup'} aria-label="Rating">
      {stars.map((star) => {
        const filled = star <= rating
        if (readOnly) {
          return (
            <Star
              key={star}
              size={size}
              className={filled ? 'fill-[var(--star)] text-[var(--star)]' : 'text-stone-300'}
            />
          )
        }
        return (
          <button
            key={star}
            type="button"
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            aria-pressed={filled}
            onClick={() => onChange?.(star)}
            className="p-1 -m-1 touch-manipulation"
          >
            <Star
              size={size}
              className={filled ? 'fill-[var(--star)] text-[var(--star)]' : 'text-stone-300'}
            />
          </button>
        )
      })}
    </div>
  )
}

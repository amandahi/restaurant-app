import { useNavigate } from 'react-router-dom'
import { useEntryForm } from '../../hooks/useEntryForm'
import type { RestaurantEntry } from '../../types/restaurant'
import { StarRating } from '../shared/StarRating'
import { DishListInput } from './DishListInput'
import { GifPicker } from './GifPicker'
import { PhotoPicker } from './PhotoPicker'
import { TagSelector } from './TagSelector'

interface EntryFormProps {
  entry?: RestaurantEntry
}

export function EntryForm({ entry }: EntryFormProps) {
  const navigate = useNavigate()
  const form = useEntryForm(entry, (saved) => navigate(entry ? `/entry/${saved.id}` : '/'))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.submit()
      }}
      className="px-4 py-4 md:px-0 md:py-0"
    >
      <div className="md:grid md:grid-cols-2 md:gap-x-10 md:items-start">
        <div className="space-y-5">
          <div className="flex justify-center md:justify-start">
            <PhotoPicker photoUrl={form.photoUrl} onChange={form.setPhoto} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Restaurant name</label>
            <input
              type="text"
              value={form.restaurantName}
              onChange={(e) => form.setRestaurantName(e.target.value)}
              placeholder="e.g. Nonna Rosa"
              required
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Date</label>
            <input
              type="date"
              value={form.visitDate}
              onChange={(e) => form.setVisitDate(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Rating</label>
            <StarRating rating={form.rating} readOnly={false} onChange={form.setRating} size={28} />
          </div>
        </div>

        <div className="mt-5 space-y-5 md:mt-0">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Dishes</label>
            <DishListInput dishes={form.dishes} onAdd={form.addDish} onRemove={form.removeDish} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Tags</label>
            <TagSelector selected={form.tags} onToggle={form.toggleTag} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => form.setNotes(e.target.value)}
              rows={3}
              placeholder="What stood out?"
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>

          <div className="hidden md:block">
            <label className="mb-1 block text-sm font-medium text-stone-700">Full review</label>
            <textarea
              value={form.fullReview}
              onChange={(e) => form.setFullReview(e.target.value)}
              rows={6}
              placeholder="Write the full story of your visit..."
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-1 block text-sm font-medium text-stone-700">GIF</label>
        <GifPicker gif={form.gif} onChange={form.setGif} />
      </div>

      {form.error && <p className="mt-3 text-sm text-red-600">{form.error}</p>}

      <button
        type="submit"
        disabled={!form.isValid || form.submitting}
        className="mt-5 w-full rounded-xl bg-[var(--accent)] py-3 text-base font-semibold text-white touch-manipulation disabled:opacity-50 md:mt-8 md:w-auto md:px-10"
      >
        {form.submitting ? 'Saving...' : entry ? 'Save Changes' : 'Save Visit'}
      </button>
    </form>
  )
}

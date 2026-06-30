import { useState } from 'react'
import { restaurantService } from '../services/restaurantService'
import type { Dish, RestaurantEntry, VisitTag } from '../types/restaurant'

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function useEntryForm(onSaved?: (entry: RestaurantEntry) => void) {
  const [restaurantName, setRestaurantName] = useState('')
  const [visitDate, setVisitDate] = useState(today())
  const [dishes, setDishes] = useState<Dish[]>([])
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5)
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState<VisitTag[]>([])
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined)
  const [submitting, setSubmitting] = useState(false)

  function addDish(name: string) {
    if (!name.trim()) return
    setDishes((prev) => [...prev, { id: crypto.randomUUID(), name: name.trim() }])
  }

  function removeDish(id: string) {
    setDishes((prev) => prev.filter((dish) => dish.id !== id))
  }

  function toggleTag(tag: VisitTag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  function setPhoto(file: File | null) {
    if (photoUrl) URL.revokeObjectURL(photoUrl)
    setPhotoUrl(file ? URL.createObjectURL(file) : undefined)
  }

  const isValid = restaurantName.trim().length > 0 && visitDate.length > 0

  async function submit(): Promise<RestaurantEntry | null> {
    if (!isValid) return null
    setSubmitting(true)
    try {
      const entry = await restaurantService.create({
        restaurantName: restaurantName.trim(),
        visitDate,
        dishes,
        rating,
        notes: notes.trim() || undefined,
        tags,
        photoUrl,
      })
      onSaved?.(entry)
      return entry
    } finally {
      setSubmitting(false)
    }
  }

  return {
    restaurantName,
    setRestaurantName,
    visitDate,
    setVisitDate,
    dishes,
    addDish,
    removeDish,
    rating,
    setRating,
    notes,
    setNotes,
    tags,
    toggleTag,
    photoUrl,
    setPhoto,
    isValid,
    submitting,
    submit,
  }
}

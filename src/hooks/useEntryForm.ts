import { useState } from 'react'
import { PHOTOS_BUCKET, supabase } from '../lib/supabaseClient'
import { restaurantService } from '../services/restaurantService'
import type { Dish, GifAttachment, RestaurantEntry, VisitTag } from '../types/restaurant'

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

async function uploadPhoto(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '')
  const path = extension ? `${crypto.randomUUID()}.${extension}` : crypto.randomUUID()
  const { error } = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export function useEntryForm(existingEntry?: RestaurantEntry, onSaved?: (entry: RestaurantEntry) => void) {
  const [restaurantName, setRestaurantName] = useState(existingEntry?.restaurantName ?? '')
  const [visitDate, setVisitDate] = useState(existingEntry?.visitDate ?? today())
  const [dishes, setDishes] = useState<Dish[]>(existingEntry?.dishes ?? [])
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(existingEntry?.rating ?? 5)
  const [notes, setNotes] = useState(existingEntry?.notes ?? '')
  const [fullReview, setFullReview] = useState(existingEntry?.fullReview ?? '')
  const [tags, setTags] = useState<VisitTag[]>(existingEntry?.tags ?? [])
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | undefined>(existingEntry?.photoUrl)
  const [gif, setGif] = useState<GifAttachment | undefined>(existingEntry?.gif)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl)
    setPhotoFile(file)
    setPhotoPreviewUrl(file ? URL.createObjectURL(file) : undefined)
  }

  const isValid = restaurantName.trim().length > 0 && visitDate.length > 0

  async function submit(): Promise<RestaurantEntry | null> {
    if (!isValid) return null
    setSubmitting(true)
    setError(null)
    try {
      const photoUrl = photoFile ? await uploadPhoto(photoFile) : existingEntry?.photoUrl
      const payload = {
        restaurantName: restaurantName.trim(),
        visitDate,
        dishes,
        rating,
        notes: notes.trim() || undefined,
        fullReview: fullReview.trim() || undefined,
        tags,
        photoUrl,
        gif,
      }
      const entry = existingEntry
        ? await restaurantService.update(existingEntry.id, payload)
        : await restaurantService.create(payload)
      onSaved?.(entry)
      return entry
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save visit')
      return null
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
    fullReview,
    setFullReview,
    tags,
    toggleTag,
    photoUrl: photoPreviewUrl,
    setPhoto,
    gif,
    setGif,
    isValid,
    submitting,
    error,
    submit,
  }
}

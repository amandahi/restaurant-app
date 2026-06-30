import { useState } from 'react'
import { PHOTOS_BUCKET, supabase } from '../lib/supabaseClient'
import { restaurantService } from '../services/restaurantService'
import type { Dish, RestaurantEntry, VisitTag } from '../types/restaurant'

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

async function uploadPhoto(file: File): Promise<string> {
  const path = `${crypto.randomUUID()}-${file.name}`
  const { error } = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export function useEntryForm(onSaved?: (entry: RestaurantEntry) => void) {
  const [restaurantName, setRestaurantName] = useState('')
  const [visitDate, setVisitDate] = useState(today())
  const [dishes, setDishes] = useState<Dish[]>([])
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5)
  const [notes, setNotes] = useState('')
  const [fullReview, setFullReview] = useState('')
  const [tags, setTags] = useState<VisitTag[]>([])
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | undefined>(undefined)
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
    if (photoPreviewUrl) URL.revokeObjectURL(photoPreviewUrl)
    setPhotoFile(file)
    setPhotoPreviewUrl(file ? URL.createObjectURL(file) : undefined)
  }

  const isValid = restaurantName.trim().length > 0 && visitDate.length > 0

  async function submit(): Promise<RestaurantEntry | null> {
    if (!isValid) return null
    setSubmitting(true)
    try {
      const photoUrl = photoFile ? await uploadPhoto(photoFile) : undefined
      const entry = await restaurantService.create({
        restaurantName: restaurantName.trim(),
        visitDate,
        dishes,
        rating,
        notes: notes.trim() || undefined,
        fullReview: fullReview.trim() || undefined,
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
    fullReview,
    setFullReview,
    tags,
    toggleTag,
    photoUrl: photoPreviewUrl,
    setPhoto,
    isValid,
    submitting,
    submit,
  }
}

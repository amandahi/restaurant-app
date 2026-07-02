import { supabase } from '../lib/supabaseClient'
import type { Dish, GifAttachment, NewRestaurantEntry, RestaurantEntry, VisitTag } from '../types/restaurant'

interface RestaurantEntryRow {
  id: string
  restaurant_name: string
  visit_date: string
  dishes: Dish[]
  rating: 1 | 2 | 3 | 4 | 5
  notes: string | null
  full_review: string | null
  tags: VisitTag[]
  photo_url: string | null
  gif: GifAttachment | null
  created_at: string
  updated_at: string | null
}

function toEntry(row: RestaurantEntryRow): RestaurantEntry {
  return {
    id: row.id,
    restaurantName: row.restaurant_name,
    visitDate: row.visit_date,
    dishes: row.dishes,
    rating: row.rating,
    notes: row.notes ?? undefined,
    fullReview: row.full_review ?? undefined,
    tags: row.tags,
    photoUrl: row.photo_url ?? undefined,
    gif: row.gif ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? undefined,
  }
}

export interface SearchFilters {
  query?: string
  tags?: string[]
  minRating?: number
}

export const restaurantService = {
  async getAll(): Promise<RestaurantEntry[]> {
    const { data, error } = await supabase
      .from('restaurant_entries')
      .select('*')
      .order('visit_date', { ascending: false })
    if (error) throw error
    return (data as RestaurantEntryRow[]).map(toEntry)
  },

  async getById(id: string): Promise<RestaurantEntry | undefined> {
    const { data, error } = await supabase.from('restaurant_entries').select('*').eq('id', id).maybeSingle()
    if (error) throw error
    return data ? toEntry(data as RestaurantEntryRow) : undefined
  },

  async create(newEntry: NewRestaurantEntry): Promise<RestaurantEntry> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('restaurant_entries')
      .insert({
        user_id: user?.id,
        restaurant_name: newEntry.restaurantName,
        visit_date: newEntry.visitDate,
        dishes: newEntry.dishes,
        rating: newEntry.rating,
        notes: newEntry.notes ?? null,
        full_review: newEntry.fullReview ?? null,
        tags: newEntry.tags,
        photo_url: newEntry.photoUrl ?? null,
        gif: newEntry.gif ?? null,
      })
      .select()
      .single()
    if (error) throw error
    return toEntry(data as RestaurantEntryRow)
  },

  async search(filters: SearchFilters): Promise<RestaurantEntry[]> {
    let queryBuilder = supabase.from('restaurant_entries').select('*').order('visit_date', { ascending: false })

    if (filters.query) {
      queryBuilder = queryBuilder.ilike('restaurant_name', `%${filters.query}%`)
    }
    if (filters.tags && filters.tags.length > 0) {
      queryBuilder = queryBuilder.overlaps('tags', filters.tags)
    }
    if (filters.minRating) {
      queryBuilder = queryBuilder.gte('rating', filters.minRating)
    }

    const { data, error } = await queryBuilder
    if (error) throw error
    return (data as RestaurantEntryRow[]).map(toEntry)
  },

  async getTopRated(limit = 10): Promise<RestaurantEntry[]> {
    const { data, error } = await supabase
      .from('restaurant_entries')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit)
    if (error) throw error
    return (data as RestaurantEntryRow[]).map(toEntry)
  },
}

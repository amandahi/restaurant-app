import { mockEntries } from '../data/mockEntries'
import type { NewRestaurantEntry, RestaurantEntry } from '../types/restaurant'

let entries: RestaurantEntry[] = [...mockEntries]

export interface SearchFilters {
  query?: string
  tags?: string[]
  minRating?: number
}

function matchesFilters(entry: RestaurantEntry, filters: SearchFilters): boolean {
  if (filters.query) {
    const q = filters.query.toLowerCase()
    if (!entry.restaurantName.toLowerCase().includes(q)) return false
  }
  if (filters.tags && filters.tags.length > 0) {
    const hasTag = filters.tags.some((tag) => entry.tags.includes(tag as RestaurantEntry['tags'][number]))
    if (!hasTag) return false
  }
  if (filters.minRating && entry.rating < filters.minRating) return false
  return true
}

export const restaurantService = {
  async getAll(): Promise<RestaurantEntry[]> {
    return [...entries].sort((a, b) => b.visitDate.localeCompare(a.visitDate))
  },

  async getById(id: string): Promise<RestaurantEntry | undefined> {
    return entries.find((entry) => entry.id === id)
  },

  async create(newEntry: NewRestaurantEntry): Promise<RestaurantEntry> {
    const entry: RestaurantEntry = {
      ...newEntry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    entries = [entry, ...entries]
    return entry
  },

  async search(filters: SearchFilters): Promise<RestaurantEntry[]> {
    const all = await this.getAll()
    return all.filter((entry) => matchesFilters(entry, filters))
  },

  async getTopRated(limit = 10): Promise<RestaurantEntry[]> {
    return [...entries].sort((a, b) => b.rating - a.rating).slice(0, limit)
  },
}

import type { RestaurantEntry } from '../types/restaurant'

export function sortByRatingDesc(entries: RestaurantEntry[]): RestaurantEntry[] {
  return [...entries].sort((a, b) => b.rating - a.rating)
}

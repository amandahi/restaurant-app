import { useCallback, useEffect, useState } from 'react'
import { restaurantService, type SearchFilters } from '../services/restaurantService'
import type { RestaurantEntry } from '../types/restaurant'

export function useRestaurantEntries(filters?: SearchFilters) {
  const [entries, setEntries] = useState<RestaurantEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const hasFilters =
        filters && (filters.query || (filters.tags && filters.tags.length > 0) || filters.minRating)
      const result = hasFilters
        ? await restaurantService.search(filters)
        : await restaurantService.getAll()
      setEntries(result)
    } catch {
      setError('Failed to load entries')
    } finally {
      setLoading(false)
    }
  }, [filters?.query, filters?.tags?.join(','), filters?.minRating])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { entries, loading, error, refresh }
}

import { useEffect, useState } from 'react'
import { restaurantService } from '../services/restaurantService'
import type { RestaurantEntry } from '../types/restaurant'

export function useRestaurantEntry(id: string | undefined) {
  const [entry, setEntry] = useState<RestaurantEntry | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setEntry(undefined)
      setLoading(false)
      return
    }
    setLoading(true)
    restaurantService.getById(id).then((result) => {
      setEntry(result)
      setLoading(false)
    })
  }, [id])

  return { entry, loading }
}

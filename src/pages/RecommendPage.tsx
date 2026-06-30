import { useEffect, useState } from 'react'
import { RecommendList } from '../components/recommend/RecommendList'
import { restaurantService } from '../services/restaurantService'
import type { RestaurantEntry } from '../types/restaurant'

export function RecommendPage() {
  const [entries, setEntries] = useState<RestaurantEntry[]>([])

  useEffect(() => {
    restaurantService.getTopRated().then(setEntries)
  }, [])

  return <RecommendList entries={entries} />
}

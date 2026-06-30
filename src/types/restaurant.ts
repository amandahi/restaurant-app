export type VisitTag =
  | 'date_night'
  | 'group'
  | 'quick_lunch'
  | 'special_occasion'
  | 'business'
  | 'family'

export const VISIT_TAGS: VisitTag[] = [
  'date_night',
  'group',
  'quick_lunch',
  'special_occasion',
  'business',
  'family',
]

export const VISIT_TAG_LABELS: Record<VisitTag, string> = {
  date_night: 'Date Night',
  group: 'Group',
  quick_lunch: 'Quick Lunch',
  special_occasion: 'Special Occasion',
  business: 'Business',
  family: 'Family',
}

export interface Dish {
  id: string
  name: string
  notes?: string
}

export interface RestaurantEntry {
  id: string
  restaurantName: string
  visitDate: string
  dishes: Dish[]
  rating: 1 | 2 | 3 | 4 | 5
  notes?: string
  fullReview?: string
  tags: VisitTag[]
  photoUrl?: string
  createdAt: string
  updatedAt?: string
}

export type NewRestaurantEntry = Omit<RestaurantEntry, 'id' | 'createdAt' | 'updatedAt'>

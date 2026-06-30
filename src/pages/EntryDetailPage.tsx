import { useParams } from 'react-router-dom'
import { EntryDetail } from '../components/entry-detail/EntryDetail'
import { EmptyState } from '../components/shared/EmptyState'
import { useRestaurantEntry } from '../hooks/useRestaurantEntry'

export function EntryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { entry, loading } = useRestaurantEntry(id)

  if (loading) return <EmptyState title="Loading..." />
  if (!entry) return <EmptyState title="Visit not found" />

  return <EntryDetail entry={entry} />
}

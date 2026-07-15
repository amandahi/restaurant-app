import { useParams } from 'react-router-dom'
import { EntryForm } from '../components/add-entry/EntryForm'
import { EmptyState } from '../components/shared/EmptyState'
import { useRestaurantEntry } from '../hooks/useRestaurantEntry'

export function EditEntryPage() {
  const { id } = useParams<{ id: string }>()
  const { entry, loading } = useRestaurantEntry(id)

  if (loading) return <EmptyState title="Loading..." />
  if (!entry) return <EmptyState title="Visit not found" />

  return <EntryForm entry={entry} />
}

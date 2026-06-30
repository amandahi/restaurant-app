interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      <p className="text-lg font-semibold text-stone-800">{title}</p>
      {description && <p className="mt-1 text-sm text-stone-500">{description}</p>}
    </div>
  )
}

import { X } from 'lucide-react'
import { useState } from 'react'
import type { Dish } from '../../types/restaurant'

interface DishListInputProps {
  dishes: Dish[]
  onAdd: (name: string) => void
  onRemove: (id: string) => void
}

export function DishListInput({ dishes, onAdd, onRemove }: DishListInputProps) {
  const [value, setValue] = useState('')

  function handleAdd() {
    onAdd(value)
    setValue('')
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleAdd()
            }
          }}
          placeholder="Add a dish..."
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-400"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white touch-manipulation"
        >
          Add
        </button>
      </div>
      {dishes.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {dishes.map((dish) => (
            <span
              key={dish.id}
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {dish.name}
              <button
                type="button"
                onClick={() => onRemove(dish.id)}
                aria-label={`Remove ${dish.name}`}
                className="touch-manipulation"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

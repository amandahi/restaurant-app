import { Camera } from 'lucide-react'
import { useRef } from 'react'

interface PhotoPickerProps {
  photoUrl?: string
  onChange: (file: File | null) => void
}

export function PhotoPicker({ photoUrl, onChange }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 touch-manipulation"
      >
        {photoUrl ? (
          <img src={photoUrl} alt="Selected dish" className="h-full w-full object-cover" />
        ) : (
          <Camera size={28} className="text-stone-400" />
        )}
      </button>
    </div>
  )
}

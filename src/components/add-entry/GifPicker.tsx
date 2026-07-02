import type { IGif } from '@giphy/js-types'
import type { GifsResult } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import { Film, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import type { GifAttachment } from '../../types/restaurant'
import { GiphyAttribution } from '../shared/GiphyAttribution'

interface GifPickerProps {
  gif?: GifAttachment
  onChange: (gif: GifAttachment | undefined) => void
}

function toGifAttachment(gif: IGif): GifAttachment {
  return {
    id: String(gif.id),
    url: gif.images.fixed_width.url,
    stillUrl: gif.images.fixed_width_still?.url ?? gif.images.fixed_width.url,
    width: Number(gif.images.fixed_width.width),
    height: Number(gif.images.fixed_width.height),
    title: gif.title || undefined,
  }
}

export function GifPicker({ gif, onChange }: GifPickerProps) {
  const [open, setOpen] = useState(false)
  const [term, setTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => setDebouncedTerm(term), 350)
    return () => clearTimeout(id)
  }, [term])

  useEffect(() => {
    if (!containerRef.current || !open) return
    const observer = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width))
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [open])

  async function fetchGifs(offset: number): Promise<GifsResult> {
    const { data, error } = await supabase.functions.invoke('giphy-search', {
      body: { query: debouncedTerm || 'food', offset },
    })
    if (error) throw error
    return data as GifsResult
  }

  if (gif) {
    return (
      <div className="relative inline-block">
        <img src={gif.stillUrl} alt={gif.title ?? 'Attached GIF'} className="h-28 w-auto rounded-xl" />
        <button
          type="button"
          onClick={() => onChange(undefined)}
          aria-label="Remove GIF"
          className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white"
        >
          <X size={14} />
        </button>
        <GiphyAttribution className="mt-1" />
      </div>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 px-3 py-2 text-sm font-medium text-stone-500"
      >
        <Film size={16} />
        {open ? 'Close GIF search' : 'Add a GIF'}
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search GIFs..."
            autoFocus
            className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm outline-none focus:border-[var(--accent)]"
          />
          <div ref={containerRef} className="max-h-72 overflow-y-auto">
            {width > 0 && (
              <Grid
                key={debouncedTerm}
                width={width}
                columns={3}
                gutter={6}
                noLink
                fetchGifs={fetchGifs}
                onGifClick={(clickedGif, e) => {
                  e.preventDefault()
                  onChange(toGifAttachment(clickedGif))
                  setOpen(false)
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

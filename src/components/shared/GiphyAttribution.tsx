interface GiphyAttributionProps {
  className?: string
}

// GIPHY's API terms require a visible "Powered By GIPHY" mark
// wherever GIF content is shown, not just in the search picker.
export function GiphyAttribution({ className = '' }: GiphyAttributionProps) {
  return <p className={`text-[10px] font-medium tracking-wide text-stone-400 ${className}`}>Powered By GIPHY</p>
}

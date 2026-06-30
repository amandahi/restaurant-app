import { Plus, Star, UtensilsCrossed } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center justify-center gap-0.5 text-xs flex-1 py-2 touch-manipulation ${
    isActive ? 'text-[var(--accent)]' : 'text-stone-400'
  }`

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-stone-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-center">
        <NavLink to="/" end className={linkClass}>
          <UtensilsCrossed size={22} />
          Feed
        </NavLink>
        <NavLink to="/add" className="flex flex-1 flex-col items-center justify-center py-1.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-md">
            <Plus size={26} />
          </span>
        </NavLink>
        <NavLink to="/recommend" className={linkClass}>
          <Star size={22} />
          Recommend
        </NavLink>
      </div>
    </nav>
  )
}

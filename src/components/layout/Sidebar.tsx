import { Plus, Star, UtensilsCrossed } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-stone-500 hover:bg-stone-50'
  }`

export function Sidebar() {
  return (
    <aside className="hidden shrink-0 border-r border-stone-200 bg-white md:flex md:w-64 md:flex-col md:py-6">
      <div className="px-6 pb-6">
        <h1 className="text-xl font-semibold text-stone-900">Restaurant Journal</h1>
        <p className="mt-1 text-sm text-stone-400">Track every meal worth remembering</p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        <NavLink to="/" end className={linkClass}>
          <UtensilsCrossed size={18} />
          Feed
        </NavLink>
        <NavLink to="/recommend" className={linkClass}>
          <Star size={18} />
          Recommend
        </NavLink>
      </nav>
      <div className="mt-auto px-3">
        <NavLink
          to="/add"
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-2.5 text-sm font-semibold text-white shadow-sm"
        >
          <Plus size={18} />
          Log a Visit
        </NavLink>
      </div>
    </aside>
  )
}

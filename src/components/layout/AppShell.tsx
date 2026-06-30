import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

const TITLES: Record<string, string> = {
  '/': 'Your Visits',
  '/add': 'Log a Visit',
  '/recommend': 'Top Picks',
}

export function AppShell() {
  const location = useLocation()
  const title = TITLES[location.pathname] ?? 'Bite Log'

  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col bg-white">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 px-4 py-3 backdrop-blur">
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </header>
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

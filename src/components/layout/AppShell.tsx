import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'

const TITLES: Record<string, string> = {
  '/': 'Your Visits',
  '/add': 'Log a Visit',
  '/recommend': 'Top Picks',
}

export function AppShell() {
  const location = useLocation()
  const title = TITLES[location.pathname] ?? 'Bite Log'

  return (
    <div className="flex min-h-svh flex-col bg-white md:flex-row md:bg-stone-50">
      <Sidebar />
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-white md:max-w-none md:px-10 md:py-8">
        <header className="sticky top-0 z-10 border-b border-stone-100 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
          <h1 className="text-lg font-semibold text-stone-900">{title}</h1>
        </header>
        <header className="hidden md:mb-6 md:block">
          <h1 className="text-2xl font-semibold text-stone-900">{title}</h1>
        </header>
        <main className="flex-1 pb-20 md:pb-0">
          <div className="mx-auto w-full md:max-w-5xl">
            <Outlet />
          </div>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}

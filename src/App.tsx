import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './components/auth/RequireAuth'
import { AppShell } from './components/layout/AppShell'
import { AuthProvider } from './lib/AuthContext'
import { AddEntryPage } from './pages/AddEntryPage'
import { EntryDetailPage } from './pages/EntryDetailPage'
import { FeedPage } from './pages/FeedPage'
import { LoginPage } from './pages/LoginPage'
import { RecommendPage } from './pages/RecommendPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          >
            <Route index element={<FeedPage />} />
            <Route path="add" element={<AddEntryPage />} />
            <Route path="entry/:id" element={<EntryDetailPage />} />
            <Route path="recommend" element={<RecommendPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

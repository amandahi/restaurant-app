import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './components/auth/RequireAuth'
import { AppShell } from './components/layout/AppShell'
import { AuthProvider } from './lib/AuthContext'
import { AddEntryPage } from './pages/AddEntryPage'
import { EditEntryPage } from './pages/EditEntryPage'
import { EntryDetailPage } from './pages/EntryDetailPage'
import { FeedPage } from './pages/FeedPage'
import { LoginPage } from './pages/LoginPage'
import { RecommendPage } from './pages/RecommendPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
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
            <Route path="entry/:id/edit" element={<EditEntryPage />} />
            <Route path="recommend" element={<RecommendPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

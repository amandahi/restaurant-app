import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { AddEntryPage } from './pages/AddEntryPage'
import { EntryDetailPage } from './pages/EntryDetailPage'
import { FeedPage } from './pages/FeedPage'
import { RecommendPage } from './pages/RecommendPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<FeedPage />} />
          <Route path="add" element={<AddEntryPage />} />
          <Route path="entry/:id" element={<EntryDetailPage />} />
          <Route path="recommend" element={<RecommendPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

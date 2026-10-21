import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ComparePage from './pages/ComparePage'
import FavoritesPage from './pages/FavoritesPage'
import PokemonCatalogPage from './pages/PokemonCatalogPage'
import PokemonDetailsPage from './pages/PokemonDetailsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/pokemon" replace />} />
        <Route path="pokemon" element={<PokemonCatalogPage />} />
        <Route path="pokemon/:id" element={<PokemonDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="compare" element={<ComparePage />} />
      </Route>
    </Routes>
  )
}

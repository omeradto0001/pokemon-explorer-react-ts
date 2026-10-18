import { Route, Routes } from 'react-router-dom'
import PokemonList from './components/PokemonList'
import { pokemon } from './data/pokemon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <main className="app-shell">
          <header className="catalog-header">
            <p className="eyebrow">Pokemon Explorer</p>
            <h1>Meet the first four</h1>
            <p className="catalog-intro">
              A small local collection while we build the complete explorer.
            </p>
          </header>
          <PokemonList pokemon={pokemon} />
        </main>
      } />
    </Routes>
  )
}

import { Route, Routes } from 'react-router-dom'
import PokemonList from './components/PokemonList'
import { pokemon } from './data/pokemon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <main className="starter">
          <p className="eyebrow">Pokemon Explorer</p>
          <h1>A fresh TypeScript start</h1>
          <p>Explore the first local Pokemon collection.</p>
          <PokemonList pokemon={pokemon} />
        </main>
      } />
    </Routes>
  )
}

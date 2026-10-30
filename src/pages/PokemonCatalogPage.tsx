import { useMemo, useState } from 'react'

import PokemonList from '../components/PokemonList'
import { usePokemonList } from '../hooks/usePokemonList'
import { filterPokemonByName } from '../utils/pokemonFilters'

export default function PokemonCatalogPage() {
  const { state, retry } = usePokemonList()
  const [searchQuery, setSearchQuery] = useState('')
  const filteredPokemon = useMemo(
    () =>
      state.status === 'success'
        ? filterPokemonByName(state.pokemon, searchQuery)
        : [],
    [searchQuery, state],
  )

  return (
    <div className="app-shell">
      <header className="catalog-header">
        <p className="eyebrow">Pokemon catalog</p>
        <h1>Explore Pokemon</h1>
        <p className="catalog-intro">
          Meet the first 60 Pokemon, brought to you by PokeAPI.
        </p>
        <div className="catalog-search">
          <label className="catalog-search__label" htmlFor="pokemon-search">
            Search by name
          </label>
          <input
            className="catalog-search__input"
            id="pokemon-search"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Try Pikachu..."
            type="search"
            value={searchQuery}
          />
        </div>
      </header>
      {state.status === 'loading' && (
        <section className="request-state" role="status">
          <span className="request-state__spinner" aria-hidden="true" />
          <p>Loading Pokemon...</p>
        </section>
      )}
      {state.status === 'error' && (
        <section className="request-state" role="alert">
          <h2>Could not load Pokemon</h2>
          <p>Please check your connection and try again.</p>
          <button
            className="retry-button"
            onClick={retry}
            type="button"
          >
            Try again
          </button>
        </section>
      )}
      {state.status === 'success' && state.pokemon.length === 0 && (
        <section className="request-state" role="status">
          <h2>No Pokemon found</h2>
          <p>The catalog is empty right now.</p>
        </section>
      )}
      {state.status === 'success' && state.pokemon.length > 0 && filteredPokemon.length === 0 && (
        <section className="request-state" role="status">
          <h2>No matches found</h2>
          <p>Try a different Pokemon name.</p>
        </section>
      )}
      {state.status === 'success' && filteredPokemon.length > 0 && (
        <PokemonList pokemon={filteredPokemon} />
      )}
    </div>
  )
}

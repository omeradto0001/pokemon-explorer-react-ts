import { useMemo, useState } from 'react'

import EmptyMessage from '../components/EmptyMessage'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
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
        <LoadingMessage message="Loading Pokemon..." />
      )}
      {state.status === 'error' && (
        <ErrorMessage
          title="Could not load Pokemon"
          description="Please check your connection and try again."
          onRetry={retry}
        />
      )}
      {state.status === 'success' && state.pokemon.length === 0 && (
        <EmptyMessage title="No Pokemon found" description="The catalog is empty right now." />
      )}
      {state.status === 'success' && state.pokemon.length > 0 && filteredPokemon.length === 0 && (
        <EmptyMessage title="No matches found" description="Try a different Pokemon name." />
      )}
      {state.status === 'success' && filteredPokemon.length > 0 && (
        <PokemonList pokemon={filteredPokemon} />
      )}
    </div>
  )
}

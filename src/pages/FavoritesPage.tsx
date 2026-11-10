import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PokemonList from '../components/PokemonList'
import { useFavorites } from '../context/FavoritesContext'
import { usePokemonList } from '../hooks/usePokemonList'
import { filterPokemonByName } from '../utils/pokemonFilters'

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const { state, retry } = usePokemonList()
  const [searchQuery, setSearchQuery] = useState('')
  const favoritePokemon =
    state.status === 'success'
      ? state.pokemon.filter((pokemon) => favoriteIds.includes(pokemon.id))
      : []
  const filteredFavorites = filterPokemonByName(favoritePokemon, searchQuery)

  return (
    <div className="app-shell page-stack">
      <header className="page-header">
        <p className="eyebrow">Your collection</p>
        <h1>Favorites</h1>
        <p className="catalog-intro">
          Keep the Pokemon you love close at hand.
        </p>
      </header>
      {state.status === 'loading' && (
        <LoadingMessage message="Loading your favorites..." />
      )}
      {state.status === 'error' && (
        <ErrorMessage
          title="Could not load favorites"
          description="Please check your connection and try again."
          onRetry={retry}
        />
      )}
      {state.status === 'success' && favoritePokemon.length === 0 && (
        <section className="empty-state" aria-labelledby="favorites-empty-title">
          <span className="empty-state__icon" aria-hidden="true">♥</span>
          <div>
            <h2 id="favorites-empty-title">No favorite Pokemon yet</h2>
            <p>Your saved Pokemon will appear here.</p>
        </div>
        </section>
      )}
      {state.status === 'success' && favoritePokemon.length > 0 && (
        <>
          <div className="catalog-search">
            <label className="catalog-search__label" htmlFor="favorite-search">
              Search favorites by name
            </label>
            <input
              className="catalog-search__input"
              id="favorite-search"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Try Pikachu..."
              type="search"
              value={searchQuery}
            />
          </div>
          {filteredFavorites.length === 0 ? (
            <section className="request-state" role="status">
              <h2>No favorite matches found</h2>
              <p>Try a different Pokemon name.</p>
            </section>
          ) : (
            <PokemonList pokemon={filteredFavorites} />
          )}
        </>
      )}
    </div>
  )
}

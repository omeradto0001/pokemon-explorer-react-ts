import { useState } from 'react'
import EmptyMessage from '../components/EmptyMessage'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PokemonList from '../components/PokemonList'
import { useFavorites } from '../context/FavoritesContext'
import { usePokemonList } from '../hooks/usePokemonList'
import { filterPokemonByName } from '../utils/pokemonFilters'

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const { listRequest, retryList } = usePokemonList()
  const [searchQuery, setSearchQuery] = useState('')
  const favoritePokemonList =
    listRequest.status === 'success'
      ? listRequest.pokemonList.filter((pokemon) => favoriteIds.includes(pokemon.id))
      : []
  const filteredFavorites = filterPokemonByName(favoritePokemonList, searchQuery)

  return (
    <div className="app-shell page-stack">
      <header className="page-header">
        <p className="eyebrow">Your collection</p>
        <h1>Favorites</h1>
        <p className="catalog-intro">
          Keep the Pokemon you love close at hand.
        </p>
      </header>
      {listRequest.status === 'loading' && (
        <LoadingMessage message="Loading your favorites..." />
      )}
      {listRequest.status === 'error' && (
        <ErrorMessage
          title="Could not load favorites"
          description="Please check your connection and try again."
          onRetry={retryList}
        />
      )}
      {listRequest.status === 'success' && favoritePokemonList.length === 0 && (
        <EmptyState
          icon="♥"
          title="No favorite Pokemon yet"
          description="Your saved Pokemon will appear here."
        />
      )}
      {listRequest.status === 'success' && favoritePokemonList.length > 0 && (
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
            <EmptyMessage title="No favorite matches found" description="Try a different Pokemon name." />
          ) : (
            <PokemonList pokemonList={filteredFavorites} />
          )}
        </>
      )}
    </div>
  )
}

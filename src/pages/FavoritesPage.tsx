import PokemonList from '../components/PokemonList'
import { useFavorites } from '../context/FavoritesContext'
import { usePokemonList } from '../hooks/usePokemonList'

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const { state, retry } = usePokemonList()
  const favoritePokemon =
    state.status === 'success'
      ? state.pokemon.filter((pokemon) => favoriteIds.includes(pokemon.id))
      : []

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
        <section className="request-state" role="status">
          <span className="request-state__spinner" aria-hidden="true" />
          <p>Loading your favorites...</p>
        </section>
      )}
      {state.status === 'error' && (
        <section className="request-state" role="alert">
          <h2>Could not load favorites</h2>
          <p>Please check your connection and try again.</p>
          <button className="retry-button" onClick={retry} type="button">
            Try again
          </button>
        </section>
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
        <PokemonList pokemon={favoritePokemon} />
      )}
    </div>
  )
}

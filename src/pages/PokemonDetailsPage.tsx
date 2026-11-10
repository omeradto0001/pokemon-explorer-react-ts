import { Link, useParams } from 'react-router-dom'
import EmptyMessage from '../components/EmptyMessage'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PokemonArtwork from '../components/PokemonArtwork'
import PokemonList from '../components/PokemonList'
import { useFavorites } from '../context/FavoritesContext'
import { usePokemonDetails, type PokemonDetailsState } from '../hooks/usePokemonDetails'
import { usePokemonList } from '../hooks/usePokemonList'

export default function PokemonDetailsPage() {
  const { id } = useParams()
  const pokemonId = id && /^[1-9]\d*$/.test(id) ? Number(id) : NaN
  const hasValidId = Number.isSafeInteger(pokemonId)
  const { state, retry } = usePokemonDetails(hasValidId ? pokemonId : null)
  const { state: listState, retry: retryList } = usePokemonList()
  const { isFavorite, toggleFavorite } = useFavorites()

  const visibleState: PokemonDetailsState = hasValidId ? state : { status: 'not-found' }

  return (
    <div className="app-shell detail-page">
      {visibleState.status === 'loading' && (
        <LoadingMessage message="Loading Pokemon details..." />
      )}
      {visibleState.status === 'error' && (
        <ErrorMessage
          title="Could not load Pokemon details"
          description="Please check your connection and try again."
          headingLevel="h1"
          onRetry={retry}
        />
      )}
      {visibleState.status === 'not-found' && (
        <EmptyState
          icon="?"
          iconVariant="not-found"
          title="Pokemon not found"
          description="There is no Pokemon with this identifier."
          headingLevel="h1"
        >
          <Link className="text-link" to="/pokemon">Return to the catalog</Link>
        </EmptyState>
      )}
      {visibleState.status === 'success' && (
        <article className="pokemon-detail">
          <div className="pokemon-detail__visual">
            <PokemonArtwork key={visibleState.pokemon.id} pokemon={visibleState.pokemon} />
          </div>
          <div className="pokemon-detail__content">
            <Link className="back-link" to="/pokemon">
              <span aria-hidden="true">←</span> Back to catalog
            </Link>
            <p className="eyebrow">
              Pokemon #{String(visibleState.pokemon.id).padStart(3, '0')}
            </p>
            <div className="pokemon-detail__title-row">
              <h1>{visibleState.pokemon.name}</h1>
              <button
                aria-label={isFavorite(visibleState.pokemon.id)
                  ? `Remove ${visibleState.pokemon.name} from favorites`
                  : `Add ${visibleState.pokemon.name} to favorites`}
                aria-pressed={isFavorite(visibleState.pokemon.id)}
                className={`favorite-button favorite-button--detail${isFavorite(visibleState.pokemon.id) ? ' favorite-button--active' : ''}`}
                onClick={() => toggleFavorite(visibleState.pokemon.id)}
                type="button"
              >
                <span aria-hidden="true">{isFavorite(visibleState.pokemon.id) ? '♥' : '♡'}</span>
              </button>
            </div>
            <div className="pokemon-detail__types" aria-label="Pokemon types">
              {visibleState.pokemon.types.map((type) => (
                <span className="pokemon-detail__type" key={type}>{type}</span>
              ))}
            </div>
            <dl className="pokemon-detail__facts">
              <div><dt>Height</dt><dd>{(visibleState.pokemon.height / 10).toFixed(1)} m</dd></div>
              <div><dt>Weight</dt><dd>{(visibleState.pokemon.weight / 10).toFixed(1)} kg</dd></div>
            </dl>
            <section className="pokemon-detail__section" aria-labelledby="abilities-title">
              <h2 id="abilities-title">Abilities</h2>
              <p>{visibleState.pokemon.abilities.join(', ') || 'None listed'}</p>
            </section>
            <section className="pokemon-detail__section" aria-labelledby="stats-title">
              <h2 id="stats-title">Base stats</h2>
              <dl className="pokemon-detail__stats">
                {visibleState.pokemon.stats.map((stat) => (
                  <div key={stat.name}><dt>{stat.name}</dt><dd>{stat.baseValue}</dd></div>
                ))}
              </dl>
            </section>
          </div>
        </article>
      )}

      <section className="related-pokemon" aria-labelledby="related-pokemon-title">
        <div className="section-heading">
          <p className="eyebrow">Pokemon catalog</p>
          <h2 id="related-pokemon-title">Choose another Pokemon</h2>
        </div>
        {listState.status === 'loading' && (
          <LoadingMessage message="Loading Pokemon..." />
        )}
        {listState.status === 'error' && (
          <ErrorMessage title="Could not load the Pokemon list" onRetry={retryList} />
        )}
        {listState.status === 'success' && listState.pokemon.length === 0 && (
          <EmptyMessage description="No Pokemon found." />
        )}
        {listState.status === 'success' && listState.pokemon.length > 0 && (
          <PokemonList pokemon={listState.pokemon} />
        )}
      </section>
    </div>
  )
}

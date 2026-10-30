import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PokemonList from '../components/PokemonList'
import { useFavorites } from '../context/FavoritesContext'
import { usePokemonList } from '../hooks/usePokemonList'
import type { PokemonDetailApiResponse } from '../types/pokeapi'
import type { PokemonDetails } from '../types/pokemon'
import { toPokemonDetails } from '../utils/pokemonMappers'

type DetailState =
  | { status: 'loading'; requestedId: string | undefined }
  | { status: 'error'; requestedId: string | undefined }
  | { status: 'not-found'; requestedId: string | undefined }
  | { status: 'success'; requestedId: string | undefined; pokemon: PokemonDetails }

function PokemonArtwork({ pokemon }: { pokemon: PokemonDetails }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (!pokemon.imageUrl || imageFailed) {
    return (
      <div className="pokemon-detail__image-fallback" role="img" aria-label={`No image available for ${pokemon.name}`}>
        No image available
      </div>
    )
  }

  return (
    <img
      src={pokemon.imageUrl}
      alt={pokemon.name}
      onError={() => setImageFailed(true)}
    />
  )
}

export default function PokemonDetailsPage() {
  const { id } = useParams()
  const pokemonId = id && /^[1-9]\d*$/.test(id) ? Number(id) : NaN
  const hasValidId = Number.isSafeInteger(pokemonId)
  const [state, setState] = useState<DetailState>({
    status: 'loading',
    requestedId: id,
  })
  const [attempt, setAttempt] = useState(0)
  const { state: listState, retry: retryList } = usePokemonList()
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    if (!hasValidId) {
      return
    }

    const controller = new AbortController()

    async function loadPokemonDetails() {
      setState({ status: 'loading', requestedId: id })

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`, {
          signal: controller.signal,
        })

        if (response.status === 404) {
          if (!controller.signal.aborted) {
            setState({ status: 'not-found', requestedId: id })
          }
          return
        }

        if (!response.ok) {
          throw new Error(`Pokemon detail request failed: ${response.status}`)
        }

        const data: PokemonDetailApiResponse = await response.json()
        const pokemon = toPokemonDetails(data)

        if (!controller.signal.aborted) {
          setState({ status: 'success', requestedId: id, pokemon })
        }
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: 'error', requestedId: id })
        }
      }
    }

    void loadPokemonDetails()

    return () => controller.abort()
  }, [hasValidId, id, pokemonId, attempt])

  const visibleState: DetailState = !hasValidId
    ? { status: 'not-found', requestedId: id }
    : state.requestedId === id
      ? state
      : { status: 'loading', requestedId: id }

  return (
    <div className="app-shell detail-page">
      {visibleState.status === 'loading' && (
        <section className="request-state" role="status">
          <span className="request-state__spinner" aria-hidden="true" />
          <p>Loading Pokemon details...</p>
        </section>
      )}
      {visibleState.status === 'error' && (
        <section className="request-state" role="alert">
          <h1>Could not load Pokemon details</h1>
          <p>Please check your connection and try again.</p>
          <button className="retry-button" onClick={() => setAttempt((current) => current + 1)} type="button">
            Try again
          </button>
        </section>
      )}
      {visibleState.status === 'not-found' && (
        <section className="empty-state" aria-labelledby="pokemon-not-found-title">
          <span className="empty-state__icon empty-state__icon--not-found" aria-hidden="true">?</span>
          <div>
            <h1 id="pokemon-not-found-title">Pokemon not found</h1>
            <p>There is no Pokemon with this identifier.</p>
            <Link className="text-link" to="/pokemon">Return to the catalog</Link>
          </div>
        </section>
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
          <div className="request-state" role="status">
            <span className="request-state__spinner" aria-hidden="true" />
            <p>Loading Pokemon...</p>
          </div>
        )}
        {listState.status === 'error' && (
          <div className="request-state" role="alert">
            <h2>Could not load the Pokemon list</h2>
            <button className="retry-button" onClick={retryList} type="button">Try again</button>
          </div>
        )}
        {listState.status === 'success' && listState.pokemon.length === 0 && (
          <div className="request-state" role="status"><p>No Pokemon found.</p></div>
        )}
        {listState.status === 'success' && listState.pokemon.length > 0 && (
          <PokemonList pokemon={listState.pokemon} />
        )}
      </section>
    </div>
  )
}

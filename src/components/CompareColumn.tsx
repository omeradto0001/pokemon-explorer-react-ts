import type { PokemonDetailsRequest } from '../hooks/usePokemonDetails'
import type { CompareSide } from '../utils/compare'
import EmptyMessage from './EmptyMessage'
import ErrorMessage from './ErrorMessage'
import LoadingMessage from './LoadingMessage'
import PokemonArtwork from './PokemonArtwork'

type CompareColumnProps = {
  side: CompareSide
  request: PokemonDetailsRequest
  onRetry: () => void
}

export default function CompareColumn({ side, request, onRetry }: CompareColumnProps) {
  if (request.status === 'idle' || request.status === 'loading') {
    return <LoadingMessage message="Loading Pokemon details..." />
  }

  if (request.status === 'error') {
    return <ErrorMessage title="Could not load Pokemon details" onRetry={onRetry} />
  }

  if (request.status === 'not-found') {
    return <EmptyMessage title="Pokemon not found" />
  }

  const { pokemon } = request

  return (
    <article className={`compare-card compare-card--${side}`}>
      <div className="compare-card__visual">
        <PokemonArtwork key={pokemon.id} pokemon={pokemon} />
      </div>
      <p className="compare-card__label">{side === 'first' ? 'First Pokemon' : 'Second Pokemon'}</p>
      <h2>{pokemon.name}</h2>
      <div className="pokemon-detail__types" aria-label={`${pokemon.name} types`}>
        {pokemon.types.map((type) => (
          <span className="pokemon-detail__type" key={type}>{type}</span>
        ))}
      </div>
      <dl className="pokemon-detail__facts">
        <div><dt>Height</dt><dd>{(pokemon.height / 10).toFixed(1)} m</dd></div>
        <div><dt>Weight</dt><dd>{(pokemon.weight / 10).toFixed(1)} kg</dd></div>
      </dl>
    </article>
  )
}

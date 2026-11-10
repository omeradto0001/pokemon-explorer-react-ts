import { useState } from 'react'
import EmptyMessage from '../components/EmptyMessage'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PokemonArtwork from '../components/PokemonArtwork'
import { usePokemonDetails, type PokemonDetailsState } from '../hooks/usePokemonDetails'
import { usePokemonList } from '../hooks/usePokemonList'
import type { PokemonSummary } from '../types/pokemon'
import { canCompare, combineStats, getStatLeader, getStatPercent } from '../utils/compare'

type PokemonSelectProps = {
  id: string
  label: string
  pokemon: PokemonSummary[]
  value: number | null
  disabledId: number | null
  onChange: (pokemonId: number | null) => void
}

function PokemonSelect({ id, label, pokemon, value, disabledId, onChange }: PokemonSelectProps) {
  return (
    <div className="catalog-search">
      <label className="catalog-search__label" htmlFor={id}>{label}</label>
      <select
        className="catalog-search__input"
        id={id}
        onChange={(event) => onChange(event.target.value ? Number(event.target.value) : null)}
        value={value ?? ''}
      >
        <option value="">Choose a Pokemon</option>
        {pokemon.map((item) => (
          <option disabled={item.id === disabledId} key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  )
}

type CompareSide = 'first' | 'second'

type CompareColumnProps = {
  side: CompareSide
  state: PokemonDetailsState
  onRetry: () => void
}

function CompareColumn({ side, state, onRetry }: CompareColumnProps) {
  if (state.status === 'idle' || state.status === 'loading') {
    return <LoadingMessage message="Loading Pokemon details..." />
  }

  if (state.status === 'error') {
    return <ErrorMessage title="Could not load Pokemon details" onRetry={onRetry} />
  }

  if (state.status === 'not-found') {
    return <EmptyMessage title="Pokemon not found" />
  }

  const { pokemon } = state

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

type StatValueProps = {
  side: CompareSide
  value: number | null
  isLeader: boolean
}

function StatValue({ side, value, isLeader }: StatValueProps) {
  const bar = (
    <span className="comparison__bar" aria-hidden="true">
      <span style={{ width: `${getStatPercent(value)}%` }} />
    </span>
  )
  const number = <span className="comparison__number">{value ?? '—'}</span>

  // The number sits next to the stat name, so the bars grow outward from the center.
  return (
    <td className={`comparison__value comparison__value--${side}${isLeader ? ' comparison__value--leader' : ''}`}>
      {side === 'first' ? <>{bar}{number}</> : <>{number}{bar}</>}
    </td>
  )
}

type ComparisonProps = {
  firstId: number | null
  secondId: number | null
}

function Comparison({ firstId, secondId }: ComparisonProps) {
  const { state: firstState, retry: retryFirst } = usePokemonDetails(firstId)
  const { state: secondState, retry: retrySecond } = usePokemonDetails(secondId)

  return (
    <section className="comparison" aria-label="Pokemon comparison">
      <div className="comparison__columns">
        <CompareColumn side="first" state={firstState} onRetry={retryFirst} />
        <CompareColumn side="second" state={secondState} onRetry={retrySecond} />
      </div>
      {firstState.status === 'success' && secondState.status === 'success' && (
        <table className="comparison__stats">
          <caption>Base stats</caption>
          <thead>
            <tr>
              <th className="comparison__name comparison__name--first" scope="col">{firstState.pokemon.name}</th>
              <th scope="col">Stat</th>
              <th className="comparison__name comparison__name--second" scope="col">{secondState.pokemon.name}</th>
            </tr>
          </thead>
          <tbody>
            {combineStats(firstState.pokemon.stats, secondState.pokemon.stats).map((row) => {
              const leader = getStatLeader(row)

              return (
                <tr key={row.name}>
                  <StatValue side="first" value={row.first} isLeader={leader === 'first'} />
                  <th scope="row">{row.name}</th>
                  <StatValue side="second" value={row.second} isLeader={leader === 'second'} />
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default function ComparePage() {
  const { state, retry } = usePokemonList()
  const [firstId, setFirstId] = useState<number | null>(null)
  const [secondId, setSecondId] = useState<number | null>(null)

  return (
    <div className="app-shell page-stack">
      <header className="page-header">
        <p className="eyebrow">Side by side</p>
        <h1>Compare</h1>
        <p className="catalog-intro">
          See how two Pokemon measure up against each other.
        </p>
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
        <EmptyMessage title="No Pokemon found" description="There is nothing to compare right now." />
      )}
      {state.status === 'success' && state.pokemon.length > 0 && (
        <>
          <div className="compare-selects">
            <PokemonSelect
              disabledId={secondId}
              id="compare-first"
              label="First Pokemon"
              onChange={setFirstId}
              pokemon={state.pokemon}
              value={firstId}
            />
            <PokemonSelect
              disabledId={firstId}
              id="compare-second"
              label="Second Pokemon"
              onChange={setSecondId}
              pokemon={state.pokemon}
              value={secondId}
            />
          </div>
          {canCompare(firstId, secondId) ? (
            <Comparison firstId={firstId} secondId={secondId} />
          ) : (
            <EmptyState
              icon="⇄"
              iconVariant="compare"
              title="Choose two Pokemon to compare"
              description="Your comparison will appear here."
            />
          )}
        </>
      )}
    </div>
  )
}

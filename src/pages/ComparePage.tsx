import { useState } from 'react'
import CompareColumn from '../components/CompareColumn'
import CompareStatsTable from '../components/CompareStatsTable'
import EmptyMessage from '../components/EmptyMessage'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import LoadingMessage from '../components/LoadingMessage'
import PokemonSelect from '../components/PokemonSelect'
import { usePokemonDetails } from '../hooks/usePokemonDetails'
import { usePokemonList } from '../hooks/usePokemonList'
import { canCompare } from '../utils/compare'

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
        <CompareStatsTable first={firstState.pokemon} second={secondState.pokemon} />
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

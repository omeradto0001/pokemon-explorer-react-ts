import { useEffect, useState } from 'react'
import PokemonList from '../components/PokemonList'
import type { PokemonListApiResponse } from '../types/pokeapi'
import type { PokemonSummary } from '../types/pokemon'
import { toPokemonSummary } from '../utils/pokemonMappers'

const POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=60'

type CatalogState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; pokemon: PokemonSummary[] }

export default function PokemonCatalogPage() {
  const [state, setState] = useState<CatalogState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemon() {
      setState({ status: 'loading' })

      try {
        const response = await fetch(POKEMON_LIST_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Pokemon list request failed: ${response.status}`)
        }

        const data: PokemonListApiResponse = await response.json()
        const pokemonList = data.results.map(toPokemonSummary)

        if (!controller.signal.aborted) {
          setState({ status: 'success', pokemon: pokemonList })
        }
      } catch {
        if (!controller.signal.aborted) {
          setState({ status: 'error' })
        }
      }
    }

    void loadPokemon()

    return () => controller.abort()
  }, [attempt])

  return (
    <div className="app-shell">
      <header className="catalog-header">
        <p className="eyebrow">Pokemon catalog</p>
        <h1>Explore Pokemon</h1>
        <p className="catalog-intro">
          Meet the first 60 Pokemon, brought to you by PokeAPI.
        </p>
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
            onClick={() => setAttempt((current) => current + 1)}
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
      {state.status === 'success' && state.pokemon.length > 0 && (
        <PokemonList pokemon={state.pokemon} />
      )}
    </div>
  )
}

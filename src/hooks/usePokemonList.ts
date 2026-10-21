import { useEffect, useState } from 'react'
import type { PokemonListApiResponse } from '../types/pokeapi'
import type { PokemonSummary } from '../types/pokemon'
import { toPokemonSummary } from '../utils/pokemonMappers'

const POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=60'

export type PokemonListState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; pokemon: PokemonSummary[] }

export function usePokemonList() {
  const [state, setState] = useState<PokemonListState>({ status: 'loading' })
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
        const pokemon = data.results.map(toPokemonSummary)

        if (!controller.signal.aborted) {
          setState({ status: 'success', pokemon })
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

  return {
    state,
    retry: () => setAttempt((current) => current + 1),
  }
}

import { useEffect, useState } from 'react'
import type { PokemonListApiResponse } from '../types/pokeapi'
import type { PokemonSummary } from '../types/pokemon'
import { toPokemonSummary } from '../utils/pokemonMappers'

const POKEMON_LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=60'

export type PokemonListRequest =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; pokemonList: PokemonSummary[] }

export function usePokemonList() {
  const [listRequest, setListRequest] = useState<PokemonListRequest>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemon() {
      setListRequest({ status: 'loading' })

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
          setListRequest({ status: 'success', pokemonList })
        }
      } catch {
        if (!controller.signal.aborted) {
          setListRequest({ status: 'error' })
        }
      }
    }

    void loadPokemon()

    return () => controller.abort()
  }, [attempt])

  return {
    listRequest,
    retryList: () => setAttempt((current) => current + 1),
  }
}

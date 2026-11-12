import { useEffect, useState } from 'react'
import { fetchPokemonDetails, type PokemonDetailsResult } from '../utils/pokemonApi'

export type PokemonDetailsRequest =
  | { status: 'idle' }
  | { status: 'loading' }
  | PokemonDetailsResult

type TrackedRequest = { requestedId: number; request: PokemonDetailsRequest }

export function usePokemonDetails(pokemonId: number | null) {
  const [tracked, setTracked] = useState<TrackedRequest | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (pokemonId === null) {
      return
    }

    const controller = new AbortController()

    async function loadPokemonDetails(requestedId: number) {
      setTracked({ requestedId, request: { status: 'loading' } })

      const result = await fetchPokemonDetails(requestedId, controller.signal)

      if (!controller.signal.aborted) {
        setTracked({ requestedId, request: result })
      }
    }

    void loadPokemonDetails(pokemonId)

    return () => controller.abort()
  }, [pokemonId, attempt])

  const detailsRequest: PokemonDetailsRequest = pokemonId === null
    ? { status: 'idle' }
    : tracked?.requestedId === pokemonId
      ? tracked.request
      : { status: 'loading' }

  return {
    detailsRequest,
    retryDetails: () => setAttempt((current) => current + 1),
  }
}
